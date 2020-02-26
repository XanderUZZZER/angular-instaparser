import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { FacebookSdk } from "./instagram-graph-api/facebook-sdk";
import { InstagramGraphApi } from "./instagram-graph-api/instagram-graph-api";


import { AppComponent } from "./app.component";

@NgModule({
  imports: [BrowserModule, FormsModule, HttpClientModule, FacebookSdk, InstagramGraphApi],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
