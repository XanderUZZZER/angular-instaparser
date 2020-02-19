import { Component, OnInit } from "@angular/core";
import { CookieService } from "ngx-cookie-service";

@Component({
  selector: "app-cookie",
  templateUrl: "./cookie.component.html",
  styleUrls: ["./cookie.component.css"]
})
export class CookieComponent implements OnInit {
  cookieValue = "UNKNOWN";
  cookies: {};
  time = new Date().getTime();
  time2 = new Date();

  constructor(private cookieService: CookieService) {}

  ngOnInit() {
    this.cookieService.set("Test", "Hello World");
    //this.cookieService.set("Test1", "Hello World1", this.time2.setSeconds(this.time2.getSeconds()+50000));
    this.cookieValue = this.cookieService.get("Test1");
    this.cookies = this.cookieService.getAll();
    console.log(this.cookies)
    
    console.log('================================');
  }

  getCookie() {
    this.cookieValue = this.cookieService.get("Test1");
    console.log(this.cookieValue);
    let t1 = this.time2;
console.log('t1 date\t\t\t\t',t1);

    let t2 = t1.valueOf();
console.log('t1 seconds\t\t\t',t2);

    let t3 = new Date(t2);
    t3 = new Date(1582151271000);
    console.log('t1 added seconds\t',t3);
    
    let t4 = new Date(t2 + 600000);
console.log('t4ddddddddddddd\t\t',t4);
this.cookieService.set("Test1", "Hello World1", t4);
    // console.log(this.time);
    // console.log(this.time2);
    
    
     
    
  }
}
