import { Component, OnInit } from "@angular/core";
import { FacebookSdk } from "./instagram-graph-api/facebook-sdk";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  fb: FacebookSdk = new FacebookSdk();

  ngOnInit() {
    this.fb.loadSdk();
  }

  Login() {
    this.fb.Login();
  }

  Logout() {
    this.fb.Logout();
  }

  GetStatus() {
    this.fb.GetStatus();
  }

  TestApi(){
    this.fb.testAPI();
  }

  Info() {
    console.log("info");
    this.fb.info();
  }
}
