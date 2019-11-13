import { Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth-guard.service';

export const Full_ROUTES: Routes = [
  {
    path: 'dashboard',
    loadChildren: './dashboard/dashboard.module#DashboardModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'category',
    loadChildren: './category/category.module#CategoryModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'tag',
    loadChildren: './tag/tag.module#TagModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'collection',
    loadChildren: './collection/collection.module#CollectionModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'offer',
    loadChildren: './offer/offer.module#OfferModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'notification',
    loadChildren: './notification/notification.module#NotificationModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'order',
    loadChildren: './order/order.module#OrderModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'coupon',
    loadChildren: './coupon/coupon.module#CouponModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'attribute',
    loadChildren: './attribute/attribute.module#AttributeModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'banner',
    loadChildren: './banner/banner.module#BannerModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'product',
    loadChildren: './product/product.module#ProductModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'payments',
    loadChildren: './payments/payments.module#PaymentsModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'service',
    loadChildren: './retailer-service/retailer-service.module#RetailerServiceModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'suppliers',
    loadChildren: './suppliers/suppliers.module#SuppliersModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'retailers',
    loadChildren: './retailers/retailers.module#RetailersModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'customers',
    loadChildren: './customers/customers.module#CustomersModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'setting',
    loadChildren: './setting/setting.module#SettingModule',
    canActivate: [AuthGuard]
  },
];
