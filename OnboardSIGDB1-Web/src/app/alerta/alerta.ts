export class Alerta {
    tipo: AlertaTipo;
    mensagem: string;
}

export enum AlertaTipo {
    Success,
    Error,
    Info,
    Warning
}