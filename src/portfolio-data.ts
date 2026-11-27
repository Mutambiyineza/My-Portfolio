export type Project = {
  title: string
  category: string
  year: string
  code: string
  description: string
  challenge: string
  approach: string
  faqs: ProjectFaq[]
  accent: string
}

export type ProjectFaq = {
  question: string
  answer: string
}

export type SavedFaq = {
  question: string
  matches: string[]
  answer: string
}

export const projects: Project[] = [
  {
    title: 'Drive Point Auto Group',
    category: 'Product Design / UI·UX',
    year: '2024',
    code: 'DP',
    description: 'A considered digital experience for navigating the car-buying journey.',
    challenge: 'Create a clear, credible interface for a high-consideration purchase without losing the energy and character of the automotive world.',
    approach: 'A modular interface system, direct information hierarchy, and generous visual pacing turn a complex journey into a focused one.',
    faqs: [
      { question: 'What is Drive Point Auto Group?', answer: 'It is a product design project for a digital experience that helps people navigate the car-buying journey.' },
      { question: 'What was the main design challenge?', answer: 'The challenge was to make a high-consideration purchase feel clear and credible while keeping the energy and character of the automotive world.' },
      { question: 'How was the experience approached?', answer: 'The approach used a modular interface, a direct information hierarchy, and generous visual pacing to make a complex journey feel focused.' },
    ],
    accent: 'blue',
  },
  {
    title: 'Grow Rwanda Advisors',
    category: 'UI/UX Design / Digital Products',
    year: '2024–Present',
    code: 'GR',
    description: 'UI/UX design for web and mobile experiences across Grow Rwanda Advisors’ project portfolio.',
    challenge: 'Design user interfaces across a varied portfolio of web and mobile projects, while also supporting design work for Grow Rwanda Advisors’ bids.',
    approach: 'Create web and mobile interfaces, contribute proposal designs, and work closely with developers to address feedback from subject-matter experts.',
    faqs: [
      { question: 'What is the Grow Rwanda Advisors project?', answer: 'It is a collection of UI/UX work for web and mobile projects associated with Grow Rwanda Advisors.' },
      { question: 'Which projects did Dismas work on?', answer: 'His CV lists Drive Point Auto Group dealer websites, Landscape of Consciousness, Developers Network, GRA Recruiting, GRA Portfolio, Hoist Business Solutions’ WordPress website, and Bright Portfolios’ Squarespace website.' },
      { question: 'How did Dismas contribute?', answer: 'He created user interfaces for web and mobile projects, contributed design work to Grow Rwanda Advisors’ bids, and collaborated with developers on feedback from subject-matter experts.' },
    ],
    accent: 'orange',
  },
  {
    title: 'Desire Journeys',
    category: 'Brand Identity',
    year: '2023',
    code: 'DJ',
    description: 'A warm visual identity shaped around movement, discovery, and memory.',
    challenge: 'Build a travel identity that feels personal and elevated without relying on familiar tourism clichés.',
    approach: 'A refined wordmark, cinematic image direction, and warm editorial palette frame travel as an intimate sequence of discoveries.',
    faqs: [
      { question: 'What is Desire Journeys?', answer: 'It is a travel brand identity shaped around movement, discovery, and memory.' },
      { question: 'What was the challenge for this identity?', answer: 'The challenge was to make the travel identity feel personal and elevated without relying on familiar tourism clichés.' },
      { question: 'How does the visual direction express the idea?', answer: 'A refined wordmark, cinematic image direction, and warm editorial palette present travel as an intimate sequence of discoveries.' },
    ],
    accent: 'lime',
  },
  {
    title: 'Ironwood Edge',
    category: 'Brand Identity',
    year: '2023',
    code: 'IE',
    description: 'A precise, confident identity balancing material strength and modern craft.',
    challenge: 'Express durability and detail in a visual language that remains contemporary, premium, and versatile.',
    approach: 'A strong typographic foundation is paired with sharp spatial compositions and tactile, material-led art direction.',
    faqs: [
      { question: 'What is Ironwood Edge?', answer: 'It is a brand identity project balancing material strength with modern craft.' },
      { question: 'What qualities did the identity need to express?', answer: 'It needed to express durability and detail while feeling contemporary, premium, and versatile.' },
      { question: 'What is the visual approach?', answer: 'The approach pairs a strong typographic foundation with sharp spatial compositions and tactile, material-led art direction.' },
    ],
    accent: 'black',
  },
  {
    title: 'St Ambrose Catholic Parish',
    category: 'Website / UI Design',
    year: '2023',
    code: 'SA',
    description: 'An accessible digital home for community, worship, and shared information.',
    challenge: 'Organize varied parish information for a broad audience while retaining a calm and welcoming sense of place.',
    approach: 'Simple navigation, readable content structures, and a restrained visual system put access and community first.',
    faqs: [
      { question: 'What is the St Ambrose Catholic Parish project?', answer: 'It is a website and UI design project creating an accessible digital home for community, worship, and shared information.' },
      { question: 'What was the main challenge?', answer: 'The challenge was to organize varied parish information for a broad audience while keeping the experience calm and welcoming.' },
      { question: 'How was the website experience designed?', answer: 'The approach prioritizes simple navigation, readable content structures, and a restrained visual system so access and community come first.' },
    ],
    accent: 'sand',
  },
  {
    title: 'Selected Experiments',
    category: 'Graphic Design / Creative',
    year: 'Ongoing',
    code: 'XX',
    description: 'Posters, visual studies, and self-initiated explorations across mediums.',
    challenge: 'Maintain a space for visual research beyond the boundaries of client and product work.',
    approach: 'An evolving collection where typography, composition, image-making, and code can collide without a fixed outcome.',
    faqs: [
      { question: 'What are Selected Experiments?', answer: 'It is an ongoing collection of posters, visual studies, and self-initiated explorations across mediums.' },
      { question: 'Why keep a collection of experiments?', answer: 'The collection creates space for visual research beyond the boundaries of client and product work.' },
      { question: 'What kinds of ideas are explored?', answer: 'Typography, composition, image-making, and code come together in an evolving collection without a fixed outcome.' },
    ],
    accent: 'red',
  },
]

export const experience = [
  ['Pinn Creative Hub', 'UI/UX Lead', 'Sep 2022–Feb 2026'],
  ['Iwacu Finance Ltd', 'Senior UI/UX Designer', 'Aug 2024–Present'],
  ['Grow Rwanda Advisors', 'UI/UX Designer', 'Oct 2024–Present'],
  ['Vanguard Economics', 'Videographer / Photographer', 'Dec 2023–Aug 2024'],
  ['Independent Practice', 'Graphic Design & Digital Projects', 'Ongoing'],
] as const

export const portfolioProfile = {
  name: 'Mutambiyineza Dismas',
  location: 'Kigali, Rwanda',
  summary: 'A multidisciplinary designer and developer working where visual culture, product thinking, and technology meet.',
  approach: 'Connects the clarity of strategy with the emotion of identity, carrying both into the final interface. Believes creative work should make ideas easier to understand, use, and remember.',
  capabilities: [
    'Graphic design: visual identities, branding, art direction, editorial design, and visual communication.',
    'Product design: user research, UI/UX, wireframes, prototyping, design systems, and digital experiences.',
    'Front-end development: responsive interfaces, interactive components, and translating designs into functional digital products.',
  ],
  contact: 'hello@dismas.design',
}

export const portfolioFaqs: SavedFaq[] = [
  {
    question: 'Who is Dismas?',
    matches: ['who is dismas', 'tell me about dismas', 'about dismas', 'dismas background'],
    answer: 'Mutambiyineza Dismas is a Kigali-based creative designer with over three years of experience in communication design, graphic design, branding, and UI/UX.',
  },
  {
    question: 'What kind of work does Dismas do?',
    matches: ['what does dismas do', 'what services', 'services does he offer', 'his specialties', 'his expertise'],
    answer: 'Dismas works across graphic and communication design, visual identity and branding, UI/UX and product design, and front-end development for digital experiences.',
  },
  {
    question: 'What is Dismas’ product design process?',
    matches: ['product design process', 'design process', 'ui ux process', 'how does dismas approach design'],
    answer: 'Dismas describes an end-to-end, user-centered process: research and discovery, user flows and wireframes, prototypes, high-fidelity interface design, and handoff. His CV also describes interviews, surveys, usability testing, and collaboration with developers, product managers, and stakeholders.',
  },
  {
    question: 'What design tools does Dismas use?',
    matches: ['design tools', 'what tools', 'software does he use', 'which software', 'figma', 'adobe tools'],
    answer: 'The tools listed on Dismas’ CV include Figma, Adobe Illustrator, Photoshop, InDesign, Premiere Pro, Audition, Framer, and Microsoft Office.',
  },
  {
    question: 'What did Dismas study?',
    matches: ['education', 'degree', 'what did dismas study', 'bachelor'],
    answer: 'Dismas earned a Bachelor with Honors in Creative Design, specializing in Communication Design, from the University of Rwanda.',
  },
  {
    question: 'What languages does Dismas speak?',
    matches: ['languages', 'what languages', 'which languages'],
    answer: 'Dismas lists English, Kinyarwanda, and French. The CV does not specify proficiency levels.',
  },
  {
    question: 'What was Dismas’ role at Pinn Creative Hub?',
    matches: ['dismas role at pinn', 'role at pinn', 'pinn experience', 'ui ux lead at pinn', 'work at pinn creative hub'],
    answer: 'Dismas was UI/UX Lead at Pinn Creative Hub from September 2022 to February 2026. He led design from research and wireframing through visual design and handoff, and worked on design systems, user research, prototypes, and collaboration with product and development teams.',
  },
  {
    question: 'What projects did Dismas work on at Grow Rwanda?',
    matches: ['grow rwanda work', 'role at grow rwanda', 'grow rwanda projects', 'projects at grow rwanda'],
    answer: 'At Grow Rwanda, Dismas works on web and mobile experiences. His CV names Drive Point Auto Group dealer websites, Landscape of Consciousness, Developers Network, GRA Recruiting, GRA Portfolio, Hoist Business Solutions’ WordPress site, and Bright Portfolios’ Squarespace site. He also contributes design to proposals and works with developers on expert feedback.',
  },
  {
    question: 'What does Dismas do at Iwacu Finance?',
    matches: ['iwacu finance', 'role at iwacu'],
    answer: 'Dismas’ CV lists him as a Senior UI/UX Designer at Iwacu Finance Ltd from August 2024 to the present.',
  },
  {
    question: 'What did Dismas do at Lions Design?',
    matches: ['lions design', 'work at lions design'],
    answer: 'At Lions Design Ltd, Dismas created logos and brand identities, brand packages, brochures, posters, and flyers. He prepared print-ready files and managed client relationships from consultation through delivery.',
  },
  {
    question: 'What was Dismas’ work at Vanguard Economics?',
    matches: ['vanguard economics', 'videography experience', 'photography experience'],
    answer: 'At Vanguard Economics, Dismas worked on video and photography: developing scripts, scouting locations, setting up equipment and lighting, filming, reviewing and editing content, and photographing events and people.',
  },
  {
    question: 'What did Dismas do at Energy Private Developers?',
    matches: ['energy private developers', 're4sg conference'],
    answer: 'At Energy Private Developers, Dismas worked on social media content and communication graphics, print materials such as brochures and posters, and graphics for the RE4SG 5th Edition Conference and Exhibition.',
  },
  {
    question: 'What work did Dismas do for Rwanda Convention Bureau?',
    matches: ['rwanda convention bureau', 'global brand speak'],
    answer: 'Through Global Brand Speak, Dismas designed posters, presentations, bid books, and print materials for Rwanda Convention Bureau.',
  },
]
