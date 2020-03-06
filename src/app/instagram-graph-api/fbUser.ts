import { FacebookSdk } from "./facebook-sdk";

export class FbUser {
  fb: FacebookSdk = new FacebookSdk();
  isLogged: boolean;
  response: any = "empty response";

  constructor() {
    this.fb.LoadSDK().then(() => {
      this.response = this.fb.GetStatus();
      console.log(this.response);
    });
  }
}
