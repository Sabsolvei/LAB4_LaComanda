import { Component, OnInit } from '@angular/core';
import { AuthProvider } from '../../../providers/auth/auth';
import { Observable } from 'rxjs';
import { UsuarioService } from '../../../providers/usuarios/usuario.service';
import { ExcelService } from '../../../providers/excel/excel.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss']
})
export class AppHeaderComponent implements OnInit {

  public perfil: string = null;
  public isLoggedIn$: Observable<boolean>;
  public hasMenu$: Observable<boolean>;

  constructor(
    private _auth: AuthProvider,
    private _usuario: UsuarioService,
    private _excel: ExcelService,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.isLoggedIn$ = this._auth.isLoggedIn;
    this.hasMenu$ = this._auth.hasMenu;
  }

  public lista: any = [];

  descargarExcel() {
    this._usuario.obtenerUsuarios().subscribe(data => {
      const aux: Array<any> = [];

      for (let i = 0; i < data.length; i++) {
        const e = data[i];

        if (e.perfil != "Cliente") {

          aux.push({
            Nombre: e.nombre,
            Apellido: e.apellido,
            Cuil: e.cuil,
            DNI: e.dni,
            Email: e.email,
            Perfil: e.perfil
          });
        }
      }

      this.lista = aux;
      this._excel.exportAsExcelFile(this.lista, "empleados");

      this.openSnackBar("El listado de empleados fue generado" , "");
    });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
      panelClass: ['blue-snackbar']
    });
  }

  salir() {
    this._auth.logout()
      .then(() => {
        // this._router.navigate(['../login']);
        localStorage.clear();
      });
  }

}
