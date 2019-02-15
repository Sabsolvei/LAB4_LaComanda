import { ComandasService } from './providers/comandas/comandas.service';
import { MesaService } from './providers/mesa/mesa.service';

import { UsuarioService } from './providers/usuarios/usuario.service';
import { BebidasService } from './providers/bebidas/bebidas.service';
import { PlatosService } from './providers/platos/platos.service';
import { AuthProvider } from './providers/auth/auth';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
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
import { MesaComponent } from './components/principal/mesa/mesa.component';
import { PedidoComponent } from './components/Principal/pedido/pedido.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MenuCartaComponent } from './components/menu-carta/menu-carta.component';
import { TablaComponent } from './components/menu-carta/tabla/tabla.component';
import { LoginComponent } from './components/login/login.component';
import { ConsultaClienteComponent } from './components/consulta-cliente/consulta-cliente.component';
import { AltaEmpleadoComponent } from './components/alta-empleado/alta-empleado.component';
import { PedidosPorSectorComponent } from './components/pedidos-por-sector/pedidos-por-sector.component';
import { PedidoSectorComponent } from './components/pedido-sector/pedido-sector.component';


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
    PedidosPorSectorComponent,
    PedidoSectorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    MaterialModule,
    // FirebaseModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features
    AngularFireDatabaseModule
  ],
  providers: [
    // FirebaseProvider,
    AuthProvider,
    PlatosService,
    BebidasService,
    UsuarioService,
    MesaService,
    ComandasService

  ],
  bootstrap: [AppComponent]

})
export class AppModule { }
