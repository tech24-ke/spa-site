// /site.config.ts
export const site = {
  brand: "Spa Lounge",
  baseUrl: "https://spa.tech24.co.ke",
  metaTitle: "Spa Lounge · Wellness, Massage & Beauty · Nairobi",
  metaDescription:
    "Luxury spa in Nairobi offering massages, facials, nails and wellness packages. Book on WhatsApp for same-day appointments.",
  address: "Riverside Drive, Nairobi",
  contact: {
    phone: "+254 748 699 460",
    email: "hello@tech24.co.ke",
    whatsapp: "254748699460",
  },
} as const;

export type Site = typeof site;
