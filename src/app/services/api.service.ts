import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  async getSensorData() {
    //const response = await this.http.get(environment.url + '/api/sensor').toPromise();
    const response = await this.http.get(environment.url + '/assets/json/sensorreadings.json').toPromise();
    return response;
  }
}
