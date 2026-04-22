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
    title: 'Indigenous Learning Library',
    detail: 'Start here if you want a guided reading space where Indigenous knowledge is organized with care, context, and clear learning pathways.',
    href: 'https://aaroncrume-techandtonic.github.io/indigenous-pages/',
    label: 'Begin Here',
  },
  {
    title: 'Modoc History Archive',
    detail: 'Continue into a historical archive that connects timeline, place, and source material so you can explore the full story with clarity.',
    href: 'https://aaroncrume-techandtonic.github.io/Modoc-War/',
    label: 'Deepen Context',
  },
  {
    title: 'Klamath Watershed Story Map',
    detail: 'Move into an interactive regional map experience where rivers, landscapes, and relationships are presented as one connected system.',
    href: 'https://aaroncrume-techandtonic.github.io/klamath-watershed/',
    label: 'Explore Place',
  },
  {
    title: 'OmniCosmos V3.0',
    detail: 'Finish this path with an interactive cosmic reading experience where you can enter your details and receive a personalized interpretation.',
    href: 'https://aaroncrume-techandtonic.github.io/OmniCosmosV2.1/',
    label: 'Interactive Experience',
  },
]

const easyAccessLinks: LinkCard[] = [
  {
    title: 'Shop Digital Offerings',
    detail: 'Go directly to the main storefront for current releases, digital tools, and learning-centered products.',
    href: 'https://techandtonic.store/',
    label: 'Shop',
  },
  {
    title: 'Free Guide: Hidden Language of Trauma',
    detail: 'Open the free guide and companion materials when you want a focused starting point for reflection, study, and insight.',
    href: 'https://techandtonic.store/shop/583c5bec-b36c-49f4-bc1d-e06eeaf6ce9f?pageViewSource=lib_view',
    label: 'Free Resource',
  },
  {
    title: 'Klamath Language App: Medicine Wheel Edition',
    detail: 'Practice Klamath and Modoc vocabulary with an interactive language tool featuring four-direction color cues and medicine wheel ceremonial styling.',
    href: 'https://aaroncrume-techandtonic.github.io/klamath-app-medicine-wheel/',
    label: 'Language Learning',
  },
  {
    title: 'Oracle of the Wheel',
    detail: 'Step into the numerology pathway if you want another symbolic tool for reflection and interpretation.',
    href: 'https://aaroncrume-techandtonic.github.io/OracleNeumero/',
    label: 'Companion Tool',
  },
  {
    title: 'The Basin Beat',
    detail: 'Listen to the featured show directly on Spotify for long-form audio storytelling and guided listening.',
    href: 'https://open.spotify.com/show/3ZAlwYu3kQbb2qYhu84X2Y?si=ebaed426c58a4f70',
    label: 'Listen',
  },
  {
    title: 'Romeo Strikes Back',
    detail: 'Open the featured album on Spotify when you want a focused music experience connected to this creative work.',
    href: 'https://open.spotify.com/album/3TcPEUdfLsr5Tt1bHnrfqC?si=EukzfZHBQDa3GKfvqEdMEQ',
    label: 'Featured Audio',
  },
  {
    title: 'Legacy Link Hub',
    detail: 'Use this bridge if you arrived from older routes and want to navigate familiar links in one place.',
    href: 'https://beacons.ai/techandtonic',
    label: 'Legacy Access',
  },
  {
    title: 'Featured Product Spotlight',
    detail: 'Go straight to one highlighted offer when you prefer a single focused destination instead of browsing first.',
    href: 'https://techandtonic.store/shop/4440aedc-a40d-45f1-824c-4ca4fe42a3b6',
    label: 'Spotlight',
  },
]

const creatorsPortfolio: LinkCard = {
  title: 'Creators Portfolio',
  detail: 'Get the full background in one place: experience, project constellation, and the builder profile behind the work you explored above.',
  href: 'compound-portfolio.html',
  label: 'Featured Profile',
}

const showcaseApp = {
  title: 'OmniCosmos V3.0',
  detail:
    'Explore the full Omni Cosmos experience directly from this page, then launch it in a dedicated tab when you want the complete immersive view.',
  href: 'https://aaroncrume-techandtonic.github.io/OmniCosmosV2.1/',
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
    href: 'https://aaroncrume-techandtonic.github.io/OmniCosmosV2.1/',
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

const renderAppDirectoryLinks = (): string => {
  return appDirectoryLinks
    .map((item) => `<a href="${item.href}" target="_blank" rel="noreferrer">${item.title}</a>`)
    .join('')
}

const year = new Date().getFullYear()

app.innerHTML = `
  <div class="site-bg"></div>
  <div class="site-shell">
    <section class="app-rail" aria-label="App navigation">
      <p class="app-rail-label">App Navigation</p>
      <nav class="app-rail-links">
        ${renderAppDirectoryLinks()}
      </nav>
    </section>

    <section class="section section-showcase section-showcase-top" id="showcase">
      <div class="section-head">
        <p class="eyebrow">Showcase App</p>
        <h2>${showcaseApp.title} is now featured at the top of techandtonic.tech.</h2>
      </div>
      <p class="showcase-copy">${showcaseApp.detail}</p>
      <div class="showcase-frame-wrap">
        <iframe
          class="showcase-frame"
          src="${showcaseApp.href}"
          title="OmniCosmos V3.0 Showcase"
          loading="lazy"
          referrerpolicy="no-referrer"
        ></iframe>
      </div>
      <div class="showcase-actions">
        <a href="${showcaseApp.href}" target="_blank" rel="noreferrer">Launch OmniCosmos V3.0</a>
      </div>
    </section>

    <header class="hero" id="top">
      <p class="eyebrow">Tech & Tonic</p>
      <h1>Start here, then follow a clear path through story, tools, and next steps.</h1>
      <p class="hero-copy">
        Begin with featured experiences, move into guided resources, and finish with a direct way to connect when you are ready.
      </p>
      <div class="hero-actions">
        <a href="#portfolio">Enter the Works</a>
        <a href="#find">Follow the Paths</a>
      </div>
    </header>

    <nav class="jump-nav" aria-label="Section navigation">
      <a href="#portfolio">Works</a>
      <a href="#showcase">Showcase</a>
      <a href="#find">Paths</a>
      <a href="#creator">Creator</a>
      <a href="#about">Practice</a>
      <a href="#contact-section">Conversation</a>
    </nav>

    <section class="section section-about" id="about">
      <div class="section-head">
        <p class="eyebrow">Story and Practice</p>
        <h2>You are in a space where cultural storytelling, education, and digital craft are designed to work together.</h2>
      </div>
      <p>
        Every section is arranged to guide you from discovery to action with clearer context, better transitions, and fewer dead ends.
      </p>
    </section>

    <section class="section" id="portfolio">
      <div class="section-head">
        <p class="eyebrow">Featured Works</p>
        <h2>Start with the core experiences so you can quickly see what this space offers and where you want to go next.</h2>
      </div>
      <div class="card-grid card-grid-portfolio">
        ${renderCards(featuredPortfolio)}
      </div>
    </section>

    <section class="section" id="find">
      <div class="section-head">
        <p class="eyebrow">Guided Paths</p>
        <h2>After exploring the featured work, use these direct paths to shop, access free resources, and continue your learning journey.</h2>
      </div>
      <div class="card-grid">
        ${renderCards(easyAccessLinks)}
      </div>
    </section>

    <section class="section" id="creator">
      <div class="section-head">
        <p class="eyebrow">Creators Portfolio</p>
        <h2>When you want the full context, open the complete creator profile in one dedicated space.</h2>
      </div>
      <div class="card-grid card-grid-single">
        <article class="link-card link-card-large">
          <p class="card-label">${creatorsPortfolio.label}</p>
          <h3>${creatorsPortfolio.title}</h3>
          <p>${creatorsPortfolio.detail}</p>
          <a href="${creatorsPortfolio.href}" target="_blank" rel="noreferrer">Open Link</a>
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