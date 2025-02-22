import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GrokService {
  private apiUrl = 'http://localhost:3000/api/query';

  constructor(private http: HttpClient) {}

  getResponse(prompt: string): Observable<any> {
    return this.http.post(this.apiUrl, { prompt });
  }
}