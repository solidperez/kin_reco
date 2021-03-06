import { Component, OnInit } from '@angular/core';
import { CampModel } from './camp.model';
import { CampConstants } from '../../shared/constants/CampConstants';
import { AddCampService } from './add-camp.service';
import { ValidationRules } from '../../shared/utils/ValidationRules';
import { AuthService } from '@shared/service/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-add-camp',
  templateUrl: './add-camp.component.html',
  styleUrls: ['./add-camp.component.css']
})

export class AddCampComponent implements OnInit {
  // public campConstants :any;
  public isAuthenticated$: Observable<boolean>;
  isLogedin = false;

  public campModel: any;
  public categoryList: any;
  public campConstants: any;
  public cat_id: number;
  public cat_name: string;
  public showError: Boolean;
  public camp_error: any;
  public validationRules: any;
  data: any = {};

  constructor(private addCampService: AddCampService,
              private authService: AuthService) {
    this.campModel = new CampModel();
    this.campConstants = new CampConstants();
    this.validationRules = new ValidationRules();
    this.categoryList = this.campConstants.CAMP_CATEGORY;
    this.showError = false;
    this.cat_name = '';
    this.camp_error = [];
  }

  ngOnInit() {
    this.isAuthenticated$ = this.authService.isAuthenticated$;
    this.isAuthenticated$.subscribe(data => {
      this.isLogedin = data;
      this.authService.setAuth(this.isLogedin);
    });

  }

  onSubmit() {
    this.addCamp();
  }

  addCamp() {
    this.campModel.category = this.cat_name;
    this.campModel.max_age = this.campModel.max_age ? this.campModel.max_age : 0;
    this.campModel.min_age = this.campModel.min_age ? this.campModel.min_age : 0;
    const api_input = {
      "camps_data": this.campModel
    };
    this.addCampService.add_camp(api_input).subscribe(data => {
      if (data['status'] == true) {
        this.showError = false;
        alert(data['msg']);
      } else {
        this.showError = true;

        this.camp_error.push(data['msg']);
      }
    }, error => {
      this.camp_error = [];
      this.showError = true;
      const server_error = error.error.error;
      for (const error_key in server_error) {
        if (error_key) {
          const error_msg = server_error[error_key][0];
          this.camp_error.push(error_key + " :" + error_msg);
        }
      }
    });

  }

  set_cat_name(cat_obj: string) {
    this.cat_name = cat_obj;
  }

}
