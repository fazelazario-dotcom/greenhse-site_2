let t = [
  {
    label: '12V/24V Transformers / Controllers',
    href: '/australian-certified-12v-24v-transformers-greenhouse-technologies/',
    count: 5,
  },
  {
    label: 'Air Flow / Ceiling Fans',
    href: '/air-flow/',
    count: 12,
  },
  {
    label: 'Batten Fittings / Batten Lights',
    href: '/led-batten-lights-perth/',
    count: 3,
  },
  {
    label: 'Ceiling / Panel / Oyster Lights',
    href: '/led-ceiling-lights-perth/',
    count: 19,
  },
  {
    label: 'Downlights',
    href: '/led-downlights-perth/',
    count: 35,
  },
  {
    label: 'Emergency Lights',
    href: '/emergency-lights/',
    count: 2,
  },
  {
    label: 'Flood / Sports Lighting',
    href: '/led-flood-lights-perth/',
    count: 14,
  },
  {
    label: 'High Bay Lights',
    href: '/high-bay-lights/',
    count: 4,
  },
  {
    label: 'Industrial Lighting',
    href: '/industrial-lighting-perth/',
    count: 19,
  },
  {
    label: 'Landscape / Garden Lighting',
    href: '/led-garden-pool-lights-perth/',
    count: 4,
  },
  {
    label: 'Outdoor / Wall Lights',
    href: '/led-outdoor-wall-lights-perth/',
    count: 23,
  },
  {
    label: 'School & Commercial LED Lighting',
    href: '/commercial-lighting-perth/',
    count: 44,
  },
  {
    label: 'Security / Sensors',
    href: '/security-sensors/',
    count: 6,
  },
  {
    label: 'Star Lights',
    href: '/led-star-lights/',
    count: 8,
  },
  {
    label: 'Strip Lights',
    href: '/strip-lights/',
    count: 13,
  },
  {
    label: 'LED Track / Linear Lights',
    href: '/led-track-lights-perth/',
    count: 4,
  },
  {
    label: 'Switches / Powerpoints',
    href: '/glass-light-switch-perth-html/',
    count: 8,
  },
  {
    label: 'Smart Life',
    href: '/smart-lights-perth/',
    count: 23,
  },
];
export const categoryHref = function (e) {
  return t.find((t) => t.label === e)?.href || '#';
};
export const company = {
  blurb:
    "Greenhse Technologies — Perth's trusted LED lighting and smart home supplier. Certified fittings, expert advice, local support.",
  showroom: {
    label: 'Perth showroom',
    address: '5/1 Locke Ln, Ellenbrook WA 6069',
    mapQuery:
      '!1m18!1m12!1m3!1d3391.7174176484805!2d115.96499091511214!3d-31.77819238128511!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2a32b4698667fbfd%3A0x58e424d2a9755cfe!2sGreenhouse%20Technologies!5e0!3m2!1sen!2sin!4v1605614231488!5m2!1sen!2sin',
    phone: '(08) 9297 2969',
    phoneHref: 'tel:+61892972969',
    hours: 'Mon–Fri 8AM–5PM',
    hoursDetail: ['Monday - Friday: 8:30am - 5pm', 'Saturday: 9am - 2pm', 'Sunday & Public Holidays: Closed'],
  },
};
export const footerColumns = [
  {
    title: 'Products',
    links: [
      {
        label: '12V/24V Transformers',
        href: '/australian-certified-12v-24v-transformers-greenhouse-technologies/',
      },
      {
        label: 'Air Flow',
        href: '/air-flow/',
      },
      {
        label: 'Batten Fittings',
        href: '/led-batten-lights-perth/',
      },
      {
        label: 'Ceiling',
        href: '/led-ceiling-lights-perth/',
      },
      {
        label: 'Downlights',
        href: '/led-downlights-perth/',
      },
      {
        label: 'Emergency Lights',
        href: '/emergency-lights/',
      },
      {
        label: 'Flood',
        href: '/led-flood-lights-perth/',
      },
      {
        label: 'High Bay Lights',
        href: '/high-bay-lights/',
      },
    ],
  },
  {
    title: 'Explore',
    links: [
      {
        label: 'Smart Life',
        href: '/smart-lights-perth/',
      },
      {
        label: 'Energy & Battery',
        href: '/#green-charge',
      },
      {
        label: 'FAQ',
        href: '/#faq',
      },
    ],
  },
  {
    title: 'Company',
    links: [
      {
        label: 'Layout App',
        href: '/layout-app/',
        external: !1,
      },
      {
        label: 'Light Lab',
        href: '/light-lab/',
        external: !1,
      },
      {
        label: 'Green Charge',
        href: 'https://www.greencharge.com.au/',
        external: !0,
      },
      {
        label: 'Blog',
        href: '/blog/',
      },
      {
        label: 'About us',
        href: '/aboutus/',
      },
      {
        label: 'Contact & find us',
        href: '/contact/',
      },
      {
        label: 'My account',
        href: '/account',
      },
    ],
  },
  {
    title: 'Information',
    links: [
      {
        label: 'About Us',
        href: '/aboutus/',
      },
      {
        label: 'Contact Us',
        href: '/contact/',
      },
      {
        label: 'Privacy Policies',
        href: '/privacy-policy-cookie-restriction-mode',
      },
      {
        label: 'Terms & Conditions',
        href: '/customer-service',
      },
    ],
  },
];
export const legalLinks = [
  {
    label: 'Privacy',
    href: '/privacy-policy-cookie-restriction-mode',
  },
  {
    label: 'Terms',
    href: '/customer-service',
  },
  {
    label: 'Returns & Shipping',
    href: '/returns/',
  },
];
export const navLinks = [
  {
    label: 'Products',
    href: 'https://greenhse.com/products.html',
    menu: !0,
  },
  {
    label: 'Light Lab',
    href: '/light-lab/',
    dot: !0,
  },
  {
    label: 'Strip Lights',
    href: '/strip-lights/',
  },
  {
    label: 'Smart Life',
    href: '/smart-lights-perth/',
  },
  {
    label: 'Energy & Battery',
    href: '/#green-charge',
  },
  {
    label: 'Applications',
    href: '/#applications',
  },
  {
    label: 'Resources',
    href: '/#resources',
  },
  {
    label: 'Installation',
    href: '/installation/',
  },
  {
    label: 'FAQ',
    href: '/#faq',
  },
  {
    label: 'Contact',
    href: '/#send-us-your-plans',
  },
];
export const productCategories = t;
export const productsMenuFooter = {
  get note() {
    return `${t.length} categories \xb7 1000s of certified fittings`;
  },
  cta: {
    label: 'Browse the full range',
    href: '/products/',
  },
};
export const socialLinks = [
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/greenhouseinternational/',
    icon: 'facebook',
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/greenhsetechnologies/',
    icon: 'instagram',
  },
  {
    label: 'YouTube',
    href: 'https://www.youtube.com/@GreenhseTechnologies',
    icon: 'youtube',
  },
];
