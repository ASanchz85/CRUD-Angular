import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Tarjeta } from 'src/app/model/tarjeta';
import { TarjetaService } from 'src/app/services/tarjeta.service';

@Component({
  selector: 'app-crear-tarjeta',
  templateUrl: './crear-tarjeta.component.html',
  styleUrls: ['./crear-tarjeta.component.css'],
})
export class CrearTarjetaComponent {
  form: FormGroup;

  constructor(private _fb: FormBuilder, private _ts: TarjetaService) {
    this.form = this._fb.group({
      titular: [
        '',
        [
          Validators.required,
          Validators.maxLength(40),
          Validators.minLength(3),
        ],
      ],
      numTarjeta: [
        '',
        [Validators.required, Validators.pattern(/^[0-9]{16}$/)],
      ],
      fechaCad: [
        '',
        [Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])\/\d{2}$/)],
      ],
      cvv: ['', [Validators.required, Validators.pattern(/^[0-9]{3}$/)]],
    });
  }

  crearTarj() {
    const TARJETA = new Tarjeta(
      this.form.value.titular,
      this.form.value.numTarjeta,
      this.form.value.cvv,
      this.form.value.fechaCad
    );

    this._ts.create(TARJETA);
    // this.form.reset();
    window.location.reload();
  }
}
