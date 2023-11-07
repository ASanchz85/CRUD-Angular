import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Tarjeta } from '../model/tarjeta';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TarjetaService {
  private tarjeta$ = new Subject<Tarjeta>();

  constructor(private _http: HttpClient) {}

  create(tarjeta: Tarjeta) {
    console.log(tarjeta);
    this._http
      .post<{ tarjetasCredito: Tarjeta }>(
        'http://localhost:3000/addcard',
        tarjeta
      )
      .subscribe();
  }

  read() {
    let cuentasBancarias: Tarjeta[] = [];
    this._http
      .get<{ cards: Tarjeta[] }>('http://localhost:3000/cards')
      .subscribe((jsonData) => {
        jsonData.cards.forEach((element) => {
          cuentasBancarias.push(element);
        });
      });

    return cuentasBancarias;
  }

  update(tarjeta: Tarjeta) {
    return this._http.put(
      'http://localhost:3000/update-entry/' + tarjeta,
      tarjeta
    );
  }

  delete(id: string) {
    return this._http.delete('http://localhost:3000/removecard/' + id);
  }

  setTarjeta(tarjeta: Tarjeta) {
    this.tarjeta$.next(tarjeta);
  }

  getTarjeta() {
    return this.tarjeta$.asObservable();
  }
}
