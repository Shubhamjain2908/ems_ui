import { RouteInfo } from './sidebar.metadata';

export const ROUTES: RouteInfo[] = [
  {
    path: '',
    title: 'Dashboard',
    icon: 'ft-home',
    class: '',
    badge: '',
    badgeClass: 'badge badge-pill badge-danger float-right mr-1 mt-1',
    isExternalLink: false,
    submenu: []
  },
  {
    path: '',
    title: 'Category',
    icon: 'fa fa-list-alt',
    class: 'has-sub',
    badge: '',
    badgeClass: '',
    isExternalLink: false,
    submenu: [
      {
        path: '/category',
        title: 'Listing',
        icon: '',
        class: 'subMenuItem',
        badge: '',
        badgeClass: '',
        isExternalLink: false,
        submenu: []
      },
      {
        path: '/category/subcategory',
        title: 'Subcategory',
        icon: '',
        class: 'subMenuItem',
        badge: '',
        badgeClass: '',
        isExternalLink: false,
        submenu: []
      },
    ]
  },
];
