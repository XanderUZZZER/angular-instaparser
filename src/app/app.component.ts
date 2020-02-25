import { Component, OnInit } from "@angular/core";
declare var FB: any;

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  ngOnInit() {
    (window as any).fbAsyncInit = function() {
      FB.init({
        appId: "192282568679644",
        cookie: true,
        xfbml: true,
        version: "v6.0"
      });
      FB.AppEvents.logPageView();
    };

    (function(d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s);
      js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    })(document, "script", "facebook-jssdk");
  }

  submitLogin() {
    console.log("submit login to facebook");
    // FB.login();
    FB.login(response => {
      console.log("submitLogin", response);
      if (response.authResponse) {
        //login success
        //login success code here
        //redirect to home page
      } else {
        console.log("User login failed");
      }
    });
  }

  submitLogout() {
    console.log("submit logout of facebook");
    // FB.login();
    FB.logout(response => {
      console.log("submitLogout", response);
      if (response.authResponse) {
        //login success
        //login success code here
        //redirect to home page
      } else {
        console.log("User logout failed");
      }
    });
  }
}
