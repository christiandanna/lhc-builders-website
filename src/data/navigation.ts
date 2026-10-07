export type NavLink = { label: string; href: string };

/** Main navigation, used by the navbar and the footer. */
export const mainNav: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/projects" },
  { label: "Current Projects", href: "/current-projects" },
  { label: "Contact", href: "/contact" },
];

export const footerNav: NavLink[] = [
  ...mainNav.filter((link) => link.href !== "/"),
  { label: "FAQ", href: "/faq" },
];

export const legalNav: NavLink[] = [{ label: "Privacy", href: "/privacy" }];
