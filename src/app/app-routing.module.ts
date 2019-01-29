import { LoginComponent } from './components/login/login.component';
import { MenuCartaComponent } from './components/menu-carta/menu-carta.component';
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MesasComponent } from './components/mesas/mesas.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'mesas', component: MesasComponent },
  { path: 'menu-carta', component: MenuCartaComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
