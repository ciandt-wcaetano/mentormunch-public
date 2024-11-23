import { Injectable } from '@angular/core';
import { IJwtPayload } from '@app/pages/auth/interfaces/jwt-payload.interface';
import Keys from '@app/shared/helpers/storage-keys';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  constructor() {}

  public setAccessToken(token: string): void {
    sessionStorage.setItem(Keys.ACCESS_TOKEN, token);
  }

  public getAccessToken(): string {
    return sessionStorage.getItem(Keys.ACCESS_TOKEN) ?? '';
  }

  public setExpirationDate(expDate: string) {
    sessionStorage.setItem(Keys.EXP_DATE, expDate);
  }

  public getExpirationDate(): string {
    return sessionStorage.getItem(Keys.EXP_DATE) ?? '';
  }

  public setUserData(userData: IJwtPayload): void {
    sessionStorage.setItem(Keys.USER_DATA, JSON.stringify(userData));
  }

  public async getUserData(): Promise<string> {
    let attempts = 0;
    const maxAttempts = 3;
    const interval = 1000; // 1 second

    while (attempts < maxAttempts) {
      const data = sessionStorage.getItem(Keys.USER_DATA);
      if (data) {
        return data;
      }
      attempts++;
      await new Promise(resolve => setTimeout(resolve, interval));
    }
    return '';
  }

  public removeSessionData(): void {
    sessionStorage.clear();
  }
}
