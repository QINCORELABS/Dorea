import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { EventComponent } from './pages/event/event.component';
import { CartComponent } from './pages/cart/cart.component';
import { CheckoutFormComponent } from './components/checkout-form/checkout-form.component';
import { ShareModalComponent } from './pages/share-modal/share-modal.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'event/:id', component: EventComponent },
    { path: 'cart', component: CartComponent },
    { path: 'checkout', component: CheckoutFormComponent},
    { path: 'share' , component:ShareModalComponent},
    { path: '**', redirectTo: '' }
];
