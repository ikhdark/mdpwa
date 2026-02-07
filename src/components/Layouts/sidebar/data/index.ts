type NavItem = {
  title: string;
  path: string;
  as: "link";
};

type NavGroup = {
  label: string;
  items: NavItem[];
};

export const NAV_DATA: NavGroup[] = [
  {
    label: "MAIN",
    items: [
      { title: "Home", path: "", as: "link" },
    ],
  },

  {
    label: "SERVICES",
    items: [
      { title: "Pay Utility Bill", path: "services", as: "link" },
      { title: "Report an Issue", path: "report", as: "link" },
    ],
  },

  {
    label: "GOVERNMENT",
    items: [
      { title: "City Council", path: "council", as: "link" },
      { title: "Directory", path: "directory", as: "link" },
    ],
  },

  {
    label: "FORMS",
    items: [
      { title: "Forms & Documents", path: "forms", as: "link" },
      { title: "Permits", path: "permits", as: "link" },
    ],
  },

  {
    label: "COMMUNITY",
    items: [
      { title: "Community Info", path: "community", as: "link" },
      { title: "Meetings & Media", path: "media", as: "link" },
    ],
  },
];
