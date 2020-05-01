import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {
    title = 'calculadora';
    //variables de almacenamiento y control
    current = '0';
    estadoDecimal = false;
    divicion = false;
    divicionNull = false;
    beforeOperation = '';
    newOperacion = '';

    //funcion que captura cada numero presionado en la calculadora y lo agrega a la cadena de la operacion (current)
    //parametros: el numero presionado
    //return void
    numero( value ) {
        if(this.current === '0'){
            this.current = value;
        }else{
            //validamos el estado de la  variable de control de divicion sea true 
            if(this.divicion){
                //preguntamos si el numero presionado es 0 
                if(value == '0' ){
                    //seteamos la variable de control de divicion nula
                    this.divicionNull = true;
                }
                //cambiamos el control de operacion divicion pues el primer digito es diferente de 0
                this.divicion = false;
            }
            this.current += value;
        }
    }

    //funcion que agrega el punto decimal 
    //parametros: 
    //return void
    decimal() {
        //validamos si es el primer punto decimal en la cadena matematica
        if (!this.current.includes('.')) {
            this.current += '.';
        } else {
            //validamos que la variable de control decimal sea true
            if (this.estadoDecimal) {
                this.current += '.';
                //deshabilitamos la variable de control de punto decimal hasta presionar otra opreacion
                this.estadoDecimal = false;
            }
        }
    }

    // funcion que captura cada operacion matematica presionada en la calculadora
    // parametros: la operacion de tipo string 
    // return void
    opereracion(op) {
        //si la operacion presionada es el = 
        if (op == "=") {
            //validamos que no exista una divicion nula (/0) 
            if(!this.divicionNull){
                //optenemos el ultimo digito en la cadena de la operacion a calcular
                const ultimoC = this.current.charAt(this.current.length - 1);
                //creamos una variable de expresion regular
                var re = new RegExp("([0-9])");
                //validamos si el ultimo digito en la cadena matematica es un numero
                //para verificar que sea una operacion valida completa
                if (re.test(ultimoC)) {
                    //evaluemos la cadena matematica con la funcion eval
                    const result = eval(this.current);
                    //seteamos las variables que se muestran en la pantalla de resultados
                    this.beforeOperation = this.current;
                    this.current = String(result);
                } else {
                    //mandamos error por operacion invalida o incompleta
                    alert("operacion invalida");
                    this.clear();
                }
            }else{
                alert("operacion invalida por divicion nula");
                this.clear();
            }
        //si la opreacion es diferente al = 
        }else{
             //verificamos si la operecion matematica es % para controlar la divicion null
             if(op == '/'){
                 this.divicion = true;
             }
            //optenemos el ultimo digito en la cadena de la operacion matematicar
            const lastDig = this.current.charAt(this.current.length - 1);
            //validamos que no sea una operacion matematica mediante expresion regular
            var reg = new RegExp("([0-9])");
            if(reg.test(lastDig) ){
                // concatenamos el simbolo de operacion a la cadena matematica
                this.current += op
                // habilitamos el uso del punto decimal
                this.estadoDecimal = true;
            }else{
                //mandamos una alerta y no se concatena la operacion presionada
                alert("Opreacion invalidad");
            }
        }
    }

    // funcion que limpia las variables de almacenamiento de datos en la calculadora
    // parametros:  
    // return void
    clear() {
        this.current = '0';
        this.beforeOperation = '';
    }
}