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
];