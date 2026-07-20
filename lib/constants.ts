export const NAV_ITEMS = [
  { label: 'Clients', href: '/dashboard/clients', icon: '/assets/icons/clients-icon.svg' },
  { label: 'Properties', href: '/dashboard/properties', icon: '/assets/icons/properties-icon.svg' },
  { label: 'Reports', href: '/dashboard/reports', icon: '/assets/icons/reports-icon.svg' },
  { label: 'Media', href: '/dashboard/media', icon: '/assets/icons/media-icon.svg' },
  { label: 'User Account', href: '/dashboard/account/profile', icon: '/assets/icons/user-accounts-icon.svg' },
] as const;

export const ACCOUNT_TABS = [
  { label: 'Profile', href: '/dashboard/account/profile' },
  { label: 'Security', href: '/dashboard/account/security' },
  { label: 'Privacy Policy', href: '/dashboard/account/privacy-policy' },
  { label: 'Terms & Conditions', href: '/dashboard/account/terms' },
] as const;
