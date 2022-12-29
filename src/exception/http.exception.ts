class HttpException extends Error {
    status: number;
    message: string;
    details: object;
    constructor(status: number, message: string, details: object={}) {
        super(message);
        this.status = status;
        this.message = message;
        this.details = details
    }
}

export default HttpException;