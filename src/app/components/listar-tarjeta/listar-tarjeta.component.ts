import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Tarjeta } from 'src/app/model/tarjeta';
import { TarjetaService } from 'src/app/services/tarjeta.service';

@Component({
  selector: 'app-listar-tarjeta',
  templateUrl: './listar-tarjeta.component.html',
  styleUrls: ['./listar-tarjeta.component.css'],
})
export class ListarTarjetaComponent implements OnInit {
  cuentasBancarias: Tarjeta[] = [];

  constructor(private _ts: TarjetaService, private _toastr: ToastrService) {}

  ngOnInit() {
    this.cuentasBancarias = this._ts.read();
  }

  editarTarjeta(tarjeta: Tarjeta) {
    this._ts.setTarjeta(tarjeta);
  }

  eliminar(id: any) {
    this._ts.delete(id).subscribe(() => {
      this._toastr.error('La tarjeta se borrado', 'Registro Eliminado');
      this.ngOnInit();
    });
  }
}
