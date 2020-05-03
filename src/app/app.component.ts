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
    decimalState = true;
    divicion = false;
    divicionNull = false;
    beforeOperation = '';
    cantNum = 0;

    //funcion que captura cada numero presionado en la calculadora y lo agrega a la cadena de la operacion (current)
    //parametros: el numero presionado
    //return void
    numero( value ) {
        if( this.validateNumber() || ( this.validateNumber() && this.current === '0' ) ){
            if(this.cantNum < 10){
                this.cantNum++;
            }      
        }
        if(this.current === '0'){
            this.current = value;
        }else{
            //validamos el estado de la  variable de control de divicion sea true 
            if(this.divicion){
                if(value == '0' ){
                    this.divicionNull = true;
                }else{
                    const last = this.current.charAt(this.current.length - 1);
                    if(last == "."){
                        this.divicionNull = false;
                    }
                    this.divicion = false;
                }
            }
            if(this.cantNum < 10){
                this.current += value;
            }
        }
    }

    //funcion que agrega el punto decimal 
    //parametros: 
    //return void
    decimal() {
        //validamos si es el primer punto decimal en la cadena matematica
        if (!this.current.includes('.')) {
            this.current += '.';
            this.decimalState = false;
        } else {
            //validamos que la variable de control decimal sea true
            if (this.decimalState) {
                this.current += '.';
                this.decimalState = false;
            }
        }
    }

    // funcion que captura cada operacion matematica presionada en la calculadora
    // parametros: la operacion de tipo string 
    // return void
    opereracion(op) {
        //si la operacion presionada es el = 
        if(op == "=") {
            //validamos que no exista una divicion nula (/0) 
            if(!this.divicionNull){
                if (this.validateNumber()) {
                    const result = eval(this.current);
                    this.beforeOperation = this.current;
                    this.current = String(result.toFixed(2));
                } else {
                    alert("operacion invalida");
                    this.clear();
                }
            }else{
                alert("operacion invalida por divicion nula");
                this.clear();
            }
        //si la opreacion es diferente al = 
        }else{
            this.cantNum = 0;
            if(op == '/'){
                this.divicion = true;
            }else{
                this.divicion = false;
            }
            if( this.validateNumber() ){
                this.current += op
                this.decimalState = true;
            }else{
                alert("Opreacion invalidad");
            }
        }
    }

    // funcion que valida si el ultimo caracter de la operacion matematica es un numero 0-9
    // parametros:  
    // return boolean
    validateNumber(){
        var lastVal = this.current.charAt(this.current.length - 1);
        var re = new RegExp("([0-9])");
        if (re.test(lastVal)){
            return true;
        }
        else{
            return false;
        }
    }

    // funcion que limpia las variables de almacenamiento de datos en la calculadora
    // parametros:  
    // return void
    clear() {
        this.current = '0';
        this.beforeOperation = '';
        this.divicionNull = false;
        this.decimalState = true;
        this.cantNum = 0;
    }
}