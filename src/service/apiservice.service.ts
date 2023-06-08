import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {



  constructor(private _http: HttpClient) { }

  //frontend to backend

  apiUrl = 'http://localhost:3000/';

  //get all data
  topic_id: any;
  subtopic_id: any;
  getHome(topicid: any, subtopicid: any): Observable<any> {
    this.topic_id = topicid;
    this.subtopic_id = subtopicid;
    return this._http.get(`${this.apiUrl}` + 'subtopic1/' + `${this.topic_id}/` + `${this.subtopic_id}`);
  }

  getCode(): Observable<any> {
    return this._http.get(`${this.apiUrl}` + 'code_content');
  }



  getnotes(): Observable<any> {
    return this._http.get(`${this.apiUrl}` + 'getnote');
  }

  gettopics(): Observable<any> {
    return this._http.get(`${this.apiUrl}` + 'topics');
  }

  getcodecontents(topicid: any, subtopicid: any): Observable<any> {
    this.topic_id = topicid;
    this.subtopic_id = subtopicid;
    return this._http.get(`${this.apiUrl}` + 'code_content/' + `${this.topic_id}/ ` + `${this.subtopic_id}`);
  }

  getquiz(topicid: any): Observable<any> {
    this.topic_id = topicid;
    return this._http.get(`${this.apiUrl}` + 'quiz/' + `${this.topic_id}`);
  }

  getvideo(): Observable<any> {
    return this._http.get(`${this.apiUrl}` + 'video');
  }

  gettask(topicid: any): Observable<any> {
    this.topic_id = topicid;
    return this._http.get(`${this.apiUrl}` + 'task/' + `${this.topic_id}`);
  }

  getchat(): Observable<any> {
    return this._http.get(`${this.apiUrl}` + 'chat');
  }

  getcodetest(topicid: any): Observable<any> {
    this.topic_id = topicid;
    return this._http.get(`${this.apiUrl}` + 'codetest/' + `${this.topic_id}`);
  }

  getPractice(subtopicid: any): Observable<any> {
    this.subtopic_id = subtopicid;
    return this._http.get(`${this.apiUrl}` + 'practice/' + `${this.subtopic_id}`)
  }
  //create data

  createData(data: any): Observable<any> {
    console.log(data, 'createapi=>');
    return this._http.post(`${this.apiUrl}`, data);
  }

  createnotes(data: any): Observable<any> {
    console.log(data, 'createapi=>');
    return this._http.post(`${this.apiUrl}` + 'createnotes', data);
  }

  createmsg(data: any): Observable<any> {
    console.log(data, 'createapi=>');
    return this._http.post(`${this.apiUrl}` + 'createmsg', data);
  }


  deleteData(id: any): Observable<any> {

    let ids = id;
    console.log("this is id", ids)
    return this._http.delete(`${this.apiUrl}` + 'note/' + `${ids}`);

  }


}

