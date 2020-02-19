import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

import { RouterModule, Router } from '@angular/router';

import { AppComponent } from "./app.component";
import { HelloComponent } from "./hello.component";
import { CookieService } from 'ngx-cookie-service';

@NgModule({
  imports: [BrowserModule, FormsModule, HttpClientModule, RouterModule.forRoot(
  [
    { path: "", component: AppComponent}
  ]
)],
  declarations: [AppComponent, HelloComponent],
  providers: [ CookieService ],
  bootstrap: [AppComponent]
})
export class AppModule {}
