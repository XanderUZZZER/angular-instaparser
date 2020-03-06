declare var FB: any;

export class FacebookSdk {
  response: any;

  LoadSDK() {
    return new Promise(resolve => {
      (function(d, s, id) {
        var js,
          fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {
          return;
        }
        js = d.createElement(s);
        js.id = id;
        js.src = "https://connect.facebook.net/en_US/sdk.js"; // prod version minimized
        fjs.parentNode.insertBefore(js, fjs);
      })(document, "script", "facebook-jssdk");

      (window as any).fbAsyncInit = function() {
        FB.init({
          appId: "192282568679644",
          cookie: true,
          xfbml: true,
          version: "v6.0",
          status: true // check auth status onInit
        });
        console.log("fs async init");
        resolve();
      };
    });
  }

  GetStatus() {
    let resp: string = "";
    FB.getLoginStatus(function(response) {
      resp = response.status;
      if (response.status === "connected") {
        // The user is logged in and has authenticated your
        // app, and response.authResponse supplies
        // the user's ID, a valid access token, a signed
        // request, and the time the access token
        // and signed request each expire.
        var uid = response.authResponse.userID;
        var accessToken = response.authResponse.accessToken;
      } else if (response.status === "not_authorized") {
        // The user hasn't authorized your application.  They
        // must click the Login button, or you must call FB.login
        // in response to a user gesture, to launch a login dialog.
      } else {
        // The user isn't logged in to Facebook. You can launch a
        // login dialog with a user gesture, but the user may have
        // to log in to Facebook before authorizing your application.
      }
    });
    return resp;
  }

  Login(){
    FB.login();
  }
}
