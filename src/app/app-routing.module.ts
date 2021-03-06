import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthGuard } from './core/guards/auth.guard';
import { SessionGuard } from './core/guards/session.guard';
import { NotFoundComponent } from './not-found/not-found.component';


const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    children: [
      {
        path: 'auth',
        loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
        canActivate: [SessionGuard]
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
        data: { breadcrumb: 'Dashboard' },
        canActivate: [AuthGuard]
      },
      {
        path: '404-page',
        component: NotFoundComponent
      },
      {
        path: '',
        redirectTo: 'auth',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '**',
    redirectTo: '404-page',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
