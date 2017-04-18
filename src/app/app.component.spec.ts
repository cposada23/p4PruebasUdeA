import { TestBed, async, ComponentFixture } from '@angular/core/testing';

import { AppComponent } from './app.component';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';



describe('AppComponent', () => {
  let comp: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ], imports: [
        FormsModule,
        ReactiveFormsModule
      ]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(AppComponent);
      comp = fixture.componentInstance;
      comp.ngOnInit();
    });
  }));
  it('debe calcular la integral de la funcion t', () => {
    const funcion = '(this.gamaFunction((dof + 1) / 2) / (Math.pow(dof * Math.PI, 1 / 2) * this.gamaFunction(dof / 2) ) ) *  Math.pow(( 1 + ((x * x) / dof )), (-(dof + 1) / 2))';
    comp.form.controls['dof'].setValue(9);
    comp.form.controls['x'].setValue(1.1);
    comp.form.controls['num_segmentos'].setValue(10);
    comp.form.controls['funcion'].setValue(funcion);
    comp.form.controls['error'].setValue(0.00001);
    comp.integrar();
    //console.log("hola resultado__", comp.resultado);
    expect(comp.resultado).toBeCloseTo(0.35005);
  });

  it('debe calcular la integral de la funcion 2*x ', () => {
    const funcion = '2*x';
    comp.form.controls['dof'].setValue(-1);
    comp.form.controls['x'].setValue(4);
    comp.form.controls['num_segmentos'].setValue(4);
    comp.form.controls['funcion'].setValue(funcion);
    comp.form.controls['error'].setValue(0.00001);
    comp.integrar();
    expect(comp.resultado).toBeCloseTo(16);
  });

  it('debe validar que los grados de libertad sean numéricos', () => {
    expect(
      function() {
        comp.validar('1', 2, 'a', 2);
      }).toThrow(
        new Error('El valor de los grados de libertad debe ser numérico y mayor que cero. En caso de no ser necesario ingrese -1')
      );
  });
});
