declare var FB: any;

export class FacebookSdk {
  response: any;

  loadSdk() {
    (window as any).fbAsyncInit = function() {
      FB.init({
        appId: "192282568679644",
        cookie: true,
        xfbml: true,
        version: "v6.0",
        status: true // check auth status onInit
      });

      //FB.getLoginStatus(response => statusChangeCallback(response));
      //FB.getLoginStatus(response => {console.log(h);statusChangeCallback(response);});
      FB.Event.subscribe("auth.login", login_event);
      FB.Event.subscribe("auth.logout", logout_event);
      FB.Event.subscribe("auth.statusChange", authStatusChange_event);
      FB.Event.subscribe("xfbml.render", finished_rendering);
      FB.XFBML.parse();
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
      console.log("\n-------------Start of login_event---------------");
      console.log("login_event occured, resp status:", response.status);
      // FB.XFBML.parse();
      console.log("-------------End of login_event---------------\n");
    };

    var logout_event = function(response) {
      console.log("\n-------------Start of logout_event---------------");
      console.log("logout_event occured, resp status:", response.status);
      //FB.XFBML.parse();
      console.log("-------------End of logout_event---------------\n");
    };

    var authStatusChange_event = function(response) {
      console.log(
        "\n-------------Start of authStatusChange_event---------------"
      );
      console.log("Auth status changed to: ", response.status);

      console.log(
        "-------------End of authStatusChange_event---------------\n"
      );
    };

    var finished_rendering = function() {
      console.log("finished rendering plugins");
    };
  }

  Login() {
    console.log("submit login to facebook");
    // FB.login();
    FB.login(response => {
      console.log("submitLogin", response);
      this.response = response;
      console.log("this.response", this.response.authResponse);
      if (response.authResponse) {
        console.log("response.authResponse", response.authResponse);
      } else {
        console.log("User login failed");
      }
      FB.XFBML.parse();
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
      FB.XFBML.parse();
    });
  }

  GetStatus() {
    FB.getLoginStatus(response => {
      this.statusChangeCallback(response);
    });
  }

  testAPI() {
    // Testing Graph API after login.  See statusChangeCallback() for when this call is made.
    console.log("Welcome!  Fetching your information.... ");
    FB.api("/me", function(response) {
      console.log("Successful login for: " + response.name);
      document.getElementById("status").innerHTML =
        "Thanks for logging in, " + response.name + "!";
      this.response = response;
    });
  }

  statusChangeCallback(response) {
    this.response = response;
    if (response.status === "connected") {
      console.log("Logged in and authorized");
    } else if (response.status === "not_authorized") {
      console.log("Logged in, not authorized");
    } else {
      console.log("Not logged in");
    }
  }

  RenderPlugins() {
    FB.XFBML.parse();
  }

  info() {
    console.log("Facebook SDK");
    console.log(this.response);
  }
}
