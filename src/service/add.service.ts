import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class AddService {
  apiURLIndustry = environment.apiUrl + 'add';
  apiURLGetDetails = environment.apiUrl + 'add';
  apideleted=environment.apiUrl+'add';
  apiupdate=environment.apiUrl+'add';

  constructor(private http: HttpClient,) {}

  Add(id: any): Observable<any> {
  
    return this.http.post<any>(`${this.apiURLIndustry}`,id);
  }

  getdata(): Observable<any> {
    return this.http.get<any>(`${this.apiURLGetDetails}/`);
  }

  getID(Id: any): Observable<any> {
    return this.http.get<any>(`${this.apiURLGetDetails}/${Id}`);
  }

  DeletedData(Id: string): Observable<Object> {
    return this.http.delete<Object>(`${this.apideleted}/${Id}`);
  }

  updated(id:any,data:any){
    return this.http.put(`${this.apiURLGetDetails}/${id}`,data);
  }
}