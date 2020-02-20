import { Token } from "./token";

export class InstaBasicService {
  constructor(
    private appId = 206756813847383,
    private redirectUri = "https://angular-instaparser.stackblitz.io/",
    private authorizationCode,
    private accessToken: Token
  ) {}
}
