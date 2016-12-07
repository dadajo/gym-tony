import { NgModule, enableProdMode } from '@angular/core';
import { RouterModule } from "@angular/router";

import {LocationStrategy, HashLocationStrategy} from '@angular/common';
//import {APP_BASE_HREF} from '@angular/common';

import { HttpModule } from '@angular/http';
import { FormsModule, FormBuilder } from '@angular/forms';
import { CustomFormsModule } from 'ng2-validation';
import { BrowserModule  } from '@angular/platform-browser';
import { rootRouterConfig }                              from './app.routing';
import { AppComponent } from './app.component';

import { TodoCmp }   from './todo/components/todo-cmp';
import { TodoService }   from './todo/services/todo-service';
import { GymCmp }   from './gym/components/gym';
import { GymService }   from './gym/services/gym';

//enableProdMode();

@NgModule({
    imports: [
      BrowserModule,
      FormsModule,
      CustomFormsModule,
      HttpModule,
      RouterModule.forRoot(rootRouterConfig)
    ],
   declarations: [
      AppComponent,
      GymCmp,
      TodoCmp
    ],
    providers: [
      GymService,
      TodoService,
      //{provide: APP_BASE_HREF, useValue: ''}//PathLocationStrategy 
      {provide: LocationStrategy, useClass: HashLocationStrategy}//HashLocationStrategy
    ],
    bootstrap: [
      AppComponent
    ],
})
export class AppModule {}
