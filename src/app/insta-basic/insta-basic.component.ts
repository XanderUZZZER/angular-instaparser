import { Component, OnInit } from "@angular/core";
import { User } from "./user";
import { Router } from "@angular/router";

import { ActivatedRoute } from '@angular/router';

@Component({
  selector: "app-insta-basic",
  templateUrl: "./insta-basic.component.html",
  styleUrls: ["./insta-basic.component.css"]
})
export class InstaBasicComponent implements OnInit {
  constructor(private user: User, private router: Router,private route: ActivatedRoute) {}

  ngOnInit() {
    console.log(this.route.queryParams);
    this.user.token.checkAuthCode();
  }

  getUserNode() {
    this.user.getNode();
  }

  getUserMedia() {
    this.user.getMedia();
  }

  goTo() {
    let url = "https://google.com";
    this.router.navigateByUrl(url).then(e => {
      if (e) {
        console.log("Navigation is successful!")
        
      } else {
        console.log("Navigation has failed!");
        console.log(e);
        window.location.href = url;
      }});
  }
}
