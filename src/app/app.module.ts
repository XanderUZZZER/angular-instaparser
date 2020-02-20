import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { CookieService } from "ngx-cookie-service";
import { RouterModule, Routes } from "@angular/router";


import { AppComponent } from "./app.component";
import { InstaBasicComponent } from "./insta-basic/insta-basic.component";

import { User } from "./insta-basic/user";

const appRoutes: Routes =[
    { path: '', component: AppComponent},
    { path: 'about', component: AppComponent},
    { path: '**', component: AppComponent }
];

@NgModule({
  imports: [BrowserModule, FormsModule, HttpClientModule, RouterModule.forRoot(appRoutes)],
  declarations: [AppComponent, InstaBasicComponent],
  providers: [CookieService, User],
  bootstrap: [AppComponent, InstaBasicComponent]
})
export class AppModule {}
