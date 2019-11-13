import { Routes } from '@angular/router';

export const CONTENT_ROUTES: Routes = [
     {
        path: '',
        loadChildren: './pages/content-pages/content-pages.module#ContentPagesModule'
    }
];
