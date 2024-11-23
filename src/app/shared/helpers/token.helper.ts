import { IJwtPayload } from "@app/pages/auth/interfaces/jwt-payload.interface";

export class TokenHelper {
    static parseJwt(token: string): any {
        try {
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));

            return JSON.parse(jsonPayload);
        } catch (error) {
            console.error('Invalid JWT token', error);
            return null;
        }
    }

    static parseUserData(userData: string): IJwtPayload {
        if (typeof userData === 'string') {
            const dataObject = JSON.parse(userData);
            return dataObject;
        }
        return null;
    }
}