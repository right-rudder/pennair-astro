import services from "./services";
export const navbarLinks = [
  {
    name: "Our Services",
    link: "/services",
    submenu: services.map((service) => ({
      name: service.name,
      link: service.link,
    })),
    /*       {
        name: "Sheet Metal Work",
        link: "/services/sheet-metal-work",
      },
      {
        name: "Light Avionics",
        link: "/services/light-avionics",
      }, */
  },
  /* {
    name: "Service Areas",
    link: "/locations",
    submenu: [
      {
        name: "All Locations",
        link: "/locations",
      },
      {
        name: "Delaware",
        link: "/locations#Delaware",
      },
      {
        name: "New Jersey",
        link: "/locations#New%20Jersey",
      },
      {
        name: "New York",
        link: "/locations#New%20York",
      },
      {
        name: "Maryland",
        link: "/locations#Maryland",
      },
      {
        name: "Pennsylvania",
        link: "/locations#Pennsylvania",
      },
    ],
  }, */
  {
    name: "Blog",
    link: "/blog",
  },
  {
    name: "KPTW",
    link: "/kptw-info",
  },
  {
    name: "About",
    link: "/about",
    submenu: [
      {
        name: "About",
        link: "/about",
      },
      {
        name: "Careers",
        link: "/join-our-team",
      }
    ],
  },

  {
    name: "Contact Us",
    link: "/#contact-us",
  },
];
