import { AccessGuard } from './access.guard';
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
  { path: 'login', component: LoginComponent },
  {
    path: 'registroEmpleados', component: AltaEmpleadoComponent
    ,
    canActivate: [AuthGuard, AccessGuard],
    data: {
      rolesPermitidos: ['admin']
    }
  },
  {
    path: 'consulta', component: ConsultaClienteComponent,
    canActivate: [AuthGuard, AccessGuard],
    data: {
      rolesPermitidos: ['admin', 'cliente', 'mozo']
    }
  },
  {
    path: 'mesas',
    component: MesasComponent,
    canActivate: [AuthGuard, AccessGuard],
    data: {
      rolesPermitidos: ['admin', 'mozo']
    }
  },
  {
    path: 'pedidos', component: PedidosPorSectorComponent,
    canActivate: [AuthGuard, AccessGuard],
    data: {
      rolesPermitidos: ['admin', 'bartender', 'cocinero', 'cervecero']
    }
  },
  {
    path: 'menu-carta', component: MenuCartaComponent,
    canActivate: [AuthGuard, AccessGuard],
    data: {
      rolesPermitidos: ['admin', 'mozo']
    }
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
