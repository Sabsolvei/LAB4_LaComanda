import { MenuCartaComponent } from './components/menu-carta/menu-carta.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MesasComponent } from './components/mesas/mesas.component';

const routes: Routes = [
  { path: '', component: MesasComponent },
  { path: 'mesas', component: MesasComponent },
  { path: 'menu-carta', component: MenuCartaComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
