import { AppComponent } from './app.component';
import { PedidosPorSectorComponent } from './components/pedidos-por-sector/pedidos-por-sector.component';
import { AltaEmpleadoComponent } from './components/alta-empleado/alta-empleado.component';
import { ConsultaClienteComponent } from './components/consulta-cliente/consulta-cliente.component';
import { LoginComponent } from './components/login/login.component';
import { MenuCartaComponent } from './components/menu-carta/menu-carta.component';
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MesasComponent } from './components/mesas/mesas.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'registroEmpleados', component: AltaEmpleadoComponent },
  { path: 'consulta', component: ConsultaClienteComponent },
  { path: 'login', component: LoginComponent },
  { path: 'mesas', component: MesasComponent, canActivate: [AuthGuard] },
  { path: 'pedidos', component: PedidosPorSectorComponent },
  { path: 'menu-carta', component: MenuCartaComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
