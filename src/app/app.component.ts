import { Component, OnInit } from "@angular/core";
// import { FacebookSdk } from "./instagram-graph-api/facebook-sdk";
// import { InstagramGraphApi } from "./instagram-graph-api/instagram-graph-api";
import { InstagramGraphApi } from "./instagram-graph-api/instagram-graph-api";
//declare var FB: any;

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  ngOnInit() {
    // FB.getLoginStatus(function(response) {
    //   statusChangeCallback(response);
    // });
    // FacebookSdk.info();
    InstagramGraphApi.info();
  }
}
