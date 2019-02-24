export class Captcha {
    operadores: Array<string>;
    primerNumero: number;
    segundoNumero: number;
    operador: string;
    resultadoOperacion: number;
    numeroIngresado: number;
    public gano: boolean;


    constructor(nombre?: string, gano?: boolean, jugador?: string) {
        this.gano = false;
        this.operadores = ['+', '-', '*'];
    }


    public generarOperacion() {
        this.gano = false;
        this.primerNumero = Math.floor((Math.random() * 3) + 0);
        this.segundoNumero = Math.floor((Math.random() * 3) + 0);
        let aux = Math.floor(Math.random() * (3 - 0)) + 0;
        this.operador = this.operadores[aux];

        this.devolverResultado();
    }


    public devolverResultado() {
        switch (this.operador) {
            case '+':
                this.resultadoOperacion = Math.round(this.primerNumero + this.segundoNumero);
                break;

            case '-':
                this.resultadoOperacion = this.primerNumero - this.segundoNumero;
                break;

            case '*':
                this.resultadoOperacion = this.primerNumero * this.segundoNumero;
                break;
        }
    }

    public verificar() {

        if (this.numeroIngresado == this.resultadoOperacion) {
            this.gano = true;
        }
        if (this.gano) {
            return true;
        } else {
            return false;
        }
    }


}

