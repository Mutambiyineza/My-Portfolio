export type Project = {
  title: string
  category: string
  year: string
  code: string
  description: string
  challenge: string
  approach: string
  accent: string
}

export const projects: Project[] = [
  { title: 'Drive Point Auto Group', category: 'Product Design / UI·UX', year: '2024', code: 'DP', description: 'A considered digital experience for navigating the car-buying journey.', challenge: 'Create a clear, credible interface for a high-consideration purchase without losing the energy and character of the automotive world.', approach: 'A modular interface system, direct information hierarchy, and generous visual pacing turn a complex journey into a focused one.', accent: 'blue' },
  { title: 'Pinn Creative Hub', category: 'Branding / Digital Design', year: '2024', code: 'PN', description: 'A flexible identity and digital language for a growing creative community.', challenge: 'Give a multidisciplinary creative hub a recognizable voice that can stretch across education, events, and digital content.', approach: 'The identity uses expressive typography, adaptable geometry, and an energetic color system designed to evolve with the community.', accent: 'orange' },
  { title: 'Desire Journeys', category: 'Brand Identity', year: '2023', code: 'DJ', description: 'A warm visual identity shaped around movement, discovery, and memory.', challenge: 'Build a travel identity that feels personal and elevated without relying on familiar tourism clichés.', approach: 'A refined wordmark, cinematic image direction, and warm editorial palette frame travel as an intimate sequence of discoveries.', accent: 'lime' },
  { title: 'Ironwood Edge', category: 'Brand Identity', year: '2023', code: 'IE', description: 'A precise, confident identity balancing material strength and modern craft.', challenge: 'Express durability and detail in a visual language that remains contemporary, premium, and versatile.', approach: 'A strong typographic foundation is paired with sharp spatial compositions and tactile, material-led art direction.', accent: 'black' },
  { title: 'St Ambrose Catholic Parish', category: 'Website / UI Design', year: '2023', code: 'SA', description: 'An accessible digital home for community, worship, and shared information.', challenge: 'Organize varied parish information for a broad audience while retaining a calm and welcoming sense of place.', approach: 'Simple navigation, readable content structures, and a restrained visual system put access and community first.', accent: 'sand' },
  { title: 'Selected Experiments', category: 'Graphic Design / Creative', year: 'Ongoing', code: 'XX', description: 'Posters, visual studies, and self-initiated explorations across mediums.', challenge: 'Maintain a space for visual research beyond the boundaries of client and product work.', approach: 'An evolving collection where typography, composition, image-making, and code can collide without a fixed outcome.', accent: 'red' },
]

export const experience = [
  ['Pinn Creative Hub', 'UI/UX Lead & Trainer', 'Present'],
  ['Grow Rwanda Advisors', 'UI/UX Designer', 'Recent'],
  ['Vanguard Economics', 'Videography Intern', 'Earlier'],
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
