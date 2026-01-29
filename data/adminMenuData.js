module.exports = [
  /* ================= DASHBOARD ================= */
  {
    id: 1,
    name: "Dashboard Admin",
    icon: "la-home",
    routePath: "/admin/dashboard",
    active: "active",
  },

  /* ================= HOME SETTINGS (PRIORITY) ================= */
  {
    id: 15,
    name: "Manage Home-Settings",
    icon: "la-book",
    children: [
      { id: "15-1", name: "Page Seo Settings", routePath: "/admin/home-settings" },
      { id: "15-2", name: "About Us settings", routePath: "/admin/about-us" },
      { id: "15-3", name: "Manage Usp Section", routePath: "/admin/usp-section" },
      { id: "15-4", name: "Manage Research Section", routePath: "/admin/research-infocus" },
      { id: "15-5", name: "Manage Program Offered ", routePath: "/admin/program-offered" },
      { id: "15-6", name: "Manage Happenings ", routePath: "/admin/happenings" },
      { id: "15-7", name: "Happenings Seo Settings", routePath: "/admin/happenings-seo" },
      { id: "15-8", name: "Manage Events", routePath: "/admin/events" },
      { id: "15-9", name: "Manage Announcements", routePath: "/admin/announcements" },
      { id: "15-10", name: "Manage International Association", routePath: "/admin/international-association" },
      { id: "15-11", name: "Manage Placemen Alliance", routePath: "/admin/placement-alliance" },
      { id: "15-12", name: "Manage New-Announcement", routePath: "/admin/new-annoucement" },
      { id: "15-13", name: "Manage Home-Connect", routePath: "/admin/home-connect" },
    ],
  },

  /* ================= STATIC / INFO ================= */
  { id: 2, name: "Mandatory Disclosure", icon: "la-building", routePath: "/admin/mandatory-disclosure" },
  { id: 3, name: "About IMT Hyderabad", icon: "la-wallet", routePath: "/admin/about-imt-hyderabad" },
  { id: 4, name: "International Relation", icon: "la-wallet", routePath: "/admin/international-relations" },

  /* ================= GENERAL ================= */
  { id: 5, name: "Manage Others", icon: "la-id-badge", routePath: "/admin/others" },

  /* ================= PEOPLE ================= */
  {
    id: 7,
    name: "Manage Faculty",
    icon: "la-user-tie",
    children: [
      { id: "7-1", name: "Faculty Page Seo Settings", routePath: "/admin/faculty-seo-settings" },
      { id: "7-2", name: "Faculty Page Details Seo Settings", routePath: "/admin/faculty-details-seo-settings" },
      { id: "7-3", name: "List Faculty", routePath: "/admin/list-faculty" },
    ],
  },

  /* ================= ACADEMICS & RESOURCES ================= */
  {
    id: 8,
    name: "Manage LRC",
    icon: "la-book",
    children: [
      { id: "8-1", name: "LRC Page Details", routePath: "/admin/lrc-page-details" },
      { id: "8-2", name: "List LRC FAQs", routePath: "/admin/lrc-faqs" },
    ],
  },

  {
    id: 9,
    name: "Manage Awards && Recognitions",
    icon: "la-book",
    children: [
      { id: "9-1", name: "Page Seo Settings", routePath: "/admin/award-seo-settings" },
      { id: "9-2", name: "Institute Awards", routePath: "/admin/institute-awards" },
      { id: "9-3", name: "Faculty Awards", routePath: "/admin/faculty-awards" },
    ],
  },

  {
    id: 10,
    name: "Manage Workshops & Conferences",
    icon: "la-book",
    children: [
      { id: "10-1", name: "Page Seo Settings", routePath: "/admin/workshop_con-seo-settings" },
      { id: "10-2", name: "Workshop Details", routePath: "/admin/workshops-details" },
      { id: "10-3", name: "Conferences Details", routePath: "/admin/conferences-details" },
    ],
  },

  /* ================= RESEARCH ================= */
  {
    id: 11,
    name: "Manage Research",
    icon: "la-book",
    children: [
      { id: "11-1", name: "Research Publication", routePath: "/admin/research-publication" },
      { id: "11-2", name: "Sponsored Research & Advisory Services", routePath: "/admin/sponsoredresearch-advisoryservices" },
    ],
  },

  {
    id: 12,
    name: "Manage Research Archive",
    icon: "la-book",
    children: [
      { id: "12-1", name: "Research Archive SEO", routePath: "/admin/research-archive-seo" },
      { id: "12-2", name: "Journal Publication", routePath: "/admin/research-journal-publication" },
      { id: "12-3", name: "Cases Publication", routePath: "/admin/research-cases-publication" },
      { id: "12-4", name: "Conference Proceeding", routePath: "/admin/research-conference-proceeding" },
      { id: "12-5", name: "News Article", routePath: "/admin/research-news-article" },
      { id: "12-6", name: "Books", routePath: "/admin/research-books" },
      { id: "12-7", name: "Magazines", routePath: "/admin/research-magazines" },
    ],
  },

  /* ================= CENTERS ================= */
  {
    id: 13,
    name: "Manage Center & Labs",
    icon: "la-book",
    children: [
      { id: "13-1", name: "Centre For Digital Transformation", routePath: "/admin/centre-digital-transformation" },
      { id: "13-2", name: "Centre For Sustainability & CSR", routePath: "/admin/centre-sustainability-csr" },
      { id: "13-3", name: "Innovation Lab", routePath: "/admin/innovation-lab" },
    ],
  },

  /* ================= PROGRAMS ================= */
  {
    id: 14,
    name: "Manage Programs",
    icon: "la-book",
    children: [
      { id: "14-1", name: "Learn About The Program", routePath: "/admin/learn-about-program" },
      { id: "14-2", name: "About PGDM", routePath: "/admin/about-pgdm" },
      { id: "14-3", name: "PGDM General", routePath: "/admin/pgdm" },
      { id: "14-4", name: "PGDM Finance", routePath: "/admin/pgdm-finance" },
      { id: "14-5", name: "PGDM Marketing", routePath: "/admin/pgdm-marketing" },
      { id: "14-6", name: "PGDM LSCM", routePath: "/admin/pgdm-lscm" },
      { id: "14-7", name: "Fellow Program in Management", routePath: "/admin/fellowprogram-in-management" },
      { id: "14-8", name: "Executive Education", routePath: "/admin/executive-edication" },
    ],
  },

  /* ================= PLACEMENTS & CONNECT ================= */
  { id: 6, name: "Manage Placement", icon: "la-boxes", routePath: "/admin/placement" },
  { id: 16, name: "Campus Placements", icon: "la-building", routePath: "/admin/campus-connect" },
  { id: 17, name: "Summer Internship", icon: "la-building", routePath: "/admin/internship" },

  {
    id: 18,
    name: "Manage Admissions",
    icon: "la-book",
    children: [
      { id: "18-1", name: "PGDM", routePath: "/admin/pgdm-admission" },
      { id: "18-2", name: "Fellow Program in Management", routePath: "/admin/fellow-program-in-management" },
    ],
  },

  {
    id: 19,
    name: "Manage Corporate Connect",
    icon: "la-book",
    children: [
      { id: "19-1", name: "Corporate Connect Page SEO", routePath: "/admin/corporate-connect-seo" },
      { id: "19-2", name: "Corporate Connect Details", routePath: "/admin/corporate-connect-details" },
    ],
  },

  { id: 20, name: "Community Connect", icon: "la-building", routePath: "/admin/community-connect" },

  /* ================= CAMPUS LIFE ================= */
  {
    id: 21,
    name: "Manage Newsletter",
    icon: "la-book",
    children: [
      { id: "21-1", name: "Newsletter Page SEO", routePath: "/admin/newsletter-seo" },
      { id: "21-2", name: "Newsletter Details", routePath: "/admin/newsletter" },
    ],
  },

  {
    id: 22,
    name: "Manage Campus Life",
    icon: "la-book",
    children: [
      { id: "22-1", name: "Campus Tour", routePath: "/admin/campus-tour" },
      { id: "22-2", name: "Media", routePath: "/admin/media" },
    ],
  },

  /* ================= FOOTER / CONTACT ================= */
  { id: 23, name: "Manage Contact Info", icon: "la-building", routePath: "/admin/contact-info" },
  { id: 24, name: "Manage Footer", icon: "la-building", routePath: "/admin/footer" },

  /* ================= STUDENT LIFE ================= */
  {
    id: 25,
    name: "Manage Clubs & Communities",
    icon: "la-book",
    children: [
      { id: "25-1", name: "Clubs & Communities Page SEO", routePath: "/admin/club-communities-seo" },
      { id: "25-2", name: "Club @ IMT", routePath: "/admin/club-imt-data" },
      { id: "25-3", name: "Committees @ IMT", routePath: "/admin/committees-imt-data" },
      { id: "25-4", name: "Event Picture Gallery", routePath: "/admin/event-gallery" },
      { id: "25-5", name: "Event Calender", routePath: "/admin/event-calender" },
    ],
  },

  {
    id: 26,
    name: "Manage Student Exchange",
    icon: "la-book",
    children: [
      { id: "26-1", name: "Student Exchange Page SEO", routePath: "/admin/student-exchange-seo" },
      { id: "26-2", name: "Outbound Exchange", routePath: "/admin/outbound-exchange" },
      { id: "26-3", name: "Inbound Exchange", routePath: "/admin/inbound-exchange" },
      { id: "26-4", name: "Inbound Application Form", routePath: "/admin/inbound-application-form" },
    ],
  },
  { id: 27, name: "Privacy Policy", icon: "la-building", routePath: "/admin/privacy-policy" },
];
