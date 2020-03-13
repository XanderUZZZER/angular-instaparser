import { FbUser } from "./fbUser";

declare var FB: any;

export class FacebookSdk {
  response: any;
  user: FbUser = new FbUser();
  fields: string = "name,email,picture,first_name,last_name";

  Init() {
    return new Promise(resolve => {
      console.log("!!! ------ start SDK init ------ !!!");
      (function(d, s, id) {
        console.log("!!! ------ start SDK script embedding ------ !!!");
        var js,
          fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {
          console.log("!!! ------ SDK script is already embedded ------ !!!");
          return;
        }
        js = d.createElement(s);
        js.id = id;
        js.src = "https://connect.facebook.net/en_US/sdk.js"; // prod version minimized
        fjs.parentNode.insertBefore(js, fjs);
        console.log("!!! ------ end SDK script embedding ------ !!!");
      })(document, "script", "facebook-jssdk");

      (window as any).fbAsyncInit = function() {
        console.log("!!! ------ start SDK async init ------ !!!");
        FB.init({
          appId: "192282568679644",
          cookie: true,
          xfbml: true,
          version: "v6.0",
          status: true // check auth status onInit
        });
        console.log("!!! ------ end SDK async init ------ !!!");
        resolve();
      };
    }).then(() => this.GetLoginStatus()); //.then(user = > this.user = user);
  }

  GetLoginStatus() {
    return new Promise<FbUser>((resolve, reject) => {
      console.log("getting status");
      FB.getLoginStatus((response: any) => {
        if (response.status === "connected") {
          let authResponse = response.authResponse;
          this.user.accessToken = authResponse.accessToken;
          // this.TestApi();
          FB.api(`/me?fields=${this.fields}`, (fbUser: any) => {
            //this.user = new FbUser();

            this.user.id = fbUser.id;
            this.user.name = fbUser.name;
            this.user.email = fbUser.email;
            this.user.photoUrl =
              "https://graph.facebook.com/" +
              fbUser.id +
              "/picture?type=normal";
            this.user.firstName = fbUser.first_name;
            this.user.lastName = fbUser.last_name;

            //this.user.facebook = fbUser.facebook;

            resolve(this.user);
          });
        } else {
          reject("No user is currently logged in.");
        }
      }); //, true); //true param -  forces a roundtrip to Facebook, which effectively refreshes the cache of the response object.
    });
  }

  Login() {
    return new Promise(resolve => {
      FB.login(response => {
        console.log("Logging in");
        console.log("response:", response);
        // user is now logged out
        resolve(response);
      });
    }).then(() => this.TestApi());
  }

  Logout() {
    return new Promise(resolve => {
      FB.logout(response => {
        console.log("Logging out");
        console.log("response:", response);
        // user is now logged out
        this.user = new FbUser();
        resolve(response);
      });
    });
  }

  TestApi() {
    return new Promise(resolve => {
      FB.api(`/me?fields=${this.fields}`, (fbUser: any) => {
        //let user: FbUser = new FbUser();

        this.user.id = fbUser.id;
        this.user.name = fbUser.name;
        this.user.email = fbUser.email;
        this.user.photoUrl =
          "https://graph.facebook.com/" + fbUser.id + "/picture?type=normal";
        this.user.firstName = fbUser.first_name;
        this.user.lastName = fbUser.last_name;

        this.user.facebook = fbUser;

        resolve(this.user);
      });
    });
  }

  InstaTest() {
    return new Promise(resolve => {
      FB.api("/113124472034820", function(response) {
        console.log(response);
      });
    });
  }

  InstaLogin() {
    return new Promise(resolve => {
      FB.login(
        response => {
          console.log("Logging in");
          console.log("response:", response);
          // user is now logged out
          resolve(response);
        },
        {
          //scope: "instagram_basic, pages_show_list",
          scope: "instagram_basic, instagram_manage_insights, pages_show_list",
          return_scopes: true
        }
      );
    });
  }

  T1() {
    return new Promise(resolve => {
      FB.api(
        `https://graph.facebook.com/v6.0/me/accounts?access_token=${
          this.user.accessToken
        }`,
        response => {
          console.log(response);
          console.log(response.data[0].id);

          this.user.fbPageId = response.data[0].id;
          resolve(response);
        }
      );
    });
  }
  GetPageInstagramBusinessAccount() {
    return new Promise(resolve => {
      FB.api(
        `https://graph.facebook.com/v6.0/${
          this.user.fbPageId
        }?fields=instagram_business_account&access_token=${
          this.user.accessToken
        }`,
        response => {
          console.log(response);
          this.user.instaId = response.instagram_business_account.id;
          resolve(response);
        }
      );
    });
  }

  GetMedia() {
    return new Promise(resolve => {
      FB.api(
        `https://graph.facebook.com/v6.0/${this.user.instaId}/media?access_token=${this.user.accessToken}`,
        response => {
          console.log(response);
          console.log("media id");
          this.user.mediaId = response.data[0].id;
          resolve(response);
        }
      );
    });
  }

  GetCertainMedia() {
    //graph.facebook.com/${this.user.mediaId}?fields=id,media_type,media_url,owner,timestamp
    return new Promise(resolve => {
      FB.api(
        `${this.user.mediaId}?fields=id,media_type,media_url,owner,timestamp`,
        response => {
          console.log(response);
          this.user.mediaUrl = response.media_url;
          resolve(response);
        }
      );
    });
  }
  //https://graph.facebook.com/v6.0/${this.user.instaId}?fields=business_discovery.username(bluebottle){followers_count,media_count}&access_token=${this.user.accessToken}
  BusinessDiscovery() {
    //graph.facebook.com/${this.user.mediaId}?fields=id,media_type,media_url,owner,timestamp
    ///17841405309211844?fields=business_discovery.username(${searchUser}){media{comments_count,like_count}}
    //${this.user.mediaId}?fields=business_discovery.username(${searchUser}){media{comments_count,like_count}}
    return new Promise(resolve => {
      let searchUser = ["xander_uzzzer","dvi.tailor","oleksandr.lukhanin","bluebottle"];
      let retFields="biography,id,ig_id,followers_count,follows_count,media_count,name,profile_picture_url,username,website,media{comments_count,like_count}";
      //FB.api(`https://graph.facebook.com/v6.0/${this.user.instaId}?fields=business_discovery.username(${searchUser}){followers_count,media_count,followers}&access_token=${this.user.accessToken}`,
      //FB.api(`${this.user.mediaId}?fields=business_discovery.username(${searchUser}){media{comments_count,like_count}}`,
      FB.api(`https://graph.facebook.com/v6.0/${this.user.instaId}?fields=business_discovery.username(${searchUser[1]}){${retFields}}&access_token=${this.user.accessToken}`,
        response => {
          console.log(response);
          //this.user.mediaUrl = response.media_url;
          resolve(response);
        }
      );
    });
  }
  Insights() {
    //metric=impressions&period=week&since=1501545600&until=1502493720
    //17841405680145516  dvi.tailor
    //17841405680145516
    return new Promise(resolve => {
      let searchUser = ["xander_uzzzer","dvi.tailor","oleksandr.lukhanin","bluebottle"];
      let retFields="biography,id,ig_id,followers_count,follows_count,media_count,name,profile_picture_url,username,website,media{comments_count,like_count}";
     
      FB.api(`https://graph.facebook.com/v6.0/17841402035974697/insights?metric=impressions,reach,profile_views&period=day`,
        response => {
          console.log(response);
          //this.user.mediaUrl = response.media_url;
          resolve(response);
        }
      );
    });
  }
}
