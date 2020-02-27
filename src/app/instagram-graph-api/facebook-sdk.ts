declare var FB: any;
declare var globalFB: any;

export class FacebookSdk {
  response: any;

  loadSdk() {
    (window as any).fbAsyncInit = function() {
      FB.init({
        appId: "192282568679644",
        cookie: true,
        xfbml: true,
        version: "v6.0",
        status: true
      });

      FB.getLoginStatus(response => statusChangeCallback(response));
      //FB.getLoginStatus(response => {console.log(h);statusChangeCallback(response);});
      FB.Event.subscribe("auth.login", login_event);
      FB.Event.subscribe("auth.logout", logout_event);
    };

    (function(d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s);
      js.id = id;
      //js.src = "https://connect.facebook.net/en_US/sdk/debug.js"; //debug not mimized
      js.src = "https://connect.facebook.net/en_US/sdk.js"; // prod version minimized
      fjs.parentNode.insertBefore(js, fjs);
    })(document, "script", "facebook-jssdk");

    function statusChangeCallback(response) {
      if (response.status === "connected") {
        console.log("Logged in and authorized");
      } else if (response.status === "not_authorized") {
        console.log("Not authorized");
      } else {
        console.log("Not logged in");
      }
    }
    var login_event = function(response) {
      console.log("login_event");
      console.log("login_status", response.status);
      console.log(response);
    };

    var logout_event = function(response) {
      console.log("logout_event");
      console.log("login_status", response.status);
      console.log(response);
    };
  }

  Login() {
    console.log("submit login to facebook");
    // FB.login();
    FB.login(response => {
      console.log("submitLogin", response);
      this.response = response;
      console.log("this.response", this.response);
      if (response.authResponse) {
        console.log("response.authResponse", response.authResponse);
      } else {
        console.log("User login failed");
      }
    });
  }

  Logout() {
    console.log("submit log out of facebook");
    FB.logout(response => {
      this.response = response;
      console.log("submitLoout", response);
      if (response.authResponse) {
        console.log("response.authResponse", response.authResponse);
        //login success
        //login success code here
        //redirect to home page
      } else {
        console.log("User logout fails");
      }
    });
  }

  GetStatus() {
    FB.getLoginStatus(response => this.statusChangeCallback(response));
  }

  testAPI() {
    // Testing Graph API after login.  See statusChangeCallback() for when this call is made.
    console.log("Welcome!  Fetching your information.... ");
    FB.api("/me", function(response) {
      console.log("Successful login for: " + response.name);
      document.getElementById("status").innerHTML =
        "Thanks for logging in, " + response.name + "!";
    });
  }

  statusChangeCallback(response) {
    this.response = response;
    if (response.status === "connected") {
      console.log("Logged in and authorized");
    } else if (response.status === "not_authorized") {
      console.log("Not authorized");
    } else {
      console.log("Not logged in");
    }
  }

  info() {
    console.log("Facebook SDK");
    console.log(this.response);
  }
}
