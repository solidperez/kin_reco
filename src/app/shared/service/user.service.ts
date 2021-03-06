import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_URL } from "@shared/constants/UrlConstants";
import { UserRequest } from "@shared/model/request-body";
import { User } from "@shared/model/user";
import { map } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, empty, } from 'rxjs'


@Injectable({
    providedIn: 'root'
})
export class UserService {
    private subject = new BehaviorSubject<any>(0);
    public mysubject = this.subject.asObservable();
  
    getToken(): Observable<any> {
      return this.subject.asObservable();
    }
    sendToken(data) {
      this.subject.next(data);
    }
  
    constructor(
        private http: HttpClient,
        // private Auth : AuthService
    ) { }
   
    getUser() {
        return this.http.get<User>(API_URL + 'parents/').pipe(map((response) => {
            console.log('get user' + response);
            if (response.error) {
                let emptyUser = new User();
                emptyUser.error = response.error;
                return emptyUser;
            } else {
                return response;
            }
        }));
    }

    upsertUser(user: UserRequest) {
        return this.http.get<User>(API_URL + 'parents/').pipe(map((response) => {
            if (response.error) {
                return this.createUser(user);
            } else {
                return response;
            }
        }));
    }

    gethttpOptions() {
        let httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${this.subject.value}`
            })
        };
        return httpOptions;
    }

    //create referral
    createReferral(referee: string) {
        return this.http.post(API_URL + 'referrals/', {"email": referee});
    }

    //create user
    createUser(user: UserRequest) {
        return this.http.post(API_URL + 'parents/', user);
    }

    // Update user
    updateUser(res) {
        const httpOptions = this.gethttpOptions();
        return this.http.patch(API_URL + 'parents/', res, httpOptions);
    }

    // Create kid
    createKid(inputObject: any) {
        const httpOptions = this.gethttpOptions();
        return this.http.post(API_URL + 'kids/', inputObject, httpOptions);
    }

    addFriends(referrals: any) {
        const httpOptions = this.gethttpOptions();
        return this.http.post(API_URL + 'friends/', referrals, httpOptions);
    }

    getFriends() {
        const httpOptions = this.gethttpOptions();
        return this.http.get(API_URL + 'friends/', httpOptions);
    }

    createKids(kids: any) {
        const httpOptions = this.gethttpOptions();
        return this.http.post(API_URL + 'kids-bulk/', kids, httpOptions);
    }

    updateAllKids(kids: any) {
        const httpOptions = this.gethttpOptions();
        return this.http.put(API_URL + 'kids-bulk/', kids, httpOptions);
    }

    updateKids(inputObject: any) {
        const httpOptions = this.gethttpOptions();
        return this.http.put(API_URL + 'kids/', inputObject, httpOptions);
    }
}
