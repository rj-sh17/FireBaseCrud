import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { ReactiveFormsModule } from '@angular/forms';
import { CrudServiceService } from './crud-service.service';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, AngularFireStorageModule, AngularFireDatabaseModule, AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebaseConfig), AngularFirestoreModule, ReactiveFormsModule, FormsModule, NgbModule
  ],
  providers: [CrudServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
