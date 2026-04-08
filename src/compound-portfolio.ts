import './compound-portfolio.css'

type Role = {
  years: string
  title: string
  company: string
  location: string
  summary: string
  bullets: string[]
}

type Project = {
  name: string
  kind: string
  url: string
  detail: string
}

const app = document.querySelector<HTMLDivElement>('#app')

if (!app) {
  throw new Error('App root not found')
}

const profile = {
  name: 'Aaron Lee Crume',
  location: 'Crescent City, California',
  phone: '(707) 218-1421',
  email: 'aaroncrume@gmail.com',
  statement:
    'Hospitality leader and systems-minded builder with 25+ years of experience spanning service leadership, operations, and computer information systems.',
  highlights: [
    '25+ years in hospitality, team leadership, and guest operations',
    '6 years in casino service environments with compliance-first execution',
    'B.S. in Computer Information Systems with network administration focus',
    'General management experience across restaurant and multi-unit operations',
  ],
}

const careerPath: Role[] = [
  {
    years: '2011 - Present',
    title: 'Bartender / Service Lead',
    company: 'The Harbor View Grotto',
    location: 'Crescent City, CA',
    summary: 'Long-tenure leadership in fine-casual seafood and steak dining with strong guest consistency.',
    bullets: [
      'Managed service bar coverage for full dining room flow.',
      'Maintained high standards in sanitation, pace, and inventory stewardship.',
      'Delivered reliable high-touch service across more than a decade.',
    ],
  },
  {
    years: 'Casino Tenure',
    title: 'Bartender',
    company: 'Premier Regional Casino',
    location: 'Smith River, CA',
    summary: 'High-volume gaming-floor service with strict regulatory adherence and fast transaction handling.',
    bullets: [
      'Executed service under continuous 24/7 floor pacing.',
      'Handled high-volume transactions under alcohol-service constraints.',
      'Built rapport with repeat gaming clientele and regional visitors.',
    ],
  },
  {
    years: '2009 - 2011',
    title: 'General Manager',
    company: 'Melitas Restaurant and Lounge',
    location: 'Chiloquin, OR',
    summary: 'Managed operations across restaurant, lounge, motel, and RV business functions.',
    bullets: [
      'Led hiring, training, and customer-service standards.',
      'Maintained compliance with state and health-code requirements.',
      'Oversaw financial records and reconciliation across units.',
    ],
  },
  {
    years: '2000 - 2008',
    title: 'Bartender / Team Lead',
    company: 'Hollywood Bowl and Moores',
    location: 'Portland and Isleton',
    summary: 'Service leadership in entertainment and lottery-adjacent venues.',
    bullets: [
      'Supervised bar teams and cocktail floor coordination.',
      'Performed lottery income counting and reconciliation tasks.',
      'Coordinated food and service timing during live events.',
    ],
  },
]

const projects: Project[] = [
  {
    name: 'Omni Cosmos V2.1',
    kind: 'Interactive Experience',
    url: 'https://omni-cosmos-v2-1.vercel.app',
    detail: 'Live build for symbolic and interpretive horoscope exploration.',
  },
  {
    name: 'Modoc War Archive',
    kind: 'Historical Storywork',
    url: 'https://aaroncrume-techandtonic.github.io/Modoc-War/',
    detail: 'Public history narrative connecting source documents with place and timeline.',
  },
  {
    name: 'Indigenous Pages',
    kind: 'Knowledge Curation',
    url: 'https://aaroncrume-techandtonic.github.io/indigenous-pages/',
    detail: 'Curated educational pathways rooted in Indigenous-centered framing.',
  },
  {
    name: 'Klamath Watershed',
    kind: 'Environmental Mapping',
    url: 'https://aaroncrume-techandtonic.github.io/klamath-watershed/',
    detail: 'Landscape storytelling through watershed context and regional relationship mapping.',
  },
]

const roleCards = careerPath
  .map((role) => {
    const items = role.bullets.map((bullet) => `<li>${bullet}</li>`).join('')

    return `
      <article class="role-card">
        <p class="role-years">${role.years}</p>
        <h3>${role.title}</h3>
        <p class="role-meta">${role.company} - ${role.location}</p>
        <p class="role-summary">${role.summary}</p>
        <ul>${items}</ul>
      </article>
    `
  })
  .join('')

const projectCards = projects
  .map((project) => {
    return `
      <article class="project-card">
        <p class="project-kind">${project.kind}</p>
        <h3>${project.name}</h3>
        <p>${project.detail}</p>
        <a href="${project.url}" target="_blank" rel="noreferrer">Launch</a>
      </article>
    `
  })
  .join('')

const highlightItems = profile.highlights.map((item) => `<li>${item}</li>`).join('')

app.innerHTML = `
  <div class="portfolio-shell">
    <header class="hero">
      <p class="kicker">Compound Portfolio</p>
      <h1>${profile.name}</h1>
      <p class="intro">${profile.statement}</p>
      <div class="hero-meta">
        <span>${profile.location}</span>
        <a href="mailto:${profile.email}">${profile.email}</a>
        <span>${profile.phone}</span>
      </div>
      <a class="back-link" href="./">Back to techandtonic.tech</a>
    </header>

    <section class="section">
      <div class="section-head">
        <p class="kicker">Core Profile</p>
        <h2>Resume signals gathered into one compound view.</h2>
      </div>
      <ul class="highlights">${highlightItems}</ul>
    </section>

    <section class="section">
      <div class="section-head">
        <p class="kicker">Career Path</p>
        <h2>Leadership, operations, and service progression.</h2>
      </div>
      <div class="role-grid">${roleCards}</div>
    </section>

    <section class="section">
      <div class="section-head">
        <p class="kicker">Project Constellation</p>
        <h2>Selected digital work aligned with the profile.</h2>
      </div>
      <div class="project-grid">${projectCards}</div>
    </section>
  </div>
`
