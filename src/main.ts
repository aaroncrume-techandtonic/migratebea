import './style.css'

type LinkCard = {
  title: string
  detail: string
  href: string
  label: string
}

const contactEmail = 'hello@techandtonic.tech'

const app = document.querySelector<HTMLDivElement>('#app')

if (!app) {
  throw new Error('App root not found')
}

const featuredPortfolio: LinkCard[] = [
  {
    title: 'Indigenous Pages',
    detail: 'A living reading room where ancestral knowledge is gathered with care, context, and reverence for the path of learning.',
    href: 'https://aaroncrume-techandtonic.github.io/indigenous-pages/',
    label: 'Field Notes',
  },
  {
    title: 'Modoc War Archive',
    detail: 'A public history archive that braids timeline, place, and memory into a story carried forward through source and witness.',
    href: 'https://aaroncrume-techandtonic.github.io/Modoc-War/',
    label: 'Archive Work',
  },
  {
    title: 'Klamath Watershed',
    detail: 'A watershed narrative where rivers, regions, and relationships are mapped as one connected body of place.',
    href: 'https://aaroncrume-techandtonic.github.io/klamath-watershed/',
    label: 'Place Study',
  },
  {
    title: 'Omni Cosmos Horoscope',
    detail: 'An interactive sky-path of symbols and interpretation, inviting each visitor into a personalized cosmic reading.',
    href: 'https://omni-cosmos.vercel.app',
    label: 'Studio Piece',
  },
]

const easyAccessLinks: LinkCard[] = [
  {
    title: 'Main Storefront',
    detail: 'The main doorway to current releases, learning tools, and digital offerings.',
    href: 'https://techandtonic.store/',
    label: 'Main Doorway',
  },
  {
    title: 'The Hidden Language of Trauma',
    detail: 'Direct access to the free resource and companion material for reflection, study, and healing insight.',
    href: 'https://techandtonic.store/shop/583c5bec-b36c-49f4-bc1d-e06eeaf6ce9f?pageViewSource=lib_view',
    label: 'Open Resource',
  },
  {
    title: 'Compound Portfolio App',
    detail: 'A unified portfolio narrative built from resume foundations, project highlights, and role history.',
    href: 'compound-portfolio.html',
    label: 'Profile Atlas',
  },
  {
    title: 'Oracle Neumero',
    detail: 'Enter the numerology experience and follow its symbolic pathways toward meaning.',
    href: 'https://aaroncrume-techandtonic.github.io/OracleNeumero/',
    label: 'Companion Work',
  },
  {
    title: 'Beacons Legacy Links',
    detail: 'A bridge for visitors still arriving through earlier pathways and familiar waypoints.',
    href: 'https://beacons.ai/techandtonic',
    label: 'Legacy Route',
  },
  {
    title: 'Featured Product Page',
    detail: 'A focused path to one highlighted offering when you want to begin with a single destination.',
    href: 'https://techandtonic.store/shop/4440aedc-a40d-45f1-824c-4ca4fe42a3b6',
    label: 'Current Feature',
  },
]

const renderCards = (items: LinkCard[]): string => {
  return items
    .map((item) => {
      return `
        <article class="link-card">
          <p class="card-label">${item.label}</p>
          <h3>${item.title}</h3>
          <p>${item.detail}</p>
          <a href="${item.href}" target="_blank" rel="noreferrer">Open Link</a>
        </article>
      `
    })
    .join('')
}

const year = new Date().getFullYear()

app.innerHTML = `
  <div class="site-bg"></div>
  <div class="site-shell">
    <header class="hero" id="top">
      <p class="eyebrow">Tech & Tonic</p>
      <h1>You are entering a ceremonial digital home for story, craft, and community knowledge.</h1>
      <p class="hero-copy">
        You can follow a clear path through the work, offerings, and resources, then move directly into conversation.
      </p>
      <div class="hero-actions">
        <a href="#portfolio">Enter the Works</a>
        <a href="#find">Follow the Paths</a>
      </div>
    </header>

    <nav class="jump-nav" aria-label="Section navigation">
      <a href="#portfolio">Works</a>
      <a href="#find">Paths</a>
      <a href="#about">Practice</a>
      <a href="#contact-section">Conversation</a>
    </nav>

    <section class="section" id="portfolio">
      <div class="section-head">
        <p class="eyebrow">Featured Works</p>
        <h2>You meet the heart of the work first, so you can orient quickly and choose your next step.</h2>
      </div>
      <div class="card-grid card-grid-portfolio">
        ${renderCards(featuredPortfolio)}
      </div>
    </section>

    <section class="section" id="find">
      <div class="section-head">
        <p class="eyebrow">Guided Paths</p>
        <h2>You can move through clear paths to offerings, free resources, and the technical roots behind the work.</h2>
      </div>
      <div class="card-grid">
        ${renderCards(easyAccessLinks)}
      </div>
    </section>

    <section class="section section-about" id="about">
      <div class="section-head">
        <p class="eyebrow">Story and Practice</p>
        <h2>You are stepping into a shared space where cultural storytelling, education, and digital craft come together.</h2>
      </div>
      <p>
        This experience is structured to help you move from discovery to action with fewer dead ends, stronger context,
        and clearer routes at every step.
      </p>
    </section>

    <section class="section section-contact" id="contact-section">
      <div class="section-head">
        <p class="eyebrow">Open a Conversation</p>
        <h2>You can start a conversation here about collaboration, partnerships, or custom storytelling builds.</h2>
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
      <a href="https://techandtonic.store/" target="_blank" rel="noreferrer">Visit Store</a>
    </footer>
  </div>
`

const contactForm = document.querySelector<HTMLFormElement>('#contact-form')

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