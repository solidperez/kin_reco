import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '@shared/constants/UrlConstants';
@Injectable({
  providedIn: 'root'
})
export class VenueListingService {

  constructor(private http: HttpClient) { }

  get_venue_details(url) {
    return this.http.get(url);
  }

  get_Saved_Venues() {
    const url = API_URL + 'actions/?entity_type=ETYPE_VENUE&action_type=ATYPE_SAVE';
    return this.http.get(url);
  }

  get_subscribed_Venues() {
    const url = API_URL + 'subscribe-venue/';
    const res = this.http.get(url);
    return this.http.get(url);
  }


  getSavedListing(type) {
    let url = '';
    if (type === "CLASSES") {
      url = API_URL + `actions/?entity_type=ETYPE_VENUE&category=50000&action_type=ATYPE_SAVE`;
    } else {
      url = API_URL + `actions/?entity_type=ETYPE_${type}&action_type=ATYPE_SAVE`;
    }
    return this.http.get(url);
  }

  getSavedClasses() {
    const url = API_URL + `actions/?entity_type=ETYPE_VENUE&category=50000&action_type=ATYPE_SAVE`;
    return this.http.get(url);
  }


}
