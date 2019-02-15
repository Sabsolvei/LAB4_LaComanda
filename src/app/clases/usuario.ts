export interface Iusuario{
    nombre:string;
    apellido:string;
    dni: string;
    foto?:string;
    perfil:string;
    email:string;
    cuil?:string;
    id?:any;
}

export class usuario{
    id:number;
    usuario:string;
    perfil:string;
    constructor(id:number, usuario:string, perfil:string){
        this.id = id;
        this.usuario = usuario;
        this.perfil = perfil;
    }
}
