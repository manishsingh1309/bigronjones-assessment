/**
 * Official Video Assets for BigRonJones® Two-Funnel Conversion Architecture
 * Client Instructions Reference: James Hendrix & Big Ron Jones
 * 
 * 1. Welcome Video: Insert of the Final Confirmation Page (NOT the $199 purchase, MFA or WWP)
 * 2. Purchase Video: Insert on the Confirmation page only if they pay for the downsell of $199
 * 3. Purchase Video Variant 1: Insert at top of Confirmation Page upon purchasing Men's Fitness Alliance (Hero Section)
 * 4. Purchase Video Women: Insert at top of Confirmation Page upon purchasing Woman Wellness Program (Hero Section)
 * 5. Special Offer: Insert at the top of the Upsell page offering 2 programs of their choice
 * 6. Special Offer - Bands: Insert at the top of the upsell page after the Bands Purchase
 */

export interface FunnelVideoConfig {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  poster: string;
  streamUrl: string;
  fallbackUrl: string;
  shareUrl: string;
}

export const FUNNEL_VIDEOS: Record<string, FunnelVideoConfig> = {
  // 1. Welcome Video (Final Confirmation Page for Standard/Primary purchases, NOT $199, NOT MFA, NOT WWP)
  welcome: {
    id: "welcome",
    badge: "OFFICIAL WELCOME BRIEFING • COACH RON JONES",
    title: "WELCOME TO THE BIGRONJONES® ECOSYSTEM",
    subtitle: "Watch this personal welcome briefing from Coach Ron before entering your member portal.",
    poster: "/video/welcome-poster.jpg",
    streamUrl:
      "https://dl.dropboxusercontent.com/scl/fo/hg308v1mw7kqgnxuxcouy/ACz8q9e4IieCeqc2zjOwC0E/1.%20WELCOME%20VIDEO.mp4?dl=1&rlkey=tdjhbbtazv9ebuw5d25un6jzh",
    fallbackUrl:
      "https://www.dropbox.com/scl/fo/hg308v1mw7kqgnxuxcouy/AI1I-LCaPHPzOCh3cu6GHTQ?dl=0&e=1&preview=1.+WELCOME+VIDEO.mp4&rlkey=tdjhbbtazv9ebuw5d25un6jzh&st=y9fw69md",
    shareUrl:
      "https://www.dropbox.com/scl/fo/hg308v1mw7kqgnxuxcouy/AI1I-LCaPHPzOCh3cu6GHTQ?dl=0&e=1&preview=1.+WELCOME+VIDEO.mp4&rlkey=tdjhbbtazv9ebuw5d25un6jzh&st=y9fw69md",
  },

  // 2. Purchase Video (Confirmation page ONLY if they pay for the downsell of $199)
  downsellPurchase: {
    id: "downsellPurchase",
    badge: "DIY PROTOCOL BRIEFING • COACH RON JONES",
    title: "YOUR SELF-DIRECTED TRAINING ROADMAP",
    subtitle: "Important guidance on executing your DIY protocol independently with maximum consistency.",
    poster: "/video/welcome-poster.jpg",
    streamUrl:
      "https://dl.dropboxusercontent.com/scl/fo/hg308v1mw7kqgnxuxcouy/AK9GkphgtfMt7JC2Wb8gcFw/2.%20PURCHASE%20VIDEO.mp4?dl=1&rlkey=tdjhbbtazv9ebuw5d25un6jzh",
    fallbackUrl:
      "https://www.dropbox.com/scl/fo/hg308v1mw7kqgnxuxcouy/AI1I-LCaPHPzOCh3cu6GHTQ?dl=0&e=1&preview=2.+PURCHASE+VIDEO.mp4&rlkey=tdjhbbtazv9ebuw5d25un6jzh&st=y9fw69md",
    shareUrl:
      "https://www.dropbox.com/scl/fo/hg308v1mw7kqgnxuxcouy/AI1I-LCaPHPzOCh3cu6GHTQ?dl=0&e=1&preview=2.+PURCHASE+VIDEO.mp4&rlkey=tdjhbbtazv9ebuw5d25un6jzh&st=y9fw69md",
  },

  // 3. Purchase Video Variant 1 (Top of Confirmation Page upon purchasing Men's Fitness Alliance in Hero Section)
  mfaVariant: {
    id: "mfaVariant",
    badge: "MEN'S FITNESS ALLIANCE • EXECUTIVE ORIENTATION",
    title: "WELCOME TO THE ALLIANCE BROTHERHOOD",
    subtitle: "Watch this private orientation from Big Ron Jones for accepted executive coaching members.",
    poster: "/video/welcome-poster.jpg",
    streamUrl:
      "https://dl.dropboxusercontent.com/scl/fo/hg308v1mw7kqgnxuxcouy/AJsxgBxk6gIkIsXJpNNgWak/3.%20PURCHASE%20VIDEO%20VARIANT%201.mp4?dl=1&rlkey=tdjhbbtazv9ebuw5d25un6jzh",
    fallbackUrl:
      "https://www.dropbox.com/scl/fo/hg308v1mw7kqgnxuxcouy/AI1I-LCaPHPzOCh3cu6GHTQ?dl=0&e=1&preview=3.+PURCHASE+VIDEO+VARIANT+1.mp4&rlkey=tdjhbbtazv9ebuw5d25un6jzh&st=y9fw69md",
    shareUrl:
      "https://www.dropbox.com/scl/fo/hg308v1mw7kqgnxuxcouy/AI1I-LCaPHPzOCh3cu6GHTQ?dl=0&e=1&preview=3.+PURCHASE+VIDEO+VARIANT+1.mp4&rlkey=tdjhbbtazv9ebuw5d25un6jzh&st=y9fw69md",
  },

  // 4. Purchase Video Women (Top of Confirmation Page upon purchasing Woman Wellness Program in Hero Section)
  wwpWomen: {
    id: "wwpWomen",
    badge: "WOMEN'S WELLNESS PROGRAM • TRANSFORMATION ORIENTATION",
    title: "WELCOME TO WOMEN'S WELLNESS",
    subtitle: "Your direct onboarding orientation and next steps for dedicated female wellness oversight.",
    poster: "/video/welcome-poster.jpg",
    streamUrl:
      "https://dl.dropboxusercontent.com/scl/fo/hg308v1mw7kqgnxuxcouy/AHwYIuyGm-mW-JJnhU0xJF4/4.%20PURCHASE%20VIDEO%20WOMEN%20.mp4?dl=1&rlkey=tdjhbbtazv9ebuw5d25un6jzh",
    fallbackUrl:
      "https://www.dropbox.com/scl/fo/hg308v1mw7kqgnxuxcouy/AI1I-LCaPHPzOCh3cu6GHTQ?dl=0&e=1&preview=4.+PURCHASE+VIDEO+WOMEN+.mp4&rlkey=tdjhbbtazv9ebuw5d25un6jzh&st=y9fw69md",
    shareUrl:
      "https://www.dropbox.com/scl/fo/hg308v1mw7kqgnxuxcouy/AI1I-LCaPHPzOCh3cu6GHTQ?dl=0&e=1&preview=4.+PURCHASE+VIDEO+WOMEN+.mp4&rlkey=tdjhbbtazv9ebuw5d25un6jzh&st=y9fw69md",
  },

  // 5. Special Offer (Top of Upsell page offering 2 programs of their choice)
  specialOffer: {
    id: "specialOffer",
    badge: "SPECIAL OFFER • 20% COMPANION ACCELERATOR",
    title: "CHOOSE 2 COMPANION PROTOCOLS (20% OFF)",
    subtitle: "Watch Coach Ron explain how to pair two additional training disciplines into your athletic foundation.",
    poster: "/video/welcome-poster.jpg",
    streamUrl:
      "https://dl.dropboxusercontent.com/scl/fo/hg308v1mw7kqgnxuxcouy/AHwYltchzmsE1IujvEHhBdI/5.%20SPECIAL%20OFFER.mp4?dl=1&rlkey=tdjhbbtazv9ebuw5d25un6jzh",
    fallbackUrl:
      "https://www.dropbox.com/scl/fo/hg308v1mw7kqgnxuxcouy/AI1I-LCaPHPzOCh3cu6GHTQ?dl=0&e=1&preview=5.+SPECIAL+OFFER.mp4&rlkey=tdjhbbtazv9ebuw5d25un6jzh&st=y9fw69md",
    shareUrl:
      "https://www.dropbox.com/scl/fo/hg308v1mw7kqgnxuxcouy/AI1I-LCaPHPzOCh3cu6GHTQ?dl=0&e=1&preview=5.+SPECIAL+OFFER.mp4&rlkey=tdjhbbtazv9ebuw5d25un6jzh&st=y9fw69md",
  },

  // 6. Special Offer - Bands (Top of the upsell page after the Bands Purchase)
  specialOfferBands: {
    id: "specialOfferBands",
    badge: "SPECIAL OFFER • COMPLETE TRAINING PROTOCOL",
    title: "YOUR RESISTANCE KIT IS LOCKED IN",
    subtitle: "Watch Coach Ron break down your matched program and how your new band kit integrates with it.",
    poster: "/video/welcome-poster.jpg",
    streamUrl:
      "https://dl.dropboxusercontent.com/scl/fo/hg308v1mw7kqgnxuxcouy/AAqGdFS4rj2kxrtZzb72lo4/6.%20SPECIAL%20OFFER%20-%20BANDS.mp4?dl=1&rlkey=tdjhbbtazv9ebuw5d25un6jzh",
    fallbackUrl:
      "https://www.dropbox.com/scl/fo/hg308v1mw7kqgnxuxcouy/AI1I-LCaPHPzOCh3cu6GHTQ?dl=0&e=1&preview=6.+SPECIAL+OFFER+-+BANDS.mp4&rlkey=tdjhbbtazv9ebuw5d25un6jzh&st=y9fw69md",
    shareUrl:
      "https://www.dropbox.com/scl/fo/hg308v1mw7kqgnxuxcouy/AI1I-LCaPHPzOCh3cu6GHTQ?dl=0&e=1&preview=6.+SPECIAL+OFFER+-+BANDS.mp4&rlkey=tdjhbbtazv9ebuw5d25un6jzh&st=y9fw69md",
  },
};
