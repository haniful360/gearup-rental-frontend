import {
  AppWindow,
  Award,
  BookOpen,
  LayoutGrid,
  MessagesSquare,
  PlaySquare,
  Settings,
  Target,
  Users,
} from 'lucide-react';

export type roleTypes = 'admin' | 'sarah' | 'sarah-team-member' | 'noah' | 'marcus';

// Super Admin Dashboard All Routes List
export const AdminRoutes = [
  {
    title: 'Overview',
    url: '/dashboard/admin/overview',
    icon: LayoutGrid,
  },
  {
    title: 'User Management',
    url: '/dashboard/admin/user-management',
    icon: BookOpen,
  },
  // {
  //   title: 'System Configs',
  //   url: '/dashboard/admin/system-configs',
  //   icon: Presentation,
  // },
  {
    title: 'CMS / Content',
    url: '/dashboard/admin/cms-content',
    icon: Target,
  },
  {
    title: 'Billing',
    url: '/dashboard/admin/billing',
    icon: PlaySquare,
  },
  {
    title: 'Support Tickets',
    url: '/dashboard/admin/support-tickets',
    icon: Award,
  },
  {
    title: 'Settings',
    url: '/dashboard/admin/settings',
    icon: Settings,
  },
];

// sarah Dashboard All Routes List
export const sarahRoutes = [
  { title: 'Overview', url: '/dashboard/sarah/overview', icon: LayoutGrid },
  { title: 'Team Management', url: '/dashboard/sarah/team-management', icon: Users },
  { title: 'Team Chat', url: '/dashboard/sarah/chat', icon: MessagesSquare },
  { title: 'Usage & Engagement', url: '/dashboard/sarah/usage-engagement', icon: PlaySquare },
  { title: 'Content Library', url: '/dashboard/sarah/content-library', icon: AppWindow },
  { title: 'Account Settings', url: '/dashboard/sarah/account-settings', icon: Settings },
];

export const sarahTeamMemberRoutes = [
  { title: 'Overview', url: '/dashboard/sarah-team-member/overview', icon: LayoutGrid },
  { title: 'Usage Analytics', url: '/dashboard/sarah-team-member/usage-analytics', icon: BookOpen },
  { title: 'Value Vault', url: '/dashboard/sarah-team-member/value-vault', icon: PlaySquare },
  { title: 'Team Chat', url: '/dashboard/sarah-team-member/team-chat', icon: MessagesSquare },
  { title: 'Account Settings', url: '/dashboard/sarah-team-member/settings', icon: Settings },
];

export const noahRoutes = (onATeam?: boolean) => [
  { title: 'Dashboard', url: '/dashboard/noah/overview', icon: LayoutGrid },
  { title: 'Usage Analytics', url: '/dashboard/noah/usage-analytics', icon: BookOpen },
  { title: 'Value Vault', url: '/dashboard/noah/value-vault', icon: PlaySquare },
  ...(onATeam
    ? [{ title: 'Team Message', url: '/dashboard/noah/team-chat', icon: MessagesSquare }]
    : []),
  { title: 'Settings', url: '/dashboard/noah/settings', icon: Settings },
];

export const marcusRoutes = [
  { title: 'Overview', url: '/dashboard/marcus/overview', icon: LayoutGrid },
  { title: 'Team Management', url: '/dashboard/marcus/team-management', icon: Users },
  { title: 'Usage & Engagement', url: '/dashboard/marcus/usage-engagement', icon: PlaySquare },
  { title: 'Content Library', url: '/dashboard/marcus/content-library', icon: AppWindow },
  { title: 'Account Settings', url: '/dashboard/marcus/account-settings', icon: Settings },
];
