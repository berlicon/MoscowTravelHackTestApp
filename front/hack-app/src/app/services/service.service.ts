import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WeatherForecast } from '../models/weatherforecast';
import { environment } from '../../environments/environment';
import { Elem } from '../models/elem';

@Injectable({
  providedIn: 'root'
})
export class Service {
  private api: string;

  constructor(private http: HttpClient) {
    this.api = environment.api;
  }

  public testGet(x: number, y: number): Observable<string> {
    const url = `${this.api}main/testGet/${x}/${y}`;
    return this.http.get<string>(url);
  }

  public testPost(x: number, y: number, id: number, name: string, active: boolean, list: number[]): Observable<string> {
    const url = `${this.api}main/testPost/${x}/${y}`;
    let elem: Elem = new Elem(id, name, active, list);
    return this.http.post<string>(url, elem);
  }

  public getData(): Observable<WeatherForecast[]> {
    const url = `${this.api}main/`;
    return this.http.get<WeatherForecast[]>(url);
  }

  public predict(input: number[]): Observable<string> {
    const url = `${this.api}main/predict/`;
    return this.http.post<string>(url, input);
  }

  public testNDarray(input: number[]): Observable<string> {
    const url = `${this.api}main/TestNDarray/`;
    return this.http.post<string>(url, input);
  }

  public init(): Observable<any> {
    const url = `${this.api}main/init/`;
    return this.http.post<any>(url, null);
  }
}
