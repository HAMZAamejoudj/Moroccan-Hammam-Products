import { blogPath, homePath, localePagePath, type Locale } from "./config";

export type NavLabels = {
  home: string;
  about: string;
  benefits: string;
  privateLabel: string;
  blog: string;
  contact: string;
  mainNav: string;
};

export type HomeUiMessages = {
  heroEyebrow: string;
  audienceEyebrow: string;
  explorePrivateLabel: string;
  contactProduct: string;
  blogLinkSteps: string;
  blogLinkKessa: string;
  /** Product cards, forms — full label */
  requestQuote: string;
  /** Header CTA — short so size matches across locales */
  headerRequestQuote: string;
  menu: string;
};

const navLabels: Record<Locale, NavLabels> = {
  en: {
    home: "Home",
    about: "About",
    benefits: "Benefits",
    privateLabel: "Private Label",
    blog: "Blog",
    contact: "Contact",
    mainNav: "Main",
  },
  fr: {
    home: "Accueil",
    about: "À propos",
    benefits: "Bienfaits",
    privateLabel: "Marque blanche",
    blog: "Blog",
    contact: "Contact",
    mainNav: "Navigation",
  },
  ar: {
    home: "الرئيسية",
    about: "من نحن",
    benefits: "الفوائد",
    privateLabel: "علامة خاصة",
    blog: "المدونة",
    contact: "اتصل بنا",
    mainNav: "القائمة الرئيسية",
  },
};

const homeUi: Record<Locale, HomeUiMessages> = {
  en: {
    heroEyebrow: "Wholesale from Morocco",
    audienceEyebrow: "Clients",
    explorePrivateLabel: "Explore private label",
    contactProduct: "Contact",
    blogLinkSteps: "Moroccan hammam treatment steps",
    blogLinkKessa: "Kessa glove guide",
    requestQuote: "Request a quote",
    headerRequestQuote: "Get a quote",
    menu: "Menu",
  },
  fr: {
    heroEyebrow: "Vente en gros depuis le Maroc",
    audienceEyebrow: "Clients",
    explorePrivateLabel: "Découvrir le marque blanche",
    contactProduct: "Contact",
    blogLinkSteps: "Étapes du rituel hammam marocain",
    blogLinkKessa: "Guide du gant kessa",
    requestQuote: "Demander un devis",
    headerRequestQuote: "Devis",
    menu: "Menu",
  },
  ar: {
    heroEyebrow: "بيع بالجملة من المغرب",
    audienceEyebrow: "عملاؤنا",
    explorePrivateLabel: "اكتشف العلامة الخاصة",
    contactProduct: "تواصل",
    blogLinkSteps: "خطوات الحمام المغربي",
    blogLinkKessa: "دليل كيسة التقشير",
    requestQuote: "طلب عرض سعر",
    headerRequestQuote: "عرض سعر",
    menu: "القائمة",
  },
};

export function getHomeUi(locale: Locale): HomeUiMessages {
  return homeUi[locale];
}

export type PrivateLabelUiMessages = {
  startProjectFooter: string;
};

const privateLabelUi: Record<Locale, PrivateLabelUiMessages> = {
  en: { startProjectFooter: "Start your private label project" },
  fr: { startProjectFooter: "Lancer votre projet marque blanche" },
  ar: { startProjectFooter: "ابدأ مشروع العلامة الخاصة" },
};

export function getPrivateLabelUi(locale: Locale): PrivateLabelUiMessages {
  return privateLabelUi[locale];
}

export function getNavLabels(locale: Locale): NavLabels {
  return navLabels[locale];
}

export type NavItem = { label: string; href: string };

export function getNavItems(locale: Locale): NavItem[] {
  const labels = navLabels[locale];
  return [
    { label: labels.home, href: homePath(locale) },
    { label: labels.about, href: localePagePath(locale, "about") },
    { label: labels.benefits, href: localePagePath(locale, "benefits") },
    { label: labels.privateLabel, href: localePagePath(locale, "private-label") },
    { label: labels.blog, href: blogPath(locale) },
    { label: labels.contact, href: localePagePath(locale, "contact") },
  ];
}

export type FooterProductLink = {
  label: string;
  /** Anchor id on the benefits page (`### [id]`) */
  benefitsId?: string;
  /** Page segment when not linking to a benefits anchor */
  page?: "private-label";
};

export type FooterUiMessages = {
  aboutHeading: string;
  aboutBlurb: string;
  productsHeading: string;
  products: FooterProductLink[];
  companyHeading: string;
  contactHeading: string;
  whatsAppLabel: string;
  whatsAppFloatLabel: string;
  hours: string;
  officeAddress: string;
  rightsReserved: string;
};

const footerUi: Record<Locale, FooterUiMessages> = {
  en: {
    aboutHeading: "About",
    aboutBlurb:
      "Moroccan Hammam Products makes and exports the products of the Moroccan hammam: black soap, ghassoul clay, kessa gloves, argan oil and rose water. Wholesale and private label for spas, retailers and beauty brands worldwide.",
    productsHeading: "Products",
    products: [
      { label: "Moroccan black soap", benefitsId: "black-soap" },
      { label: "Ghassoul clay", benefitsId: "ghassoul" },
      { label: "Kessa gloves", benefitsId: "kessa" },
      { label: "Argan oil", benefitsId: "argan-oil" },
      { label: "Rose water", benefitsId: "rose-water" },
      { label: "Hammam kits", page: "private-label" },
    ],
    companyHeading: "Company",
    contactHeading: "Contact",
    whatsAppLabel: "WhatsApp",
    whatsAppFloatLabel: "Chat on WhatsApp",
    hours: "Mon to Sat, 9:00 to 18:00 (Morocco time)",
    officeAddress: "Agadir, Souss-Massa, Morocco",
    rightsReserved: "All rights reserved.",
  },
  fr: {
    aboutHeading: "À propos",
    aboutBlurb:
      "Moroccan Hammam Products fabrique et exporte les produits du hammam marocain : savon noir, ghassoul, gants kessa, huile d'argan et eau de rose. Vente en gros et marque blanche pour spas, distributeurs et marques beauté dans le monde entier.",
    productsHeading: "Produits",
    products: [
      { label: "Savon noir marocain", benefitsId: "black-soap" },
      { label: "Ghassoul (argile)", benefitsId: "ghassoul" },
      { label: "Gants kessa", benefitsId: "kessa" },
      { label: "Huile d'argan", benefitsId: "argan-oil" },
      { label: "Eau de rose", benefitsId: "rose-water" },
      { label: "Kits hammam", page: "private-label" },
    ],
    companyHeading: "Entreprise",
    contactHeading: "Contact",
    whatsAppLabel: "WhatsApp",
    whatsAppFloatLabel: "Discuter sur WhatsApp",
    hours: "Lun.–sam., 9 h–18 h (heure du Maroc)",
    officeAddress: "Agadir, Souss-Massa, Maroc",
    rightsReserved: "Tous droits réservés.",
  },
  ar: {
    aboutHeading: "من نحن",
    aboutBlurb:
      "«منتجات الحمام المغربي» تصنع وتصدّر الصابون الأسود والغاسول وكيسة التقشير وزيت الأركان وماء الورد. بيع بالجملة وعلامة خاصة للمنتجعات والموزّعين وعلامات التجميل حول العالم.",
    productsHeading: "المنتجات",
    products: [
      { label: "الصابون الأسود المغربي", benefitsId: "black-soap" },
      { label: "طين الغاسول", benefitsId: "ghassoul" },
      { label: "كيسة التقشير", benefitsId: "kessa" },
      { label: "زيت الأركان", benefitsId: "argan-oil" },
      { label: "ماء الورد", benefitsId: "rose-water" },
      { label: "أطقم الحمام", page: "private-label" },
    ],
    companyHeading: "الشركة",
    contactHeading: "اتصل بنا",
    whatsAppLabel: "واتساب",
    whatsAppFloatLabel: "محادثة على واتساب",
    hours: "الإثنين–السبت، 9:00–18:00 (توقيت المغرب)",
    officeAddress: "أكادير، سوس ماسة، المغرب",
    rightsReserved: "جميع الحقوق محفوظة.",
  },
};

export function getFooterUi(locale: Locale): FooterUiMessages {
  return footerUi[locale];
}

export type BlogUiMessages = {
  indexSeoTitle: string;
  indexMetaDescription: string;
  indexH1: string;
  indexIntro: string;
  tableOfContents: string;
  ctaTitle: string;
  ctaSubtitle: string;
  requestQuote: string;
  seeBenefits: string;
  relatedArticles: string;
  viewAllArticles: string;
  faqTitle: string;
};

const blogUi: Record<Locale, BlogUiMessages> = {
  en: {
    indexSeoTitle: "Blog | Moroccan Hammam Products",
    indexMetaDescription:
      "Guides on sourcing Moroccan black soap, ghassoul clay, kessa gloves, spa protocols and private label hammam kits.",
    indexH1: "Blog",
    indexIntro:
      "Practical guides for spas, retailers and brands buying Moroccan hammam products wholesale.",
    tableOfContents: "On this page",
    ctaTitle: "Need wholesale prices or samples?",
    ctaSubtitle:
      "Tell us your products and destination — we reply from Agadir within 48 hours.",
    requestQuote: "Request a quote",
    seeBenefits: "See product benefits",
    relatedArticles: "Related articles",
    viewAllArticles: "View all articles",
    faqTitle: "FAQ",
  },
  fr: {
    indexSeoTitle: "Blog | Moroccan Hammam Products",
    indexMetaDescription:
      "Guides sur l'achat de savon noir, ghassoul, kessa, protocoles spa et kits hammam en marque blanche.",
    indexH1: "Blog",
    indexIntro:
      "Guides pratiques pour spas, distributeurs et marques qui achètent des produits hammam marocains en gros.",
    tableOfContents: "Sur cette page",
    ctaTitle: "Tarifs gros ou échantillons ?",
    ctaSubtitle:
      "Indiquez vos produits et destination — réponse depuis Agadir sous 48 h.",
    requestQuote: "Demander un devis",
    seeBenefits: "Voir les bienfaits produits",
    relatedArticles: "Articles connexes",
    viewAllArticles: "Voir tous les articles",
    faqTitle: "Questions fréquentes",
  },
  ar: {
    indexSeoTitle: "المدونة | منتجات الحمام المغربي",
    indexMetaDescription:
      "أدلة عملية لشراء الصابون الأسود والغاسول وكيسة التقشير وبروتوكولات المنتجعات وأطقم الحمام بالعلامة الخاصة.",
    indexH1: "المدونة",
    indexIntro:
      "أدلة عملية للمنتجعات والموزّعين والعلامات التي تشتري منتجات الحمام المغربي بالجملة.",
    tableOfContents: "في هذه الصفحة",
    ctaTitle: "تحتاج أسعار الجملة أو عينات؟",
    ctaSubtitle: "أخبرنا بالمنتجات والوجهة — نرد من أكادير خلال 48 ساعة.",
    requestQuote: "طلب عرض سعر",
    seeBenefits: "فوائد المنتجات",
    relatedArticles: "مقالات ذات صلة",
    viewAllArticles: "جميع المقالات",
    faqTitle: "الأسئلة الشائعة",
  },
};

export function getBlogUi(locale: Locale): BlogUiMessages {
  return blogUi[locale];
}

export type ContactUiMessages = {
  formHeading: string;
  tipsHeading: string;
  detailsHeading: string;
  visitHeading: string;
  faqTitle: string;
  whatsAppPhone: string;
  email: string;
  office: string;
  workshop: string;
  hours: string;
  officeAddress: string;
  workshopAddress: string;
  hoursValue: string;
  name: string;
  company: string;
  country: string;
  emailField: string;
  whatsAppField: string;
  iAmA: string;
  iNeed: string;
  products: string;
  quantity: string;
  message: string;
  selectPlaceholder: string;
  buyerSpa: string;
  buyerRetailer: string;
  buyerBrand: string;
  buyerDistributor: string;
  buyerOther: string;
  needBulk: string;
  needPrivateLabel: string;
  needSamples: string;
  productBlackSoap: string;
  productGhassoul: string;
  productKessa: string;
  productArgan: string;
  productPricklyPear: string;
  productRoseWater: string;
  productKits: string;
  productOther: string;
  submit: string;
  submitting: string;
  privacyNote: string;
  successMessage: string;
  whatsAppUs: string;
  fixErrors: string;
  errorNameRequired: string;
  errorCountryRequired: string;
  errorEmailRequired: string;
  errorProductsRequired: string;
};

const contactUi: Record<Locale, ContactUiMessages> = {
  en: {
    formHeading: "Quote form",
    tipsHeading: "Tips for a faster, more accurate quote",
    detailsHeading: "Contact details",
    visitHeading: "Visit us",
    faqTitle: "FAQ",
    whatsAppPhone: "WhatsApp / phone",
    email: "Email",
    office: "Office",
    workshop: "Workshop",
    hours: "Hours",
    officeAddress: "Agadir, Souss-Massa, Morocco",
    workshopAddress: "Agadir, Souss-Massa, Morocco",
    hoursValue: "Mon to Sat, 9:00 to 18:00 (Morocco time)",
    name: "Name",
    company: "Company",
    country: "Country of delivery",
    emailField: "Email",
    whatsAppField: "WhatsApp number",
    iAmA: "I am a",
    iNeed: "I need",
    products: "Products",
    quantity: "Approximate quantity",
    message: "Message",
    selectPlaceholder: "Select…",
    buyerSpa: "Spa or hammam",
    buyerRetailer: "Retailer",
    buyerBrand: "Beauty brand",
    buyerDistributor: "Distributor",
    buyerOther: "Other",
    needBulk: "Bulk",
    needPrivateLabel: "Private label",
    needSamples: "Samples",
    productBlackSoap: "black soap",
    productGhassoul: "ghassoul clay",
    productKessa: "kessa gloves",
    productArgan: "argan oil",
    productPricklyPear: "prickly pear oil",
    productRoseWater: "rose water",
    productKits: "kits",
    productOther: "other",
    submit: "Send my request",
    submitting: "Sending…",
    privacyNote:
      "We use your details only to answer your request. No newsletter unless you ask for it.",
    successMessage:
      "Thank you. We received your request and will reply within [48 hours]. For a faster answer, message us on WhatsApp.",
    whatsAppUs: "WhatsApp us",
    fixErrors: "Please fix the errors below.",
    errorNameRequired: "Name is required",
    errorCountryRequired: "Country is required",
    errorEmailRequired: "Valid email is required",
    errorProductsRequired: "Select at least one product",
  },
  fr: {
    formHeading: "Formulaire de devis",
    tipsHeading: "Conseils pour un devis plus rapide et précis",
    detailsHeading: "Coordonnées",
    visitHeading: "Nous rendre visite",
    faqTitle: "Questions fréquentes",
    whatsAppPhone: "WhatsApp / téléphone",
    email: "E-mail",
    office: "Bureau",
    workshop: "Atelier",
    hours: "Horaires",
    officeAddress: "Agadir, Souss-Massa, Maroc",
    workshopAddress: "Agadir, Souss-Massa, Maroc",
    hoursValue: "Lun.–sam., 9 h–18 h (heure du Maroc)",
    name: "Nom",
    company: "Société",
    country: "Pays de livraison",
    emailField: "E-mail",
    whatsAppField: "Numéro WhatsApp",
    iAmA: "Je suis",
    iNeed: "J'ai besoin de",
    products: "Produits",
    quantity: "Quantité approximative",
    message: "Message",
    selectPlaceholder: "Choisir…",
    buyerSpa: "Spa ou hammam",
    buyerRetailer: "Distributeur / retail",
    buyerBrand: "Marque beauté",
    buyerDistributor: "Grossiste",
    buyerOther: "Autre",
    needBulk: "Vente en gros",
    needPrivateLabel: "Marque blanche",
    needSamples: "Échantillons",
    productBlackSoap: "savon noir",
    productGhassoul: "ghassoul",
    productKessa: "gants kessa",
    productArgan: "huile d'argan",
    productPricklyPear: "huile de figue de barbarie",
    productRoseWater: "eau de rose",
    productKits: "kits",
    productOther: "autre",
    submit: "Envoyer ma demande",
    submitting: "Envoi…",
    privacyNote:
      "Vos données servent uniquement à répondre à votre demande. Pas de newsletter sans votre accord.",
    successMessage:
      "Merci. Nous avons bien reçu votre demande et répondrons sous [48 h]. Pour une réponse plus rapide, écrivez-nous sur WhatsApp.",
    whatsAppUs: "Nous écrire sur WhatsApp",
    fixErrors: "Corrigez les erreurs ci-dessous.",
    errorNameRequired: "Le nom est obligatoire",
    errorCountryRequired: "Le pays est obligatoire",
    errorEmailRequired: "E-mail valide obligatoire",
    errorProductsRequired: "Sélectionnez au moins un produit",
  },
  ar: {
    formHeading: "نموذج عرض السعر",
    tipsHeading: "نصائح لعرض أسرع وأدق",
    detailsHeading: "بيانات الاتصال",
    visitHeading: "زيارتنا",
    faqTitle: "الأسئلة الشائعة",
    whatsAppPhone: "واتساب / هاتف",
    email: "البريد",
    office: "المكتب",
    workshop: "الورشة",
    hours: "المواعيد",
    officeAddress: "أكادير، سوس ماسة، المغرب",
    workshopAddress: "أكادير، سوس ماسة، المغرب",
    hoursValue: "الإثنين–السبت، 9:00–18:00 (توقيت المغرب)",
    name: "الاسم",
    company: "الشركة",
    country: "بلد التسليم",
    emailField: "البريد الإلكتروني",
    whatsAppField: "رقم واتساب",
    iAmA: "أنا",
    iNeed: "أحتاج",
    products: "المنتجات",
    quantity: "الكمية التقريبية",
    message: "رسالة",
    selectPlaceholder: "اختر…",
    buyerSpa: "منتجع أو حمام",
    buyerRetailer: "تاجر تجزئة",
    buyerBrand: "علامة تجميل",
    buyerDistributor: "موزّع",
    buyerOther: "أخرى",
    needBulk: "جملة",
    needPrivateLabel: "علامة خاصة",
    needSamples: "عينات",
    productBlackSoap: "صابون أسود",
    productGhassoul: "غاسول",
    productKessa: "كيسة",
    productArgan: "زيت أركان",
    productPricklyPear: "زيت التين الشوكي",
    productRoseWater: "ماء الورد",
    productKits: "أطقم",
    productOther: "أخرى",
    submit: "إرسال الطلب",
    submitting: "جاري الإرسال…",
    privacyNote: "نستخدم بياناتك فقط للرد على طلبك. لا نشرة إخبارية إلا بطلبك.",
    successMessage:
      "شكراً. استلمنا طلبك وسنرد خلال [48 ساعة]. للرد الأسرع، راسلنا على واتساب.",
    whatsAppUs: "راسلنا على واتساب",
    fixErrors: "يرجى تصحيح الأخطاء أدناه.",
    errorNameRequired: "الاسم مطلوب",
    errorCountryRequired: "البلد مطلوب",
    errorEmailRequired: "بريد إلكتروني صالح مطلوب",
    errorProductsRequired: "اختر منتجاً واحداً على الأقل",
  },
};

export function getContactUi(locale: Locale): ContactUiMessages {
  return contactUi[locale];
}
