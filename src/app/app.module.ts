import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material/material.module';

import { AppComponent } from './app.component';
import { MesasComponent } from './components/mesas/mesas.component';
import { MesaComponent } from './components/principal/mesa/mesa.component';
import { PedidoComponent } from './components/Principal/pedido/pedido.component';
import { MenuCartaComponent } from './components/menu-carta/menu-carta.component';
import { TablaComponent } from './components/menu-carta/tabla/tabla.component';

@NgModule({
  declarations: [
    AppComponent,
    MesasComponent,
    MesaComponent,
    PedidoComponent,
    MenuCartaComponent,
    TablaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
