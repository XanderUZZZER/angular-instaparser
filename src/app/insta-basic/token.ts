import { CookieService } from "ngx-cookie-service";
import { HttpClient } from "@angular/common/http";
import { Router, ActivatedRoute } from "@angular/router";
import "rxjs/add/operator/filter";

export class Token {
  appId = 206756813847383;
  redirectUri = "https://angular-instaparser.stackblitz.io/";
  authorizationCode;
  clientSecret = "4bc7a77badc3213a7d937ca8769a02ee";

  accessToken: string;
  userId: number;
  shortLived: boolean;

  constructor(
    private cookieService: CookieService,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.authorizationCode = this.cookieService.get("authorizationCode");
    this.accessToken = this.cookieService.get("accessToken");
  }

  getToken() {
    console.log("in token get");
    if (!this.accessToken) console.log("no token");
    let fromData = new FormData();
    fromData.append("client_id", this.appId.toString());
    fromData.append("client_secret", this.clientSecret);
    fromData.append("grant_type", "authorization_code");
    fromData.append(
      "redirect_uri",
      "https://angular-instaparser.stackblitz.io/"
    );
    fromData.append("code", this.authorizationCode);

    let temp;
    this.http
      .post("https://api.instagram.com/oauth/access_token", fromData)
      .subscribe(
        data => {
          temp = data;
          console.log('in OK (getToken())',temp);          
          console.log(data);
          this.accessToken = data.hasOwnProperty('access_token') ? data.access_token : "NONE";
          this.cookieService.set('accessToken',this.accessToken);
        },
        error => {
          temp = error;
          console.log('in error (getToken())',temp);
          console.log('going to get auth');
          this.getAuthCode();
        }
      );

    //     https://api.instagram.com/oauth/access_token \
    // -F client_id={app-id} \
    // -F client_secret={app-secret} \
    // -F grant_type=authorization_code \
    // -F redirect_uri={redirect-uri} \
    // -F code={code}
  }

  saveToken() {
    this.cookieService.set(
      "accessToken",
      this.accessToken,
      this.shortLived ? 0.042 : 60
    ); //short lived lives 60 secs, long lived lives 60 days
  }

  checkAuthCode() {
    console.log("in check Authcode");
    if (this.cookieService.get("authorizationCode"))
      this.authorizationCode = this.cookieService.get("authorizationCode");
    this.authorizationCode = this.route.queryParams
      .filter(params => params.code)
      .subscribe(params => {        
        this.authorizationCode = params.code;
        console.log('code', this.authorizationCode);
      });
  }

  getAuthCode() {
    console.log("in get auth code");
    let temp;
    this.http
      .get(
        `https://api.instagram.com/oauth/authorize
      ?client_id=${this.appId}
      &redirect_uri=${this.redirectUri}
      &scope=user_profile,user_media
      &response_type=code`
      )

      .subscribe(
        data => {
          temp = data;
          console.log(temp);
        },
        error => {
          temp = error;
          console.log("Get auth error");
          this.goToInsta();
        }
      );
  }

  goToInsta() {
    console.log("going to insta");
    let url = `https://api.instagram.com/oauth/authorize?client_id=${
      this.appId
    }&redirect_uri=${
      this.redirectUri
    }&scope=user_profile,user_media&response_type=code`;
    console.log(url);
    window.location.href = url;
  }
}
