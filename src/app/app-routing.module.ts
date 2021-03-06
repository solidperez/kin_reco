import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { ComingSoonComponent } from './component/coming-soon/coming-soon.component';
import { HelpComponent } from './component/help/help.component';
import { DataEntryComponent } from './component/data-entry/data-entry.component';
import { ReviewsComponent } from './component/add-review/reviews.component';
import { ApproveReviewComponent } from './component/approve-reviews/approve-review.component';
import { SignUpComponent } from './component/sign-up/sign-up.component';
import { AboutUsComponent } from './component/about-us/about-us.component';
import { ContactUsComponent } from './component/contact-us/contact-us.component';
import { PrivacyComponent } from './component/privacy/privacy.component';
import { TermsComponent } from './component/terms/terms.component';
import { PersonalizedComponent } from './component/personalized/personalized.component';
import { ParentRecosComponent } from './component/parent-recos/parent-recos.component';
import { LoginComponent } from './component/login/login.component';
import { CallbackComponent } from './component/callback/callback.component';
import { ProfileComponent } from './component/profile/profile.component';
import { GetStartedComponent } from './component/get-started/get-started.component';
import { MiddlewareComponent } from './middleware/middleware.component';
import { SavedComponent } from './component/saved/saved.component';
import { SavedListingComponent } from './component/saved/saved-listing/saved-listing.component';
import { RecosListingComponent } from './component/recos/recos-listing/recos-listing.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { RecosComponent } from './component/recos/recos.component';
import { AddRecoComponent } from './component/add-reco/add-reco.component';
import { AcceptInviteComponent } from './component/accept-invite/accept-invite.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: '',
    loadChildren: () => import('./event/event.module').then(mod => mod.EventModule)
  },
  {
    path: '',
    loadChildren: () => import('./camp/camp.module').then(mod => mod.CampModule)
  },
  {
    path: '',
    loadChildren: () => import('./venue/venue.module').then(mod => mod.VenueModule)
  },
  {
    path: '',
    loadChildren: () => import('./hiking/hiking.module').then(mod => mod.HikingModule)
  },
  {
    path: '',
    loadChildren: () => import('./city/city.module').then(mod => mod.CityModule)
  },
  {
    path: '',
    loadChildren: () => import('./classes/classes.module').then(mod => mod.ClassesModule)
  },
  { path: 'data-entry', component: DataEntryComponent,canActivate: [AuthGuard]},
  { path: 'add/review', component: ReviewsComponent },
  { path: 'approve-reviews', component: ApproveReviewComponent },
  { path: 'help', component: HelpComponent },
  { path: 'coming-soon', component: ComingSoonComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'about-us', component: AboutUsComponent },
  { path: 'contact-us', component: ContactUsComponent },
  { path: 'privacy', component: PrivacyComponent },
  { path: 'terms', component: TermsComponent },
  { path: 'my-kin', component: PersonalizedComponent },
  { path: 'recos/:recommender', component: ParentRecosComponent },
  { path: 'terms', component: TermsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'redirecting',component: MiddlewareComponent },
  { path: 'callback', component: CallbackComponent },
  { path: 'home', component: HomeComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'get-started', component: GetStartedComponent },
  { path:'saved',component:SavedComponent},
  { path:'saved-listing/:id',component:SavedListingComponent},
  { path:'recos', component: RecosComponent},
  { path:'recos-listing/:id', component: RecosListingComponent},
  { path:'add-recos', component: AddRecoComponent},
  { path:'accept-invites',component:AcceptInviteComponent},
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
