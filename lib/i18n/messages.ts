import { blogPath, homePath, localePagePath, type Locale } from "./config";

export type NavLabels = {
  home: string;
  about: string;
  benefits: string;
  products: string;
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
  requestQuote: string;
  headerRequestQuote: string;
  menu: string;
  trustPillars: {
    pureOrganic: { title: string; desc: string };
    directFactory: { title: string; desc: string };
    exportReady: { title: string; desc: string };
    flexibleMoq: { title: string; desc: string };
  };
  b2bTitle: string;
  b2bSubtitle: string;
  b2bHighlights: string[];
  viewCatalogBtn: string;
  whyChooseTitle: string;
  whyChooseSubtitle: string;
  whyFeatures: { title: string; desc: string }[];
  shippingTitle: string;
  shippingSubtitle: string;
  shippingRegions: string[];
  oemTitle: string;
  oemSubtitle: string;
  oemSteps: { title: string; desc: string }[];
  partnerTitle: string;
  partnerSubtitle: string;
  testimonialsTitle: string;
  testimonialsSubtitle: string;
  testimonials: { quote: string; author: string; role: string; location: string }[];
};

const navLabels: Record<Locale, NavLabels> = {
  en: {
    home: "Home",
    about: "About",
    benefits: "Benefits",
    products: "Products",
    privateLabel: "Private Label",
    blog: "Blog",
    contact: "Contact",
    mainNav: "Main",
  },
  fr: {
    home: "Accueil",
    about: "À propos",
    benefits: "Bienfaits",
    products: "Produits",
    privateLabel: "Marque blanche",
    blog: "Blog",
    contact: "Contact",
    mainNav: "Navigation",
  },
  ar: {
    home: "الرئيسية",
    about: "من نحن",
    benefits: "الفوائد",
    products: "المنتجات",
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
    trustPillars: {
      pureOrganic: {
        title: "100% Pure and Organic",
        desc: "Sustainably harvested botanicals from the Atlas mountains and UNESCO Arganeraie biosphere.",
      },
      directFactory: {
        title: "Direct Moroccan Facility",
        desc: "Manufactured, formulated and packaged at source in Morocco with no intermediary markups.",
      },
      exportReady: {
        title: "Export Ready Compliance",
        desc: "Full international documentation: COA, MSDS, INCI declarations, and Certificate of Origin.",
      },
      flexibleMoq: {
        title: "Low MOQ and Bulk Drums",
        desc: "From 5 kg tubs and 100 retail units to full pallet air cargo and 20ft sea containers.",
      },
    },
    b2bTitle: "Wholesale Moroccan Beauty Products for Global Brands, Importers and Distributors",
    b2bSubtitle: "We supply premium hammam and botanical cosmetics crafted in Morocco to luxury hotel spas, wellness centers, cosmetic retailers and indie beauty brands across 50+ countries.",
    b2bHighlights: [
      "Cold-pressed virgin argan and prickly pear seed oils with certified purity",
      "Traditional olive oil black soap and Atlas mined ghassoul clay",
      "Turnkey private label: custom branding, screen printing and luxury packaging",
      "Door-to-door express courier or consolidated sea freight logistics",
    ],
    viewCatalogBtn: "Explore Full Wholesale Catalog",
    whyChooseTitle: "Why Choose Us for Moroccan Cosmetic Products and Private Label Lines?",
    whyChooseSubtitle: "Strict laboratory quality, ethical fair-trade sourcing, and end-to-end export capability tailored for demanding international cosmetics businesses.",
    whyFeatures: [
      {
        title: "Certified Laboratory Quality",
        desc: "Every production batch undergoes strict microbiological and physicochemical testing to guarantee unadulterated purity and stable pH.",
      },
      {
        title: "Women Cooperatives and Fair Trade",
        desc: "We source our virgin argan oil directly from certified women harvesting cooperatives in the Souss-Massa valley.",
      },
      {
        title: "Turnkey OEM and Private Label",
        desc: "Custom formulations, bespoke botanical fragrances, amber glass dropper bottles, aluminum tins and silk-screen printed jars.",
      },
      {
        title: "Worldwide Freight and Customs",
        desc: "Express air cargo with DHL and FedEx or palletized sea freight with complete customs clearance paperwork.",
      },
    ],
    shippingTitle: "Fast Lead Times and International Shipping to 50+ Countries",
    shippingSubtitle: "Reliable global distribution with express air freight (3 to 7 business days) or sea freight for commercial container volumes.",
    shippingRegions: ["Europe (EU)", "North America (USA and Canada)", "Gulf Cooperation Council (GCC)", "Asia-Pacific and Worldwide"],
    oemTitle: "4-Step Private Label and OEM Production Process",
    oemSubtitle: "From product selection to delivered branded cosmetics ready for retail shelves or luxury treatment rooms.",
    oemSteps: [
      { title: "1. Product and Scent Selection", desc: "Select base formulations, essential oil blends (eucalyptus, Damask rose, neroli) and bulk or retail sizes." },
      { title: "2. Sample Testing and Approval", desc: "Receive laboratory sample batches to test texture, fragrance, skin feel and stability." },
      { title: "3. Packaging and Label Design", desc: "Choose amber glass, PET jars or bulk tubs, and sign off on printed label proofs." },
      { title: "4. Production and Global Export", desc: "Batch manufacturing, quality control, export documentation and insured door-to-door shipping." },
    ],
    partnerTitle: "Your Trusted Partner for High-Quality Moroccan Organic Cosmetics",
    partnerSubtitle: "From boutique spas to international beauty chains, we deliver authentic Moroccan botanical excellence with complete export compliance.",
    testimonialsTitle: "Trusted by Luxury Spas and Cosmetic Distributors Worldwide",
    testimonialsSubtitle: "See why beauty brands, hotel groups and spa directors choose our Moroccan cosmetics for their professional treatments.",
    testimonials: [
      {
        quote: "We switched all our spa body rituals to their bulk Moroccan black soap and ghassoul. The quality difference is undeniable, and our therapists love the texture.",
        author: "Elena V.",
        role: "Spa and Wellness Director",
        location: "Dubai, UAE",
      },
      {
        quote: "Starting our private label argan oil line was seamless. They provided all COA and MSDS documents required for EU CPNP registration in days.",
        author: "Marcus T.",
        role: "Founder and Product Director",
        location: "London, UK",
      },
      {
        quote: "Reliable shipping, outstanding packaging, and authentic Moroccan origin. By far our most trusted cosmetic supplier from North Africa.",
        author: "Sophie D.",
        role: "Cosmetics Importer and Buyer",
        location: "Paris, France",
      },
    ],
  },
  fr: {
    heroEyebrow: "Vente en gros depuis le Maroc",
    audienceEyebrow: "Clients",
    explorePrivateLabel: "Découvrir la marque blanche",
    contactProduct: "Contact",
    blogLinkSteps: "Étapes du rituel hammam marocain",
    blogLinkKessa: "Guide du gant kessa",
    requestQuote: "Demander un devis",
    headerRequestQuote: "Devis",
    menu: "Menu",
    trustPillars: {
      pureOrganic: {
        title: "100% Pur et Biologique",
        desc: "Ingrédients botaniques récoltés de manière durable dans l'Atlas et la biosphère d'Arganeraie UNESCO.",
      },
      directFactory: {
        title: "Usine Directe au Maroc",
        desc: "Fabrication, formulation et conditionnement à la source au Maroc sans aucun intermédiaire.",
      },
      exportReady: {
        title: "Conformité Export Internationale",
        desc: "Dossier réglementaire complet : COA, FDS / MSDS, liste INCI et certificat d'origine.",
      },
      flexibleMoq: {
        title: "Faible MOQ et Fûts Vrac",
        desc: "Des seaux de 5 kg et 100 unités retail aux palettes complètes par fret aérien et conteneurs maritimes.",
      },
    },
    b2bTitle: "Produits de Beauté Marocains en Gros pour Marques, Importateurs et Distributeurs",
    b2bSubtitle: "Nous approvisionnons les spas d'hôtels de luxe, centres de bien-être et marques cosmétiques dans plus de 50 pays avec des soins de hammam authentiques.",
    b2bHighlights: [
      "Huiles vierges d'argan et de pépins de figue de barbarie pressées à froid d'une pureté certifiée",
      "Savon noir traditionnel à l'huile d'olive et argile rhassoul brute de l'Atlas",
      "Marque blanche clé en main : personnalisation de marque, sérigraphie et packaging haut de gamme",
      "Livraison express porte-à-porte par coursier ou fret maritime consolidé",
    ],
    viewCatalogBtn: "Découvrir le Catalogue Grossiste",
    whyChooseTitle: "Pourquoi Choisir Nos Produits Cosmétiques Marocains et Lignes de Marque Blanche ?",
    whyChooseSubtitle: "Qualité laboratoire stricte, approvisionnement équitable et logistique internationale pour marques cosmétiques exigeantes.",
    whyFeatures: [
      {
        title: "Qualité Certifiée en Laboratoire",
        desc: "Chaque lot de production subit des analyses microbiologiques et physico-chimiques strictes garantissant une pureté absolue et un pH équilibré.",
      },
      {
        title: "Coopératives Féminines et Commerce Équitable",
        desc: "Nous nous approvisionnons directement auprès de coopératives féminines berbères certifiées dans la vallée du Souss-Massa.",
      },
      {
        title: "OEM et Marque Blanche Clé en Main",
        desc: "Formulations personnalisées, parfums botaniques sur mesure, flacons compte-gouttes en verre ambré et pots sérigraphiés.",
      },
      {
        title: "Fret International et Dédouanement",
        desc: "Fret aérien express avec DHL et FedEx ou fret maritime palettisé avec l'ensemble des documents douaniers requis.",
      },
    ],
    shippingTitle: "Délais Courts et Expédition Internationale vers plus de 50 Pays",
    shippingSubtitle: "Distribution mondiale fiable par fret aérien express (3 à 7 jours ouvrés) ou conteneurs maritimes pour volumes industriels.",
    shippingRegions: ["Europe (UE)", "Amérique du Nord (USA et Canada)", "Pays du Golfe (CCG)", "Asie-Pacifique et International"],
    oemTitle: "Processus de Production en Marque Blanche et OEM en 4 Étapes",
    oemSubtitle: "De la sélection du produit à la livraison de cosmétiques prêts à la commercialisation ou aux soins spa.",
    oemSteps: [
      { title: "1. Sélection Produits et Parfums", desc: "Choisissez vos formules de base, huiles essentielles (eucalyptus, rose de Damas, néroli) et formats vrac ou retail." },
      { title: "2. Échantillons et Validation", desc: "Recevez des échantillons de laboratoire pour tester la texture, le parfum et la tenue sur la peau." },
      { title: "3. Packaging et Étiquetage", desc: "Sélectionnez vos contenants (verre ambré, PET, aluminium) et validez le bon à tirer (BAT) de vos étiquettes." },
      { title: "4. Fabrication et Export Mondial", desc: "Production du lot, contrôle qualité rigoureux, documentation export et expédition assurée." },
    ],
    partnerTitle: "Votre Partenaire de Confiance pour Cosmétiques Marocains de Haute Qualité",
    partnerSubtitle: "Des spas de luxe aux grandes marques internationales, nous offrons l'excellence botanique marocaine en toute conformité.",
    testimonialsTitle: "La Confiance des Spas de Luxe et Distributeurs Internationaux",
    testimonialsSubtitle: "Découvrez pourquoi les directeurs de spa et fondateurs de marques cosmétiques choisissent nos soins pour leurs protocoles.",
    testimonials: [
      {
        quote: "Nous avons converti tous les rituels corps de notre groupe de spas à leur savon noir et rhassoul en vrac. La différence de qualité est remarquable et nos praticiennes l'adorent.",
        author: "Elena V.",
        role: "Directrice Spa et Bien-être",
        location: "Dubaï, ÉAU",
      },
      {
        quote: "Le lancement de notre gamme d'huile d'argan en marque blanche s'est fait sans encombre. Tous les documents COA et MSDS requis pour le CPNP européen nous ont été fournis en un temps record.",
        author: "Marcus T.",
        role: "Fondateur et Directeur Produit",
        location: "Londres, Royaume-Uni",
      },
      {
        quote: "Expédition ponctuelle, packaging irréprochable et authenticité garantie. De loin notre fournisseur cosmétique le plus sérieux d'Afrique du Nord.",
        author: "Sophie D.",
        role: "Importatrice et Acheteuse Cosmétique",
        location: "Paris, France",
      },
    ],
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
    trustPillars: {
      pureOrganic: {
        title: "عضوي ونقي 100%",
        desc: "مكونات نباتية مستخلصة بأساليب مستدامة من جبال الأطلس ومحمية شجر الأركان المعترف بها من اليونسكو.",
      },
      directFactory: {
        title: "مباشرة من مصانعنا بالمغرب",
        desc: "تصنيع وتركيب وتعبئة مباشرة في منشأتنا بالمغرب دون وسطاء أو تكاليف إضافية.",
      },
      exportReady: {
        title: "معايير التصدير الدولية",
        desc: "ملفات تقنية ومخبرية كاملة: شهادات التحليل (COA)، صحائف السلامة (MSDS)، وقوائم (INCI) المعتمدة.",
      },
      flexibleMoq: {
        title: "كميات مرنة وبراميل جملة",
        desc: "من سطول 5 كجم و100 عبوة تجزئة إلى منصات الشحن الجوي الكاملة وحاويات الشحن البحري.",
      },
    },
    b2bTitle: "منتجات التجميل والعناية المغربية بالجملة للماركات والمستوردين والموزعين الدوليين",
    b2bSubtitle: "نوفر أفخر مستحضرات الحمام المغربي والزيوت الطبيعية لمنتجعات السبا الفاخرة، الفنادق، وماركات التجميل العالمية في أكثر من 50 دولة حول العالم.",
    b2bHighlights: [
      "زيت أركان وزيت بذور التين الشوكي المعصور على البارد بنقاء وأصالة معتمدة",
      "صابون بلدي مغربي أصيل بزيت الزيتون وطين الغاسول البركاني من جبال الأطلس",
      "خدمة تصنيع متكاملة للعلامات الخاصة: تعبئة وتغليف فاخر وطباعة ملصقات الهوية",
      "شحن جوي سريع لباب المقر أو شحن بحري مجمع لمختلف موانئ العالم",
    ],
    viewCatalogBtn: "تصفح كتالوج الجملة الكامل",
    whyChooseTitle: "لماذا تختار منشأتنا لتوريد منتجات التجميل المغربية وتصنيع العلامة الخاصة؟",
    whyChooseSubtitle: "جودة مخبرية صارمة، شراكات مباشرة مع التعاونيات النسائية، وجاهزية كاملة للتصدير الدولي وفق أعلى المعايير.",
    whyFeatures: [
      {
        title: "جودة مخبرية معتمدة",
        desc: "يخضع كل تشغيل إنتاجي لتحاليل ميكروبيولوجية وكيميائية دقيقة لضمان النقاء التام وتوازن درجة الحموضة pH.",
      },
      {
        title: "تعاونيات نسوية وتجارة عادلة",
        desc: "نتعامل مباشرة مع التعاونيات النسائية المعتمدة لجمع الأركان في سهل سوس-ماسة لدعم التنمية المستدامة.",
      },
      {
        title: "تصنيع متكامل للعلامة الخاصة (OEM)",
        desc: "تركيبات مخصصة، عطور نباتية مميزة، قنينات قطارة زجاجية معتمة، وعلب فاخرة بطباعة حريرية لشعاركم.",
      },
      {
        title: "شحن دولي وتخليص جمركي",
        desc: "شحن جوي سريع مع DHL و FedEx أو شحن بحري بالمنصات مع كافة الوثائق الجمركية وشهادات المنشأ.",
      },
    ],
    shippingTitle: "أوقات تسليم سريعة وشحن دولي لأكثر من 50 دولة",
    shippingSubtitle: "شبكة توزيع لوجستية سريعة وموثوقة عبر الشحن الجوي (3 إلى 7 أيام عمل) أو الشحن البحري للكميات التجارية الكبيرة.",
    shippingRegions: ["أوروبا (الاتحاد الأوروبي)", "أمريكا الشمالية (الولايات المتحدة وكندا)", "دول مجلس التعاون الخليجي", "آسيا والمحيط الهادئ ودول العالم"],
    oemTitle: "مراحل تصنيع العلامة الخاصة والتوريد بالجملة في 4 خطوات",
    oemSubtitle: "من اختيار المنتج والتركيبة إلى استلام عبواتكم التجميلية الجاهزة للبيع في المتاجر أو الاستخدام في السبا.",
    oemSteps: [
      { title: "1. اختيار المنتجات والعطور", desc: "حدد التركيبات الأساسية، والزيوت العطرية (الأوكالبتوس، الورد الجوري، الزهر)، وأحجام العبوات." },
      { title: "2. فحص العينات واعتمادها", desc: "استلم عينات مخبرية لاختبار القوام والرائحة وملاءمتها لمعايير علامتكم التجارية." },
      { title: "3. تصميم التغليف والملصقات", desc: "اختر العبوات الملائمة (زجاج كهرماني، PET، ألمنيوم) واعتمد تصميم الملصق النهائي." },
      { title: "4. الإنتاج والتصدير الدولي", desc: "بدء التصنيع، مراقبة الجودة، تجهيز وثائق التصدير، والشحن الآمن المؤمن لباب مستودعكم." },
    ],
    partnerTitle: "شريككم الموثوق لمنتجات التجميل والحمام المغربي الأصيلة عالية الجودة",
    partnerSubtitle: "من مراكز السبا الفاخرة إلى سلاسل التوزيع الدولية، نوفر الأصالة المغربية مع جاهزية تامة لكافة متطلبات التصدير.",
    testimonialsTitle: "ثقة كبرى مراكز السبا وموزعي مستحضرات التجميل حول العالم",
    testimonialsSubtitle: "اكتشف لماذا تختار أفخم المنتجعات وماركات العناية منتجاتنا المغربية الطبيعية لطقوسها العلاجية.",
    testimonials: [
      {
        quote: "قمنا بتحويل كافة طقوس الجسم في مراكز السبا التابعة لنا إلى الصابون البلدي والغاسول من جهتهم. الفرق في الجودة ملموس ومعالجاتنا معجبات جداً بالقوام.",
        author: "إيلينا ف.",
        role: "مديرة السبا والعافية",
        location: "دبي، الإمارات العربية المتحدة",
      },
      {
        quote: "إطلاق خط زيت الأركان بعلامتنا الخاصة كان سلساً وممتازاً. وفروا لنا جميع شهادات التحليل ووثائق MSDS المطلوبة لتسجيل CPNP الأوروبي في أيام قليلة.",
        author: "ماركوس ت.",
        role: "مؤسس ومدير المنتجات",
        location: "لندن، المملكة المتحدة",
      },
      {
        quote: "دقة في مواعيد الشحن، تغليف وتعبئة راقية، وأصالة مغربية 100%. بدون شك أفضل مورد للمستحضرات الطبيعية نتعامل معه من شمال أفريقيا.",
        author: "صوفي د.",
        role: "مستوردة ومسؤولة مشتريات تجميل",
        location: "باريس، فرنسا",
      },
    ],
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
  slug?: string;
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
  sitemap: string;
};

const footerUi: Record<Locale, FooterUiMessages> = {
  en: {
    aboutHeading: "About",
    aboutBlurb:
      "Moroccan Hammam Products makes and exports the products of the Moroccan hammam: black soap, ghassoul clay, kessa gloves, argan oil and rose water. Wholesale and private label for spas, retailers and beauty brands worldwide.",
    productsHeading: "Products",
    products: [
      { label: "Moroccan black soap", slug: "moroccan-black-soap", benefitsId: "black-soap" },
      { label: "Ghassoul clay", slug: "ghassoul-clay", benefitsId: "ghassoul" },
      { label: "Kessa gloves", slug: "kessa-exfoliating-gloves", benefitsId: "kessa" },
      { label: "Argan oil", slug: "argan-and-prickly-pear-oil", benefitsId: "argan-oil" },
      { label: "Rose water", slug: "rose-water-nila-aker-fassi", benefitsId: "rose-water" },
      { label: "Hammam kits", slug: "hammam-kits", page: "private-label" },
    ],
    companyHeading: "Company",
    contactHeading: "Contact",
    whatsAppLabel: "WhatsApp",
    whatsAppFloatLabel: "Chat on WhatsApp",
    hours: "Mon to Sat, 9:00 to 18:00 (Morocco time)",
    officeAddress: "Marrakech, Morocco",
    rightsReserved: "All rights reserved.",
    sitemap: "Sitemap",
  },
  fr: {
    aboutHeading: "À propos",
    aboutBlurb:
      "Moroccan Hammam Products fabrique et exporte les produits du hammam marocain : savon noir, ghassoul, gants kessa, huile d'argan et eau de rose. Vente en gros et marque blanche pour spas, distributeurs et marques beauté dans le monde entier.",
    productsHeading: "Produits",
    products: [
      { label: "Savon noir marocain", slug: "moroccan-black-soap", benefitsId: "black-soap" },
      { label: "Ghassoul (argile)", slug: "ghassoul-clay", benefitsId: "ghassoul" },
      { label: "Gants kessa", slug: "kessa-exfoliating-gloves", benefitsId: "kessa" },
      { label: "Huile d'argan", slug: "argan-and-prickly-pear-oil", benefitsId: "argan-oil" },
      { label: "Eau de rose", slug: "rose-water-nila-aker-fassi", benefitsId: "rose-water" },
      { label: "Kits hammam", slug: "hammam-kits", page: "private-label" },
    ],
    companyHeading: "Entreprise",
    contactHeading: "Contact",
    whatsAppLabel: "WhatsApp",
    whatsAppFloatLabel: "Discuter sur WhatsApp",
    hours: "Lun.–sam., 9 h–18 h (heure du Maroc)",
    officeAddress: "Marrakech, Maroc",
    rightsReserved: "Tous droits réservés.",
    sitemap: "Plan du site",
  },
  ar: {
    aboutHeading: "من نحن",
    aboutBlurb:
      "«منتجات الحمام المغربي» تصنع وتصدّر الصابون الأسود والغاسول وكيسة التقشير وزيت الأركان وماء الورد. بيع بالجملة وعلامة خاصة للمنتجعات والموزّعين وعلامات التجميل حول العالم.",
    productsHeading: "المنتجات",
    products: [
      { label: "الصابون الأسود المغربي", slug: "moroccan-black-soap", benefitsId: "black-soap" },
      { label: "طين الغاسول", slug: "ghassoul-clay", benefitsId: "ghassoul" },
      { label: "كيسة التقشير", slug: "kessa-exfoliating-gloves", benefitsId: "kessa" },
      { label: "زيت الأركان", slug: "argan-and-prickly-pear-oil", benefitsId: "argan-oil" },
      { label: "ماء الورد", slug: "rose-water-nila-aker-fassi", benefitsId: "rose-water" },
      { label: "أطقم الحمام", slug: "hammam-kits", page: "private-label" },
    ],
    companyHeading: "الشركة",
    contactHeading: "اتصل بنا",
    whatsAppLabel: "واتساب",
    whatsAppFloatLabel: "محادثة على واتساب",
    hours: "الإثنين–السبت، 9:00–18:00 (توقيت المغرب)",
    officeAddress: "مراكش، المغرب",
    rightsReserved: "جميع الحقوق محفوظة.",
    sitemap: "خريطة الموقع",
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
      "Tell us your products and destination — we reply from Marrakech within 48 hours.",
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
      "Indiquez vos produits et destination — réponse depuis Marrakech sous 48 h.",
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
    ctaSubtitle: "أخبرنا بالمنتجات والوجهة — نرد من مراكش خلال 48 ساعة.",
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
  privacyPolicyLink: string;
  mapTitle: string;
  sendError: string;
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
    officeAddress: "Marrakech, Morocco",
    workshopAddress: "Marrakech, Morocco",
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
    privacyNote: "We use your details only to answer your request.",
    privacyPolicyLink: "Privacy policy",
    mapTitle: "Moroccan Hammam Products office on Google Maps",
    sendError:
      "We could not send your message right now. Please try again or contact us on WhatsApp.",
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
    officeAddress: "Marrakech, Maroc",
    workshopAddress: "Marrakech, Maroc",
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
    privacyNote: "Vos données servent uniquement à répondre à votre demande.",
    privacyPolicyLink: "Politique de confidentialité",
    mapTitle: "Bureau Moroccan Hammam Products sur Google Maps",
    sendError:
      "Impossible d'envoyer votre message pour le moment. Réessayez ou contactez-nous sur WhatsApp.",
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
    officeAddress: "مراكش، المغرب",
    workshopAddress: "مراكش، المغرب",
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
    privacyNote: "نستخدم بياناتك فقط للرد على طلبك.",
    privacyPolicyLink: "سياسة الخصوصية",
    mapTitle: "موقع Moroccan Hammam Products على خرائط Google",
    sendError: "تعذّر إرسال رسالتك الآن. أعد المحاولة أو تواصل معنا عبر واتساب.",
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

export type ProductUiMessages = {
  viewDetails: string;
  requestQuote: string;
  chatWhatsApp: string;
  requestSamples: string;
  keySpecs: string;
  benefitsTitle: string;
  howToUseTitle: string;
  variantsTitle: string;
  wholesaleHighlightsTitle: string;
  faqTitle: string;
  relatedTitle: string;
  allProducts: string;
  productsBreadcrumb: string;
  catalogTitle: string;
  catalogSubtitle: string;
  catalogEyebrow: string;
  readyToOrderTitle: string;
  readyToOrderBody: string;
  inquireAboutProduct: string;
  heroTitle: string;
  heroBreadcrumb: string;
  trustOrganic: string;
  trustCrueltyFree: string;
  trustShipping: string;
  trustMoq: string;
  categoriesEyebrow: string;
  categoriesTitle: string;
  categoriesSubtitle: string;
  reliableSupplierTitle: string;
  reliableSupplierBody: string;
  privateLabelBtn: string;
  getQuoteBtn: string;
};

const productUi: Record<Locale, ProductUiMessages> = {
  en: {
    viewDetails: "View details",
    requestQuote: "Request wholesale quote",
    chatWhatsApp: "Chat on WhatsApp",
    requestSamples: "Request samples",
    keySpecs: "Technical specifications",
    benefitsTitle: "Key benefits and properties",
    howToUseTitle: "Hammam ritual and application guide",
    variantsTitle: "Available formats and scents",
    wholesaleHighlightsTitle: "Wholesale and private label options",
    faqTitle: "Frequently asked questions",
    relatedTitle: "Complete your hammam ritual",
    allProducts: "Explore full collection",
    productsBreadcrumb: "Products",
    catalogTitle: "Wholesale Moroccan Hammam Products",
    catalogSubtitle:
      "Authentic Moroccan hammam essentials crafted in Morocco for spas, luxury hotels, and private label beauty brands worldwide.",
    catalogEyebrow: "Wholesale Collection",
    readyToOrderTitle: "Ready to stock authentic Moroccan hammam products?",
    readyToOrderBody:
      "Send us your target quantities and destination. Receive direct wholesale pricing and lead times within 24 to 48 hours.",
    inquireAboutProduct: "Hello, I would like to inquire about wholesale pricing and samples for:",
    heroTitle: "Our Organic Moroccan Beauty Products",
    heroBreadcrumb: "Products",
    trustOrganic: "Based on 100% Organic",
    trustCrueltyFree: "100% Cruelty-Free and Vegan",
    trustShipping: "Worldwide Shipping",
    trustMoq: "Low MOQ — Bulk and Private Label",
    categoriesEyebrow: "Wholesale Directory",
    categoriesTitle: "Browse by Wholesale Category",
    categoriesSubtitle: "Explore focused catalog pages for our main Moroccan organic product families.",
    reliableSupplierTitle: "Looking for a Reliable Wholesale Supplier?",
    reliableSupplierBody: "Tell us your product needs, quantities and destination. We reply within 24 to 48 hours with a competitive quote.",
    privateLabelBtn: "Private Label",
    getQuoteBtn: "Get Quote",
  },
  fr: {
    viewDetails: "Voir les détails",
    requestQuote: "Demander un devis grossiste",
    chatWhatsApp: "Discuter sur WhatsApp",
    requestSamples: "Demander des échantillons",
    keySpecs: "Spécifications techniques",
    benefitsTitle: "Propriétés et bienfaits clés",
    howToUseTitle: "Protocole hammam et conseils d'application",
    variantsTitle: "Formats et déclinaisons disponibles",
    wholesaleHighlightsTitle: "Vente en gros et marque blanche",
    faqTitle: "Questions fréquentes",
    relatedTitle: "Complétez votre rituel hammam",
    allProducts: "Explorer toute la gamme",
    productsBreadcrumb: "Produits",
    catalogTitle: "Produits du Hammam Marocain en Gros",
    catalogSubtitle:
      "Les soins essentiels du rituel hammam fabriqués au Maroc pour spas, instituts, hôtels et marques de beauté à l'international.",
    catalogEyebrow: "Catalogue Grossiste",
    readyToOrderTitle: "Prêt à commander pour votre établissement ?",
    readyToOrderBody:
      "Transmettez-nous vos volumes et pays de livraison. Devis professionnel et délais garantis sous 24 à 48 heures.",
    inquireAboutProduct: "Bonjour, je souhaite un devis grossiste et des échantillons pour :",
    heroTitle: "Nos Produits de Beauté Marocains Biologiques",
    heroBreadcrumb: "Produits",
    trustOrganic: "À base de 100% Biologique",
    trustCrueltyFree: "100% Non Testé sur Animaux et Végan",
    trustShipping: "Livraison Mondiale Express",
    trustMoq: "Faible MOQ — Vrac et Marque Blanche",
    categoriesEyebrow: "Répertoire Grossiste",
    categoriesTitle: "Parcourir par Catégorie Grossiste",
    categoriesSubtitle: "Découvrez nos gammes ciblées de produits biologiques marocains pour professionnels.",
    reliableSupplierTitle: "À la recherche d'un Fournisseur Grossiste Fiable ?",
    reliableSupplierBody: "Indiquez-nous vos besoins en produits, quantités et destination. Nous vous répondrons sous 24 à 48 heures avec un devis compétitif.",
    privateLabelBtn: "Marque Blanche",
    getQuoteBtn: "Demander un Devis",
  },
  ar: {
    viewDetails: "عرض التفاصيل",
    requestQuote: "طلب عرض سعر بالجملة",
    chatWhatsApp: "محادثة عبر واتساب",
    requestSamples: "طلب عينات للفحص",
    keySpecs: "المواصفات الفنية للمنتج",
    benefitsTitle: "الخصائص والفوائد الأساسية",
    howToUseTitle: "طريقة الاستخدام في طقس الحمام",
    variantsTitle: "الخيارات والأحجام المتوفرة",
    wholesaleHighlightsTitle: "خيارات التوريد بالجملة والعلامة الخاصة",
    faqTitle: "الأسئلة الشائعة حول المنتج",
    relatedTitle: "أكمل طقوس الحمام المغربي",
    allProducts: "استكشف كافة المنتجات",
    productsBreadcrumb: "المنتجات",
    catalogTitle: "منتجات الحمام المغربي بالجملة",
    catalogSubtitle:
      "مستحضرات وأدوات الحمام المغربي الأصيلة المصنوعة بالمغرب للمنتجعات الفاخرة ومراكز السبا والماركات التجميلية العالمية.",
    catalogEyebrow: "كتالوج الجملة والتصدير",
    readyToOrderTitle: "هل أنتم مستعدون لتوريد مستحضرات الحمام المغربي الأصيلة؟",
    readyToOrderBody:
      "أرسلوا لنا قائمة المنتجات المطلوبة وبلد الاستلام، وسنوافيكم بأسعار الجملة المباشرة وجدول الشحن خلال 24 إلى 48 ساعة.",
    inquireAboutProduct: "مرحباً، أود الاستفسار عن أسعار الجملة والعينات لمنتج:",
    heroTitle: "منتجات التجميل والعناية المغربية العضوية",
    heroBreadcrumb: "المنتجات",
    trustOrganic: "مستخلصات عضوية وطبيعية 100%",
    trustCrueltyFree: "نباتي وخالٍ من القسوة 100%",
    trustShipping: "شحن دولي سريع لجميع الدول",
    trustMoq: "كميات طلب مرنة — جملة وماركة خاصة",
    categoriesEyebrow: "دليل الأصناف بالجملة",
    categoriesTitle: "تصفح حسب فئات الجملة",
    categoriesSubtitle: "اكتشف تشكيلات منتجاتنا المخصصة للسبا وماركات التجميل العالمية مباشرة من المغرب.",
    reliableSupplierTitle: "تبحث عن مورد جملة موثوق ومباشر من المغرب؟",
    reliableSupplierBody: "أرسل لنا احتياجاتك من المنتجات والكميات والوجهة، وسنرد عليك خلال 24 إلى 48 ساعة بعرض أسعار تنافسي.",
    privateLabelBtn: "ماركة خاصة",
    getQuoteBtn: "طلب تسعيرة",
  },
};

export function getProductUi(locale: Locale): ProductUiMessages {
  return productUi[locale];
}
