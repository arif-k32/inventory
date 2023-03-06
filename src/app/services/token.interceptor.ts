import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { TokenstorageService } from './tokenstorage.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private tokenStorage:TokenstorageService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // const access_token = this.tokenStorage.accessToken;
    const access_token =JSON.parse( localStorage.getItem('access_token') || "{}")
    if(!request.url.includes('login')){
      const authorizedRequest = request.clone({
        setHeaders:{
          Authorization:`Bearer ${access_token}`
        }
      });
      return next.handle(authorizedRequest).pipe(catchError(this.handleErrors));
    }
    return next.handle(request);
  }
  handleErrors(error: HttpErrorResponse) {
    switch (error.status) {
      case 401:
        return throwError(() => new Error('Not authorized'));
      default:
        return throwError(() => new Error('Error!'));
    }
  }
}
