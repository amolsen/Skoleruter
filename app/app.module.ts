import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { routing, appRoutingProviders }  from './app.routing';
import { FormsModule }    from '@angular/forms';
import { RouterModule } from '@angular/router'
import { HttpModule, JsonpModule }  from '@angular/http';

//Egenproduserte components
import { AppComponent }  from './app.component';

import { SkoleListeComponent} from './velgSkole/skoleListe.component';
import { SkoleruterComponent } from './routing/skoleruter.component';
import { PageNotFoundComponent} from './page-not-found.component';
import { NavbarComponent } from './navbar/navbar.component'
import { SkoleListeFilterPipe} from'./velgSkole/skoleListeFilter.pipe';
import { SkoleDataService } from './velgSkole/skoleData.service';
import { ValgteSkolerService } from './valgteSkoler.service';
import { NesteFridagComponent } from './nestefridag/neste-fridag.component';
import { DatoPipe } from './dato.pipe';
import { ListeComponent } from './listevisning/liste.component';
import { SkoleruteModule } from './routing/skoleruter.module';
import { NesteFridagModule } from './nestefridag/neste-fridag.module';
import { ListeModule } from './listevisning/liste.module';
import { LeggIKalenderComponent } from './leggikalender/legg-i-kalender.component';
import { LeggIKalenderService } from './leggikalender/legg-i-kalender.service';
import { InfoModule } from './info/info.module';

@NgModule({
  imports: 
  [ BrowserModule, 
  FormsModule, 
  routing, 
  SkoleruteModule, 
  RouterModule, 
  HttpModule, 
  JsonpModule, 
  NesteFridagModule, 
  ListeModule,
  InfoModule
  ],
  declarations: 
  [ 
    AppComponent, 
    SkoleListeComponent, 
    SkoleruterComponent,
    PageNotFoundComponent, 
    NavbarComponent, 
    SkoleListeFilterPipe,
    NesteFridagComponent,
    DatoPipe,
    LeggIKalenderComponent
  ],
    providers: [ appRoutingProviders, SkoleDataService, ValgteSkolerService, LeggIKalenderService ],
    bootstrap: [ AppComponent ], 
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ]

})

export class AppModule { }
