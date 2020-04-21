import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {
  title = 'calculadora';

    current = '0';
    numberState = false;
    estadoDecimal = false;
    beforeOperation = '';
    newOperacion = '';

    keyPressNum(event: any) {
      const pattern = /[0-9]/;
      const inputChar = String.fromCharCode((event as KeyboardEvent).charCode);
      if (!pattern.test(inputChar)) {  
          event.preventDefault();
      }
      else{
        if (this.numberState) {
            this.current = inputChar;
            this.numberState = false;
        } else {
            this.current === '0' ? this.current = inputChar : this.current += inputChar;
        }
      }
    }

    keyPressOperator(event: any) {
      const pattern = /[-,+,*,/]/;
      const inputChar = String.fromCharCode((event as KeyboardEvent).charCode);
      if (!pattern.test(inputChar)) {  
          event.preventDefault();
      }
      else{
        if (inputChar == "=") {
            const ultimoC = this.current.charAt(this.current.length - 1);
            var re = new RegExp("([0-9])");
            if (re.test(ultimoC)) {
                const result = eval(this.current);
                this.beforeOperation = this.current;
                this.current = String(result);
            } else {
                alert("operacion invalida");
                this.clear();
            }

        }else{
            this.current += inputChar
            this.estadoDecimal = true;
        }
      }
    }

    keyPressPunto(event: any) {
      const pattern = /[.]/;
      const inputChar = String.fromCharCode((event as KeyboardEvent).charCode);
      if (!pattern.test(inputChar)) {  
          event.preventDefault();
      }
      else{
        if (!this.current.includes('.')) {
            this.current += '.';
        } else {
            if (this.estadoDecimal) {
                this.current += '.';
                this.estadoDecimal = false;
            }
        }
      }
    }

    entervalue(value: string) {
        if (this.numberState) {
            this.current = value;
            this.numberState = false;
        } else {
            this.current === '0' ? this.current = value : this.current += value;
        }
    }

    decimal() {
        if (!this.current.includes('.')) {
            this.current += '.';
        } else {
            if (this.estadoDecimal) {
                this.current += '.';
                this.estadoDecimal = false;
            }
        }
    }

    condition(op: string) {

        if (op == "=") {
            const ultimoC = this.current.charAt(this.current.length - 1);
            var re = new RegExp("([0-9])");
            if (re.test(ultimoC)) {
                const result = eval(this.current);
                this.beforeOperation = this.current;
                this.current = String(result);
            } else {
                alert("operacion invalida");
                this.clear();
            }

        }else{
            this.current += op
            this.estadoDecimal = true;
        }

    }

    clear() {
        this.current = '0';
        this.beforeOperation = '';
        this.numberState = false;
    }

}