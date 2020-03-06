import { Component, OnInit } from "@angular/core";
import { FacebookSdk } from "./instagram-graph-api/facebook-sdk";
import { FbUser } from "./instagram-graph-api/fbUser";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  //fb: FacebookSdk = new FacebookSdk();
  user: FbUser;

  ngOnInit() {
    //this.fb.loadScript();
    this.user = new FbUser();
  }

  Login(){
    this.user.fb.Login();
  }

  Logout(){
    this.user.Logout();
  }

  GetStatus(){
    this.user.GetStatus();
  }
}
