import { Component, OnInit } from "@angular/core";
import { CookieService } from "ngx-cookie-service";

@Component({
  selector: "app-cookie",
  templateUrl: "./cookie.component.html",
  styleUrls: ["./cookie.component.css"]
})
export class CookieComponent implements OnInit {
  cookieValue = "UNKNOWN";
  temp;

  constructor(private cookieService: CookieService) {}

  ngOnInit() {
    this.cookieService.set("cookie1", "cookie val 1", .00035);//.0007 = 1 minute
  }

  getCookie() {
    console.log("--------------in get cookie--------------");
   

    let date = Date.now();
    console.log(date);
    let date2 = new Date(date);
    console.log(date2);

    
    this.temp = this.cookieService.getAll();
    console.log(this.temp);
    this.cookieValue = this.cookieService.get("cookie1");
    console.log(this.cookieValue);
  }
}
