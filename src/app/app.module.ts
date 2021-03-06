import { EncuestaService } from './providers/encuesta/encuesta.service';
import { AngularFireStorage } from 'angularfire2/storage';
import { UplodadFilesService } from './providers/uploadFiles/uplodad-files.service';
import { ComandasService } from './providers/comandas/comandas.service';
import { MesaService } from './providers/mesa/mesa.service';

import { UsuarioService } from './providers/usuarios/usuario.service';
import { BebidasService } from './providers/bebidas/bebidas.service';
import { PlatosService } from './providers/platos/platos.service';
import { AuthProvider } from './providers/auth/auth';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material/material.module';
// import { FirebaseModule, FirebaseProvider } from 'angular-firebase';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireModule } from 'angularfire2';
// for AngularFireDatabase
import { AngularFireDatabaseModule } from 'angularfire2/database';
// for AngularFireAuth
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireAuth } from 'angularfire2/auth';
// import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { MesasComponent } from './components/mesas/mesas.component';
import { MesaComponent } from './components/Principal/mesa/mesa.component';
import { PedidoComponent, ConfirmacionDialog } from './components/Principal/pedido/pedido.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MenuCartaComponent } from './components/menu-carta/menu-carta.component';
import { TablaComponent } from './components/menu-carta/tabla/tabla.component';
import { LoginComponent } from './components/login/login.component';
import { ConsultaClienteComponent } from './components/consulta-cliente/consulta-cliente.component';
import { AltaEmpleadoComponent } from './components/alta-empleado/alta-empleado.component';
import { AltaComandaComponent } from './components/alta-comanda/alta-comanda.component';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material';
import { AsignarClienteComponent } from './components/Principal/asignar-cliente/asignar-cliente.component';
import { PedidosPorSectorComponent } from './components/pedidos-por-sector/pedidos-por-sector.component';
import { PedidoSectorComponent } from './components/pedido-sector/pedido-sector.component';
// import { FileDropModule } from 'ngx-file-drop';
import { UploadFilesFormComponent } from './components/upload/upload-files-form/upload-files-form.component';
import { DetailsUploadComponent } from './components/upload/details-upload/details-upload.component';
import { ListUploadComponent } from './components/upload/list-upload/list-upload.component';
import { VerComandaComponent } from './components/ver-comanda/ver-comanda/ver-comanda.component';
import { LlamandoMozoPipe } from './pipes/llamando-mozo.pipe';
import { EncuestaComponent } from './components/encuesta/encuesta.component';
import { PuntajeComponent } from './components/puntaje/puntaje.component';
import { AppHeaderComponent } from './components/app-header/app-header/app-header.component';

import { ChartsModule } from 'ng2-charts';
import { Grafico1Component } from './components/graficos/grafico1/grafico1.component';
import { RecaptchaModule } from 'ng-recaptcha';
import { RecaptchaFormsModule} from 'ng-recaptcha/forms';
import { FormatoHoraPipe } from './pipes/formato-hora.pipe';
import { FormatoFechaPipe } from './pipes/formato-fecha.pipe';
import { HighlightDirective } from './directives/highlight.directive';
import { ElevateDirective } from './directives/elevate.directive';
import { ElevateSelectedDirective } from './directives/elevate-selected.directive';
import { CaptchaPropioComponent } from './components/captcha-propio/captcha-propio.component';

import { AgmCoreModule } from '@agm/core';            // @agm/core
import { AgmDirectionModule } from 'agm-direction';
import { MapaComponent } from './components/mapa/mapa.component';   // agm-direction


export const firebaseConfig = {
  apiKey: "AIzaSyDAVAzNO0VC2-Rh5enNGQgfnO9Fie5pY2A",
  authDomain: "lacomanda-b9c2b.firebaseapp.com",
  databaseURL: "https://lacomanda-b9c2b.firebaseio.com",
  projectId: "lacomanda-b9c2b",
  storageBucket: "lacomanda-b9c2b.appspot.com",
  messagingSenderId: "176807941599"
}

@NgModule({
  declarations: [
    AppComponent,
    MesasComponent,
    MesaComponent,
    PedidoComponent,
    MenuCartaComponent,
    TablaComponent,
    LoginComponent,
    ConsultaClienteComponent,
    AltaEmpleadoComponent,
    AltaComandaComponent,
    AsignarClienteComponent,
    PedidosPorSectorComponent,
    PedidoSectorComponent,
    UploadFilesFormComponent,
    DetailsUploadComponent,
    ListUploadComponent,
    VerComandaComponent,
    PedidoComponent,
    LlamandoMozoPipe,
    EncuestaComponent,
    PuntajeComponent,
    ConfirmacionDialog,
    LlamandoMozoPipe,
    AppHeaderComponent,
    Grafico1Component,
    MapaComponent,
    FormatoHoraPipe,
    FormatoFechaPipe,
    HighlightDirective,
    ElevateDirective,
    ElevateSelectedDirective,
    CaptchaPropioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    MaterialModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features
    AngularFireDatabaseModule,
    ReactiveFormsModule,
    ChartsModule,
    AgmCoreModule.forRoot({ // @agm/core
      apiKey: 'AIzaSyDBOE9pA2a1TtVGGdreh6U485Knv81aor4',
    }),
    AgmDirectionModule,
    RecaptchaModule, //.forRoot()
    RecaptchaFormsModule
  ],
  entryComponents: [
    AltaComandaComponent,
    MenuCartaComponent,
    AsignarClienteComponent,
    ConfirmacionDialog,
    MapaComponent
  ],
  providers: [
    AuthProvider,
    PlatosService,
    BebidasService,
    UsuarioService,
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: true } },
    MesaService,
    ComandasService,
    UplodadFilesService,
    AngularFireStorage,
    EncuestaService
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
