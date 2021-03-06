import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MasonsryViewComponent } from './layout/masonsry-view/masonsry-view.component';
import { SharedLibsModule } from './shared-libs.module';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { HomeHeaderComponent } from './layout/home-header/home-header.component';
import { MasonsryVenuesPersonaliseViewComponent } from './layout/masonsry-personalise-view/masonsry-personalise-view.component';
import { MasonryParentRecosViewComponent } from './layout/masonry-parent-recos-view/masonry-parent-recos-view.component';
import { ModalModule } from 'ngx-bootstrap';
import { EventCalendarComponent } from './layout/event-calendar/event-calendar.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    SharedLibsModule,
    ModalModule.forRoot()
  ],
  declarations: [
    MasonsryViewComponent,
    HeaderComponent,
    FooterComponent,
    HomeHeaderComponent,
    MasonsryVenuesPersonaliseViewComponent,
    MasonryParentRecosViewComponent,
    EventCalendarComponent,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MasonsryViewComponent,
    HeaderComponent,
    FooterComponent,
    HomeHeaderComponent,
    MasonsryVenuesPersonaliseViewComponent,
    MasonryParentRecosViewComponent,
    EventCalendarComponent,
    ModalModule,
  ]
})
export class SharedModule { }
