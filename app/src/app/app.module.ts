import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule }   from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { PokeapiService } from './services/pokeapi.service';
import { ListComponent } from './components/list/list.component';
import { HomeComponent } from './components/home/home.component';

const APP_ROUTES: Routes = [
  { path: '', component: AppComponent },
  { path: 'list', component: ListComponent },
  { path: '**', redirectTo: '', component: AppComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    HttpModule,
    ChartsModule,
    RouterModule.forRoot(
      APP_ROUTES,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  providers: [
    PokeapiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
