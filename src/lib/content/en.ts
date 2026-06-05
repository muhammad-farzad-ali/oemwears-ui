import type { SiteContent } from "../types";

const en: SiteContent = {
  brand: {
    name: "Sports Wear Agency - OEMWears",
    tagline: "Premium Sportswear",
    description:
      "Custom sportswear manufacturing with low MOQ and fast turnaround. Specializing in jerseys, shorts, and athletic apparel for teams and brands.",
  },
  nav: {
    home: "Home",
    products: "Products",
    customization: "Customization",
    about: "About",
    certifications: "Certifications",
    policies: "MOQ & Lead Time",
    contact: "Contact",
    admin: "Admin",
    getQuote: "Get Quote",
  },
  hero: {
    title: "Premium Sportswear Manufacturing",
    subtitle: "Low MOQ | Fast Turnaround | High Quality",
    description:
      "We specialize in custom sportswear production for teams, brands, and retailers worldwide. From jerseys to shorts, we deliver quality athletic apparel with competitive pricing.",
    ctaPrimary: "Get a Quote",
    ctaSecondary: "View Products",
    fallbackAlt: "Sportswear manufacturing",
  },
  usps: {
    lowMoq: {
      title: "Low MOQ",
      description: "Starting from 50 pieces per design",
    },
    fastTurnaround: {
      title: "Fast Turnaround",
      description: "15–20 days production time",
    },
    qualityAssured: {
      title: "Quality Assured",
      description: "ISO 9001 & SEDEX certified",
    },
    fullCustomization: {
      title: "Full Customization",
      description: "Designs, logos, names & more",
    },
  },
  featuredProducts: {
    badge: "Our Collection",
    title: "Featured Products",
    subtitle: "Discover our selection of customizable sportswear",
    viewDetails: "View Details",
    viewAll: "View All Products",
  },
  products: {
    badge: "Our Products",
    title: "Our Products",
    subtitle:
      "Explore our full range of customizable sportswear. Every item can be personalized with your designs, logos, and branding.",
    fabric: "Fabric",
    printingMethods: "Printing Methods",
    features: "Features",
    emptyState: "No products are currently available.",
    ctaTitle: "Need a custom quote?",
    ctaSubtitle:
      "Contact us for custom orders, bulk purchases, or special requirements. We offer competitive pricing and flexible minimum order quantities.",
    ctaButton: "Request a Quote",
  },
  about: {
    badge: "About Us",
    title: "About OEMWears",
    subtitle:
      "Your reliable partner for high-quality sportswear. We combine precise craftsmanship with modern production techniques.",
    stats: {
      yearsExperience: "Years of Experience",
      teamMembers: "Team Members",
      countriesServed: "Countries Served",
      happyClients: "Happy Clients",
    },
    qualityCommitment: {
      title: "Our Quality Commitment",
      qualityMaterials: {
        title: "Premium Materials",
        description:
          "We use only premium fabrics and materials from trusted suppliers.",
      },
      rigorousTesting: {
        title: "Rigorous Testing",
        description: "Every batch undergoes comprehensive quality controls.",
      },
      ethicalProduction: {
        title: "Ethical Production",
        description:
          "Fair wages and safe working conditions for all employees.",
      },
    },
    fallback: {
      factoryTitle: "Our Factory",
      factoryContent:
        "Our state-of-the-art manufacturing facility spans over 10,000 square meters and is equipped with the latest machinery for cutting, sewing, and printing.\n\nWe maintain strict quality control standards at every stage of production, ensuring that every garment meets our high-quality benchmarks.",
      factoryAlt: "Factory",
      teamTitle: "Our Team",
      teamContent:
        "With over 200 skilled workers and a dedicated management team, we have the capacity and expertise to handle orders of any size.\n\nOur team includes experienced designers, pattern makers, and quality control specialists who work together to bring your vision to life.",
      teamAlt: "Team",
    },
  },
  certifications: {
    title: "Our Certifications",
    subtitle:
      "We meet the highest standards in quality and ethical manufacturing. Our certificates underline our commitment to excellence.",
    issuedBy: "Issued by",
    validUntil: "Valid until",
    emptyState: "No certifications are currently available.",
  },
  customization: {
    title: "Customization Options",
    subtitle:
      "We offer numerous ways to make your sportswear unique. From custom designs to personalized details — we take care of it.",
    detailedGuide: "Detailed Customization Guide",
    availableOptions: "Available Options",
    process: {
      title: "Our Customization Process",
      step1: {
        title: "Submit Design",
        description:
          "Send us your files (AI, PSD, PDF) or describe your requirements. Our team reviews everything and confirms the details.",
      },
      step2: {
        title: "Sample Production",
        description:
          "We create a sample according to your specifications for approval. This ensures the final product meets your expectations.",
      },
      step3: {
        title: "Sample Approval",
        description:
          "Review the sample and provide feedback. We adjust everything until you are fully satisfied.",
      },
      step4: {
        title: "Series Production",
        description:
          "After approval, we start series production. Regular updates keep you informed of the progress.",
      },
    },
    cta: {
      title: "Ready to Customize?",
      subtitle:
        "Contact us today to discuss your requirements and receive a free quote.",
      button: "Start a Custom Order",
    },
    types: {
      design: {
        title: "Custom Designs",
        description:
          "Upload your graphics or work with our team to create unique patterns and motifs.",
      },
      names: {
        title: "Names & Numbers",
        description:
          "Add player names, numbers, and logos via professional transfer printing or embroidery.",
      },
      printing: {
        title: "Printing Methods",
        description:
          "Choose between sublimation, screen printing, DTG, or embroidery — matching design and budget.",
      },
      sizing: {
        title: "Custom Sizing",
        description:
          "We offer standard sizes as well as custom size charts to your requirements.",
      },
    },
  },
  policies: {
    title: "Minimum Quantities & Lead Times",
    subtitle:
      "Transparent information on minimum order quantities and production timeframes.",
    moq: {
      title: "Minimum Order Quantities",
      productType: "Product Type",
      moq: "MOQ",
      notes: "Notes",
      emptyState: "No MOQ information available",
    },
    leadTime: {
      title: "Production Times",
      stage: "Stage",
      timeline: "Timeline",
      emptyState: "No lead time information available",
      stageLabels: {
        sample: "Sample",
        production: "Production",
        shipping: "Shipping",
      },
    },
    shipping: {
      title: "Shipping Information",
      express: {
        title: "Express Shipping",
        description: "3–7 business days worldwide with DHL, FedEx, or UPS.",
      },
      sea: {
        title: "Sea Freight",
        description:
          "Cost-effective option for large orders. 20–40 days depending on destination.",
      },
      air: {
        title: "Air Freight",
        description:
          "Good balance between speed and cost. 7–14 days to most destinations.",
      },
    },
    note: "Note: Lead times may vary depending on complexity, customization, and current capacity. Express orders are available for an additional fee. Contact us for exact timelines.",
  },
  cta: {
    title: "Ready for your order?",
    subtitle:
      "Get a free quote within 24 hours. Our team is happy to help you create custom sportswear.",
    button: "Request a Quote",
  },
  footer: {
    quickLinks: "Quick Links",
    contact: "Contact",
    followUs: "Follow Us",
    copyright: "All rights reserved.",
    emailLabel: "Email",
    phoneLabel: "Phone",
    addressLabel: "Address",
  },
  contact: {
    badge: "Get In Touch",
    title: "Contact Us",
    subtitle:
      "Get in touch for a free quote or questions about products and services. We respond within 24 hours.",
    infoTitle: "Contact Information",
    emailLabel: "Email",
    phoneLabel: "Phone",
    addressLabel: "Address",
    hoursLabel: "Business Hours",
    hoursValue: "Mo - Fr: 9:00 - 18:00\nSa: 9:00 - 13:00",
    connectTitle: "Connect with us",
    whatsappButton: "Chat on WhatsApp",
    whatsappAria: "Chat on WhatsApp",
    formTitle: "Send a Message",
    nameLabel: "Full Name",
    namePlaceholder: "John Doe",
    emailPlaceholder: "john@example.com",
    companyLabel: "Company (optional)",
    companyPlaceholder: "Your company",
    phonePlaceholder: "+1 234 567890",
    productInterestLabel: "Product Interest",
    productPlaceholder: "Select a product",
    productOptions: {
      jerseys: "Jerseys",
      shorts: "Shorts",
      shirts: "T-Shirts",
      socks: "Socks",
      sets: "Complete Sets",
      other: "Other",
    },
    quantityLabel: "Estimated Quantity",
    quantityPlaceholder: "e.g. 100 pieces",
    messageLabel: "Message",
    messagePlaceholder: "Describe your requirements...",
    submitButton: "Send Message",
    sendingButton: "Sending...",
    privacyText: "We respect your privacy and never share your data.",
    successTitle: "Thank you!",
    successMessage:
      "Your message has been sent successfully. We will get back to you within 24 hours.",
    successButton: "Send another message",
    validation: {
      nameRequired: "Name must be at least 2 characters",
      emailInvalid: "Please enter a valid email address",
      productRequired: "Please select a product interest",
      messageRequired: "Message must be at least 10 characters",
    },
    errors: {
      submitFailed: "Form could not be submitted",
      genericError: "Something went wrong. Please try again.",
    },
  },
  admin: {
    title: "Admin Dashboard",
    viewSite: "View Site",
    signOut: "Sign Out",
    nav: {
      dashboard: "Dashboard",
      products: "Products",
      customizations: "Customizations",
      certifications: "Certifications",
      policies: "Policies",
      about: "About Content",
      testimonials: "Testimonials",
      contacts: "Contact Inquiries",
      settings: "Settings",
    },
    actions: { add: "Add", edit: "Edit", delete: "Delete", view: "View" },
    status: {
      active: "Active",
      inactive: "Inactive",
      pending: "Pending",
      responded: "Responded",
      closed: "Closed",
    },
    login: {
      title: "Admin Login",
      description: "Sign in to access the dashboard",
      username: "Username",
      password: "Password",
      submit: "Sign In",
    },
  },
  common: {
    loading: "Loading...",
    error: "An error occurred. Please try again.",
    close: "Close",
    back: "Back",
    cancel: "Cancel",
    save: "Save",
    create: "Create",
    update: "Update",
    emptyState: "No data available.",
    viewDetails: "View details",
    required: "*",
    toggleMenu: "Toggle menu",
    backToHome: "Back to Home",
    socialFacebook: "Facebook",
    socialInstagram: "Instagram",
    socialLinkedIn: "LinkedIn",
  },
  testimonials: {
    badge: "Testimonials",
    title: "What Our Clients Say",
    subtitle:
      "Don't just take our word for it. Here's what our clients have to say about working with us.",
  },
  error: {
    notFoundTitle: "Page Not Found",
    notFoundMessage: "We couldn't find the page you were looking for.",
    genericTitle: "Something Went Wrong",
    genericMessage: "An unexpected error occurred.",
  },
};

export default en;
