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

    entervalue(v: string) {
        if (this.numberState) {
            this.current = v;
            this.numberState = false;
        } else {
            this.current === '0' ? this.current = v : this.current += v;

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
                alert("No es valida la operacion");
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