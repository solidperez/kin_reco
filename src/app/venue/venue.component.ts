import { Component, OnInit } from '@angular/core';
import { VenueService } from './venue.service';
import { UserSearch } from './venue.model';
import { VenueConstants, VenueErrorMessage } from '../shared/constants/VenueConstants';
import { ValidationRules } from '../shared/utils/ValidationRules';
import { Router } from '@angular/router';
import { AuthService } from '@shared/service/auth.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-venue',
  templateUrl: './venue.component.html',
  styleUrls: ['./venue.component.css']
})
export class VenueComponent implements OnInit {
  public userSearch = new UserSearch();
  public isUpdateShow = false;
  public venueConstatnts = new VenueConstants();
  public venueErrorMessage = new VenueErrorMessage();
  public validationRules = new ValidationRules();
  public primary_cat = this.venueConstatnts.PRIMARY_CATEGORY;
  public secondary_cat = this.venueConstatnts.SECONDARY_CATEGORY;
  public errorMessage: String;
  public isErrorVisible: Boolean;
  public jsonMiscData: JSON;
  public showErrorDialog: boolean;
  public ClickName: string;
  // public campConstants :any;
  public isAuthenticated$: Observable<boolean>;
  isLogedin = false;

  constructor(private eventService: VenueService,
    private authService: AuthService,
    private router: Router) {
    this.showErrorDialog = false;
  }

  ngOnInit(): void {
    this.isAuthenticated$ = this.authService.isAuthenticated$;
    this.isAuthenticated$.subscribe(data => {
      this.isLogedin = data;
      this.authService.setAuth(this.isLogedin);
    });
  }

  add_new_venue(this) {
    let new_venuee_result: any;
    const isValidated = this.validationRules.validate_basic_venue_fields(this.userSearch);
    if (isValidated === true) {
      this.isErrorVisible = false;
      const api_input = { input: this.userSearch };
      this.eventService.add_new_venue(api_input)
        .subscribe(data => {
          if (data !== undefined) {
            if ('error' in data) {
              this.isUpdateShow = false;
              new_venuee_result = {};
              this.isErrorVisible = true;
              this.errorMessage = data['error'];
            } else {
              const venue_id = data.id;
              this.router.navigate(['/edit-venue/' + venue_id]);
            }
          } else {
            alert(data.error);
          }

        }, error => {
          alert(JSON.stringify(error.error.error));
        });
    } else {
      this.isErrorVisible = true;
      this.errorMessage = isValidated;
    }

  }

  reset_venue(this) {
    this.isUpdateShow = false;
    this.userSearch.name = this.userSearch.state = this.userSearch.city = "";
  }

  closeErrorBox() {
    this.isErrorVisible = false;
  }

  signin() {

  }

  closeDialog() {
  }

  update_venue($event) {
  }
}
