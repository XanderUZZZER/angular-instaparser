import { Component, OnInit } from "@angular/core";
import { FacebookSdk } from "./instagram-graph-api/facebook-sdk";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  fb: FacebookSdk = new FacebookSdk();
  response: Function = () => {return this.fb.response }
  // response: any;

  ngOnInit() {
    this.fb.loadSdk();
    // this.Render()
  }

  Login() {
    this.fb.Login();
  }

  Logout() {
    this.fb.Logout();
  }

  GetStatus() {
    this.fb.GetStatus();
    console.log(this.fb.response.status);
  }

  TestApi() {
    return new Promise((resolve, reject) => {
      this.fb.testAPI();
    }).then(() => console.log("ame", this.fb.response.name));
    // this.fb.testAPI();
    // console.log(this.fb.response.name);
  }

  Render() {
    this.fb.RenderPlugins();
  }

  Info() {
    console.log("info");
    this.fb.info();
  }
}
