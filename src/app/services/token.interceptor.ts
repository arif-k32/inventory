import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenstorageService } from './tokenstorage.service';

@Injectable({
  providedIn:'root'
})
export class TokenInterceptor implements HttpInterceptor {

  constructor(private tokenstorage:TokenstorageService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    return next.handle(request);
  }
}
