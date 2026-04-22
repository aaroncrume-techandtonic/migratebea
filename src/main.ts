import './style.css'

type LinkCard = {
  title: string
  detail: string
  href: string
  label: string
  category: 'Learning' | 'Store' | 'Tools' | 'Audio' | 'Legacy'
}

const contactEmail = 'hello@techandtonic.tech'
const omniCosmosV3Url = 'https://aaroncrume-techandtonic.github.io/OmniCosmosV2.1/?v=3.0.4'
const favoritesStorageKey = 'techandtonic.favorites'
const usageStorageKey = 'techandtonic.usage'

const app = document.querySelector<HTMLDivElement>('#root')

if (!app) {
  throw new Error('App root not found')
}

const featuredPortfolio: LinkCard[] = [
  {
    title: 'Indigenous Learning Library',
    detail: 'Start here if you want a guided reading space where Indigenous knowledge is organized with care, context, and clear learning pathways.',
    href: 'https://aaroncrume-techandtonic.github.io/indigenous-pages/',
    label: 'Begin Here',
    category: 'Learning',
  },
  {
    title: 'Modoc History Archive',
    detail: 'Continue into a historical archive that connects timeline, place, and source material so you can explore the full story with clarity.',
    href: 'https://aaroncrume-techandtonic.github.io/Modoc-War/',
    label: 'Deepen Context',
    category: 'Learning',
  },
  {
    title: 'Klamath Watershed Story Map',
    detail: 'Move into an interactive regional map experience where rivers, landscapes, and relationships are presented as one connected system.',
    href: 'https://aaroncrume-techandtonic.github.io/klamath-watershed/',
    label: 'Explore Place',
    category: 'Learning',
  },
  {
    title: 'OmniCosmos V3.0',
    detail: 'Finish this path with an interactive cosmic reading experience where you can enter your details and receive a personalized interpretation.',
    href: omniCosmosV3Url,
    label: 'Interactive Experience',
    category: 'Tools',
  },
]

const easyAccessLinks: LinkCard[] = [
  {
    title: 'Shop Digital Offerings',
    detail: 'Go directly to the main storefront for current releases, digital tools, and learning-centered products.',
    href: 'https://techandtonic.store/',
    label: 'Shop',
    category: 'Store',
  },
  {
    title: 'Free Guide: Hidden Language of Trauma',
    detail: 'Open the free guide and companion materials when you want a focused starting point for reflection, study, and insight.',
    href: 'https://techandtonic.store/shop/583c5bec-b36c-49f4-bc1d-e06eeaf6ce9f?pageViewSource=lib_view',
    label: 'Free Resource',
    category: 'Store',
  },
  {
    title: 'Klamath Language App: Medicine Wheel Edition',
    detail: 'Practice Klamath and Modoc vocabulary with an interactive language tool featuring four-direction color cues and medicine wheel ceremonial styling.',
    href: 'https://aaroncrume-techandtonic.github.io/klamath-app-medicine-wheel/',
    label: 'Language Learning',
    category: 'Tools',
  },
  {
    title: 'Oracle of the Wheel',
    detail: 'Step into the numerology pathway if you want another symbolic tool for reflection and interpretation.',
    href: 'https://aaroncrume-techandtonic.github.io/OracleNeumero/',
    label: 'Companion Tool',
    category: 'Tools',
  },
  {
    title: 'The Basin Beat',
    detail: 'Listen to the featured show directly on Spotify for long-form audio storytelling and guided listening.',
    href: 'https://open.spotify.com/show/3ZAlwYu3kQbb2qYhu84X2Y?si=ebaed426c58a4f70',
    label: 'Listen',
    category: 'Audio',
  },
  {
    title: 'Romeo Strikes Back',
    detail: 'Open the featured album on Spotify when you want a focused music experience connected to this creative work.',
    href: 'https://open.spotify.com/album/3TcPEUdfLsr5Tt1bHnrfqC?si=EukzfZHBQDa3GKfvqEdMEQ',
    label: 'Featured Audio',
    category: 'Audio',
  },
  {
    title: 'Legacy Link Hub',
    detail: 'Use this bridge if you arrived from older routes and want to navigate familiar links in one place.',
    href: 'https://beacons.ai/techandtonic',
    label: 'Legacy Access',
    category: 'Legacy',
  },
  {
    title: 'Featured Product Spotlight',
    detail: 'Go straight to one highlighted offer when you prefer a single focused destination instead of browsing first.',
    href: 'https://techandtonic.store/shop/4440aedc-a40d-45f1-824c-4ca4fe42a3b6',
    label: 'Spotlight',
    category: 'Store',
  },
]

const creatorsPortfolio: LinkCard = {
  title: 'Creators Portfolio',
  detail: 'Get the full background in one place: experience, project constellation, and the builder profile behind the work you explored above.',
  href: 'compound-portfolio.html',
  label: 'Featured Profile',
  category: 'Learning',
}

const showcaseApp = {
  title: 'OmniCosmos V3.0',
  detail:
    'Explore the full Omni Cosmos experience directly from this page, then launch it in a dedicated tab when you want the complete immersive view.',
  href: omniCosmosV3Url,
}

const appDirectoryLinks: Array<Pick<LinkCard, 'title' | 'href'>> = [
  {
    title: 'Indigenous Learning Library',
    href: 'https://aaroncrume-techandtonic.github.io/indigenous-pages/',
  },
  {
    title: 'Modoc History Archive',
    href: 'https://aaroncrume-techandtonic.github.io/Modoc-War/',
  },
  {
    title: 'Klamath Watershed Story Map',
    href: 'https://aaroncrume-techandtonic.github.io/klamath-watershed/',
  },
  {
    title: 'OmniCosmos V3.0',
    href: omniCosmosV3Url,
  },
  {
    title: 'Klamath Language App: Medicine Wheel Edition',
    href: 'https://aaroncrume-techandtonic.github.io/klamath-app-medicine-wheel/',
  },
  {
    title: 'Oracle of the Wheel',
    href: 'https://aaroncrume-techandtonic.github.io/OracleNeumero/',
  },
  {
    title: 'The Basin Beat',
    href: 'https://open.spotify.com/show/3ZAlwYu3kQbb2qYhu84X2Y?si=ebaed426c58a4f70',
  },
  {
    title: 'Romeo Strikes Back',
    href: 'https://open.spotify.com/album/3TcPEUdfLsr5Tt1bHnrfqC?si=EukzfZHBQDa3GKfvqEdMEQ',
  },
  {
    title: 'Creators Portfolio',
    href: 'compound-portfolio.html',
  },
]

const allLinks: LinkCard[] = [...featuredPortfolio, ...easyAccessLinks, creatorsPortfolio]
const uniqueLinks = Array.from(new Map(allLinks.map((item) => [item.href, item])).values())

const categories = ['All', ...Array.from(new Set(uniqueLinks.map((item) => item.category)))]

const renderHeroCards = (items: LinkCard[]): string => {
  return items
    .map((item) => {
      return `
        <article class="link-card highlight-card">
          <p class="card-label">${item.label}</p>
          <h3>${item.title}</h3>
          <p>${item.detail}</p>
          <div class="card-actions">
            <a href="${item.href}" target="_blank" rel="noreferrer" data-track-href="${item.href}">Open Link</a>
            <button type="button" class="copy-btn" data-copy="${item.href}" data-default-label="Copy">Copy</button>
            <button type="button" class="favorite-btn" data-favorite="${item.href}" data-default-label="Favorite">Favorite</button>
          </div>
        </article>
      `
    })
    .join('')
}

const renderAppDirectoryLinks = (): string => {
  return appDirectoryLinks
    .map((item) => `<a href="${item.href}" target="_blank" rel="noreferrer" data-track-href="${item.href}">${item.title}</a>`)
    .join('')
}

const renderDirectoryCards = (items: LinkCard[], favorites: Set<string>, usage: Record<string, number>): string => {
  return items
    .map((item, index) => {
      const isFavorite = favorites.has(item.href)
      const usageCount = usage[item.href] ?? 0
      const usageLabel = usageCount > 0 ? `${usageCount} ${usageCount === 1 ? 'open' : 'opens'}` : 'New'
      return `
        <article class="link-card directory-card" data-card-category="${item.category}" style="--stagger-index: ${index}">
          <div class="directory-head">
            <p class="card-label">${item.category}</p>
            <div class="meta-chips">
              <span class="chip">${item.label}</span>
              <span class="usage-badge" title="Tracked opens">${usageLabel}</span>
            </div>
          </div>
          <h3>${item.title}</h3>
          <p>${item.detail}</p>
          <div class="card-actions">
            <a href="${item.href}" target="_blank" rel="noreferrer" data-track-href="${item.href}">Open</a>
            <button type="button" class="copy-btn" data-copy="${item.href}" data-default-label="Copy Link">Copy Link</button>
            <button type="button" class="favorite-btn${isFavorite ? ' is-active' : ''}" data-favorite="${item.href}" data-default-label="Favorite">${isFavorite ? 'Saved' : 'Favorite'}</button>
          </div>
        </article>
      `
    })
    .join('')
}

const renderCategoryFilters = (): string => {
  return categories
    .map((category, index) => {
      const isActive = index === 0
      return `<button type="button" class="filter-chip${isActive ? ' is-active' : ''}" data-category="${category}">${category}</button>`
    })
    .join('')
}

const year = new Date().getFullYear()

app.innerHTML = `
  <div class="site-bg"></div>
  <div class="site-shell">
    <header class="hero" id="top">
      <p class="eyebrow">Tech and Tonic</p>
      <h1>One vibrant hub. Every link easy to find. Built for desktop and phone.</h1>
      <p class="hero-copy">
        Search, filter, and launch everything from this page. Explore featured experiences, quickly open resources, and copy links in one tap.
      </p>
      <div class="hero-actions">
        <a href="#directory">Browse All Links</a>
        <a href="#showcase">Launch Showcase</a>
      </div>
      <div class="hero-stats" role="list" aria-label="Site highlights">
        <p role="listitem"><strong>${uniqueLinks.length}</strong> Active destinations</p>
        <p role="listitem"><strong>${categories.length - 1}</strong> Link categories</p>
        <p role="listitem"><strong>1 tap</strong> Copy and share links</p>
      </div>
    </header>

    <section class="app-rail" id="quick-access" aria-label="Quick access links">
      <div class="app-rail-head">
        <p class="app-rail-label">Quick Access</p>
        <button type="button" id="quick-access-toggle" class="quick-access-toggle" aria-expanded="true" aria-controls="quick-access-links">
          Toggle
        </button>
      </div>
      <nav id="quick-access-links" class="app-rail-links">
        ${renderAppDirectoryLinks()}
      </nav>
    </section>

    <nav class="jump-nav" aria-label="Section navigation">
      <a href="#top">Top</a>
      <a href="#featured">Featured</a>
      <a href="#directory">Directory</a>
      <a href="#showcase">Showcase</a>
      <a href="#creator">Creator</a>
      <a href="#contact-section">Contact</a>
    </nav>

    <section class="section" id="featured">
      <div class="section-head">
        <p class="eyebrow">Featured Works</p>
        <h2>Start with high-impact links, then move into the full directory.</h2>
      </div>
      <div class="card-grid card-grid-portfolio">
        ${renderHeroCards(featuredPortfolio)}
      </div>
    </section>

    <section class="section section-directory" id="directory">
      <div class="section-head">
        <p class="eyebrow">All Links</p>
        <h2>Find what you need fast with search and filters.</h2>
      </div>

      <div class="directory-tools">
        <label class="search-wrap" for="directory-search">
          <span>Search links</span>
          <input id="directory-search" type="search" placeholder="Search by title, label, or detail..." autocomplete="off" />
        </label>
        <label class="sort-wrap" for="sort-mode">
          <span>Sort</span>
          <select id="sort-mode" class="sort-select">
            <option value="relevance">Relevance</option>
            <option value="title">Title A-Z</option>
            <option value="most-used">Most Used</option>
          </select>
        </label>
        <button type="button" id="favorites-only" class="ghost-btn" aria-pressed="false">Favorites Only</button>
        <button type="button" id="clear-filters" class="ghost-btn">Clear</button>
      </div>

      <section class="favorites-panel" aria-label="Saved favorites">
        <div class="favorites-panel-head">
          <p class="eyebrow">Favorites</p>
          <div class="favorites-panel-actions">
            <p id="favorites-count" class="favorites-count">0 saved</p>
            <button type="button" id="clear-favorites" class="clear-favorites-btn">Clear Favorites</button>
          </div>
        </div>
        <div id="favorites-links" class="favorites-links"></div>
      </section>

      <div id="category-filters" class="category-filters" aria-label="Filter categories">
        ${renderCategoryFilters()}
      </div>

      <p id="results-count" class="results-count"></p>

      <div id="directory-grid" class="card-grid card-grid-directory"></div>
    </section>

    <section class="section section-showcase section-showcase-top" id="showcase">
      <div class="section-head">
        <p class="eyebrow">Showcase App</p>
        <h2>${showcaseApp.title} is embedded for instant preview.</h2>
      </div>
      <p class="showcase-copy">${showcaseApp.detail}</p>
      <div class="showcase-frame-wrap">
        <iframe
          id="omni-showcase-frame"
          class="showcase-frame"
          src="${showcaseApp.href}"
          title="OmniCosmos V3.0 Showcase"
          loading="lazy"
          referrerpolicy="no-referrer"
        ></iframe>
        <div id="omni-showcase-fallback" class="showcase-fallback" hidden>
          <p>Preview is unavailable in this browser right now.</p>
          <a href="${showcaseApp.href}" target="_blank" rel="noreferrer" data-track-href="${showcaseApp.href}">Open OmniCosmos V3.0 in a new tab</a>
        </div>
      </div>
      <div class="showcase-actions">
        <a href="${showcaseApp.href}" target="_blank" rel="noreferrer" data-track-href="${showcaseApp.href}">Launch OmniCosmos V3.0</a>
      </div>
    </section>

    <section class="section" id="creator">
      <div class="section-head">
        <p class="eyebrow">Creators Portfolio</p>
        <h2>Open the full creator profile for project depth and background.</h2>
      </div>
      <div class="card-grid card-grid-single">
        <article class="link-card link-card-large">
          <p class="card-label">${creatorsPortfolio.label}</p>
          <h3>${creatorsPortfolio.title}</h3>
          <p>${creatorsPortfolio.detail}</p>
          <a href="${creatorsPortfolio.href}" target="_blank" rel="noreferrer" data-track-href="${creatorsPortfolio.href}">Open Link</a>
        </article>
      </div>
    </section>

    <section class="section section-contact" id="contact-section">
      <div class="section-head">
        <p class="eyebrow">Open a Conversation</p>
        <h2>When you are ready, start a conversation about collaboration, partnerships, or custom storytelling builds.</h2>
      </div>
      <form id="contact-form" class="contact-form" novalidate>
        <label>
          Name
          <input type="text" name="name" autocomplete="name" required />
        </label>
        <label>
          Email
          <input type="email" name="email" autocomplete="email" required />
        </label>
        <label class="field-wide">
          Message
          <textarea name="message" rows="5" required></textarea>
        </label>
        <button type="submit">Send Message</button>
        <p class="contact-note">Submitting opens your email app with your message prepared and addressed to ${contactEmail}.</p>
      </form>
    </section>

    <footer class="footer" id="contact">
      <p>Tech and Tonic • ${year}</p>
      <a href="https://techandtonic.store/" target="_blank" rel="noreferrer" data-track-href="https://techandtonic.store/">Visit Store</a>
    </footer>
  </div>
`

const contactForm = document.querySelector<HTMLFormElement>('#contact-form')
const showcaseFrame = document.querySelector<HTMLIFrameElement>('#omni-showcase-frame')
const showcaseFallback = document.querySelector<HTMLDivElement>('#omni-showcase-fallback')
const directoryGrid = document.querySelector<HTMLDivElement>('#directory-grid')
const resultsCount = document.querySelector<HTMLParagraphElement>('#results-count')
const searchInput = document.querySelector<HTMLInputElement>('#directory-search')
const sortSelect = document.querySelector<HTMLSelectElement>('#sort-mode')
const categoryFilters = document.querySelector<HTMLDivElement>('#category-filters')
const clearFiltersButton = document.querySelector<HTMLButtonElement>('#clear-filters')
const favoritesOnlyButton = document.querySelector<HTMLButtonElement>('#favorites-only')
const favoritesCount = document.querySelector<HTMLParagraphElement>('#favorites-count')
const clearFavoritesButton = document.querySelector<HTMLButtonElement>('#clear-favorites')
const favoritesLinks = document.querySelector<HTMLDivElement>('#favorites-links')
const quickAccessToggle = document.querySelector<HTMLButtonElement>('#quick-access-toggle')
const quickAccessLinks = document.querySelector<HTMLElement>('#quick-access-links')

let activeCategory = 'All'
let searchTerm = ''
let showFavoritesOnly = false
let sortMode: 'relevance' | 'title' | 'most-used' = 'relevance'

const loadFavorites = (): Set<string> => {
  try {
    const raw = window.localStorage.getItem(favoritesStorageKey)
    if (!raw) return new Set<string>()
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return new Set<string>()
    return new Set(parsed.filter((item): item is string => typeof item === 'string'))
  } catch {
    return new Set<string>()
  }
}

const saveFavorites = (favorites: Set<string>) => {
  window.localStorage.setItem(favoritesStorageKey, JSON.stringify(Array.from(favorites)))
}

const loadUsageCounts = (): Record<string, number> => {
  try {
    const raw = window.localStorage.getItem(usageStorageKey)
    if (!raw) return {}
    const parsed = JSON.parse(raw)
    if (!parsed || typeof parsed !== 'object') return {}

    const result: Record<string, number> = {}
    Object.entries(parsed).forEach(([href, value]) => {
      if (typeof href === 'string' && typeof value === 'number' && Number.isFinite(value) && value > 0) {
        result[href] = Math.floor(value)
      }
    })

    return result
  } catch {
    return {}
  }
}

const saveUsageCounts = (counts: Record<string, number>) => {
  window.localStorage.setItem(usageStorageKey, JSON.stringify(counts))
}

const favorites = loadFavorites()
const usageCounts = loadUsageCounts()

const renderFavoritesPanel = () => {
  if (!favoritesCount || !favoritesLinks) return

  const favoriteItems = uniqueLinks.filter((item) => favorites.has(item.href))
  favoritesCount.textContent = `${favoriteItems.length} saved`
  if (clearFavoritesButton) {
    clearFavoritesButton.disabled = favoriteItems.length === 0
  }

  if (!favoriteItems.length) {
    favoritesLinks.innerHTML = '<p class="favorites-empty">Tap Favorite on any card to pin it here.</p>'
    return
  }

  favoritesLinks.innerHTML = favoriteItems
    .map((item) => {
      return `<a href="${item.href}" target="_blank" rel="noreferrer" data-track-href="${item.href}">${item.title}</a>`
    })
    .join('')
}

const usageCountFor = (href: string): number => usageCounts[href] ?? 0

const incrementUsage = (href: string) => {
  usageCounts[href] = usageCountFor(href) + 1
  saveUsageCounts(usageCounts)
}

const updateDirectory = () => {
  if (!directoryGrid || !resultsCount) return

  const normalizedSearch = searchTerm.toLowerCase().trim()

  const filtered = uniqueLinks.filter((item) => {
    const categoryMatch = activeCategory === 'All' || item.category === activeCategory
    const favoritesMatch = !showFavoritesOnly || favorites.has(item.href)
    const searchMatch =
      !normalizedSearch ||
      item.title.toLowerCase().includes(normalizedSearch) ||
      item.detail.toLowerCase().includes(normalizedSearch) ||
      item.label.toLowerCase().includes(normalizedSearch)

    return categoryMatch && favoritesMatch && searchMatch
  })

  if (sortMode === 'title') {
    filtered.sort((a, b) => a.title.localeCompare(b.title))
  }

  if (sortMode === 'most-used') {
    filtered.sort((a, b) => {
      const byUsage = usageCountFor(b.href) - usageCountFor(a.href)
      return byUsage !== 0 ? byUsage : a.title.localeCompare(b.title)
    })
  }

  if (!filtered.length) {
    directoryGrid.innerHTML = '<article class="link-card empty-card"><h3>No matches yet</h3><p>Try a different search or reset your filters to see all links.</p></article>'
  } else {
    directoryGrid.innerHTML = renderDirectoryCards(filtered, favorites, usageCounts)
  }

  resultsCount.textContent = `${filtered.length} result${filtered.length === 1 ? '' : 's'} shown`
}

if (searchInput) {
  searchInput.addEventListener('input', () => {
    searchTerm = searchInput.value
    updateDirectory()
  })
}

if (sortSelect) {
  sortSelect.addEventListener('change', () => {
    const value = sortSelect.value
    if (value === 'relevance' || value === 'title' || value === 'most-used') {
      sortMode = value
      updateDirectory()
    }
  })
}

if (categoryFilters) {
  categoryFilters.addEventListener('click', (event) => {
    const target = event.target as HTMLElement
    const button = target.closest<HTMLButtonElement>('.filter-chip')

    if (!button) return

    activeCategory = button.dataset.category ?? 'All'

    categoryFilters.querySelectorAll<HTMLButtonElement>('.filter-chip').forEach((chip) => {
      chip.classList.toggle('is-active', chip === button)
    })

    updateDirectory()
  })
}

if (clearFiltersButton && searchInput && categoryFilters) {
  clearFiltersButton.addEventListener('click', () => {
    activeCategory = 'All'
    searchTerm = ''
    showFavoritesOnly = false
    sortMode = 'relevance'
    searchInput.value = ''
    if (sortSelect) {
      sortSelect.value = 'relevance'
    }
    if (favoritesOnlyButton) {
      favoritesOnlyButton.setAttribute('aria-pressed', 'false')
      favoritesOnlyButton.classList.remove('is-active')
    }

    categoryFilters.querySelectorAll<HTMLButtonElement>('.filter-chip').forEach((chip, index) => {
      chip.classList.toggle('is-active', index === 0)
    })

    updateDirectory()
  })
}

if (clearFavoritesButton) {
  clearFavoritesButton.addEventListener('click', () => {
    favorites.clear()
    saveFavorites(favorites)
    renderFavoritesPanel()
    updateDirectory()
  })
}

if (favoritesOnlyButton) {
  favoritesOnlyButton.addEventListener('click', () => {
    showFavoritesOnly = !showFavoritesOnly
    favoritesOnlyButton.setAttribute('aria-pressed', String(showFavoritesOnly))
    favoritesOnlyButton.classList.toggle('is-active', showFavoritesOnly)
    updateDirectory()
  })
}

app.addEventListener('click', async (event) => {
  const target = event.target as HTMLElement
  const copyButton = target.closest<HTMLButtonElement>('.copy-btn')
  const favoriteButton = target.closest<HTMLButtonElement>('.favorite-btn')
  const trackedLink = target.closest<HTMLAnchorElement>('a[data-track-href]')

  if (trackedLink) {
    const href = trackedLink.dataset.trackHref
    if (href) {
      incrementUsage(href)
      if (directoryGrid && directoryGrid.contains(trackedLink)) {
        updateDirectory()
      }
    }
  }

  if (favoriteButton) {
    const link = favoriteButton.dataset.favorite
    if (!link) return

    if (favorites.has(link)) {
      favorites.delete(link)
      favoriteButton.classList.remove('is-active')
      favoriteButton.textContent = 'Favorite'
    } else {
      favorites.add(link)
      favoriteButton.classList.add('is-active')
      favoriteButton.textContent = 'Saved'
    }

    saveFavorites(favorites)
    renderFavoritesPanel()
    updateDirectory()
    return
  }

  if (!copyButton) return

  const link = copyButton.dataset.copy
  if (!link) return

  try {
    await navigator.clipboard.writeText(link)
    copyButton.textContent = 'Copied'
    window.setTimeout(() => {
      copyButton.textContent = copyButton.dataset.defaultLabel ?? 'Copy'
    }, 1200)
  } catch {
    copyButton.textContent = 'Copy failed'
    window.setTimeout(() => {
      copyButton.textContent = copyButton.dataset.defaultLabel ?? 'Copy'
    }, 1200)
  }
})

if (quickAccessToggle && quickAccessLinks) {
  quickAccessToggle.addEventListener('click', () => {
    const isExpanded = quickAccessToggle.getAttribute('aria-expanded') === 'true'
    quickAccessToggle.setAttribute('aria-expanded', String(!isExpanded))
    quickAccessLinks.hidden = isExpanded
  })
}

renderFavoritesPanel()
updateDirectory()

if (showcaseFrame && showcaseFallback) {
  let frameLoaded = false

  const showFallback = () => {
    if (frameLoaded) return
    showcaseFrame.style.display = 'none'
    showcaseFallback.hidden = false
  }

  const failTimer = window.setTimeout(showFallback, 9000)

  showcaseFrame.addEventListener('load', () => {
    frameLoaded = true
    window.clearTimeout(failTimer)
  })

  showcaseFrame.addEventListener('error', () => {
    window.clearTimeout(failTimer)
    showFallback()
  })
}

if (contactForm) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault()

    const formData = new FormData(contactForm)
    const name = String(formData.get('name') ?? '').trim()
    const email = String(formData.get('email') ?? '').trim()
    const message = String(formData.get('message') ?? '').trim()

    if (!name || !email || !message) {
      contactForm.reportValidity()
      return
    }

    const subject = encodeURIComponent(`Website inquiry from ${name}`)
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)
    window.location.href = `mailto:${contactEmail}?subject=${subject}&body=${body}`
  })
}