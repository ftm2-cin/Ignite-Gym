export class AppError{
    message : string;
    code : number;
    constructor(message : string, code : number){
        this.message = message;
        this.code = code;
    }
}