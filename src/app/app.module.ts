import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { CookieService } from 'ngx-cookie-service';

import { AppComponent } from "./app.component";
import { CookieComponent } from './cookie/cookie.component';

@NgModule({
  imports: [BrowserModule, FormsModule, HttpClientModule],
  declarations: [AppComponent, CookieComponent],
  providers: [ CookieService ],
  bootstrap: [AppComponent, CookieComponent]
})
export class AppModule {}
