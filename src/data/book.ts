export const publisher = {
  name: 'anishwritings',
  displayName: 'Anish Writings',
  tagline: 'Stories where love meets duty',
  country: 'India',
  origin: 'Telugu literature · Independent publishing',
  mission:
    'Anish Writings brings emotionally honest Telugu fiction to readers who value love, family, and the courage of everyday choices.',
  contactEmail: 'hello@anishwritings.com',
}

export const book = {
  titleLatin: 'Janaki Chenthaku Ram',
  titleTelugu: 'జానకి చెంతకు రామ్',
  author: 'Anish Babu Kosuru',
  year: 2026,
  edition: 'First Edition',
  format: 'Hardcover',
  language: 'Telugu',
  genre: 'Love fiction',
  isbn: '9789359969350',
  tagline: 'Love shows the pathway of family responsibilities',
  synopsis:
    'In the tender space between Janaki’s world and Ram’s promises, a Telugu love story unfolds—where passion is never separate from parents, siblings, traditions, and the weight of what a family expects.',
  coverLocal: '/book-cover.jpg',
  coverUrl:
    'https://rukminim2.flixcart.com/image/416/562/xif0q/book/d/x/f/janaki-chenthaku-ram-original-imahsfx6ayrytzep.jpeg',
  buyUrl:
    'https://www.flipkart.com/janaki-chenthaku-ram/p/itmd5710fc813fd5?pid=9789359969350&lid=LSTBOK9789359969350DJJZXQ&marketplace=FLIPKART',
  priceInr: 228,
  mrpInr: 249,
  seller: 'Anishbabukosuru',
  pages: 'Rich hardbound edition',
  deliveryNote: 'Ships across India · Cash on delivery available on Flipkart',
}

export const themes = [
  {
    id: 'love',
    title: 'Love with roots',
    titleTelugu: 'మూలాలున్న ప్రేమ',
    description:
      'A romance that grows inside real homes—not away from them. Every feeling is tied to the people who raised you.',
    icon: '♥',
  },
  {
    id: 'duty',
    title: 'Family duty',
    titleTelugu: 'కుటుంబ బాధ్యత',
    description:
      'Choices are never only yours. The novel honours obligations to parents, elders, and the unspoken contracts of kinship.',
    icon: '⌂',
  },
  {
    id: 'path',
    title: 'The pathway',
    titleTelugu: 'మార్గం',
    description:
      'When duty and desire pull in different directions, love becomes the map—not an escape route, but a way through.',
    icon: '✦',
  },
] as const

export const journeySteps = [
  {
    step: '01',
    title: 'First sight',
    text: 'Janaki and Ram meet in the ordinary rhythm of neighbourhood, work, and family—where attraction carries immediate social weight.',
  },
  {
    step: '02',
    title: 'Bonds tested',
    text: 'Relatives, expectations, and silence shape every conversation. Love must prove itself in action, not only in words.',
  },
  {
    step: '03',
    title: 'Choosing together',
    text: 'The heart learns that responsibility and romance can share one road—if both partners walk it honestly.',
  },
  {
    step: '04',
    title: 'What remains',
    text: 'A story that stays with you after the last page: gratitude for family, and hope for a love that endures.',
  },
] as const

/** All paths are local so the gallery works offline and on Vercel without hotlink blocks. */
export const gallery = [
  {
    src: '/book-cover.jpg',
    alt: 'Janaki Chenthaku Ram hardcover front',
    caption: 'First edition hardcover',
    span: 'tall',
  },
  {
    src: '/gallery/cover-wide.jpg',
    alt: 'Janaki Chenthaku Ram cover art — building, beach, and weave scenes',
    caption: 'Publisher: anishwritings',
    span: 'wide',
  },
  {
    src: '/gallery/reading.jpg',
    alt: 'Open book with warm light',
    caption: 'Late-night reading mood',
    span: 'normal',
  },
  {
    src: '/gallery/pages.jpg',
    alt: 'Pages of a novel in hand',
    caption: 'Telugu love fiction',
    span: 'wide',
  },
] as const

export const productHighlights = [
  'Hardcover · First edition · 2026',
  'Language: Telugu',
  'Genre: Love fiction',
  'ISBN-13: 9789359969350',
  'Key theme: Love as a guide to family responsibility',
  'Sold on Flipkart · Seller: Anishbabukosuru',
  '7-day replacement · COD available',
] as const

export const navLinks = [
  { href: '#story', label: 'Story' },
  { href: '#themes', label: 'Themes' },
  { href: '#gallery', label: 'Gallery' },
  { href: '#experience', label: 'Preview' },
  { href: '#book', label: 'Book' },
  { href: '#author', label: 'Author' },
] as const