import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TarjetaService {
  constructor(private _http: HttpClient) {}

  create(tarjeta: any) {
    console.log(tarjeta);
    this._http
      .post<{ tarjetasCredito: any }>('http://localhost:3000/addcard', tarjeta)
      .subscribe();
  }

  read() {
    let cuentasBancarias: any[] = [];
    this._http
      .get<{ cards: any[] }>('http://localhost:3000/cards')
      .subscribe((jsonData) => {
        jsonData.cards.forEach((element) => {
          cuentasBancarias.push(element);
        });
      });

    return cuentasBancarias;
  }
}
