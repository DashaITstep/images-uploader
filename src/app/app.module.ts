import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EnumListPipe } from './pipes/enum-list.pipe';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { NgxSpinnerModule } from "ngx-spinner";

import { ImagesListComponent } from './features/images-list/images-list.component';
import { ImageItemComponent } from './features/image-item/image-item.component';
import { AddEditImageComponent } from './features/add-edit-image/add-edit-image.component';

@NgModule({
  declarations: [
    AppComponent,
    ImagesListComponent,
    ImageItemComponent,
    AddEditImageComponent,
    EnumListPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFontAwesomeModule,
    FormsModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    SimpleNotificationsModule.forRoot()
  ],
  exports: [
    EnumListPipe,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
