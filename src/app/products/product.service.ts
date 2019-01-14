import { Injectable } from "@angular/core";
import { IProduct } from "./product";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    private productUrl = 'api/products/products.json'; // mock HTTP server

    constructor(private http: HttpClient) {}

    getProducts(): Observable<IProduct[]> {
        return this.http.get<IProduct[]>(this.productUrl).pipe(
            tap(data => console.log(`All: ' + ${JSON.stringify(data)}`)),
            catchError(this.handleError)
        );
    }

    handleError(error: HttpErrorResponse) {
        // normally this would use the app's logging infrastructure
        let errorMessage = '';
        if(error.error instanceof ErrorEvent) {
            // a client-side or network error occurred
            // handle it accordingly
            errorMessage = `An error occurred: ${error.error.message}`;
        } else {
            // the backend returned an unsuccessful response
            // the response may contain clues as to what went wrong
            errorMessage = `Server returned code ${error.status}, error message is ${error.message}`;
        }
        console.error(errorMessage);
        return throwError(errorMessage);
    }
}