import { DatePipe } from '@angular/common';
import { NgxLinkifyjsModule } from 'ngx-linkifyjs';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { MatDatepickerModule , MatDialogModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedLibsModule } from '@shared/shared-libs.module';
import { SharedModule } from '@shared/shared.module';
import { SlickCarouselModule } from 'ngx-slick-carousel';

// Custom Modules
import { AppRoutingModule } from './app-routing.module';
import { CampModule } from './camp/camp.module';
import { EventModule } from './event/event.module';
import { HikingModule } from './hiking/hiking.module';
import { VenueModule } from './venue/venue.module';
import { CityModule } from './city/city.module';
import { ClassesModule } from './classes/classes.module';

// Components
import { AppComponent } from './app.component';
import { AboutUsComponent } from './component/about-us/about-us.component';
import { ReviewsComponent } from './component/add-review/reviews.component';
import { ApproveReviewComponent } from './component/approve-reviews/approve-review.component';
import { CallbackComponent } from './component/callback/callback.component';
import { ComingSoonComponent } from './component/coming-soon/coming-soon.component';
import { ContactUsComponent } from './component/contact-us/contact-us.component';
import { DataEntryComponent } from './component/data-entry/data-entry.component';
import { HelpComponent } from './component/help/help.component';
import { HomeComponent } from './component/home/home.component';
import { LoginComponent } from './component/login/login.component';
import { PersonalizedComponent } from './component/personalized/personalized.component';
import { ParentRecosComponent } from './component/parent-recos/parent-recos.component';
import { PrivacyComponent } from './component/privacy/privacy.component';
import { SignUpComponent } from './component/sign-up/sign-up.component';
import { TermsComponent } from './component/terms/terms.component';
import { ProfileComponent } from './component/profile/profile.component';
import { GetStartedComponent } from './component/get-started/get-started.component';
import { MiddlewareComponent } from './middleware/middleware.component';
import { SavedComponent } from './component/saved/saved.component';
import { SavedListingComponent } from './component/saved/saved-listing/saved-listing.component';
import { MasonsrySavedViewComponent } from './component/saved/masonsry-saved-view/masonsry-saved-view.component';
import { MasonsryRecosViewComponent } from './component/recos/masonsry-recos-view/masonsry-recos-view.component';
import { MasonrySubscribeViewComponent } from './component/saved/masonry-subscribe-view/masonry-subscribe-view.component';
import { MasonsryVenuesPersonaliseViewComponent } from '@shared/layout/masonsry-personalise-view/masonsry-personalise-view.component';
import { MasonryParentRecosViewComponent } from '@shared/layout/masonry-parent-recos-view/masonry-parent-recos-view.component';
import { PlaydateDialogComponent } from './event/playdate-dialog/playdate-dialog.component';
import { RecosComponent } from './component/recos/recos.component';
import { RecosListingComponent } from './component/recos/recos-listing/recos-listing.component';
import { AddRecoComponent } from './component/add-reco/add-reco.component';
import { InviteFriendComponent } from './component/invite-friend/invite-friend.component';
import { AcceptInviteComponent } from './component/accept-invite/accept-invite.component';

// Services
import { AuthInterceptor } from './shared/service/auth.interceptor';
import { SwalService } from './shared/service/swal.service';
import { SafePipe } from './shared/service/safe.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AddRecoComponent,
    HelpComponent,
    DataEntryComponent,
    ReviewsComponent,
    ApproveReviewComponent,
    ComingSoonComponent,
    SignUpComponent,
    AboutUsComponent,
    ContactUsComponent,
    PrivacyComponent,
    TermsComponent,
    PersonalizedComponent,
    ParentRecosComponent,
    LoginComponent,
    CallbackComponent,
    ProfileComponent,
    GetStartedComponent,
    AcceptInviteComponent,
    MiddlewareComponent,
    SavedComponent,
    SavedListingComponent,
    RecosListingComponent,
    RecosComponent,
    RecosListingComponent,
    MasonsrySavedViewComponent,
    MasonsryRecosViewComponent,
    MasonrySubscribeViewComponent,
    PlaydateDialogComponent,
    SafePipe,
    InviteFriendComponent,
  ],
  imports: [
    AppRoutingModule,
    EventModule,
    CampModule,
    VenueModule,
    HikingModule,
    SharedModule,
    CityModule,
    ClassesModule,
    SharedLibsModule,
    BrowserModule,
    BrowserAnimationsModule,
    NgxLinkifyjsModule.forRoot(),
    SlickCarouselModule,
  ],
  exports: [MatDatepickerModule, MatDialogModule,
    MasonsrySavedViewComponent, MasonrySubscribeViewComponent, MasonsryRecosViewComponent,
    MasonsryVenuesPersonaliseViewComponent, MasonryParentRecosViewComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    DatePipe,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    SwalService
  ],
  entryComponents: [PlaydateDialogComponent, InviteFriendComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
