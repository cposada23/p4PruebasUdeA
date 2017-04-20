import { Component,  OnInit } from '@angular/core';

import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Operation } from './classes/operation';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit  {

  op: Operation;
  form: FormGroup;
  resultado: number;
  error: string;
  integrarFunciont: boolean;
  funcion = '(this.gamaFunction((dof + 1) / 2) / (Math.pow(dof * Math.PI, 1 / 2) * this.gamaFunction(dof / 2) ) ) *  Math.pow(( 1 + ((x * x) / dof )), (-(dof + 1) / 2))';
  constructor(public formBuilder: FormBuilder) { }

  ngOnInit() {
    this.op = new Operation();
    this.form = this.formBuilder.group({
      dof: ['', Validators.required],
      x: ['', Validators.required],
      num_segmentos: ['', Validators.required],
      funcion: ['', Validators.required],
      error: ['', Validators.required]
    });
  }

  integrarFuncionT(e) {
   if (e) {
      this.integrarFunciont = true;
      this.form.controls['funcion'].setValue('d');
    }else {
      this.integrarFunciont = false;
    }
  }

  integrar() {
    let error = this.form.value.error;
    let dof = this.form.value.dof;
    let x = this.form.value.x;
    let num_segmentos = this.form.value.num_segmentos;
    let funcion = '';
    if (this.integrarFunciont) {
      funcion = '(this.gamaFunction((dof + 1) / 2) / (Math.pow(dof * Math.PI, 1 / 2) * this.gamaFunction(dof / 2) ) ) *  Math.pow(( 1 + ((x * x) / dof )), (-(dof + 1) / 2))';
    }else {
      funcion = this.form.value.funcion;
    }
    try {
      this.validar(x, error, dof, num_segmentos);
      x = Number(x);
      error = Number(error);
      dof = Number(dof);
      num_segmentos = Number(num_segmentos);
      let result = [this.op.integrate(funcion, num_segmentos, dof, x), this.op.integrate(funcion, num_segmentos * 2, dof, x)];
      let err = Math.abs(result[1] - result[0]);
      let i = 0;
      while (err > error && i < 9) {
        num_segmentos *= 2;
        result = [this.op.integrate(funcion, num_segmentos, dof, x), this.op.integrate(funcion, (num_segmentos * 2), dof, x)];
        err = Math.abs(result[1] - result[0]);
        i++;
      }
      this.resultado = result[1];
    } catch (error) {
      this.error = error.message;
      console.error(error);
    }
  }

  validar(x, error, dof, num_segmentos): boolean {
    if (!Number(x)) {
      throw new Error('El valor de x debe ser numérico y mayor que 0');
    }else if (!Number(error)) {
      throw new Error('El valor del error debe ser numérico y mayor que cero');
    }else if (!Number(dof)) {
      throw new Error('El valor de los grados de libertad debe ser numérico y mayor que cero. En caso de no ser necesario ingrese -1');
    }else if (!Number(num_segmentos)) {
      throw new Error('En valor de numero de segmentos debe ser numérico y mayor que cero');
    }
    return true;
  }
}
