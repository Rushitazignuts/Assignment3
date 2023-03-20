import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { udata } from 'src/userdata';


@Injectable({
  providedIn: 'root',
})
export class GetdataService {
  url = 'https://jsonplaceholder.typicode.com/users';
  constructor(private http: HttpClient) {}
  getData() {
    return this.http.get(this.url);
  }
  delete(id: udata) {
    return this.http.delete(`${this.url}/${id}`);
  }

  edit(data: udata) {
    return this.http.post(this.url, data);
  }
}
