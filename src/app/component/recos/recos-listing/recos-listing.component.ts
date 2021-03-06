import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { MatDialog, } from "@angular/material";
import { AirtableService } from '../../../shared/service/airtable.service';
import { UserService } from '../../../shared/service/user.service';
import { User } from '../../../shared/model/user';
import { RecosConstants } from "@shared/constants/CommonConstants";
import { AuthService } from '../../../shared/service/auth.service';
import { Observable } from 'rxjs';

declare let ga: any;

@Component({
  selector: 'app-recos-listing',
  templateUrl: './recos-listing.component.html',
  styleUrls: ['./recos-listing.component.css']
})
export class RecosListingComponent implements OnInit {

  data_list;
  isExplore = false;
  public friends: string[];
  public friend_ids: number[];
  public recommenders = new Object();
  public user: User;
  public category: string;
  public locations: any;
  public recosConstants = new RecosConstants();
  public categoryList = this.recosConstants.RECOS_CATEGORY;
  public recos: any;
  showMore = false;
  showCommunity = false;
  showTrusted = false;
  showYours = false;
  start = 0;
  end = 100;
  oldFilterData = true;
  newFilterData = false;
  public isErrorVisible: boolean;
  public errorMessage: String;
  count = 0;
  public isAuthenticated$: Observable<boolean>;
  isLoggedin = false;



  entity_type: string;
  display_entity_type: string;
  constructor(private route: ActivatedRoute,
    public dialog: MatDialog,
      private airtableService: AirtableService,
      private userService: UserService,
      private authService: AuthService) {
      this.isAuthenticated$ = this.authService.isAuthenticated$;
      this.isAuthenticated$.subscribe(data => {
        this.isLoggedin = data;
      });
      this.friend_ids = [];
    }


  ngOnInit() {
    this.recos = {
      'friends': [],
      'community': [],
      'trusted': [],
      'yours': []
    };
    this.isErrorVisible = false;
    this.errorMessage = '';
    this.isAuthenticated$.subscribe(data => {
      this.isLoggedin = data;
      this.authService.setAuth(this.isLoggedin);
      });

    this.entity_type = this.route.snapshot.params['id'];
    this.airtableService.getRecommenderNames().subscribe(data => {
      for (let idx in data['records']) {
        let rec = data['records'][idx];
        this.recommenders[rec.id] = rec.fields.Name;
      }
    });


    this.userService.getUser().subscribe((user) => {
        this.user = user;
        this.get_friends();
    });
    setTimeout(() => {
      this.showCommunity = true;
    }, 3000);


    setTimeout(() => {
      this.showYours = true;
    }, 5000);


    setTimeout(() => {
      this.showTrusted = true;
    }, 6000);

  }

  get_friends() {
    this.airtableService.getFriends(this.user.parent.parent_id).subscribe(data => {
      if (data['records'].length > 0) {
        this.friends = data['records'][0].fields.Friends.split(",");
      } else {
        this.friends = [];
      }
      this.userService.getFriends().subscribe(data => {
        if (data['friends'].length > 0) {
          for (let idx in data['friends']) {
            let friend = data['friends'][idx];
            this.friend_ids.push(parseInt(friend.id));
          }
        }
        this.get_recos(this.entity_type, this.friends, this.friend_ids);
      });

    });

  }

  get_recos(entity_type: string, friends_list: string[], friends_ids_list: number[]) {
    let airtable_category = this.categoryList.filter(function(item) {
      return item.name === entity_type;
    })[0];
    this.category = airtable_category.name;
    this.airtableService.getRecosByCategory(airtable_category.category).subscribe(data => {
          for (let idx in data['records']) {
            let rec = data['records'][idx];
            if (friends_list.length > 0 && friends_list.indexOf(rec.fields.Recommender) > -1 ) {
                this.recos.friends.push(rec);
            } else {
              console.log("LIST" + friends_ids_list);
                if (rec.fields.hasOwnProperty('KinId')) {
                    if (parseInt(this.user.parent.parent_id) === rec.fields.KinId) {
                        this.recos.yours.push(rec);
                    }
                    if (friends_ids_list.indexOf(rec.fields.KinId) > -1) {
                      this.recos.friends.push(rec);
                      console.log(this.recos.friends);
                    }
                } else {
                  if (!rec.fields.hasOwnProperty('Visibility') || rec.fields.Visibility === "Yes") {
                    this.recos.community.push(rec);
                  }
                }
            }
          }
          if (entity_type === 'toys') {
              this.airtableService.getToys().subscribe(data => {
                for (let idx in data['records']) {
                  let rec = data['records'][idx];
                  for (let recommender in rec.fields.RecommendedBy) {
                    rec.fields.RecommendedBy[recommender] = this.recommenders[rec.fields.RecommendedBy[recommender]];
                  }
                  this.recos.trusted.push(rec);
                }
              });
          } else if (entity_type === 'books') {
              this.airtableService.getBooks().subscribe(data => {
                for (let idx in data['records']) {
                  let rec = data['records'][idx];
                  for (let recommender in rec.fields.RecommendedBy) {
                    rec.fields.RecommendedBy[recommender] = this.recommenders[rec.fields.RecommendedBy[recommender]];
                  }
                  this.recos.trusted.push(rec);
                }
            });
          }
    });

  }

}
