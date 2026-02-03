module.exports = [
  /* ================= DASHBOARD ================= */
  {
    id: 1,
    name: "Dashboard Admin",
    icon: "la-home",
    routePath: "/admin/dashboard",
    active: "active",
  },

  /* ================= HOME SETTINGS ================= */
  {
    id: 2,
    name: "Manage Home Settings",
    icon: "la-book",
    children: [
      { id: "2.1", name: "Page Seo Settings", routePath: "/admin/home-settings" },
      { id: "2.2", name: "About Us Settings", routePath: "/admin/about-us" },
      { id: "2.3", name: "Manage USP Section", routePath: "/admin/usp-section" },
      { id: "2.4", name: "Manage Research Section", routePath: "/admin/research-infocus" },
      { id: "2.5", name: "Manage Program Offered", routePath: "/admin/program-offered" },
      { id: "2.6", name: "Manage Happenings", routePath: "/admin/happenings" },
      { id: "2.7", name: "Happenings Seo Settings", routePath: "/admin/happenings-seo" },
      { id: "2.8", name: "Manage Events", routePath: "/admin/events" },
      { id: "2.9", name: "Manage Announcements", routePath: "/admin/announcements" },
      { id: "2.10", name: "International Association", routePath: "/admin/international-association" },
      { id: "2.11", name: "Placement Alliance", routePath: "/admin/placement-alliance" },
      { id: "2.12", name: "New Announcement", routePath: "/admin/new-annoucement" },
      { id: "2.13", name: "Home Connect", routePath: "/admin/home-connect" },
    ],
  },

  /* ================= ADMISSIONS ================= */
  {
    id: 3,
    name: "Manage Admissions",
    icon: "la-book",
    children: [
      { id: "3.1", name: "PGDM", routePath: "/admin/pgdm-admission" },
      { id: "3.2", name: "Fellow Program in Management", routePath: "/admin/fellow-program-in-management" },
    ],
  },

  /* ================= PROGRAMS ================= */
  {
    id: 4,
    name: "Manage Programs",
    icon: "la-book",
    children: [
      { id: "4.1", name: "Learn About The Program", routePath: "/admin/learn-about-program" },
      { id: "4.2", name: "About PGDM", routePath: "/admin/about-pgdm" },
      { id: "4.3", name: "PGDM General", routePath: "/admin/pgdm" },
      { id: "4.4", name: "PGDM Finance", routePath: "/admin/pgdm-finance" },
      { id: "4.5", name: "PGDM Marketing", routePath: "/admin/pgdm-marketing" },
      { id: "4.6", name: "PGDM LSCM", routePath: "/admin/pgdm-lscm" },
      { id: "4.7", name: "Fellow Program in Management", routePath: "/admin/fellowprogram-in-management" },
      { id: "4.8", name: "Executive Education", routePath: "/admin/executive-edication" },
    ],
  },

  /* ================= FACULTY ================= */
  {
    id: 5,
    name: "Manage Faculty",
    icon: "la-user-tie",
    children: [
      { id: "5.1", name: "Faculty Page Seo Settings", routePath: "/admin/faculty-seo-settings" },
      { id: "5.2", name: "Faculty Details Seo Settings", routePath: "/admin/faculty-details-seo-settings" },
      { id: "5.3", name: "List Faculty", routePath: "/admin/list-faculty" },
    ],
  },

  /* ================= AWARDS ================= */
  {
    id: 6,
    name: "Manage Awards & Recognitions",
    icon: "la-book",
    children: [
      { id: "6.1", name: "Page Seo Settings", routePath: "/admin/award-seo-settings" },
      { id: "6.2", name: "Institute Awards", routePath: "/admin/institute-awards" },
      { id: "6.3", name: "Faculty Awards", routePath: "/admin/faculty-awards" },
    ],
  },

  /* ================= WORKSHOPS ================= */
  {
    id: 7,
    name: "Manage Workshops & Conferences",
    icon: "la-book",
    children: [
      { id: "7.1", name: "Page Seo Settings", routePath: "/admin/workshop_con-seo-settings" },
      { id: "7.2", name: "Workshop Details", routePath: "/admin/workshops-details" },
      { id: "7.3", name: "Conference Details", routePath: "/admin/conferences-details" },
    ],
  },

  /* ================= RESEARCH ARCHIVE ================= */
  {
    id: 8,
    name: "Manage Research Archive",
    icon: "la-book",
    children: [
      { id: "8.1", name: "Research Archive SEO", routePath: "/admin/research-archive-seo" },
      { id: "8.2", name: "Journal Publication", routePath: "/admin/research-journal-publication" },
      { id: "8.3", name: "Cases Publication", routePath: "/admin/research-cases-publication" },
      { id: "8.4", name: "Conference Proceeding", routePath: "/admin/research-conference-proceeding" },
      { id: "8.5", name: "News Article", routePath: "/admin/research-news-article" },
      { id: "8.6", name: "Books", routePath: "/admin/research-books" },
      { id: "8.7", name: "Magazines", routePath: "/admin/research-magazines" },
    ],
  },

  /* ================= RESEARCH ================= */
  {
    id: 9,
    name: "Manage Research",
    icon: "la-book",
    children: [
      { id: "9.1", name: "Research Publication", routePath: "/admin/research-publication" },
      { id: "9.2", name: "Sponsored Research & Advisory Services", routePath: "/admin/sponsoredresearch-advisoryservices" },
    ],
  },

  /* ================= CENTERS ================= */
  {
    id: 10,
    name: "Manage Centers & Labs",
    icon: "la-book",
    children: [
      { id: "10.1", name: "Centre For Digital Transformation", routePath: "/admin/centre-digital-transformation" },
      { id: "10.2", name: "Centre For Sustainability & CSR", routePath: "/admin/centre-sustainability-csr" },
      { id: "10.3", name: "Innovation Lab", routePath: "/admin/innovation-lab" },
    ],
  },

  /* ================= STATIC ================= */
  { id: 11, name: "Mandatory Disclosure", icon: "la-building", routePath: "/admin/mandatory-disclosure" },
  { id: 12, name: "About IMT Hyderabad", icon: "la-wallet", routePath: "/admin/about-imt-hyderabad" },
  { id: 13, name: "International Relations", icon: "la-wallet", routePath: "/admin/international-relations" },
  { id: 14, name: "Manage Others", icon: "la-id-badge", routePath: "/admin/others" },

  /* ================= LRC ================= */
  {
    id: 15,
    name: "Manage LRC",
    icon: "la-book",
    children: [
      { id: "15.1", name: "LRC Page Details", routePath: "/admin/lrc-page-details" },
      { id: "15.2", name: "List LRC FAQs", routePath: "/admin/lrc-faqs" },
    ],
  },

  /* ================= PLACEMENTS ================= */
  { id: 16, name: "Manage Placement", icon: "la-boxes", routePath: "/admin/placement" },
  { id: 17, name: "Campus Placements", icon: "la-building", routePath: "/admin/campus-connect" },
  { id: 18, name: "Summer Internship", icon: "la-building", routePath: "/admin/internship" },

  /* ================= CORPORATE ================= */
  {
    id: 19,
    name: "Manage Corporate Connect",
    icon: "la-book",
    children: [
      { id: "19.1", name: "Corporate Connect Page SEO", routePath: "/admin/corporate-connect-seo" },
      { id: "19.2", name: "Corporate Connect Details", routePath: "/admin/corporate-connect-details" },
    ],
  },

  { id: 20, name: "Community Connect", icon: "la-building", routePath: "/admin/community-connect" },

  /* ================= CAMPUS LIFE ================= */
  {
    id: 21,
    name: "Manage Newsletter",
    icon: "la-book",
    children: [
      { id: "21.1", name: "Newsletter Page SEO", routePath: "/admin/newsletter-seo" },
      { id: "21.2", name: "Newsletter Details", routePath: "/admin/newsletter" },
    ],
  },

  {
    id: 22,
    name: "Manage Campus Life",
    icon: "la-book",
    children: [
      { id: "22.1", name: "Campus Tour", routePath: "/admin/campus-tour" },
      { id: "22.2", name: "Media", routePath: "/admin/media" },
    ],
  },

  /* ================= STUDENT LIFE ================= */
  {
    id: 23,
    name: "Manage Clubs & Communities",
    icon: "la-book",
    children: [
      { id: "23.1", name: "Clubs & Communities Page SEO", routePath: "/admin/club-communities-seo" },
      { id: "23.2", name: "Club @ IMT", routePath: "/admin/club-imt-data" },
      { id: "23.3", name: "Committees @ IMT", routePath: "/admin/committees-imt-data" },
      { id: "23.4", name: "Event Picture Gallery", routePath: "/admin/event-gallery" },
      { id: "23.5", name: "Event Calendar", routePath: "/admin/event-calender" },
    ],
  },

  {
    id: 24,
    name: "Manage Student Exchange",
    icon: "la-book",
    children: [
      { id: "24.1", name: "Student Exchange Page SEO", routePath: "/admin/student-exchange-seo" },
      { id: "24.2", name: "Outbound Exchange", routePath: "/admin/outbound-exchange" },
      { id: "24.3", name: "Inbound Exchange", routePath: "/admin/inbound-exchange" },
      { id: "24.4", name: "Inbound Application Form", routePath: "/admin/inbound-application-form" },
    ],
  },

  { id: 25, name: "Privacy Policy", icon: "la-building", routePath: "/admin/privacy-policy" },
  { id: 26, name: "Student Life", icon: "la-building", routePath: "/admin/student-life" },
  { id: 27, name: "Manage Contact Info", icon: "la-building", routePath: "/admin/contact-info" },
  { id: 28, name: "Manage Footer", icon: "la-building", routePath: "/admin/footer" },
];
