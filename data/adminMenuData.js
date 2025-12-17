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
        name: "List Faculty",
        routePath: "/admin/list-faculty",
      },
      {
        id: "7-3",
        name: "Faculty Departments",
        routePath: "/admin/faculty/departments",
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
    name: "Manage Awards && Recognitions",
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
    name: "Manage Home-Settings",
    icon: "la-book",
    children: [
      {
        id: "10-1",
        name: "Page Seo Settings",
        icon: "la-file-signature",
        routePath: "/admin/home-settings",
      },
      {
        id: "10-2",
        name: "About Us settings",
        icon: "la-question-circle",
        routePath: "/admin/about-us",
      },
      {
        id: "10-3",
        name: "Manage Usp Section",
        icon: "la-question-circle",
        routePath: "/admin/usp-section",
      },
      {
        id: "10-4",
        name: "Manage Research Section",
        icon: "la-question-circle",
        routePath: "/admin/research-infocus",
      },

     
    ],
  },

  
];
