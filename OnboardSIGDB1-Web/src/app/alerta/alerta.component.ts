import { Component, OnInit } from '@angular/core';
import { Alerta, AlertaTipo } from './alerta';
import { AlertaService } from './alerta.service';

@Component({
    selector: 'app-alerta',
    templateUrl: './alerta.component.html',
    styleUrls: ['./alerta.component.css']
})
export class AlertaComponent implements OnInit {

    alertas: Alerta[] = [];

    constructor(private alertaservice: AlertaService) { }

    ngOnInit() {
        this.alertaservice.getAlert().subscribe((alert: Alerta) => {
            console.log('alert')
            console.log(alert)
            if (!alert) {
                // clear alertas when an empty alert is received
                this.alertas = [];
                return;
            }

            // add alert to array
            this.alertas.push(alert);

            let s = setTimeout(() => {
                this.removeAlert(alert);    
                clearTimeout(s);
            }, 5000); 
        });
    }

    removeAlert(alert: Alerta) {
        this.alertas = this.alertas.filter(x => x !== alert);
    }

    cssClass(alerta: Alerta) {
        if (!alerta) {
            return;
        }

        // return css class based on alert type
        switch (alerta.tipo) {
            case AlertaTipo.Success:
                return 'alert alert-success';
            case AlertaTipo.Error:
                return 'alert alert-danger';
            case AlertaTipo.Info:
                return 'alert alert-info';
            case AlertaTipo.Warning:
                return 'alert alert-warning';
        }
    }

}
