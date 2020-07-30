import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class ErrorService {

    getClientMessage(error: Error): string {
        if (!navigator.onLine) {
            return 'No Internet Connection';
        }
        return error.message ? error.message : error.toString();
    }

    getClientStack(error: Error): string {
        return error.stack;
    }

    getServerMessage(error: HttpErrorResponse): string {
        return navigator.onLine ?    
            (error.error ? error.error.Message : error.message) :
           'No Internet Connection';
    }

    getServerStack(error: HttpErrorResponse): string {
        // handle stack trace
        return error.error;
    }
}