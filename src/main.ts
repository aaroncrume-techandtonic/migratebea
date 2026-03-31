import './style.css'
import { vocabulary } from './vocabulary'

type VocabularyEntry = {
  category: string
  klamath: string
  english: string
}

type QuizMode = 'flashcard' | 'mcq'

type QuizQuestion = {
  prompt: VocabularyEntry
  options: VocabularyEntry[]
}

const app = document.querySelector<HTMLDivElement>('#app')

if (!app) {
  throw new Error('App root not found')
}

const categories = ['all', ...Array.from(new Set(vocabulary.map((entry) => entry.category)))]
const speechRates = [0.65, 0.85, 1]
const practiceIntervals = [1000, 1600, 2400, 3200]

const favoriteStorageKey = 'klamath-favorites-v1'
const supportsTts = typeof window !== 'undefined' && 'speechSynthesis' in window
const voiceStorageKey = 'klamath-voice-v1'

let activeCategory = 'all'
let query = ''
let showFavoritesOnly = false
let favoriteIds = loadFavorites()
let speechRateById = new Map<string, number>()
let selectedVoiceUri = loadVoiceUri()

let quizMode: QuizMode | null = null
let quizQuestion: QuizQuestion | null = null
let quizRevealed = false
let quizSelectedId = ''
let quizScore = 0
let quizRounds = 0
let quizSpeechRate = 0.85

let practiceEnabled = false
let practiceQueue: VocabularyEntry[] = []
let practiceIndex = 0
let practiceCurrentId = ''
let practiceSpeechRate = 0.65
let practiceGapMs = 1600
let practiceTimer: number | null = null
let practiceFavoritesOnly = false

let toastMessage = ''
let toastTone: 'info' | 'success' | 'error' = 'info'
let toastTimer: number | null = null

const escapeHtml = (value: string): string =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')

const formatRate = (rate: number): string => `${rate.toFixed(2)}x`

const formatGap = (gapMs: number): string => `${(gapMs / 1000).toFixed(1)}s gap`

const entryId = (entry: VocabularyEntry): string =>
  `${entry.category}::${entry.klamath}::${entry.english}`

function loadFavorites(): Set<string> {
  try {
    const raw = localStorage.getItem(favoriteStorageKey)
    if (!raw) {
      return new Set<string>()
    }

    const parsed = JSON.parse(raw) as unknown
    if (!Array.isArray(parsed)) {
      return new Set<string>()
    }

    return new Set<string>(parsed.filter((value): value is string => typeof value === 'string'))
  } catch {
    return new Set<string>()
  }
}

function loadVoiceUri(): string {
  try {
    return localStorage.getItem(voiceStorageKey) ?? ''
  } catch {
    return ''
  }
}

const persistVoiceUri = (): void => {
  try {
    localStorage.setItem(voiceStorageKey, selectedVoiceUri)
  } catch {
    // Ignore storage errors to keep the app usable in private modes.
  }
}

const persistFavorites = (): void => {
  try {
    localStorage.setItem(favoriteStorageKey, JSON.stringify(Array.from(favoriteIds.values())))
  } catch {
    // Ignore storage errors to keep the app usable in private modes.
  }
}

const getVoices = (): SpeechSynthesisVoice[] => {
  if (!supportsTts) {
    return []
  }

  return window.speechSynthesis.getVoices().slice().sort((a, b) => {
    return a.name.localeCompare(b.name)
  })
}

const getValidFavoriteIds = (ids: string[]): string[] => {
  const known = new Set(vocabulary.map((entry) => entryId(entry)))
  return ids.filter((id) => known.has(id))
}

const randomItem = <T>(items: T[]): T => {
  const index = Math.floor(Math.random() * items.length)
  return items[index]
}

const shuffleItems = <T>(items: T[]): T[] => {
  const pool = [...items]
  for (let i = pool.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))
    const tmp = pool[i]
    pool[i] = pool[j]
    pool[j] = tmp
  }

  return pool
}

const sampleItems = <T>(items: T[], count: number): T[] => {
  return shuffleItems(items).slice(0, count)
}

const stopPractice = (): void => {
  practiceEnabled = false
  practiceQueue = []
  practiceIndex = 0
  practiceCurrentId = ''

  if (practiceTimer !== null) {
    window.clearTimeout(practiceTimer)
    practiceTimer = null
  }

  if (supportsTts) {
    window.speechSynthesis.cancel()
  }
}

const showToast = (message: string, tone: 'info' | 'success' | 'error' = 'info'): void => {
  toastMessage = message
  toastTone = tone

  if (toastTimer !== null) {
    window.clearTimeout(toastTimer)
  }

  render()

  toastTimer = window.setTimeout(() => {
    toastMessage = ''
    toastTimer = null
    render()
  }, 2600)
}

const dismissToast = (): void => {
  toastMessage = ''
  if (toastTimer !== null) {
    window.clearTimeout(toastTimer)
    toastTimer = null
  }
  render()
}

const speakTerm = (text: string, rate: number, onDone?: () => void): void => {
  if (!supportsTts) {
    return
  }

  if (!practiceEnabled) {
    window.speechSynthesis.cancel()
  }

  const utterance = new SpeechSynthesisUtterance(text)
  utterance.rate = rate
  utterance.pitch = 0.96
  utterance.lang = 'en-US'

  const voice = getVoices().find((candidate) => candidate.voiceURI === selectedVoiceUri)
  if (voice) {
    utterance.voice = voice
    if (voice.lang) {
      utterance.lang = voice.lang
    }
  }

  if (onDone) {
    utterance.onend = onDone
    utterance.onerror = onDone
  }

  window.speechSynthesis.speak(utterance)
}

const getPracticeEntries = (): VocabularyEntry[] => {
  const visible = getVisibleEntries()
  if (!practiceFavoritesOnly) {
    return visible
  }

  return visible.filter((entry) => favoriteIds.has(entryId(entry)))
}

const matchesQuery = (entry: VocabularyEntry, search: string): boolean => {
  if (!search) {
    return true
  }

  const normalized = search.toLowerCase()
  return (
    entry.klamath.toLowerCase().includes(normalized) ||
    entry.english.toLowerCase().includes(normalized) ||
    entry.category.toLowerCase().includes(normalized)
  )
}

const getVisibleEntries = (): VocabularyEntry[] => {
  return vocabulary.filter((entry) => {
    const categoryMatch = activeCategory === 'all' || entry.category === activeCategory
    const favoriteMatch = !showFavoritesOnly || favoriteIds.has(entryId(entry))
    return categoryMatch && favoriteMatch && matchesQuery(entry, query)
  })
}

const getQuizPool = (): VocabularyEntry[] => {
  const visible = getVisibleEntries()
  if (visible.length >= 2) {
    return visible
  }

  return vocabulary
}

const buildQuizQuestion = (mode: QuizMode): QuizQuestion | null => {
  const pool = getQuizPool()
  if (pool.length === 0) {
    return null
  }

  if (mode === 'flashcard') {
    const prompt = randomItem(pool)
    return { prompt, options: [prompt] }
  }

  const prompt = randomItem(pool)
  const distractorPool = vocabulary.filter((entry) => entryId(entry) !== entryId(prompt))
  const distractors = sampleItems(distractorPool, 3)
  const options = sampleItems([prompt, ...distractors], Math.min(4, distractors.length + 1))

  return { prompt, options }
}

const beginQuiz = (mode: QuizMode): void => {
  quizMode = mode
  quizScore = 0
  quizRounds = 0
  quizRevealed = false
  quizSelectedId = ''
  quizQuestion = buildQuizQuestion(mode)
}

const nextQuizQuestion = (): void => {
  if (!quizMode) {
    return
  }

  quizRevealed = false
  quizSelectedId = ''
  quizQuestion = buildQuizQuestion(quizMode)
}

const runPracticeStep = (): void => {
  if (!practiceEnabled || !supportsTts) {
    return
  }

  const source = getPracticeEntries()
  if (source.length === 0) {
    stopPractice()
    render()
    return
  }

  if (practiceQueue.length === 0 || practiceIndex >= practiceQueue.length) {
    practiceQueue = shuffleItems(source)
    practiceIndex = 0
  }

  const term = practiceQueue[practiceIndex]
  if (!term) {
    stopPractice()
    render()
    return
  }

  practiceCurrentId = entryId(term)

  speakTerm(term.klamath, practiceSpeechRate, () => {
    if (!practiceEnabled) {
      return
    }

    practiceIndex += 1
    practiceTimer = window.setTimeout(() => {
      runPracticeStep()
      render()
    }, practiceGapMs)
  })
}

const startPractice = (): boolean => {
  stopPractice()
  const source = getPracticeEntries()
  if (source.length === 0 || !supportsTts) {
    return false
  }

  practiceEnabled = true
  practiceQueue = shuffleItems(source)
  practiceIndex = 0
  runPracticeStep()
  return true
}

const groupByCategory = (entries: VocabularyEntry[]): Map<string, VocabularyEntry[]> => {
  const grouped = new Map<string, VocabularyEntry[]>()

  entries.forEach((entry) => {
    const bucket = grouped.get(entry.category)
    if (bucket) {
      bucket.push(entry)
      return
    }

    grouped.set(entry.category, [entry])
  })

  return grouped
}

const getSpeechRateForEntry = (entry: VocabularyEntry): number => {
  return speechRateById.get(entryId(entry)) ?? 0.85
}

const render = (): void => {
  const visible = getVisibleEntries()
  const grouped = groupByCategory(visible)
  const favoritesCount = favoriteIds.size
  const quizPromptId = quizQuestion ? entryId(quizQuestion.prompt) : ''
  const voices = getVoices()

  app.innerHTML = `
    <div class="page-shell">
      <header class="hero">
        <p class="kicker">Klamath Language App</p>
        <h1>Klamath and Modoc Vocabulary</h1>
        <p class="intro">
          Search by Klamath term or English meaning, then filter by category.
          This update includes the newly added vocabulary dataset.
        </p>
        <p class="tts-note">
          Pronunciation: each term now has a speed control plus speech playback.
        </p>
      </header>

      <section class="build-feature" aria-label="Build highlight">
        <div class="build-feature-wheel" aria-hidden="true"></div>
        <div class="build-feature-copy">
          <p class="build-feature-kicker">Featured Build</p>
          <h2>Medicine Wheel Edition</h2>
          <p>
            This release introduces a ceremonial visual direction with four-direction color cues,
            directional motif accents, and stronger readability across quiz and vocabulary cards.
          </p>
        </div>
        <ul class="build-feature-list" aria-label="Feature highlights">
          <li>Four-direction color system across controls and category chips</li>
          <li>Hero, quiz, and group motifs inspired by medicine wheel geometry</li>
          <li>Refined matte surfaces for cleaner focus during study and practice</li>
        </ul>
      </section>

      <section class="controls" aria-label="Vocabulary controls">
        <label class="search-label" for="search-input">Search</label>
        <div class="search-row">
          <input
            id="search-input"
            class="search-input"
            type="search"
            placeholder="Try: water, child, eagle, Klamath Falls..."
            value="${escapeHtml(query)}"
          />
          <button class="clear-button" type="button" ${query ? '' : 'disabled'}>Clear</button>
        </div>

        <div class="feature-row">
          <button
            class="feature-button${showFavoritesOnly ? ' is-selected' : ''}"
            type="button"
            data-action="toggle-favorites-view"
            aria-pressed="${showFavoritesOnly}"
          >
            ${showFavoritesOnly ? 'Showing Favorites Only' : 'Show Favorites Only'}
          </button>
          <button class="feature-button" type="button" data-action="start-flashcard">Start Flashcard Quiz</button>
          <button class="feature-button" type="button" data-action="start-mcq">Start Multiple Choice Quiz</button>
          <button class="feature-button" type="button" data-action="start-practice" ${supportsTts ? '' : 'disabled'}>
            ${practiceEnabled ? 'Restart Auto Practice' : 'Start Auto Practice'}
          </button>
          <button class="feature-button${practiceFavoritesOnly ? ' is-selected' : ''}" type="button" data-action="toggle-practice-favorites">
            ${practiceFavoritesOnly ? 'Practice Favorites Only: On' : 'Practice Favorites Only: Off'}
          </button>
          <button class="feature-button" type="button" data-action="export-favorites">Export Favorites</button>
          <button class="feature-button" type="button" data-action="import-favorites">Import Favorites</button>
          ${practiceEnabled ? '<button class="feature-button" type="button" data-action="stop-practice">Stop Auto Practice</button>' : ''}
          ${quizMode ? '<button class="feature-button" type="button" data-action="stop-quiz">Exit Quiz</button>' : ''}
        </div>

        <input class="hidden-input" type="file" id="favorites-import" accept="application/json" />

        <div class="practice-row">
          <label>
            Practice Speed
            <select class="small-select" data-action="set-practice-rate">
              ${speechRates
                .map(
                  (rate) =>
                    `<option value="${rate}" ${rate === practiceSpeechRate ? 'selected' : ''}>${formatRate(rate)}</option>`,
                )
                .join('')}
            </select>
          </label>
          <label>
            Interval
            <select class="small-select" data-action="set-practice-gap">
              ${practiceIntervals
                .map(
                  (gap) =>
                    `<option value="${gap}" ${gap === practiceGapMs ? 'selected' : ''}>${formatGap(gap)}</option>`,
                )
                .join('')}
            </select>
          </label>
          <label>
            Voice
            <select class="small-select" data-action="set-voice" ${supportsTts ? '' : 'disabled'}>
              <option value="" ${selectedVoiceUri ? '' : 'selected'}>Default Voice</option>
              ${voices
                .map((voice) => {
                  const label = `${voice.name} (${voice.lang})`
                  return `<option value="${escapeHtml(voice.voiceURI)}" ${voice.voiceURI === selectedVoiceUri ? 'selected' : ''}>${escapeHtml(label)}</option>`
                })
                .join('')}
            </select>
          </label>
          <p class="practice-status">
            ${
              practiceEnabled && practiceCurrentId
                ? `Now speaking: ${escapeHtml(vocabulary.find((entry) => entryId(entry) === practiceCurrentId)?.klamath ?? '')}`
                : 'Auto practice is idle.'
            }
          </p>
        </div>

        <div class="chip-row" role="tablist" aria-label="Category filter">
          ${categories
            .map((category) => {
              const selected = category === activeCategory
              const label = category === 'all' ? 'All Categories' : category
              return `<button class="chip${selected ? ' is-selected' : ''}" role="tab" aria-selected="${selected}" data-action="set-category" data-category="${escapeHtml(category)}">${escapeHtml(label)}</button>`
            })
            .join('')}
        </div>
      </section>

      <section class="quiz" aria-live="polite">
        <div class="quiz-head">
          <h2>Quiz Mode</h2>
          <p class="quiz-meta">Score: ${quizScore} / ${quizRounds}</p>
        </div>
        ${
          !quizMode || !quizQuestion
            ? '<p class="quiz-empty">Pick a quiz mode above to practice pronunciation, recall, and meanings.</p>'
            : quizMode === 'flashcard'
              ? `
                <div class="quiz-card">
                  <p class="quiz-label">Flashcard</p>
                  <p class="quiz-term">${escapeHtml(quizQuestion.prompt.klamath)}</p>
                  <p class="quiz-answer ${quizRevealed ? 'is-visible' : ''}">${quizRevealed ? escapeHtml(quizQuestion.prompt.english) : 'Tap Reveal to see the meaning.'}</p>
                  <div class="quiz-actions">
                    <label>
                      Quiz Speed
                      <select class="small-select" data-action="set-quiz-rate">
                        ${speechRates
                          .map(
                            (rate) =>
                              `<option value="${rate}" ${rate === quizSpeechRate ? 'selected' : ''}>${formatRate(rate)}</option>`,
                          )
                          .join('')}
                      </select>
                    </label>
                    <button class="small-button" type="button" data-action="quiz-speak" data-id="${escapeHtml(quizPromptId)}" ${supportsTts ? '' : 'disabled'}>Speak</button>
                    ${!quizRevealed ? '<button class="small-button" type="button" data-action="flash-reveal">Reveal</button>' : ''}
                    ${quizRevealed ? '<button class="small-button" type="button" data-action="flash-known">I Knew This</button>' : ''}
                    ${quizRevealed ? '<button class="small-button" type="button" data-action="flash-practice">Need Practice</button>' : ''}
                  </div>
                </div>
              `
              : `
                <div class="quiz-card">
                  <p class="quiz-label">Multiple Choice</p>
                  <p class="quiz-term">${escapeHtml(quizQuestion.prompt.klamath)}</p>
                  <p class="quiz-hint">Choose the correct English meaning.</p>
                  <div class="quiz-options">
                    ${quizQuestion.options
                      .map((option) => {
                        const optionId = entryId(option)
                        const isCorrect = optionId === quizPromptId
                        const isPicked = optionId === quizSelectedId
                        const showCorrect = quizRevealed && isCorrect
                        const showWrong = quizRevealed && isPicked && !isCorrect
                        return `<button class="quiz-option${showCorrect ? ' is-correct' : ''}${showWrong ? ' is-wrong' : ''}" type="button" data-action="quiz-option" data-id="${escapeHtml(optionId)}" ${quizRevealed ? 'disabled' : ''}>${escapeHtml(option.english)}</button>`
                      })
                      .join('')}
                  </div>
                  <div class="quiz-actions">
                    <label>
                      Quiz Speed
                      <select class="small-select" data-action="set-quiz-rate">
                        ${speechRates
                          .map(
                            (rate) =>
                              `<option value="${rate}" ${rate === quizSpeechRate ? 'selected' : ''}>${formatRate(rate)}</option>`,
                          )
                          .join('')}
                      </select>
                    </label>
                    <button class="small-button" type="button" data-action="quiz-speak" data-id="${escapeHtml(quizPromptId)}" ${supportsTts ? '' : 'disabled'}>Speak</button>
                    ${quizRevealed ? '<button class="small-button" type="button" data-action="quiz-next">Next Question</button>' : ''}
                  </div>
                </div>
              `
        }
      </section>

      <section class="stats" aria-live="polite">
        <article>
          <p class="stat-value">${visible.length}</p>
          <p class="stat-label">Visible Terms</p>
        </article>
        <article>
          <p class="stat-value">${vocabulary.length}</p>
          <p class="stat-label">Total Terms</p>
        </article>
        <article>
          <p class="stat-value">${grouped.size}</p>
          <p class="stat-label">Visible Categories</p>
        </article>
        <article>
          <p class="stat-value">${favoritesCount}</p>
          <p class="stat-label">Favorites</p>
        </article>
      </section>

      <main class="results" id="results">
        ${
          visible.length === 0
            ? '<p class="empty">No matches yet. Try a different search or category.</p>'
            : Array.from(grouped.entries())
                .map(
                  ([category, entries]) => `
                    <section class="group" aria-label="${escapeHtml(category)}">
                      <h2>${escapeHtml(category)}</h2>
                      <div class="term-grid">
                        ${entries
                          .map((entry) => {
                            const id = entryId(entry)
                            const currentRate = getSpeechRateForEntry(entry)
                            const isSpeaking = id === practiceCurrentId
                            return `
                              <article class="term-card${isSpeaking ? ' is-speaking' : ''}">
                                <p class="klamath">${escapeHtml(entry.klamath)}</p>
                                <p class="english">${escapeHtml(entry.english)}</p>
                                <div class="term-actions">
                                  <label>
                                    Speed
                                    <select class="small-select" data-action="set-rate" data-id="${escapeHtml(id)}">
                                      ${speechRates
                                        .map(
                                          (rate) =>
                                            `<option value="${rate}" ${rate === currentRate ? 'selected' : ''}>${formatRate(rate)}</option>`,
                                        )
                                        .join('')}
                                    </select>
                                  </label>
                                  <button class="small-button" type="button" data-action="speak" data-id="${escapeHtml(id)}" ${supportsTts ? '' : 'disabled'}>Speak</button>
                                  <button class="small-button${favoriteIds.has(id) ? ' is-favorite' : ''}" type="button" data-action="favorite" data-id="${escapeHtml(id)}" aria-pressed="${favoriteIds.has(id)}">
                                    ${favoriteIds.has(id) ? 'Favorited' : 'Favorite'}
                                  </button>
                                </div>
                              </article>
                            `
                          })
                          .join('')}
                      </div>
                    </section>
                  `,
                )
                .join('')
        }
      </main>

      ${
        toastMessage
          ? `<div class="toast toast-${toastTone}" role="status" aria-live="polite"><p class="toast-message">${escapeHtml(toastMessage)}</p><button class="toast-close" type="button" data-action="dismiss-toast" aria-label="Dismiss notification">Close</button></div>`
          : ''
      }
    </div>
  `
}

app.addEventListener('input', (event) => {
  const target = event.target

  if (target instanceof HTMLInputElement && target.id === 'search-input') {
    query = target.value.trim()
    render()
    return
  }

  if (!(target instanceof HTMLSelectElement)) {
    return
  }

  const action = target.dataset.action

  if (action === 'set-rate') {
    const id = target.dataset.id
    const value = Number(target.value)
    if (id && Number.isFinite(value)) {
      speechRateById.set(id, value)
    }
    return
  }

  if (action === 'set-quiz-rate') {
    const value = Number(target.value)
    if (Number.isFinite(value)) {
      quizSpeechRate = value
    }
    return
  }

  if (action === 'set-practice-rate') {
    const value = Number(target.value)
    if (Number.isFinite(value)) {
      practiceSpeechRate = value
    }
    return
  }

  if (action === 'set-practice-gap') {
    const value = Number(target.value)
    if (Number.isFinite(value)) {
      practiceGapMs = value
    }
    return
  }

  if (action === 'set-voice') {
    selectedVoiceUri = target.value
    persistVoiceUri()
  }
})

app.addEventListener('change', (event) => {
  const target = event.target
  if (!(target instanceof HTMLInputElement)) {
    return
  }

  if (target.id !== 'favorites-import') {
    return
  }

  const file = target.files?.[0]
  if (!file) {
    return
  }

  void file
    .text()
    .then((raw) => {
      const parsed = JSON.parse(raw) as unknown
      if (!Array.isArray(parsed)) {
        return
      }

      const ids = parsed.filter((value): value is string => typeof value === 'string')
      favoriteIds = new Set<string>(getValidFavoriteIds(ids))
      persistFavorites()
      render()
      showToast(`Imported ${favoriteIds.size} favorite terms.`, 'success')
    })
    .catch(() => {
      showToast('Import failed. Use a valid favorites JSON export file.', 'error')
    })
    .finally(() => {
      target.value = ''
    })
})

app.addEventListener('click', (event) => {
  const target = event.target
  if (!(target instanceof HTMLElement)) {
    return
  }

  if (target.classList.contains('clear-button')) {
    query = ''
    render()
    return
  }

  const button = target.closest('button')
  if (!button) {
    return
  }

  const action = button.dataset.action
  if (!action) {
    return
  }

  if (action === 'set-category') {
    activeCategory = button.dataset.category ?? 'all'
    render()
    return
  }

  if (action === 'dismiss-toast') {
    dismissToast()
    return
  }

  if (action === 'toggle-favorites-view') {
    showFavoritesOnly = !showFavoritesOnly
    render()
    return
  }

  if (action === 'toggle-practice-favorites') {
    practiceFavoritesOnly = !practiceFavoritesOnly
    if (practiceEnabled) {
      const started = startPractice()
      if (!started) {
        showToast('No terms available for favorites-only practice.', 'error')
        render()
        return
      }
    }
    showToast(
      practiceFavoritesOnly ? 'Practice now targets favorites only.' : 'Practice now targets all visible terms.',
      'info',
    )
    render()
    return
  }

  if (action === 'export-favorites') {
    const payload = JSON.stringify(Array.from(favoriteIds.values()), null, 2)
    const blob = new Blob([payload], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    const stamp = new Date().toISOString().slice(0, 10)
    link.href = url
    link.download = `klamath-favorites-${stamp}.json`
    link.click()
    URL.revokeObjectURL(url)
    showToast(`Exported ${favoriteIds.size} favorites.`, 'success')
    return
  }

  if (action === 'import-favorites') {
    const input = document.querySelector<HTMLInputElement>('#favorites-import')
    input?.click()
    showToast('Select a favorites JSON file to import.', 'info')
    return
  }

  if (action === 'favorite') {
    const id = button.dataset.id
    if (!id) {
      return
    }

    if (favoriteIds.has(id)) {
      favoriteIds.delete(id)
    } else {
      favoriteIds.add(id)
    }

    persistFavorites()
    render()
    return
  }

  if (action === 'speak' || action === 'quiz-speak') {
    const id = button.dataset.id
    if (!id) {
      return
    }

    const term = vocabulary.find((entry) => entryId(entry) === id)
    if (term) {
      const rate = action === 'speak' ? (speechRateById.get(id) ?? 0.85) : quizSpeechRate
      speakTerm(term.klamath, rate)
    }
    return
  }

  if (action === 'start-practice') {
    const started = startPractice()
    if (started) {
      showToast('Auto practice started.', 'success')
    } else {
      showToast('No terms available for practice in the current filters.', 'error')
    }
    render()
    return
  }

  if (action === 'stop-practice') {
    stopPractice()
    showToast('Auto practice stopped.', 'info')
    render()
    return
  }

  if (action === 'start-flashcard') {
    beginQuiz('flashcard')
    render()
    return
  }

  if (action === 'start-mcq') {
    beginQuiz('mcq')
    render()
    return
  }

  if (action === 'stop-quiz') {
    quizMode = null
    quizQuestion = null
    quizRevealed = false
    quizSelectedId = ''
    render()
    return
  }

  if (!quizMode || !quizQuestion) {
    return
  }

  if (action === 'flash-reveal') {
    quizRevealed = true
    render()
    return
  }

  if (action === 'flash-known') {
    if (!quizRevealed) {
      return
    }

    quizScore += 1
    quizRounds += 1
    nextQuizQuestion()
    render()
    return
  }

  if (action === 'flash-practice') {
    if (!quizRevealed) {
      return
    }

    quizRounds += 1
    nextQuizQuestion()
    render()
    return
  }

  if (action === 'quiz-option') {
    if (quizMode !== 'mcq' || quizRevealed) {
      return
    }

    const selectedId = button.dataset.id
    if (!selectedId) {
      return
    }

    quizSelectedId = selectedId
    quizRevealed = true
    quizRounds += 1

    if (selectedId === entryId(quizQuestion.prompt)) {
      quizScore += 1
    }

    render()
    return
  }

  if (action === 'quiz-next') {
    nextQuizQuestion()
    render()
  }
})

window.addEventListener('beforeunload', () => {
  stopPractice()
})

if (supportsTts) {
  window.speechSynthesis.addEventListener('voiceschanged', () => {
    const voices = getVoices()
    if (selectedVoiceUri && !voices.some((voice) => voice.voiceURI === selectedVoiceUri)) {
      selectedVoiceUri = ''
      persistVoiceUri()
    }
    render()
  })
}

render()
