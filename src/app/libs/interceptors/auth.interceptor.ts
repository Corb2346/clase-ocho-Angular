import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, concatMap, map, Observable, of, switchMap, tap, throwError } from 'rxjs';
import { ApiAervicesService } from './services/api-aervices.service';
import { DataService } from './services/data.service';
import StorageHelper from './helpers/storege.helper';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor( private ApiAervicesService: ApiAervicesService, private DataService:DataService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (request.url.includes("/mirror/")) {
      console.log(StorageHelper.getItem('session'));
      let originalRequest = request
      request = request.clone({
          setHeaders: {
            Authorization : 'Bearer ' + StorageHelper.getItem('session').token
          }
        })
        return next.handle(request).pipe(
          catchError( (err:any) => {
            
            console.log("cath-error",err);
            if(err instanceof HttpErrorResponse && err.status === 401 ){
              console.log("in response error");
              return this.expiredHandler(originalRequest,next)
            }
            return throwError( () => err )
          })
        )
    }
    return next.handle(request)
    }

    private expiredHandler(originalRequest:HttpRequest<unknown>, next:HttpHandler){
      return this.ApiAervicesService.refreshToken().pipe(
        switchMap( (response) => { 
          StorageHelper.setItem('session',response)
          originalRequest = originalRequest.clone({
            setHeaders: {
              Authorization : 'Bearer ' + StorageHelper.getItem('session').token
            }
          })
          return next.handle(originalRequest)
        })
      )
    }

}
