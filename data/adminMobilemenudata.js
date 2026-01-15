module.exports = [
  {
    id: 1,
    name: "Dashboard Admin",
    icon: "la-home",
    routePath: "/admin/dashboard",
    active: "active",
  },

  {
    id: 2,
    name: "Mandatory Disclosure",
    icon: "la-building",
    routePath: "/admin/mandatory-disclosure",
    active: "",
  },

  {
    id: 3,
    name: "About IMT Hyderabad",
    icon: "la-wallet",
    routePath: "/admin/about-imt-hyderabad",
    active: "",
  },

  {
    id: 4,
    name: "International Relation",
    icon: "la-wallet",
    routePath: "/admin/international-relations",
    active: "",
  },

  {
    id: 5,
    name: "Manage Others",
    icon: "la-id-badge",
    routePath: "/admin/others",
    active: "",
  },

  {
    id: 6,
    name: "Manage Placement",
    icon: "la-boxes",
    routePath: "/admin/placement",
    active: "",
  },

  {
    id: 7,
    name: "Manage Faculty",
    icon: "la-user-tie",
    children: [
      {
        id: "7-1",
        name: "Faculty Page Seo Settings",
        routePath: "/admin/faculty-seo-settings",
      },
      {
        id: "7-2",
        name: "Faculty Page Details Seo Settings",
        routePath: "/admin/faculty-details-seo-settings",
      },
      {
        id: "7-3",
        name: "List Faculty",
        routePath: "/admin/list-faculty",
      },
   
    ],
  },

  {
    id: 8,
    name: "Manage LRC",
    icon: "la-book",
    children: [
      {
        id: "8-1",
        name: "LRC Page Details",
        icon: "la-file-signature",
        routePath: "/admin/lrc-page-details",
      },
      {
        id: "8-2",
        name: "List LRC FAQs",
        icon: "la-question-circle",
        routePath: "/admin/lrc-faqs",
      },
    ],
  },

  {
    id: 9,
    name: "Manage Awards & Recognitions",
    icon: "la-book",
    children: [
      {
        id: "9-1",
        name: "Page Seo Settings",
        icon: "la-file-signature",
        routePath: "/admin/award-seo-settings",
      },
      {
        id: "9-2",
        name: "Institute Awards",
        icon: "la-question-circle",
        routePath: "/admin/institute-awards",
      },
      {
        id: "9-3",
        name: "Faculty Awards",
        icon: "la-question-circle",
        routePath: "/admin/faculty-awards",
      },
    ],
  },
  {
    id: 10,
    name: "Manage Workshops & Conferences",
    icon: "la-book",
    children: [
      {
        id: "10-1",
        name: "Page Seo Settings",
        icon: "la-file-signature",
        routePath: "/admin/workshop_con-seo-settings",
      },
      {
        id: "10-2",
        name: "Workshop Details",
        icon: "la-question-circle",
        routePath: "/admin/workshops-details",
      },
      {
        id: "10-3",
        name: "Conferences Details",
        icon: "la-question-circle",
        routePath: "/admin/conferences-details",
      },
    ],
  },

  {
    id: 11,
    name: "Manage Research",
    icon: "la-book",
    children: [
      {
        id: "11-1",
        name: "Research Publication",
        icon: "la-file-signature",
        routePath: "/admin/research-publication",
      },
      {
        id: "11-2",
        name: "Sponsored Research & Advisory Services",
        icon: "la-file-signature",
        routePath: "/admin/sponsoredresearch-advisoryservices",
      },
      
    ],
  },

  {
    id: 12,
    name: "Manage Research Archive",
    icon: "la-book",
    children: [
      {
        id: "12-1",
        name: "Research Archive SEO",
        icon: "la-file-signature",
        routePath: "/admin/research-archive-seo",
      },
      {
        id: "12-2",
        name: "Journal Publication",
        icon: "la-file-signature",
        routePath: "/admin/research-journal-publication",
      },
      {
        id: "12-3",
        name: "Cases Publication",
        icon: "la-file-signature",
        routePath: "/admin/research-cases-publication",
      },
      {
        id: "12-4",
        name: "Conference Proceeding",
        icon: "la-file-signature",
        routePath: "/admin/research-conference-proceeding",
      },
      {
        id: "12-5",
        name: "News Article",
        icon: "la-file-signature",
        routePath: "/admin/research-news-article",
      },
      {
        id: "12-6",
        name: "Books",
        icon: "la-file-signature",
        routePath: "/admin/research-books",
      },
      {
        id: "12-7",
        name: "Magazines",
        icon: "la-file-signature",
        routePath: "/admin/research-magazines",
      },


      
    ],
  },


  {
    id: 13,
    name: "Manage Center & Labs",
    icon: "la-book",
    children: [
      {
        id: "13-1",
        name: "Centre For Digital Transformation",
        icon: "la-file-signature",
        routePath: "/admin/centre-digital-transformation",
      },
      {
        id: "13-2",
        name: "Centre For Sustainability & CSR",
        icon: "la-file-signature",
        routePath: "/admin/centre-sustainability-csr",
      },
      {
        id: "13-3",
        name: "Innovation Lab",
        icon: "la-file-signature",
        routePath: "/admin/innovation-lab",
      },


      
    ],
  },

  {
    id: 14,
    name: "Manage Programs",
    icon: "la-book",
    children: [
      {
        id: "14-1",
        name: "Learn About The Program",
        icon: "la-file-signature",
        routePath: "/admin/learn-about-program",
      },
      {
        id: "14-2",
        name: "About PGDM",
        icon: "la-file-signature",
        routePath: "/admin/about-pgdm",
      },
      {
        id: "14-3",
        name: "PGDM General",
        icon: "la-file-signature",
        routePath: "/admin/pgdm",
      },
      {
        id: "14-4",
        name: "PGDM Finance",
        icon: "la-file-signature",
        routePath: "/admin/pgdm-finance",
      },
      {
        id: "14-5",
        name: "PGDM Marketing",
        icon: "la-file-signature",
        routePath: "/admin/pgdm-marketing",
      },
      {
        id: "14-6",
        name: "PGDM LSCM",
        icon: "la-file-signature",
        routePath: "/admin/pgdm-lscm",
      },
      {
        id: "14-7",
        name: "Fellow Program in Management",
        icon: "la-file-signature",
        routePath: "/admin/fellowprogram-in-management",
      },
      {
        id: "14-8",
        name: "Executive Education",
        icon: "la-file-signature",
        routePath: "/admin/executive-edication",
      },
      

      
    ],
  },


  {
    id: 15,
    name: "Manage Home Settings",
    icon: "la-book",
    children: [
      {
        id: "15-1",
        name: "Page Seo Settings",
        icon: "la-file-signature",
        routePath: "/admin/home-settings",
      },
      {
        id: "15-2",
        name: "About Us Settings",
        icon: "la-question-circle",
        routePath: "/admin/about-us",
      },
      {
        id: "15-3",
        name: "Manage USP Section",
        icon: "la-question-circle",
        routePath: "/admin/usp-section",
      },
      {
        id: "15-4",
        name: "Manage Research Section",
        icon: "la-question-circle",
        routePath: "/admin/research-infocus",
      },
      {
        id: "15-5",
        name: "Manage Program Offered ",
        icon: "la-question-circle",
        routePath: "/admin/program-offered",
      },
      {
        id: "15-6",
        name: "Manage Happenings ",
        icon: "la-question-circle",
        routePath: "/admin/happenings",
      },
      {
        id: "15-7",
        name: "Happenings Seo Settings",
        icon: "la-question-circle",
        routePath: "/admin/happenings-seo",
      },
      {
        id: "15-8",
        name: "Manage Events",
        icon: "la-question-circle",
        routePath: "/admin/events",
      },
      {
        id: "15-9",
        name: "Manage Announcements",
        icon: "la-question-circle",
        routePath: "/admin/announcements",
      },
      {
        id: "15-10",
        name: "Manage International Association",
        icon: "la-question-circle",
        routePath: "/admin/international-association",
      },
      {
        id: "15-11",
        name: "Manage Placemen Alliance",
        icon: "la-question-circle",
        routePath: "/admin/placement-alliance",
      },
      {
        id: "15-12",
        name: "Manage New-Announcement",
        icon: "la-question-circle",
        routePath: "/admin/new-annoucement",
      },
      {
        id: "15-13",
        name: "Manage Home-Connect",
        icon: "la-question-circle",
        routePath: "/admin/home-connect",
      },
      
    ],
  },
    {
    id: 16,
    name: "Campus Placements",
    icon: "la-building",
    routePath: "/admin/campus-connect",
    active: "",
  },
    {
    id: 17,
    name: "Summer Internship",
    icon: "la-building",
    routePath: "/admin/internship",
    active: "",
  },
  {
    id: 18,
    name: "Manage Admissions",
    icon: "la-book",
    children: [
      {
        id: "18-1",
        name: "PGDM",
        icon: "la-file-signature",
        routePath: "/admin/pgdm-admission",
      },
      {
        id: "18-2",
        name: "Fellow Program in Management",
        icon: "la-file-signature",
        routePath: "/admin/fellow-program-in-management",
      },  
      
    ],
  },
    {
    id: 19,
    name: "Manage Corporate Connect",
    icon: "la-book",
    children: [
      {
        id: "19-1",
        name: "Corporate Connect Page SEO",
        icon: "la-file-signature",
        routePath: "/admin/corporate-connect-seo",
      },
      {
        id: "19-2",
        name: "Corporate Connect Details",
        icon: "la-file-signature",
        routePath: "/admin/corporate-connect-details",
      },
    ],
  },

  {
    id: 20,
    name: "Community Connect",
    icon: "la-building",
    routePath: "/admin/community-connect",
    active: "",
  },
    {
    id: 21,
    name: "Manage Newsletter",
    icon: "la-book",
    children: [
      {
        id: "21-1",
        name: "Newsletter Page SEO",
        icon: "la-file-signature",
        routePath: "/admin/newsletter-seo",
      },
      {
        id: "21-2",
        name: "Newsletter Details",
        icon: "la-file-signature",
        routePath: "/admin/newsletter",
      },
    ],
  },
  {
    id: 22,
    name: "Manage Campus Life",
    icon: "la-book",
    children: [
      {
        id: "22-1",
        name: "Campus Tour",
        icon: "la-file-signature",
        routePath: "/admin/campus-tour",
      },
      {
        id: "22-2",
        name: "Media",
        icon: "la-file-signature",
        routePath: "/admin/media",
      },
      
    ],
  },
  {
    id: 23,
    name: "Manage Contact Info",
    icon: "la-building",
    routePath: "/admin/contact-info",
    active: "",
  },
  {
    id: 24,
    name: "Manage Footer",
    icon: "la-building",
    routePath: "/admin/footer",
    active: "",
  },

  {
    children: [
      {
        id: "25-1",
        name: "Clubs & Communities Page SEO",
        icon: "la-file-signature",
        routePath: "/admin/club-communities-seo",
      },
      {
        id: "25-2",
        name: "Club @ IMT",
        icon: "la-file-signature",
        routePath: "/admin/club-imt-data",
      },
      {
        id: "25-3",
        name: "Committees @ IMT",
        icon: "la-file-signature",
        routePath: "/admin/committees-imt-data",
      },
      {
        id: "25-4",
        name: "Event Picture Gallery",
        icon: "la-file-signature",
        routePath: "/admin/event-gallery",
      },
      {
        id: "25-5",
        name: "Event Calender",
        icon: "la-file-signature",
        routePath: "/admin/event-calender",
      },
    ],
  },
];
