import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductOverviewComponent } from './product-overview/product-overview.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { CartComponent } from './cart/cart.component';
import { authGuard } from './auth/auth.guard';
import { OrdersComponent } from './orders/orders.component';
import {ProfileComponent} from "./profile/profile.component";
import {AdminComponent} from "./admin/admin.component";
import {GiftcardOverviewComponent} from "./giftcard-overview/giftcard-overview.component";

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'products', component: ProductOverviewComponent },
  { path: 'giftcards', component: GiftcardOverviewComponent },
  { path: 'auth/login', component: LoginComponent },
  { path: 'auth/register', component: RegisterComponent },
  { path: 'cart', component: CartComponent, canActivate: [authGuard] },
  { path: 'orders', component: OrdersComponent, canActivate: [authGuard]},
  { path: 'profile', component: ProfileComponent, canActivate: [authGuard]},
  { path: 'admin', component: AdminComponent, canActivate: [authGuard]}
];
