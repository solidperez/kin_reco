import { Component, OnInit } from '@angular/core';
import { ApproveVenueReviewsService } from './approve-review.service';
import { _ } from 'underscore';
import { AuthService } from '@shared/service/auth.service';
import { Observable } from 'rxjs';




@Component({
  selector: 'app-approve-reviews',
  templateUrl: './approve-review.component.html',
  styleUrls: ['./approve-review.component.css']
})
export class ApproveReviewComponent implements OnInit {
  public review: string;
  public isErrorVisible: Boolean;
  public errorMessage: String;
  public review_data: any;
  public entity_types_drop_down_values: any;
  public selected_entity_type: any;
  public selected_reviews: any;

  public rows: any;
  public columns: any;
  public selected: any;
  // public campConstants :any;
  public isAuthenticated$: Observable<boolean>;
  isLogedin = false;
  


  constructor(private approveReviewsService: ApproveVenueReviewsService,
  private authService :AuthService) {
    this.review_data = [];
    this.selected_reviews = [];
    this.rows = [];
    this.columns = [];
    this.selected = [];
    this.entity_types_drop_down_values = [
      {
        'name': 'Event',
        'id': 'event'
      }, {
        'name': 'Venue',
        'id': 'venue'
      },
      {
        'name': 'Camp',
        'id': 'camp'
      },
    ];

    this.columns = [

      { prop: 'entity_id' },
      { prop: 'review' },
      {
        prop: 'is_checked',
        name: 'Is Approved',
        sortable: false,
        canAutoResize: false,
        draggable: false,
        resizable: false,
        headerCheckboxable: true,
        checkboxable: true,
        width: 120
      },
    ];

  }

  ngOnInit() {
    this.isAuthenticated$ = this.authService.isAuthenticated$;
    this.isAuthenticated$.subscribe(data => {
      this.isLogedin = data;
      this.authService.setAuth(this.isLogedin);

    })

  }

  onSelect(row) {
    this.selected_reviews = row.selected;
  }

  get_review_by_type(entity_type: any) {
    this.approveReviewsService.get_reviews_by_type(entity_type, false).subscribe(data => {
      if (data['status']) {
        this.rows = data['data'];

      } else {
        this.isErrorVisible = true;
        this.errorMessage = data['msg'];
      }
    }, error => {
      if (error.status == 400 || error.status == 404) {
        alert(error.error.msg);
      } else {
        alert("Something went wrong");
      }
    });
  }

  entity_type_change(selected_entity_type) {
    this.get_review_by_type(selected_entity_type);
  }

  accept_reviews() {
    if (this.selected_reviews.length > 0) {
      const accepted_id = this.get_accepted_review_id(this.selected_reviews);
      const is_approved = true;

      const api_input = {
        "input_data":
        {
          "review_id": accepted_id,
          "is_approved": is_approved
        }
      };
      this.approveReviewsService.approve_reviews(api_input).subscribe(data => {
        alert(data['msg']);
        window.location.reload();
      }, error => {
        alert(error.error.msg);
      });

    } else {
      alert('No reviews selected to approve');
    }

  }

  get_accepted_review_id(accepted_reviews_data: any) {
    const accepted_review_id = [];
    for (let review_count = 0; review_count < accepted_reviews_data.length; review_count++) {
      accepted_review_id.push(accepted_reviews_data[review_count]['id']);
    }
    return accepted_review_id;
  }
}
