
/**
 * @author Camilo Posada Angel <cposadaa@gmail.com>
 */
export class Operation {


    /**
     * la función gama se calcula de la siguiente manera
     * r(n) = (n - 1) * r(n - 1)
     * r(1) = 1
     * r(1 / 2) = Raiz cuadrada de PI
     * @param n
     */
    gamaFunction(n) {
        if (n === 1) {
            return 1;
        }if (n === 1 / 2 ) {
            return Math.sqrt(Math.PI);
        }if (n < 0) {
            return NaN;
        }
        return (n - 1) * this.gamaFunction(n - 1);
    }

    /**
     * Calcula la integral entre cero y X de fn
     * @param fn funcion a integrar
     * @param num_seg numero de segmentos
     * @param dof grado de libertad (para la funcion t)
     * @param X Limite para la integral
     */
    integrate(fn: string, num_seg: number, dof: number, X: number): number {
        if (X <= 0 ) {
            throw new Error('Se integra solo en el eje positivo de las X');
        }if ( num_seg <= 0) {
            throw new Error('El numero de segmentos debe ser mayor que cero');
        }
        //console.log("funcion en integrate " , fn);
        const W = X / num_seg;
        let x = 0;
        let i = 1;
        try {
            let suma = eval(fn) * (W / 3);
            for (x = x + W; x < X; x += W) {
                const f = eval(fn);
                i % 2 === 0 ? suma += ( (W / 3) * 2 * f) : suma += ((W / 3) * 4 * f);
                i++;
            }
            suma += (eval(fn) * (W / 3));
            //console.log('Sumaaaa ', suma);
            return suma;
        } catch (error) {
            throw new Error(error.message);
        }
    }


}
