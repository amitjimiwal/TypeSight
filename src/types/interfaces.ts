export interface ErrorResponse {
     success: boolean;
     statusCode: number;
     timestamp: string;
     path: string;
     message: string;
}
export interface SuccessResponse {
     success: boolean;
     statusCode: number;
     timestamp: string;
     path: string;
     data: unknown;
     message: string;
}
