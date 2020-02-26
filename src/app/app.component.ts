import { Component, OnInit } from "@angular/core";
import { FacebookSdk } from "./instagram-graph-api/facebook-sdk";
import { InstagramGraphApi } from "./instagram-graph-api/instagram-graph-api";
declare var FB: any;

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  insta: InstagramGraphApi = new InstagramGraphApi();
  face: FacebookSdk = new FacebookSdk();

  ngOnInit() {
    this.loadSdk();
  }

  loadSdk() {
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

    FB.getLoginStatus(function(response) {
      console.log('getLoginStatus')
      statusChangeCallback(response);
    });

    function checkLoginState() {
      console.log('checkLoginState')
      FB.getLoginStatus(function(response) {
        statusChangeCallback(response);
      });
    }
    function statusChangeCallback(response) {
      console.log("statusChangeCallback");
      console.log(response);
      // The response object is returned with a status field that lets the
      // app know the current login status of the person.
      // Full docs on the response object can be found in the documentation
      // for FB.getLoginStatus().
      if (response.status === "connected") {
        // Logged into your app and Facebook.
        console.log("Welcome!  Fetching your information.... ");
        FB.api("/me", function(response) {
          console.log("Successful login for: " + response.name);
          document.getElementById("status").innerHTML =
            "Thanks for logging in, " + response.name + "!";
        });
      } else {
        // The person is not logged into your app or we are unable to tell.
        document.getElementById("status").innerHTML =
          "Please log " + "into this app.";
      }
    }
  }
}
