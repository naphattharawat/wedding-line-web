import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(
    private http: HttpClient,
    @Inject('API_URL') private apiUrl: string
  ) { }

  async saveStatus(data: any) {
    const url = `${this.apiUrl}/api/status`;
    return await this.http.post(url, data).toPromise();
  }

  async sendMessage(data: any) {
    const url = `${this.apiUrl}/api/message`;
    return await this.http.post(url, data).toPromise();
  }
}