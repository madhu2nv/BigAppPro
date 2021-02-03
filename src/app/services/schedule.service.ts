import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiServiceService } from './api-service.service';
import { Http, HttpModule } from '@angular/http';
// import 'rxjs/add/operator/map';
// import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  constructor(private http: Http, private api: ApiServiceService,) { }

  scheduleMailCall(obj){
    console.log(obj)
    return this.http.post(this.api.apiData + '/scheduleMail' , obj)
  }
  // updateTable(){
  //   console.log("jhaiiii")
  //   return this.http.get(this.api.apiData + '/tableData' , '')
   
  // }

  deleteData(data){ 
    console.log(data)
    return this.http.post(this.api.apiData + '/deteleMail' , data)
  }
}
