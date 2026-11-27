import { useEffect, useRef, useState } from 'react'
import type { Project } from './portfolio-data'

type DrivePointCaseStudyProps = {
  project: Project
  nextProjectTitle: string
  onNextProject: () => void
}

type PresentationSlide = {
  id: string
  kicker: string
  title: string
  description: string
  type: 'cover' | 'client' | 'challenges' | 'features' | 'website' | 'mobile' | 'impact' | 'closing'
}

const presentationSlides: PresentationSlide[] = [
  {
    id: 'cover',
    kicker: '01 / THE PROJECT',
    title: 'A multi-brand dealership website.',
    description: 'Built for Ohio car shoppers, with one digital experience across a group of dealerships.',
    type: 'cover',
  },
  {
    id: 'client',
    kicker: '02 / THE CLIENT',
    title: 'One group. Six stores. Nine brands.',
    description: 'Drive Point Auto Group brings its dealerships together across Bedford, Willoughby, Wooster, and Mount Vernon.',
    type: 'client',
  },
  {
    id: 'challenges',
    kicker: '03 / THE CHALLENGE',
    title: 'Make a complex choice feel simple.',
    description: 'The experience needed to connect a diverse dealer group with people ready to find, compare, and act.',
    type: 'challenges',
  },
  {
    id: 'features',
    kicker: '04 / THE SOLUTION',
    title: 'A clear path for every shopper.',
    description: 'Useful tools bring the key steps of the car-buying journey into one place.',
    type: 'features',
  },
  {
    id: 'website',
    kicker: '05 / THE WEBSITE',
    title: 'From first search to next step.',
    description: 'The supplied presentation shows the homepage, shopping tools, offers, reviews, and FAQs.',
    type: 'website',
  },
  {
    id: 'mobile',
    kicker: '06 / BUILT TO BE FOUND',
    title: 'Ready for mobile, search, and sharing.',
    description: 'The deck describes a mobile-focused experience supported by search metadata, social previews, and analytics.',
    type: 'mobile',
  },
  {
    id: 'impact',
    kicker: '07 / MEASURING IMPACT',
    title: 'Measure what moves the business.',
    description: 'The presentation identifies useful outcomes to track, but does not include verified before-and-after results.',
    type: 'impact',
  },
  {
    id: 'closing',
    kicker: '08 / SEE IT LIVE',
    title: 'Drive Point Auto Group',
    description: 'Explore the live experience at drivepointautogroup.com.',
    type: 'closing',
  },
]

const dealershipBrands = ['Chevrolet', 'Chrysler', 'Dodge', 'Genesis', 'GMC', 'Hyundai', 'Jeep', 'Kia', 'RAM']

const challengeItems = [
  {
    title: 'One identity, many brands',
    text: 'Nine brands across six stores needed to feel like one trusted dealer group.',
  },
  {
    title: 'Inventory-first shoppers',
    text: 'Car buyers want to find, compare, and act on vehicles quickly, often on mobile.',
  },
  {
    title: 'Proof of performance',
    text: 'The group needed to understand which channels drive visits and leads.',
  },
]

const featureItems = [
  {
    title: 'Shop by store',
    text: 'Six dealership storefronts, each with its own page, in one easy carousel.',
  },
  {
    title: 'Trade-in and recall tools',
    text: 'Get a car’s value from a VIN or plate, and check for open recalls.',
  },
  {
    title: 'Payment calculator',
    text: 'Estimate a monthly payment or vehicle price from budget and credit score.',
  },
  {
    title: 'Offers, reviews, and FAQs',
    text: 'Special offers, client reviews, and clear answers help shoppers build confidence.',
  },
]

const websiteScreens = [
  {
    src: '/assets/drivepoint/website-home.jpg',
    alt: 'Drive Point Auto Group homepage showing store selection and vehicle categories',
    caption: 'Homepage and stores',
  },
  {
    src: '/assets/drivepoint/journey-tools.jpg',
    alt: 'Drive Point Auto Group website showing trade-in, recall, service, and payment tools',
    caption: 'Shopping tools',
  },
  {
    src: '/assets/drivepoint/offers-reviews-faqs.jpg',
    alt: 'Drive Point Auto Group website showing offers, client reviews, and frequently asked questions',
    caption: 'Offers and trust',
  },
]

function PresentationVisual({ type }: { type: PresentationSlide['type'] }) {
  if (type === 'cover') {
    return (
      <div className="drive-deck__cover-art" aria-hidden="true">
        <span>DP</span>
        <div>
          <strong>DRIVE POINT</strong>
          <small>AUTO GROUP / OHIO</small>
        </div>
        <i />
      </div>
    )
  }

  if (type === 'client') {
    return (
      <div className="drive-deck__client-art">
        <div className="drive-deck__metrics">
          <article><strong>6</strong><span>STORES</span></article>
          <article><strong>9</strong><span>BRANDS</span></article>
          <article><strong>4</strong><span>OHIO CITIES</span></article>
        </div>
        <p>THE BRANDS</p>
        <ul className="drive-deck__brand-list">
          {dealershipBrands.map((brand) => <li key={brand}>{brand}</li>)}
        </ul>
      </div>
    )
  }

  if (type === 'challenges') {
    return (
      <div className="drive-deck__card-list">
        {challengeItems.map((item, index) => (
          <article key={item.title}>
            <span>0{index + 1}</span>
            <div><h3>{item.title}</h3><p>{item.text}</p></div>
          </article>
        ))}
      </div>
    )
  }

  if (type === 'features') {
    return (
      <div className="drive-deck__feature-grid">
        {featureItems.map((item, index) => (
          <article key={item.title}>
            <span>0{index + 1}</span>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </article>
        ))}
      </div>
    )
  }

  if (type === 'website') {
    return (
      <div className="drive-deck__gallery">
        {websiteScreens.map((screen) => (
          <figure key={screen.src}>
            <div><img src={screen.src} alt={screen.alt} loading="lazy" /></div>
            <figcaption>{screen.caption}</figcaption>
          </figure>
        ))}
      </div>
    )
  }

  if (type === 'mobile') {
    return (
      <div className="drive-deck__mobile-art">
        <img
          src="/assets/drivepoint/mobile-experience.jpg"
          alt="Drive Point Auto Group website design showing vehicle categories and shopping tools"
          loading="lazy"
        />
        <ul>
          <li><span>01</span><strong>Search-ready foundation</strong><small>Page titles, descriptions, and indexing rules.</small></li>
          <li><span>02</span><strong>Built to be shared</strong><small>Open Graph and Twitter card previews.</small></li>
          <li><span>03</span><strong>Measured end to end</strong><small>Google Tag Manager and Meta Pixel.</small></li>
        </ul>
      </div>
    )
  }

  if (type === 'impact') {
    return (
      <div className="drive-deck__impact-art">
        <p>OUTCOMES IDENTIFIED IN THE DECK</p>
        <ul>
          <li><span>01</span><strong>Organic traffic</strong></li>
          <li><span>02</span><strong>Lead submissions</strong></li>
          <li><span>03</span><strong>Page load time</strong></li>
        </ul>
        <small>Verified before-and-after figures were not provided.</small>
      </div>
    )
  }

  return (
    <div className="drive-deck__closing-art">
      <span>DP</span>
      <p>DRIVE POINT<br />AUTO GROUP</p>
      <a href="https://drivepointautogroup.com" target="_blank" rel="noreferrer">
        Explore the live website <span aria-hidden="true">↗</span>
      </a>
    </div>
  )
}

function DrivePointPresentation() {
  const presentationRef = useRef<HTMLElement | null>(null)
  const [activeSlide, setActiveSlide] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (motionPreference.matches) setIsPlaying(false)

    const handleMotionChange = (event: MediaQueryListEvent) => {
      if (event.matches) setIsPlaying(false)
    }

    motionPreference.addEventListener('change', handleMotionChange)
    return () => motionPreference.removeEventListener('change', handleMotionChange)
  }, [])

  useEffect(() => {
    const element = presentationRef.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry?.isIntersecting ?? false),
      { threshold: 0.35 },
    )
    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isPlaying || !isVisible) return

    const interval = window.setInterval(() => {
      if (document.visibilityState === 'visible') {
        setActiveSlide((current) => (current + 1) % presentationSlides.length)
      }
    }, 7000)

    return () => window.clearInterval(interval)
  }, [isPlaying, isVisible])

  const slide = presentationSlides[activeSlide]

  return (
    <section
      ref={presentationRef}
      className="drive-deck"
      aria-label="Drive Point Auto Group case study presentation"
      aria-roledescription="carousel"
      onMouseEnter={() => setIsPlaying(false)}
      onFocusCapture={() => setIsPlaying(false)}
    >
      <div className="drive-deck__heading">
        <span className="drive-case__chapter-index">03 / THE PROJECT</span>
        <div>
          <h2>The project, in eight frames.</h2>
          <p>Explore the brief, experience, and key features from the original presentation.</p>
        </div>
      </div>

      <div className="drive-deck__controls">
        <span className="drive-deck__counter">
          {String(activeSlide + 1).padStart(2, '0')} <i>/</i> {String(presentationSlides.length).padStart(2, '0')}
        </span>
        <div>
          <button
            type="button"
            aria-label="Previous slide"
            onClick={() => setActiveSlide((current) => (current - 1 + presentationSlides.length) % presentationSlides.length)}
          >
            ←
          </button>
          <button
            type="button"
            className="drive-deck__play"
            aria-label={isPlaying ? 'Pause slideshow' : 'Play slideshow'}
            aria-pressed={isPlaying}
            onClick={() => setIsPlaying((playing) => !playing)}
          >
            {isPlaying ? 'Pause' : 'Play'}
          </button>
          <button
            type="button"
            aria-label="Next slide"
            onClick={() => setActiveSlide((current) => (current + 1) % presentationSlides.length)}
          >
            →
          </button>
        </div>
      </div>

      <article
        key={slide.id}
        className="drive-deck__slide"
        role="group"
        aria-roledescription="slide"
        aria-label={`${activeSlide + 1} of ${presentationSlides.length}: ${slide.title}`}
      >
        <div className="drive-deck__copy">
          <span>{slide.kicker}</span>
          <h3>{slide.title}</h3>
          <p>{slide.description}</p>
        </div>
        <div className="drive-deck__visual">
          <PresentationVisual type={slide.type} />
        </div>
      </article>

      <nav className="drive-deck__pagination" aria-label="Choose a presentation slide">
        {presentationSlides.map((item, index) => (
          <button
            type="button"
            key={item.id}
            aria-label={`Go to slide ${index + 1}: ${item.title}`}
            aria-current={activeSlide === index ? 'step' : undefined}
            className={activeSlide === index ? 'is-active' : ''}
            onClick={() => setActiveSlide(index)}
          >
            {String(index + 1).padStart(2, '0')}
          </button>
        ))}
      </nav>
    </section>
  )
}

export default function DrivePointCaseStudy({
  project,
  nextProjectTitle,
  onNextProject,
}: DrivePointCaseStudyProps) {
  return (
    <article className="drive-case">
      <header className="drive-case__hero">
        <div className="drive-case__meta">
          <span>01 / 06 — SELECTED WORK</span>
          <span>{project.category} · {project.year}</span>
        </div>

        <div className="drive-case__heading">
          <p className="drive-case__eyebrow">CASE STUDY / AUTOMOTIVE</p>
          <h1>Drive Point<br /><i>Auto Group</i></h1>
          <p className="drive-case__lede">{project.description}</p>
        </div>

        <DrivePointPresentation />
      </header>

      <div className="drive-case__content">
        <section className="drive-case__snapshot">
          <div className="drive-case__section-label">
            <span className="section-index">[ THE SHORT VERSION ]</span>
            <p>A quick read on the brief and response.</p>
          </div>
          <div className="drive-case__snapshot-grid">
            <article>
              <span>THE CHALLENGE</span>
              <p>{project.challenge}</p>
            </article>
            <article>
              <span>CONTRIBUTION</span>
              <p>UI design for U.S.-based car dealership websites with Grow Rwanda Advisors.</p>
            </article>
            <article>
              <span>DESIGN RESPONSE</span>
              <p>{project.approach}</p>
            </article>
          </div>
        </section>

        <div
          className="drive-case__visual"
          role="group"
          aria-label="Website screens from the Drive Point case study presentation"
        >
          <img src="/assets/drivepoint/website-home.jpg" alt="Drive Point Auto Group homepage and dealership storefronts" />
          <img src="/assets/drivepoint/journey-tools.jpg" alt="Drive Point website trade-in, recall, service, and payment tools" />
          <img src="/assets/drivepoint/offers-reviews-faqs.jpg" alt="Drive Point website special offers, reviews, and FAQs" />
          <span className="drive-case__visual-note">WEBSITE SCREENS / DRIVE POINT CASE STUDY</span>
        </div>

        <section className="drive-case__project-facts">
          <span className="drive-case__chapter-index">PROJECT NOTES</span>
          <dl>
            <div><dt>Project</dt><dd>{project.title}</dd></div>
            <div><dt>Organization</dt><dd>Grow Rwanda Advisors</dd></div>
            <div><dt>Context</dt><dd>U.S.-based car dealership websites</dd></div>
            <div><dt>Discipline</dt><dd>{project.category}</dd></div>
            <div><dt>Year</dt><dd>{project.year}</dd></div>
          </dl>
        </section>

        <section className="drive-case__next">
          <div>
            <span className="drive-case__chapter-index">HAVE A SIMILAR CHALLENGE?</span>
            <h2>Let’s make the next step clearer.</h2>
          </div>
          <a href="mailto:hello@dismas.design?subject=Let%E2%80%99s%20start%20a%20project">
            Start a conversation <span aria-hidden="true">↗</span>
          </a>
        </section>

        <button className="case-study__next" onClick={onNextProject}>
          <span>Next case study</span>{nextProjectTitle}<span aria-hidden="true">→</span>
        </button>
      </div>
    </article>
  )
}
