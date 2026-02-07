type NavItem = {
  title: string;
  path?: string; // internal
  url?: string;  // external
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
    label: "Stay Informed",
    items: [
      
      { title: "Sign Up for Alerts", url: "https://www.martindale.texas.gov/list.aspx", as: "link" },
      { title: "Events Calendar", url: "https://martindale.texas.gov/Calendar.aspx", as: "link" },
    ],
  },

  {
    label: "Quick Actions",
    items: [
      { title: "Pay Utilities", url: "https://martindaletx.governmentwindow.com/payer_login.html", as: "link" },
      { title: "Report an Issue", url: "https://martindale.texas.gov/FormCenter/Request-Forms-2/Report-an-Issue-33", as: "link" },
      { title: "Pay Water Bill", url: "https://www.martindalewater.org/", as: "link" },
    ],
  },

  {
    label: "Departments",
    items: [
      { title: "Police", url: "https://martindale.texas.gov/2153/Police-Department", as: "link" },
      { title: "Public Works", url: "https://martindale.texas.gov/2156/Public-Works", as: "link" },
      { title: "Municipal Court", url: "https://martindale.texas.gov/2152/Municipal-Court", as: "link" },
      { title: "Parks", url: "https://martindale.texas.gov/2170/Parks", as: "link" },
      { title: "Library", url: "https://www.martindalelibrary.org/", as: "link" },
    ],
  },

  {
    label: "Documents & Records",
    items: [
      { title: "Permits", url: "https://martindale.texas.gov/2163/Permits", as: "link" },
      { title: "Zoning", url: "https://www.martindale.texas.gov/2211/Zoning", as: "link" },
      { title: "City Code", url: "https://codelibrary.amlegal.com/codes/martindale/latest/overview", as: "link" },
      { title: "Agendas & Minutes", url: "https://martindale.texas.gov/DocumentCenter/Index/79", as: "link" },
    ],
  },

  {
    label: "Community",
    items: [
      { title: "Jobs", url: "https://martindale.texas.gov/2215/Job-Announcements", as: "link" },
      { title: "Elections", url: "https://martindale.texas.gov/2195/Elections", as: "link" },
      { title: "YouTube", url: "https://www.youtube.com/channel/UCTzqMkR23XbeorS__nD_mVw", as: "link" },
    ],
  },
];