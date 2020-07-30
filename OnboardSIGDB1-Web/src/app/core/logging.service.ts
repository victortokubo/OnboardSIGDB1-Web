import { Injectable } from '@angular/core';

@Injectable()
export class LoggingService {

  constructor() { }

  logError(message: string, stack: string) {
    console.log("LoggingService: Message");
    console.log(message);
    console.log("LoggingService: Stack");
    console.log(stack);
  }

}
