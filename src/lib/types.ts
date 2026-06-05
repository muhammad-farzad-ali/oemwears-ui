/**
 * Type definitions for site content and data.
 *
 * Shapes mirror the Prisma models in oemwears/prisma/schema.prisma so the
 * data files in src/lib/data/ can be ported one-to-one from the seed files.
 */

export interface ApparelType {
  id: string;
  value: string;
  name: string;
  description: string;
  image: string;
  examples: string[];
  features: string[];
  order: number;
  isActive: boolean;
  nameDe?: string;
  descriptionDe?: string;
  featuresDe?: string[];
  examplesDe?: string[];
}

export interface Service {
  id: string;
  value: string;
  title: string;
  description: string;
  icon: string;
  highlights: string[];
  order: number;
  isActive: boolean;
  titleDe?: string;
  descriptionDe?: string;
  highlightsDe?: string[];
}

export interface PartnerCountry {
  id: string;
  value: string;
  name: string;
  flag: string;
  description: string;
  strengths: string[];
  order: number;
  isActive: boolean;
  nameDe?: string;
  descriptionDe?: string;
  strengthsDe?: string[];
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  badge?: string | null;
  description: string;
  validUntil?: string | null;
  isActive: boolean;
  nameDe?: string;
  issuerDe?: string;
  descriptionDe?: string;
}

export interface AboutSection {
  id: string;
  section: string;
  title: string;
  content: string;
  images: string[];
  videos: string[];
  order: number;
  isActive: boolean;
  titleDe?: string;
  contentDe?: string;
}

export interface Policy {
  id: string;
  type: 'moq' | 'lead-time' | string;
  title: string;
  data: Record<string, { quantity?: string; time?: string; note: string }>;
  description?: string | null;
  order: number;
  isActive: boolean;
  descriptionDe?: string | null;
  dataDe?: Record<string, { quantityDe?: string; timeDe?: string; noteDe: string }>;
}

export interface Testimonial {
  id: string;
  author: string;
  company: string;
  content: string;
  rating: number;
  image?: string | null;
  blurAuthor: boolean;
  blurCompany: boolean;
  isActive: boolean;
  authorDe?: string;
  companyDe?: string;
  contentDe?: string;
}

export interface HomeHero {
  section: string;
  images: string[];
  fallbackImage?: string;
  ctaLink: string;
}

export interface AboutStat {
  id: string;
  value: string;
  color: 'primary' | 'violet' | 'emerald' | 'accent';
  /** Key into `t.about.stats` (yearsExperience, teamMembers, etc.). */
  statKey: 'yearsExperience' | 'teamMembers' | 'countriesServed' | 'happyClients';
  order: number;
  isActive: boolean;
}

/** Payload accepted by the contact form / Discord helper. */
export interface ContactPayload {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  productInterest: string;
  quantity?: string;
  message: string;
}

/**
 * SiteContent: shape of the i18n UI strings. Mirrors the structure of
 * oemwears/content.json so existing translations can be ported mechanically.
 */
export interface SiteContent {
  brand: { name: string; tagline: string; description: string };
  nav: {
    home: string;
    apparel: string;
    services: string;
    about: string;
    partners: string;
    policies: string;
    contact: string;
    getQuote: string;
  };
  hero: {
    title: string;
    subtitle: string;
    description: string;
    ctaPrimary: string;
    ctaSecondary: string;
    fallbackAlt: string;
  };
  usps: {
    germanTrust: { title: string; description: string };
    sportswearFocus: { title: string; description: string };
    endToEnd: { title: string; description: string };
    lowMoq: { title: string; description: string };
    reliableNetwork: { title: string; description: string };
  };
  partnerCountries: {
    badge: string;
    title: string;
    subtitle: string;
  };
  featuredApparel: {
    badge: string;
    title: string;
    subtitle: string;
    viewAll: string;
  };
  apparelTypes: {
    badge: string;
    title: string;
    subtitle: string;
    featuresLabel: string;
    examplesLabel: string;
    emptyState: string;
    ctaTitle: string;
    ctaSubtitle: string;
    ctaButton: string;
  };
  servicesOverview: {
    badge: string;
    title: string;
    subtitle: string;
  };
  services: {
    badge: string;
    title: string;
    subtitle: string;
    process: {
      title: string;
      step1: { title: string; description: string };
      step2: { title: string; description: string };
      step3: { title: string; description: string };
      step4: { title: string; description: string };
    };
    cta: { title: string; subtitle: string; button: string };
  };
  about: {
    badge: string;
    title: string;
    subtitle: string;
    stats: {
      yearsExperience: string;
      partnerCountries: string;
      brandsServed: string;
      productionPartners: string;
    };
    qualityCommitment: {
      title: string;
      vettedNetwork: { title: string; description: string };
      onSiteInspections: { title: string; description: string };
      ethicalStandards: { title: string; description: string };
    };
    fallback: {
      agencyTitle: string;
      agencyContent: string;
      agencyAlt: string;
      teamTitle: string;
      teamContent: string;
      teamAlt: string;
    };
  };
  partners: {
    badge: string;
    title: string;
    subtitle: string;
    countriesTitle: string;
    countriesSubtitle: string;
    certificationsTitle: string;
    certificationsSubtitle: string;
    issuedBy: string;
    validUntil: string;
    emptyState: string;
  };
  policies: {
    badge: string;
    title: string;
    subtitle: string;
    moq: {
      title: string;
      productType: string;
      moq: string;
      notes: string;
      emptyState: string;
    };
    leadTime: {
      title: string;
      stage: string;
      timeline: string;
      emptyState: string;
      stageLabels: {
        sampling: string;
        production: string;
        shipping: string;
      };
    };
    shipping: {
      title: string;
      express: { title: string; description: string };
      sea: { title: string; description: string };
      air: { title: string; description: string };
    };
    note: string;
  };
  cta: { title: string; subtitle: string; button: string };
  footer: {
    quickLinks: string;
    contact: string;
    followUs: string;
    copyright: string;
    tagline: string;
    emailLabel: string;
    phoneLabel: string;
    addressLabel: string;
  };
  contact: {
    badge: string;
    title: string;
    subtitle: string;
    infoTitle: string;
    emailLabel: string;
    phoneLabel: string;
    addressLabel: string;
    hoursLabel: string;
    hoursValue: string;
    connectTitle: string;
    whatsappButton: string;
    whatsappAria: string;
    formTitle: string;
    nameLabel: string;
    namePlaceholder: string;
    emailPlaceholder: string;
    companyLabel: string;
    companyPlaceholder: string;
    phonePlaceholder: string;
    serviceInterestLabel: string;
    servicePlaceholder: string;
    serviceOptions: {
      customProduction: string;
      oemPrivateLabel: string;
      productDevelopment: string;
      productionManagement: string;
      qualityControl: string;
      logistics: string;
      other: string;
    };
    quantityLabel: string;
    quantityPlaceholder: string;
    messageLabel: string;
    messagePlaceholder: string;
    submitButton: string;
    sendingButton: string;
    privacyText: string;
    successTitle: string;
    successMessage: string;
    successButton: string;
    validation: {
      nameRequired: string;
      emailInvalid: string;
      serviceRequired: string;
      messageRequired: string;
    };
    errors: {
      submitFailed: string;
      genericError: string;
    };
  };
  common: {
    loading: string;
    error: string;
    close: string;
    back: string;
    cancel: string;
    emptyState: string;
    viewDetails: string;
    required: string;
    toggleMenu: string;
    backToHome: string;
    socialFacebook: string;
    socialInstagram: string;
    socialLinkedIn: string;
  };
  testimonials: {
    badge: string;
    title: string;
    subtitle: string;
  };
  error: {
    notFoundTitle: string;
    notFoundMessage: string;
    genericTitle: string;
    genericMessage: string;
  };
}
