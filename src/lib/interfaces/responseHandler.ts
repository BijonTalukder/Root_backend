export interface ResponseHandler{
        success: boolean;
        message?: string;
        data: any,
        timestamp?: string;
        path?: string
}