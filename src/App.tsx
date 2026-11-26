import { type FormEvent, type MouseEvent as ReactMouseEvent, useEffect, useRef, useState } from 'react'
import PortfolioChat from './PortfolioChat'
import { experience, projects } from './portfolio-data'

type WeatherReading = {
  temperature: number
  description: string
  atmosphere: WeatherAtmosphere
}

type WeatherAtmosphere = 'clear' | 'cloudy' | 'fog' | 'rain' | 'snow' | 'storm'

const Arrow = ({ diagonal = false }: { diagonal?: boolean }) => <span aria-hidden="true">{diagonal ? '↗' : '→'}</span>

function CharacterText({ text, startDelay = 0, staggerMs = 36 }: { text: string; startDelay?: number; staggerMs?: number }) {
  return (
    <span className="character-text" aria-hidden="true">
      {Array.from(text).map((character, index) => (
        <span
          className="character-text__letter"
          key={`${index}-${character}`}
          style={{ animationDelay: `${startDelay + index * staggerMs}ms` }}
        >
          {character === ' ' ? '\u00a0' : character}
        </span>
      ))}
    </span>
  )
}

const weatherAtmosphere = (description: string, precipitation: number): WeatherAtmosphere => {
  const condition = description.toLowerCase()
  if (condition.includes('thunder') || condition.includes('storm')) return precipitation > 0.1 ? 'storm' : 'cloudy'
  if (condition.includes('rain') || condition.includes('drizzle')) return precipitation > 0.1 ? 'rain' : 'cloudy'
  if (condition.includes('snow') || condition.includes('sleet')) return 'snow'
  if (condition.includes('fog') || condition.includes('mist')) return 'fog'
  if (condition.includes('sun') || condition.includes('clear')) return 'clear'
  return 'cloudy'
}

function WeatherIcon({ atmosphere }: { atmosphere: WeatherAtmosphere }) {
  if (atmosphere === 'clear') {
    return (
      <svg className="hero__weather-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
        <circle cx="12" cy="12" r="3.5" />
        <path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42" />
      </svg>
    )
  }

  if (atmosphere === 'rain' || atmosphere === 'storm') {
    return (
      <svg className="hero__weather-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M6 15.5h12a3.5 3.5 0 0 0 .2-7A5.5 5.5 0 0 0 7.7 7a4.3 4.3 0 0 0-1.7 8.5Z" />
        <path d="m8 18-.6 1.5m4.6-1.5-.6 1.5m4.6-1.5-.6 1.5" />
      </svg>
    )
  }

  return (
    <svg className="hero__weather-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5.5 16h12a3.5 3.5 0 0 0 .2-7A5.5 5.5 0 0 0 7.2 7.5 4.3 4.3 0 0 0 5.5 16Z" />
    </svg>
  )
}

function KigaliClock() {
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    const interval = window.setInterval(() => setNow(new Date()), 1000)
    return () => window.clearInterval(interval)
  }, [])

  const time = now.toLocaleTimeString('en-GB', {
    timeZone: 'Africa/Kigali',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  })

  return <time dateTime={time}>{time}</time>
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [loadProgress, setLoadProgress] = useState(0)
  const [weather, setWeather] = useState<WeatherReading | null>(null)
  const [weatherUnavailable, setWeatherUnavailable] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [cursorLabel, setCursorLabel] = useState('')
  const [activeProject, setActiveProject] = useState<number | null>(null)
  const [formNote, setFormNote] = useState('')
  const cursorRef = useRef<HTMLDivElement>(null)
  const heroPortraitRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const started = Date.now()
    const counter = window.setInterval(() => {
      const elapsed = Date.now() - started
      setLoadProgress(Math.min(100, Math.round((elapsed / 950) * 100)))
    }, 24)
    const timer = window.setTimeout(() => {
      setLoadProgress(100)
      setLoading(false)
      window.clearInterval(counter)
    }, 1100)
    const move = (e: MouseEvent) => {
      if (cursorRef.current) cursorRef.current.style.transform = `translate3d(${e.clientX}px,${e.clientY}px,0)`
    }
    const parallax = () => {
      if (heroPortraitRef.current) heroPortraitRef.current.style.setProperty('--parallax-y', `${Math.min(window.scrollY * .055, 54)}px`)
    }
    const observer = new IntersectionObserver(entries => entries.forEach(entry => entry.isIntersecting && entry.target.classList.add('is-visible')), { threshold: .12 })
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el))
    const sectionObserver = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) setActiveSection(entry.target.id)
    }), { rootMargin: '-35% 0px -55%', threshold: 0 })
    document.querySelectorAll('section[id]').forEach(el => sectionObserver.observe(el))
    window.addEventListener('mousemove', move)
    window.addEventListener('scroll', parallax, { passive: true })
    return () => {
      clearTimeout(timer); clearInterval(counter); window.removeEventListener('mousemove', move); window.removeEventListener('scroll', parallax)
      observer.disconnect(); sectionObserver.disconnect()
    }
  }, [])

  useEffect(() => {
    const controller = new AbortController()
    let retryTimer: number | undefined
    const loadWeather = async () => {
      try {
        const response = await fetch('https://wttr.in/Kigali?format=j1&lang=en', { signal: controller.signal, cache: 'no-store' })
        if (!response.ok) throw new Error(`Weather request failed: ${response.status}`)
        const data = await response.json() as {
          current_condition?: Array<{
            temp_C?: unknown
            precipMM?: unknown
            weatherDesc?: Array<{ value?: unknown }>
          }>
        }
        const current = data.current_condition?.[0]
        const temperature = typeof current?.temp_C === 'string' ? Number(current.temp_C) : current?.temp_C
        const precipitation = typeof current?.precipMM === 'string' ? Number(current.precipMM) : current?.precipMM
        const description = current?.weatherDesc?.[0]?.value
        if (
          typeof temperature !== 'number' || !Number.isFinite(temperature) ||
          typeof precipitation !== 'number' || !Number.isFinite(precipitation) ||
          typeof description !== 'string'
        ) {
          throw new Error('Weather response did not contain current conditions')
        }
        setWeather({ temperature, description, atmosphere: weatherAtmosphere(description, precipitation) })
        setWeatherUnavailable(false)
        if (retryTimer !== undefined) window.clearTimeout(retryTimer)
      } catch (error) {
        if (error instanceof Error && error.name === 'AbortError') return
        setWeather(null)
        setWeatherUnavailable(true)
        retryTimer = window.setTimeout(() => {
          retryTimer = undefined
          void loadWeather()
        }, 30_000)
      }
    }

    void loadWeather()
    const refreshOnReturn = () => {
      if (document.visibilityState === 'visible') void loadWeather()
    }
    document.addEventListener('visibilitychange', refreshOnReturn)
    const refresh = window.setInterval(() => void loadWeather(), 60 * 1000)
    return () => {
      controller.abort()
      window.clearInterval(refresh)
      document.removeEventListener('visibilitychange', refreshOnReturn)
      if (retryTimer !== undefined) window.clearTimeout(retryTimer)
    }
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen || activeProject !== null ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen, activeProject])

  const navigate = (id: string) => {
    setMenuOpen(false)
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  const submitContact = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const name = String(data.get('name') || '')
    const email = String(data.get('email') || '')
    const message = String(data.get('message') || '')
    setFormNote('Opening your email app…')
    window.location.href = `mailto:hello@dismas.design?subject=${encodeURIComponent(`Portfolio enquiry from ${name}`)}&body=${encodeURIComponent(`${message}\n\nFrom: ${name}\nEmail: ${email}`)}`
  }

  const openProject = (index: number) => {
    setActiveProject(index)
    window.history.replaceState(null, '', `#project-${projects[index].code.toLowerCase()}`)
  }
  const closeProject = () => {
    setActiveProject(null)
    window.history.replaceState(null, '', window.location.pathname)
  }

  const magneticMove = (e: ReactMouseEvent<HTMLElement>) => {
    if (window.matchMedia('(pointer: coarse)').matches) return
    const rect = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - rect.left - rect.width / 2) * .16
    const y = (e.clientY - rect.top - rect.height / 2) * .16
    e.currentTarget.style.transform = `translate3d(${x}px,${y}px,0)`
  }

  const magneticReset = (e: ReactMouseEvent<HTMLElement>) => {
    e.currentTarget.style.transform = ''
  }

  return (
    <main>
      <div ref={cursorRef} className={`cursor ${cursorLabel ? 'cursor--active' : ''}`} aria-hidden="true"><span>{cursorLabel}</span></div>
      <div className={`loader ${loading ? '' : 'loader--done'}`} aria-hidden={!loading}>
        <div className="loader__top"><span>Independent creative practice</span><span>Kigali / RW</span></div>
        <div className="loader__brand">DISMAS<sup>®</sup></div>
        <div className="loader__progress"><span>{loadProgress.toString().padStart(3, '0')}</span><small>%</small></div>
        <div className="loader__line"><i style={{ width: `${loadProgress}%` }} /></div>
      </div>

      <header className="nav">
        <a className="wordmark" href="#home" aria-label="DISMAS home">DISMAS<sup>®</sup></a>
        <nav className="desktop-nav" aria-label="Primary navigation">
          <button className={activeSection === 'work' ? 'is-active' : ''} onClick={() => navigate('#work')}>Work</button>
          <button className={activeSection === 'about' ? 'is-active' : ''} onClick={() => navigate('#about')}>About</button>
          <button className={activeSection === 'capabilities' ? 'is-active' : ''} onClick={() => navigate('#capabilities')}>Capabilities</button>
        </nav>
        <div className="nav__right">
          <a className="availability" href="#contact"><i /> Available for select projects</a>
          <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-label="Toggle menu"><span>{menuOpen ? 'Close' : 'Menu'}</span><b>{menuOpen ? '×' : '+'}</b></button>
        </div>
      </header>

      <div className={`mobile-menu ${menuOpen ? 'is-open' : ''}`} aria-hidden={!menuOpen}>
        <div className="mobile-menu__links">
          {['Home', 'Work', 'About', 'Capabilities', 'Contact'].map((item, index) => (
            <button key={item} onClick={() => navigate(`#${item.toLowerCase()}`)}><small>0{index + 1}</small>{item}<Arrow diagonal /></button>
          ))}
        </div>
        <p>Kigali, Rwanda<br />Multidisciplinary Designer & Developer</p>
      </div>

      <section
        className={`hero ${!loading ? 'hero--ready' : ''}`}
        id="home"
        data-weather={weather?.atmosphere}
      >
        {weather?.atmosphere === 'rain' && (
          <div className="hero__rain" aria-hidden="true">
            {Array.from({ length: 24 }, (_, index) => (
              <i
                key={index}
                style={{
                  left: `${(index * 41 + 8) % 97}%`,
                  animationDelay: `-${(index * 1.15 / 24).toFixed(2)}s`,
                }}
              />
            ))}
          </div>
        )}
        <div className="hero__eyebrow reveal">
          <span>Independent creative practice</span>
          <div className="hero__context" aria-label="Kigali local time and weather">
            <div className="hero__context-item">
              <span className="hero__context-label">Kigali local time</span>
              <KigaliClock />
            </div>
            <div className="hero__context-item" aria-live="polite">
              <span className="hero__context-label">Current weather</span>
              <span className="hero__weather-reading">
                {weather && <WeatherIcon atmosphere={weather.atmosphere} />}
                <span>
                  {weather
                    ? `${weather.description} · ${Math.round(weather.temperature)}°C`
                    : weatherUnavailable ? 'Weather unavailable' : 'Loading weather…'}
                </span>
              </span>
            </div>
          </div>
        </div>
        <h1 className="hero__headline" aria-label="I design things that make ideas real.">
          <span className="headline-line"><span className="hero-word"><CharacterText text="I" staggerMs={48} /></span><span className="hero-word"><CharacterText text="DESIGN" startDelay={48} staggerMs={48} /></span><em className="cross" aria-hidden="true">+</em></span>
          <span className="headline-line headline-line--offset"><span className="hero-word"><CharacterText text="THINGS" startDelay={336} staggerMs={48} /></span><span className="hero-word"><CharacterText text="THAT" startDelay={624} staggerMs={48} /></span></span>
          <span className="headline-line"><span className="hero-word"><CharacterText text="MAKE" startDelay={816} staggerMs={48} /></span><span className="hero-word"><CharacterText text="IDEAS" startDelay={1008} staggerMs={48} /></span></span>
          <span className="headline-line"><i className="hero-word"><CharacterText text="REAL." startDelay={1248} staggerMs={48} /></i></span>
        </h1>
        <div ref={heroPortraitRef} className="hero__portrait">
          <div className="hero__portrait-frame">
            <img src="/assets/dismas-portrait.png" alt="Portrait of Mutambiyineza Dismas" />
            <span className="portrait-replace">Mutambiyineza Dismas</span>
          </div>
          <div className="portrait-mark" aria-hidden="true">D®</div>
        </div>
        <div className="hero__bottom hero-sequence">
          <p>Graphic Designer. Product Designer.<br />Front-End Developer.</p>
          <p className="hero__statement">I turn ideas into identities, experiences, and digital products.</p>
          <div className="hero__actions"><button className="circle-link magnetic" onMouseMove={magneticMove} onMouseLeave={magneticReset} onClick={() => navigate('#work')}><Arrow /></button><span>Explore selected work</span></div>
        </div>
        <div className="scroll-note">Scroll to discover</div>
      </section>

      <section className="manifesto section-pad reveal">
        <div className="section-index">[ 001 — POSITIONING ]</div>
        <p aria-label="One creative mind. Multiple disciplines. Meaningful experiences.">
          <CharacterText text="One creative mind." />
          {' '}<span><CharacterText text="Multiple disciplines." startDelay={360} /></span>
          <br /><CharacterText text="Meaningful experiences." startDelay={980} />
        </p>
        <div className="manifesto__sub">Combining visual communication, product thinking, and front-end development to create purposeful digital experiences.</div>
      </section>

      <section className="work section-pad" id="work">
        <div className="section-heading reveal">
          <div><span className="section-index">[ 002 — SELECTED WORK ]</span><h2 aria-label="Made with intention."><CharacterText text="Made with" /><br /><i><CharacterText text="intention." startDelay={300} /></i></h2></div>
          <p>A selection of identity, product, and digital work. Each project starts with a question and ends with a system.</p>
        </div>
        <div className="project-grid">
          {projects.map((project, index) => (
            <article className={`project project--${index + 1} reveal`} key={project.title}>
              <button className="project__visual" onMouseEnter={() => setCursorLabel('VIEW PROJECT')} onMouseLeave={() => setCursorLabel('')} onClick={() => openProject(index)} aria-label={`View ${project.title} case study`}>
                <div className={`project-art project-art--${project.accent}`}>
                  {index === 0 && <div className="ui-window"><span /><strong>Drive better.</strong><b>Find your next move</b></div>}
                  {index === 1 && <><span className="giant-letter">P</span><span className="pinn-label">CREATE / LEARN / GROW</span></>}
                  {index === 2 && <><div className="sun" /><span className="journey-type">desire<br />journeys</span></>}
                  {index === 3 && <><div className="edge-mark">I/E</div><span className="edge-copy">FORM / MATERIAL / EDGE</span></>}
                  {index === 4 && <><div className="arch" /><span className="ambrose-type">ST AMBROSE</span></>}
                  {index === 5 && <><span className="poster-type">MAKE<br />NOISE</span><div className="poster-dot" /></>}
                  <span className="project__view">View case <Arrow diagonal /></span>
                </div>
              </button>
              <div className="project__meta">
                <div><span>0{index + 1}</span><h3>{project.title}</h3></div><div><p>{project.category}</p><p>{project.year}</p></div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="about section-pad" id="about">
        <div className="about__title reveal"><span className="section-index">[ 003 — ABOUT ]</span><h2 aria-label="More than just design."><CharacterText text="MORE THAN" /><br /><CharacterText text="JUST" startDelay={300} />{' '}<i><CharacterText text="DESIGN." startDelay={430} /></i></h2></div>
        <div className="about__grid">
          <div className="portrait reveal">
            <div className="portrait__image"><img src="/assets/dismas-portrait.png" alt="Mutambiyineza Dismas" /></div>
            <span>Mutambiyineza Dismas / Portrait</span>
          </div>
          <div className="about__copy reveal">
            <p className="lead">I’m Mutambiyineza Dismas, a multidisciplinary designer and developer based in Kigali.</p>
            <p>I work where visual culture, product thinking, and technology meet. My approach connects the clarity of strategy with the emotion of identity—and carries both into the final interface.</p>
            <p>I believe good creative work should not only look distinctive. It should make an idea easier to understand, use, and remember.</p>
            <a className="text-link" href="mailto:hello@dismas.design?subject=CV%20request">Request CV <Arrow diagonal /></a>
          </div>
          <blockquote className="reveal">“Think clearly.<br /><i>Make boldly.</i>”</blockquote>
        </div>
      </section>

      <section className="capabilities section-pad" id="capabilities">
        <div className="capabilities__intro reveal"><span className="section-index">[ 004 — CAPABILITIES ]</span><p aria-label="Strategy to pixels. Pixels to product."><CharacterText text="Strategy to pixels." /><br /><CharacterText text="Pixels to product." startDelay={450} /></p></div>
        <div className="discipline-list">
          {[
            ['GRAPHIC DESIGN', 'Visual identities, branding, art direction, editorial design, and visual communication.', 'IDENTITY / TYPE / IMAGE'],
            ['PRODUCT DESIGN', 'User research, UI/UX, wireframes, prototyping, design systems, and digital experiences.', 'RESEARCH / SYSTEMS / UI'],
            ['FRONT-END DEVELOPMENT', 'Responsive interfaces, interactive components, and translating designs into functional digital products.', 'REACT / INTERACTION / CODE'],
          ].map((item, index) => <article className="discipline reveal" key={item[0]}><span>0{index + 1}</span><h3 aria-label={item[0]}><CharacterText text={item[0]} /></h3><p>{item[1]}</p><small>{item[2]}</small><i><Arrow diagonal /></i></article>)}
        </div>
      </section>

      <section className="experience section-pad" id="experience">
        <div className="experience__title reveal"><span className="section-index">[ 005 — EXPERIENCE ]</span><h2 aria-label="Practice, in progress."><CharacterText text="Practice," /><br /><i><CharacterText text="in progress." startDelay={330} /></i></h2></div>
        <div className="timeline reveal">{experience.map((item, index) => <div className="timeline__row" key={item[0]}><span>0{index + 1}</span><h3>{item[0]}</h3><p>{item[1]}</p><time>{item[2]}</time></div>)}</div>
      </section>

      <section className="contact" id="contact">
        <div className="contact__orb" aria-hidden="true" />
        <div className="contact__top reveal"><span className="section-index">[ 006 — START A CONVERSATION ]</span><span>Kigali / Rwanda<br />GMT +2</span></div>
        <h2 className="reveal" aria-label="Let’s create something worth remembering."><CharacterText text="LET’S CREATE" /><br /><CharacterText text="SOMETHING WORTH" startDelay={380} /><br /><i><CharacterText text="REMEMBERING." startDelay={850} /></i></h2>
        <div className="contact__grid">
          <div className="contact__aside reveal">
            <p>Have a project, an idea, or a good question? Tell me what you’re making.</p>
            <a href="mailto:hello@dismas.design">hello@dismas.design <Arrow diagonal /></a>
            <div className="socials"><a href="https://linkedin.com" target="_blank" rel="noreferrer">LinkedIn <Arrow diagonal /></a><a href="https://behance.net" target="_blank" rel="noreferrer">Behance <Arrow diagonal /></a></div>
          </div>
          <form className="contact-form reveal" onSubmit={submitContact}>
            <label><span>01 / Your name</span><input required name="name" placeholder="What should I call you?" /></label>
            <label><span>02 / Your email</span><input required type="email" name="email" placeholder="Where can I reach you?" /></label>
            <label><span>03 / Tell me about it</span><textarea required name="message" placeholder="Project, timeline, ambition…" rows={3} /></label>
            <button className="submit magnetic" onMouseMove={magneticMove} onMouseLeave={magneticReset} type="submit"><span>Send enquiry</span><Arrow diagonal /></button><output>{formNote}</output>
          </form>
        </div>
        <footer><a className="wordmark" href="#home">DISMAS<sup>®</sup></a><span>© 2025 — Crafted with intent</span><a href="#home">Back to top ↑</a></footer>
      </section>

      {activeProject !== null && (
        <div className="case-study" role="dialog" aria-modal="true" aria-label={`${projects[activeProject].title} case study`}>
          <button className="case-study__close" onClick={closeProject}>Close <span>×</span></button>
          <div className={`case-study__cover project-art--${projects[activeProject].accent}`}>
            <div className="case-study__cover-meta"><span>0{activeProject + 1} / 06</span><span>{projects[activeProject].category}</span></div>
            <h2>{projects[activeProject].title}</h2><span className="case-study__code">{projects[activeProject].code}</span>
          </div>
          <div className="case-study__body">
            <div className="case-study__intro"><span className="section-index">[ PROJECT OVERVIEW ]</span><p>{projects[activeProject].description}</p><dl><div><dt>Discipline</dt><dd>{projects[activeProject].category}</dd></div><div><dt>Year</dt><dd>{projects[activeProject].year}</dd></div></dl></div>
            <div className="case-study__chapter"><span>01 / Challenge</span><p>{projects[activeProject].challenge}</p></div>
            <div className="case-study__image"><span>{projects[activeProject].code}</span><i>VISUAL STUDY / 01</i></div>
            <div className="case-study__chapter"><span>02 / Creative approach</span><p>{projects[activeProject].approach}</p></div>
            <div className="case-study__note">Selected visual material is represented by art-directed placeholders while the full project archive is being prepared.</div>
            <button className="case-study__next" onClick={() => setActiveProject((activeProject + 1) % projects.length)}><span>Next project</span>{projects[(activeProject + 1) % projects.length].title}<Arrow /></button>
          </div>
        </div>
      )}
      <PortfolioChat />
    </main>
  )
}
