import { Component, OnInit } from "@angular/core";
import { FacebookSdk } from "./instagram-graph-api/facebook-sdk";
import { FbUser } from "./instagram-graph-api/fbUser";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  fb: FacebookSdk = new FacebookSdk();

  ngOnInit() {
    this.fb.Init();
  }

  Login() {
    this.fb.Login();
  }

  Logout() {
    this.fb.Logout();
  }

  GetLoginStatus() {
    this.fb.GetLoginStatus();
  }

  TestApi() {
    this.fb.TestApi();
  }

  InstaLogin() {
    this.fb.InstaLogin();
  }
}
