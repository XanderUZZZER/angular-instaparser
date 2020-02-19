import { Component, OnInit } from "@angular/core";
import { HttpClient, HttpResponse } from "@angular/common/http";
import { Router } from "@angular/router";

import { Observable } from "rxjs";
import { CookieService } from "ngx-cookie-service";

export class Token {
  access_token: string;
  user_id: number;
}

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  appId: number = 206756813847383;
  appSecret: string = "4bc7a77badc3213a7d937ca8769a02ee";
  redirectUri: string = `https://angular-instaparser.stackblitz.io/`;
  code: string;

  cookieValue = "UNKNOWN";

  urlString: string;

  currentUrl: string;
  windowUrl: string;
  temp: any;
  reqBody: FormData = new FormData();
  token: Token = new Token();

  constructor(
    private http: HttpClient,
    private router: Router,
    private cookieService: CookieService
  ) {
    this.urlString = `https://api.instagram.com/oauth/authorize?client_id=${
      this.appId
    }&redirect_uri=${
      this.redirectUri
    }&scope=user_profile,user_media&response_type=code`;
    this.currentUrl = this.router.url;
    this.windowUrl = window.location.href;
    this.code = this.windowUrl
      .split("code=")
      .pop()
      .slice(0, -2);
  }

  ngOnInit() {
    //this.cookieService.set("Test", "Hello World");
    this.cookieValue = this.cookieService.get("Test");
  }

  getAuthorizationCode() {
    this.http.get(this.urlString).subscribe(data => (this.temp = data));
    console.log(this.temp);
  }

  getToken() {
    this.reqBody.append("client_id", `${this.appId}`);
    this.reqBody.append("client_secret", this.appSecret);
    this.reqBody.append("grant_type", "authorization_code");
    this.reqBody.append("redirect_uri", `${this.redirectUri}`);
    this.reqBody.append("code", this.code);

    let postUrl = `https://api.instagram.com/oauth/access_token`;
    let body;

    this.http.post(postUrl, this.reqBody).subscribe(
      val => {
        console.log("POST call successful value returned in body", val);
        let temp = JSON.stringify(val);
        this.token = JSON.parse(temp);
        console.log("token", this.token);
      },
      response => {
        console.log("POST call in error", response);
      },
      () => {
        console.log("The POST observable is now completed.", this.token);
      }
    );
  }

  getToken2() {
    this.token = this.getToken().subscribe(resp => console.log(resp));
    console.log(this.temp);
  }

  getUserNode() {
    //https://graph.instagram.com/{user-id}?fields=id,username&access_token={access-token}
    let s = `https://graph.instagram.com/${
      this.token.user_id
    }?fields=id,username&access_token=${this.token.access_token}`.trim();
    let k = `https://graph.instagram.com/me?fields=id,username&access_token=${
      this.token.access_token
    }`.trim();
    return this.http.get(k).subscribe(data => {
      this.temp = data;
      console.log("user node", this.temp);
      console.log("token\t", this.token.access_token);
      console.log("id\t", this.token.user_id);
    });
  }

  testCookie() {
    console.log(this.cookieService.get("Test"));
    let s = new Date();
    this.cookieService.set("Test", this.cookieValue + s);
    this.cookieService.get("Test");
  }
}
