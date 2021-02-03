
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ScheduleService } from '../services/schedule.service';
import { ApiServiceService } from '../services/api-service.service';


import { Observable } from 'rxjs/Observable';
// import { Post } from '../../post';

import 'rxjs/add/operator/map';
import { Http, HttpModule } from '@angular/http';


@Component({
  selector: 'app-mail-scheduling',
  templateUrl: './mail-scheduling.component.html',
  styleUrls: ['./mail-scheduling.component.css']
})
export class MailSchedulingComponent implements OnInit {
  schedulePage: boolean;
  ViewDelete: boolean;
  mailData: string;
  date: string;
  time: string;
  tableData: any;
  saveData: boolean;
  updateData: boolean;
  id: string;

  constructor(private scheduleMailService: ScheduleService, private http: Http, private api: ApiServiceService) { }

  ngOnInit() {

  }

  Schedule() {
    this.schedulePage = true;
    this.ViewDelete = false;
    this.saveData = true;
    this.updateData = false;
    document.getElementById('Schedule').className = 'formatForButton1';
    document.getElementById('View').className = 'formatForButton2';
  }
  ViewPage() {
    this.ViewDelete = true;
    this.schedulePage = false;
    document.getElementById('View').className = 'formatForButton';
    document.getElementById('Schedule').className = 'formatForButton3';

    this.http.get(this.api.apiData + '/tableData',)
      .map(res => res.json())
      .subscribe(result => {
        this.tableData = result
      });

  }
  SendMail(mailData, date, time) {
    console.log(mailData)
    let obj = {
      EmailId: mailData,
      date: date,
      time: time
    }
    if (!(mailData == undefined || mailData == null || mailData == '') && !(date == undefined || date == null || date == '') && !(time == undefined || time == null || time == '')) {
      console.log(mailData)
      this.scheduleMailService.scheduleMailCall(obj).subscribe(res => {
        this.mailData = '';
        this.date = ''
        this.time = ''
      })
    } else {
      alert("Please fill the form")
    }

  }

  editEmail(data) {
    this.saveData = false;
    this.updateData = true;
    this.schedulePage = true;
    this.ViewDelete = false;
    this.mailData = data.EmailId;
    let dd = data.Date.split("T")
    this.date = dd[0];
    this.time = data.Time;
    this.id = data._id
    console.log(data)
  }

  updateEmail() {
    console.log(this.date)
    console.log(this.time)
    let obj = {
      "id": this.id,
      "EmailId": this.mailData,
      "date": this.date,
      "time": this.time

    }
    this.http.post(this.api.apiData + '/updateMail', obj)
      .map(res => res.json())
      .subscribe(result => {
        this.tableData = result;
        this.mailData = '';
        this.date = ''
        this.time = ''
      });
  }

  deleteEmail(data) {
    let id = data._id
    console.log(id)
    this.http.delete(this.api.apiData + '/deteleMail' + id)
      .map(res => res.json())
      .subscribe(result => {
        this.tableData = result
      });
  }
}
