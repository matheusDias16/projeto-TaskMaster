import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiUrl } from '../../../../environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';

type TUser = {
  email: string,
  password: string
}
export type TRequestResponse = {
  msg: string
}

export type TcriaUsuario = {
  email: string
  password: string
  name: string
}
export type TForgotPassword = {
  email: string
}

export type TAlteraPassword = {
  email: string | null | undefined
  password?: string | null | undefined
  token?: string | null | undefined
}

export type TUserSingle = {
  _id: string,
  name: string,
  email: string,
  createdAt: string,
  __v: number
}

type TUserResponse = {
  user: TUserSingle,
  token: string,
};
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  header = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  };
  constructor(public jwtHelper: JwtHelperService, private http: HttpClient) { }

  public isAuthenticated(): boolean {

    const token = localStorage.getItem('accessToken') || ''
    return !this.jwtHelper.isTokenExpired(token)

  }

  public authenticate(credentials: TUser): Observable<TUserResponse> {
    return this.http.post<TUserResponse>(
      `${apiUrl}/auth/authenticate`,
      credentials,
      { headers: this.header }
    );
  }

  public criaUsuario(payload: TcriaUsuario) {
    return this.http.post(
      `${apiUrl}/auth/register`,
      payload,
      { headers: this.header }
    );
  }

  public forgotPassword(payload: TForgotPassword): Observable<TRequestResponse> {
    return this.http.post<TRequestResponse>(
      `${apiUrl}/auth/forgot_password`,
      payload,
      { headers: this.header }
    );
  }

  public trocaPassword(payload: TAlteraPassword): Observable<TRequestResponse> {
    return this.http.post<TRequestResponse>(
      `${apiUrl}/auth/reset_password`,
      payload,
      { headers: this.header }
    );
  }
}