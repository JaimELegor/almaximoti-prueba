import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  private buildParams(query?: Record<string, string>): HttpParams {
    let params = new HttpParams();
    if (query) Object.entries(query).forEach(([k, v]) => params = params.set(k, v));
    return params;
  }

  get<T>(endpoint: string, query?: Record<string, string>): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}${endpoint}`, {
      params: this.buildParams(query)
    });
  }

  post<T>(endpoint: string, body: any): Observable<T> {
    return this.http.post<T>(`${this.baseUrl}${endpoint}`, body);
  }

  put<T>(endpoint: string, body: any): Observable<T> {
    return this.http.put<T>(`${this.baseUrl}${endpoint}`, body);
  }

  delete<T>(endpoint: string, query?: Record<string, string>): Observable<T> {
    return this.http.delete<T>(`${this.baseUrl}${endpoint}`, {
      params: this.buildParams(query)
    });
  }
}