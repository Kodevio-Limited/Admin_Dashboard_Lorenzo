export const NAV_ITEMS = [
  { label: 'Overview', href: '/dashboard/overview', icon: '/assets/icons/clients-icon.svg' },
  { label: 'Clients', href: '/dashboard/clients', icon: '/assets/icons/clients-icon.svg' },
  { label: 'Properties', href: '/dashboard/properties', icon: '/assets/icons/properties-icon.svg' },
  { label: 'Field Representatives', href: '/dashboard/field-representatives', icon: '/assets/icons/field-representatives-icon.svg' },
  { label: 'Visits & Scheduling', href: '/dashboard/visits', icon: '/assets/icons/visits-icon.svg' },
  { label: 'Assignments', href: '/dashboard/assignments', icon: '/assets/icons/assignments-icon.svg' },
  { label: 'Service Plans', href: '/dashboard/service-plans', icon: '/assets/icons/service-plans-icon.svg' },
  { label: 'Reports', href: '/dashboard/reports', icon: '/assets/icons/reports-icon.svg' },
  { label: 'Report Approvals', href: '/dashboard/report-approvals', icon: '/assets/icons/report-approvals-icon.svg' },
  { label: 'Media', href: '/dashboard/media', icon: '/assets/icons/media-icon.svg' },
  { label: 'Notifications', href: '/dashboard/notifications', icon: '/assets/icons/notifications-icon.svg' },
  { label: 'Activity History', href: '/dashboard/activity', icon: '/assets/icons/activity-icon.svg' },
  { label: 'User Account', href: '/dashboard/account/profile', icon: '/assets/icons/user-accounts-icon.svg' },
] as const;

export const ACCOUNT_TABS = [
  { label: 'Profile', href: '/dashboard/account/profile' },
  { label: 'Security', href: '/dashboard/account/security' },
  { label: 'Privacy Policy', href: '/dashboard/account/privacy-policy' },
  { label: 'Terms & Conditions', href: '/dashboard/account/terms' },
] as const;
