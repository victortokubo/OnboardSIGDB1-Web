import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Alerta, AlertaTipo } from './alerta';
import { Router, NavigationStart } from '@angular/router';

@Injectable()
export class AlertaService {

  private subject = new Subject<Alerta>();
  private keepAfterRouteChange = false;

  constructor(private router: Router) {
    // clear alert messages on route change unless 'keepAfterRouteChange' flag is true
    router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        if (this.keepAfterRouteChange) {
          // only keep for a single route change
          this.keepAfterRouteChange = false;
        } else {
          // clear alert messages
          this.clear();
        }
      }
    });
  }

  getAlert(): Observable<any> {
    return this.subject.asObservable();
  }

  success(message: string, keepAfterRouteChange = false) {
    this.alert(AlertaTipo.Success, message, keepAfterRouteChange);
  }

  error(message: string, keepAfterRouteChange = false) {
    this.alert(AlertaTipo.Error, message, keepAfterRouteChange);
  }

  info(message: string, keepAfterRouteChange = false) {
    this.alert(AlertaTipo.Info, message, keepAfterRouteChange);
  }

  warn(message: string, keepAfterRouteChange = false) {
    this.alert(AlertaTipo.Warning, message, keepAfterRouteChange);
  }

  alert(type: AlertaTipo, message: string, keepAfterRouteChange = false) {
    this.keepAfterRouteChange = keepAfterRouteChange;
    this.subject.next(<Alerta>{ tipo: type, mensagem: message });
  }

  clear() {
    // clear alerts
    this.subject.next();
  }

}
