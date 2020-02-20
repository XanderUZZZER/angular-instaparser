import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router, ActivatedRoute } from "@angular/router";

import { CookieService } from "ngx-cookie-service";

import { Token } from "./token";

@Injectable()
export class User {
  token: Token = new Token(
    this.cookieService,
    this.http,
    this.router,
    this.route
  );
  tokenUri: string = "api.instagram.com";
  mediaUri: string = "graph.instagram.com";
  node;
  media;

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  getNode() {
    let temp;
    let error;
    console.log('in getting node');
    console.log('token value', this.token.accessToken);
  this.http
      .get(
        `https://graph.instagram.com/me?fields=id,username,account_type,media&access_token=${this.token.accessToken}`
      )
      .subscribe(
        data => {
          temp = data;
          console.log("getting node", temp);
          this.node = JSON.parse(JSON.stringify(data));
        },
        error => {
          this.token.getToken();
          error = error.message;
          console.log("ERROR getting node", error);
        }
      );
  }

  getMedia(){
    let temp;
    let error;
    console.log('in getting media');
    console.log('token value', this.token.accessToken);
  this.http
      .get(
        `https://graph.instagram.com/${this.node.id}/media?access_token=${this.token.accessToken}`

      )
      .subscribe(
        data => {
          temp = data;
          console.log("getting node", temp);
          this.media = JSON.parse(JSON.stringify(data));
        },
        error => {
          
          error = error.message;
          console.log("ERROR getting media", error);
        }
      );
  }
}
