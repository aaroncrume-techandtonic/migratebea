import"./modulepreload-polyfill-wMinxHhO.js";var e=`hello@techandtonic.tech`,t=`https://aaroncrume-techandtonic.github.io/OmniCosmosV2.1/?v=3.0.4`,n=document.querySelector(`#root`);if(!n)throw Error(`App root not found`);var r=[{title:`Indigenous Learning Library`,detail:`Start here if you want a guided reading space where Indigenous knowledge is organized with care, context, and clear learning pathways.`,href:`https://aaroncrume-techandtonic.github.io/indigenous-pages/`,label:`Begin Here`},{title:`Modoc History Archive`,detail:`Continue into a historical archive that connects timeline, place, and source material so you can explore the full story with clarity.`,href:`https://aaroncrume-techandtonic.github.io/Modoc-War/`,label:`Deepen Context`},{title:`Klamath Watershed Story Map`,detail:`Move into an interactive regional map experience where rivers, landscapes, and relationships are presented as one connected system.`,href:`https://aaroncrume-techandtonic.github.io/klamath-watershed/`,label:`Explore Place`},{title:`OmniCosmos V3.0`,detail:`Finish this path with an interactive cosmic reading experience where you can enter your details and receive a personalized interpretation.`,href:t,label:`Interactive Experience`}],i=[{title:`Shop Digital Offerings`,detail:`Go directly to the main storefront for current releases, digital tools, and learning-centered products.`,href:`https://techandtonic.store/`,label:`Shop`},{title:`Free Guide: Hidden Language of Trauma`,detail:`Open the free guide and companion materials when you want a focused starting point for reflection, study, and insight.`,href:`https://techandtonic.store/shop/583c5bec-b36c-49f4-bc1d-e06eeaf6ce9f?pageViewSource=lib_view`,label:`Free Resource`},{title:`Klamath Language App: Medicine Wheel Edition`,detail:`Practice Klamath and Modoc vocabulary with an interactive language tool featuring four-direction color cues and medicine wheel ceremonial styling.`,href:`https://aaroncrume-techandtonic.github.io/klamath-app-medicine-wheel/`,label:`Language Learning`},{title:`Oracle of the Wheel`,detail:`Step into the numerology pathway if you want another symbolic tool for reflection and interpretation.`,href:`https://aaroncrume-techandtonic.github.io/OracleNeumero/`,label:`Companion Tool`},{title:`The Basin Beat`,detail:`Listen to the featured show directly on Spotify for long-form audio storytelling and guided listening.`,href:`https://open.spotify.com/show/3ZAlwYu3kQbb2qYhu84X2Y?si=ebaed426c58a4f70`,label:`Listen`},{title:`Romeo Strikes Back`,detail:`Open the featured album on Spotify when you want a focused music experience connected to this creative work.`,href:`https://open.spotify.com/album/3TcPEUdfLsr5Tt1bHnrfqC?si=EukzfZHBQDa3GKfvqEdMEQ`,label:`Featured Audio`},{title:`Legacy Link Hub`,detail:`Use this bridge if you arrived from older routes and want to navigate familiar links in one place.`,href:`https://beacons.ai/techandtonic`,label:`Legacy Access`},{title:`Featured Product Spotlight`,detail:`Go straight to one highlighted offer when you prefer a single focused destination instead of browsing first.`,href:`https://techandtonic.store/shop/4440aedc-a40d-45f1-824c-4ca4fe42a3b6`,label:`Spotlight`}],a={title:`Creators Portfolio`,detail:`Get the full background in one place: experience, project constellation, and the builder profile behind the work you explored above.`,href:`compound-portfolio.html`,label:`Featured Profile`},o={title:`OmniCosmos V3.0`,detail:`Explore the full Omni Cosmos experience directly from this page, then launch it in a dedicated tab when you want the complete immersive view.`,href:t},s=[{title:`Indigenous Learning Library`,href:`https://aaroncrume-techandtonic.github.io/indigenous-pages/`},{title:`Modoc History Archive`,href:`https://aaroncrume-techandtonic.github.io/Modoc-War/`},{title:`Klamath Watershed Story Map`,href:`https://aaroncrume-techandtonic.github.io/klamath-watershed/`},{title:`OmniCosmos V3.0`,href:t},{title:`Klamath Language App: Medicine Wheel Edition`,href:`https://aaroncrume-techandtonic.github.io/klamath-app-medicine-wheel/`},{title:`Oracle of the Wheel`,href:`https://aaroncrume-techandtonic.github.io/OracleNeumero/`},{title:`The Basin Beat`,href:`https://open.spotify.com/show/3ZAlwYu3kQbb2qYhu84X2Y?si=ebaed426c58a4f70`},{title:`Romeo Strikes Back`,href:`https://open.spotify.com/album/3TcPEUdfLsr5Tt1bHnrfqC?si=EukzfZHBQDa3GKfvqEdMEQ`},{title:`Creators Portfolio`,href:`compound-portfolio.html`}],c=e=>e.map(e=>`
        <article class="link-card">
          <p class="card-label">${e.label}</p>
          <h3>${e.title}</h3>
          <p>${e.detail}</p>
          <a href="${e.href}" target="_blank" rel="noreferrer">Open Link</a>
        </article>
      `).join(``),l=()=>s.map(e=>`<a href="${e.href}" target="_blank" rel="noreferrer">${e.title}</a>`).join(``),u=new Date().getFullYear();n.innerHTML=`
  <div class="site-bg"></div>
  <div class="site-shell">
    <section class="app-rail" aria-label="App navigation">
      <p class="app-rail-label">App Navigation</p>
      <nav class="app-rail-links">
        ${l()}
      </nav>
    </section>

    <section class="section section-showcase section-showcase-top" id="showcase">
      <div class="section-head">
        <p class="eyebrow">Showcase App</p>
        <h2>${o.title} is now featured at the top of techandtonic.tech.</h2>
      </div>
      <p class="showcase-copy">${o.detail}</p>
      <div class="showcase-frame-wrap">
        <iframe
          id="omni-showcase-frame"
          class="showcase-frame"
          src="${o.href}"
          title="OmniCosmos V3.0 Showcase"
          loading="lazy"
          referrerpolicy="no-referrer"
        ></iframe>
        <div id="omni-showcase-fallback" class="showcase-fallback" hidden>
          <p>Preview is unavailable in this browser right now.</p>
          <a href="${o.href}" target="_blank" rel="noreferrer">Open OmniCosmos V3.0 in a new tab</a>
        </div>
      </div>
      <div class="showcase-actions">
        <a href="${o.href}" target="_blank" rel="noreferrer">Launch OmniCosmos V3.0</a>
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
        ${c(r)}
      </div>
    </section>

    <section class="section" id="find">
      <div class="section-head">
        <p class="eyebrow">Guided Paths</p>
        <h2>After exploring the featured work, use these direct paths to shop, access free resources, and continue your learning journey.</h2>
      </div>
      <div class="card-grid">
        ${c(i)}
      </div>
    </section>

    <section class="section" id="creator">
      <div class="section-head">
        <p class="eyebrow">Creators Portfolio</p>
        <h2>When you want the full context, open the complete creator profile in one dedicated space.</h2>
      </div>
      <div class="card-grid card-grid-single">
        <article class="link-card link-card-large">
          <p class="card-label">${a.label}</p>
          <h3>${a.title}</h3>
          <p>${a.detail}</p>
          <a href="${a.href}" target="_blank" rel="noreferrer">Open Link</a>
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
        <p class="contact-note">Submitting opens your email app with your message prepared and addressed to ${e}.</p>
      </form>
    </section>

    <footer class="footer" id="contact">
      <p>Tech and Tonic • ${u}</p>
      <a href="https://techandtonic.store/" target="_blank" rel="noreferrer">Visit Store</a>
    </footer>
  </div>
`;var d=document.querySelector(`#contact-form`),f=document.querySelector(`#omni-showcase-frame`),p=document.querySelector(`#omni-showcase-fallback`);if(f&&p){let e=!1,t=()=>{e||(f.style.display=`none`,p.hidden=!1)},n=window.setTimeout(t,9e3);f.addEventListener(`load`,()=>{e=!0,window.clearTimeout(n)}),f.addEventListener(`error`,()=>{window.clearTimeout(n),t()})}d&&d.addEventListener(`submit`,t=>{t.preventDefault();let n=new FormData(d),r=String(n.get(`name`)??``).trim(),i=String(n.get(`email`)??``).trim(),a=String(n.get(`message`)??``).trim();if(!r||!i||!a){d.reportValidity();return}let o=encodeURIComponent(`Website inquiry from ${r}`),s=encodeURIComponent(`Name: ${r}\nEmail: ${i}\n\nMessage:\n${a}`);window.location.href=`mailto:${e}?subject=${o}&body=${s}`});