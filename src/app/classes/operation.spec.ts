import {  async } from '@angular/core/testing';

import { Operation } from './operation';

describe('Operation.ts', () => {
  let op: Operation;
  beforeEach(async(() => {
      op = new Operation();
  }));
  it('debe calcular la funcion gama', () => {
    const n = 10 / 2;
    const gama = op.gamaFunction(n);
    expect(gama).toBeCloseTo(24);
  });

  it('debe evaluar la funcion t para x = 1.1 con dof = 9', () => {
      Math.sqrt(2);
      const dof = 9;
      const x = 1.1;
      /**String que representa la funcion t*/
      const fn = '(op.gamaFunction((dof + 1) / 2) / (Math.pow(dof * Math.PI, 1 / 2) * op.gamaFunction(dof / 2) ) ) *'
                 + ' Math.pow(( 1 + ((x * x) / dof )), (-(dof + 1) / 2))';
      const res = eval(fn);
      expect(res).toBeCloseTo(0.20652);
  });

  it('inicio integracion, debe calcular el resutado para x = 1.1 y dof = 9', () => {
    const funcion = '(this.gamaFunction((dof + 1) / 2) / (Math.pow(dof * Math.PI, 1 / 2) * this.gamaFunction(dof / 2) ) ) * '
                    + ' Math.pow(( 1 + ((x * x) / dof )), (-(dof + 1) / 2))';
    const resultado = op.integrate(funcion, 10, 9, 1.1);
    //console.log("resultadddo test", resultado);
    expect(resultado).toBeCloseTo(0.3500589);
  });

  it('debe integrar la funcion 2X entre 0 y 4', () => {
    const funcion = '2*x';
    const resultado = op.integrate(funcion, 4, 0, 4);
    expect(resultado).toBeCloseTo(16);
  });

  it('Debe arrojar un error cuando se pasa el numero de segmentos en cero', () => {
    const funcion = '2*x';
    expect(function(){ op.integrate(funcion,0,0,9); }).toThrow(new Error('El numero de segmentos debe ser mayor que cero'));
  });


/**
'(this.gamaFunction((dof + 1) / 2) / (Math.pow(dof * Math.PI, 1 / 2) * this.gamaFunction(dof / 2) ) ) *
 Math.pow(( 1 + ((x * x) / dof )), (-(dof + 1) / 2))';


 */

//   it('debe retornar NaN cuando el parametro de entrada no es un entero o en restas sucesivas no llega a 1 / 2', () => {
//     const n = 9 / 3;
//     const gama = op.gamaFunction(n);
//     console.log('fac', gama);
//     expect(gama).toBe(NaN);
//   });
// (this.gamaFunction((dof + 1) / 2) / (Math.pow(dof * Math.PI, 1 / 2) *this.gamaFunction(dof / 2) ) ) * Math.pow(( 1 + ((x * x) / dof )), (-(dof + 1) / 2))

// (this.gamaFunction((dof + 1) / 2) / (Math.pow(dof * Math.PI, 1 / 2) * this.gamaFunction(dof / 2) ) ) *  Math.pow(( 1 + ((x * x) / dof )), (-(dof + 1) / 2))
});
