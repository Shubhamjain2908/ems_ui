import { RouteInfo } from './sidebar.metadata';

// Sidebar menu Routes and data
export const ROUTES: RouteInfo[] = [
  {
    path: '/dashboard', title: 'Dashboard', icon: 'ft-home',
    class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: []
  },
  {
    path: '', title: 'Attributes', icon: 'ft-layers',
    class: 'has-sub', badge: '', badgeClass: '', isExternalLink: false, submenu: [{
      path: '/attribute', title: 'List', icon: 'icon-list', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: []
    }, {
      path: '/attribute/add', title: 'Add', icon: 'ft-plus-square',
      class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: []
    }]
  },
  {
    path: '', title: 'Category', icon: 'icon-grid',
    class: 'has-sub', badge: '', badgeClass: '', isExternalLink: false, submenu: [{
      path: '/category', title: 'List', icon: 'icon-list', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: []
    }, {
      path: '/category/add', title: 'Add', icon: 'ft-plus-square',
      class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: []
    }]
  },
  {
    path: '', title: 'Tag', icon: 'icon-grid',
    class: 'has-sub', badge: '', badgeClass: '', isExternalLink: false, submenu: [{
      path: '/tag', title: 'List', icon: 'icon-list', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: []
    }, {
      path: '/tag/add', title: 'Add', icon: 'ft-plus-square',
      class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: []
    }]
  },
  {
    path: '', title: 'Collection', icon: 'icon-grid',
    class: 'has-sub', badge: '', badgeClass: '', isExternalLink: false, submenu: [{
      path: '/collection', title: 'List', icon: 'icon-list', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: []
    }, {
      path: '/collection/add', title: 'Add', icon: 'ft-plus-square',
      class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: []
    }]
  },
  {
    path: '', title: 'Offer', icon: 'icon-grid',
    class: 'has-sub', badge: '', badgeClass: '', isExternalLink: false, submenu: [{
      path: '/offer', title: 'List', icon: 'icon-list', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: []
    }, {
      path: '/offer/add', title: 'Add', icon: 'ft-plus-square',
      class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: []
    }]
  },
  {
    path: '/notification', title: 'Notification', icon: 'ft-home',
    class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: []
  },
  {
    path: '', title: 'Order', icon: 'icon-grid',
    class: 'has-sub', badge: '', badgeClass: '', isExternalLink: false, submenu: [{
      path: '/order', title: 'List', icon: 'icon-list', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: []
    }]
  },
  {
    path: '', title: 'Coupon', icon: 'icon-grid',
    class: 'has-sub', badge: '', badgeClass: '', isExternalLink: false, submenu: [{
      path: '/coupon', title: 'List', icon: 'icon-list', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: []
    }, {
      path: '/coupon/add', title: 'Add', icon: 'ft-plus-square',
      class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: []
    }]
  },
  {
    path: '', title: 'Banner', icon: 'icon-picture',
    class: 'has-sub', badge: '', badgeClass: '', isExternalLink: false, submenu: [{
      path: '/banner/list', title: 'List', icon: 'ft-list', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: []
    }, {
      path: '/banner/add', title: 'Add', icon: 'ft-plus-square', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: []
    }]
  },
  {
    path: '', title: 'Payments', icon: 'ft-home',
    class: 'has-sub', badge: '', badgeClass: '', isExternalLink: false, submenu: [{
      path: '/payments', title: 'List', icon: 'ft-home', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: []
    }]
  },
  {
    path: '', title: 'Product', icon: 'ft-home',
    class: 'has-sub', badge: '', badgeClass: '', isExternalLink: false, submenu: [{
      path: '/product', title: 'List', icon: 'ft-home', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: []
    }, {
      path: '/product/add', title: 'Add', icon: 'ft-home', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: []
    }, {
      path: '/product/upload', title: 'Bulk-Upload', icon: 'ft-home',
      class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: []
    }]
  },
  {
    path: '', title: 'Service', icon: 'ft-home',
    class: 'has-sub', badge: '', badgeClass: '', isExternalLink: false, submenu: [{
      path: '/service', title: 'List', icon: 'ft-home', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: []
    }, {
      path: '/service/add', title: 'Add', icon: 'ft-home', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: []
    }]
  },
  {
    path: '', title: 'Users', icon: 'icon-user',
    class: 'has-sub', badge: '', badgeClass: '', isExternalLink: false, submenu: [
      {
        path: '', title: 'Suppliers', icon: 'ft-users',
        class: 'has-sub', badge: '', badgeClass: '', isExternalLink: false, submenu: [
          {
            path: '/suppliers', title: 'Suppliers', icon: 'icon-user',
            class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: []
          },
          {
            path: '/suppliers/add-supplier', title: 'Add Supplier', icon: 'icon-plus', class: '',
            badge: '', badgeClass: '', isExternalLink: true, submenu: []
          },
          {
            path: '/suppliers/todays-suppliers', title: 'Today\'s Suppliers', icon: 'icon-user', class: '',
            badge: '', badgeClass: '', isExternalLink: true, submenu: []
          },
        ]
      },
      {
        path: '', title: 'Retailers', icon: 'ft-users',
        class: 'has-sub', badge: '', badgeClass: '', isExternalLink: false, submenu: [
          {
            path: '/retailers', title: 'Retailers', icon: 'icon-user',
            class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: []
          },
          {
            path: '/retailers/add-retailer', title: 'Add Retailer', icon: 'icon-plus', class: '',
            badge: '', badgeClass: '', isExternalLink: true, submenu: []
          },
          {
            path: '/retailers/todays-retailers', title: 'Today\'s Retailers', icon: 'icon-user', class: '',
            badge: '', badgeClass: '', isExternalLink: true, submenu: []
          },
        ]
      },
      {
        path: '', title: 'Customers', icon: 'ft-users',
        class: 'has-sub', badge: '', badgeClass: '', isExternalLink: false, submenu: [
          {
            path: '/customers', title: 'Customers', icon: 'icon-user',
            class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: []
          },
          {
            path: '/customers/add-customer', title: 'Add Customer', icon: 'icon-plus', class: '',
            badge: '', badgeClass: '', isExternalLink: true, submenu: []
          },
          {
            path: '/customers/todays-customers', title: 'Today\'s Customers', icon: 'icon-user', class: '',
            badge: '', badgeClass: '', isExternalLink: true, submenu: []
          },
        ]
      }
    ]
  }
  // {
  //     path: '/equipments', title: 'Equipments', icon: 'fas fa-dumbbell',
  //     class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: []
  // },
  // {
  //     path: '', title: 'Video', icon: 'fa fa-video-camera',
  //     class: 'has-sub', badge: '', badgeClass: '', isExternalLink: false, submenu: [
  //         {
  //             path: '/video', title: 'Video Listing', icon: '', class: '',
  //             badge: '', badgeClass: '', isExternalLink: true, submenu: []
  //         },
  //         {
  //             path: '/video/static', title: 'Sub Category', icon: '', class: '',
  //             badge: '', badgeClass: '', isExternalLink: true, submenu: []
  //         },
  //     ]
  // },
];
