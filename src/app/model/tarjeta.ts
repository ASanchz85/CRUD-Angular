export class Tarjeta {
  _id?: string;
  titular: string;
  numeroTarjeta: string;
  cvv: number;
  fechaCaducidad: string;
  fechaCreacion?: Date;

  constructor(
    titular: string,
    numeroTarjeta: string,
    cvv: number,
    fechaCaducidad: string
  ) {
    //this.id = crypto.randomUUID();
    this.titular = titular;
    this.numeroTarjeta = numeroTarjeta;
    this.cvv = cvv;
    this.fechaCaducidad = fechaCaducidad;
    this.fechaCreacion = new Date();
  }
}
