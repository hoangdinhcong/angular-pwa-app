
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-interceptor-example',
  templateUrl: './interceptor-example.component.html',
  styleUrls: ['./interceptor-example.component.scss']
})
export class InterceptorExampleComponent implements OnInit {

  data1; data2;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  requestData(): void {
    this.http.get('https://jsonplaceholder.typicode.com/todos/1')
      .pipe(take(1))
      .subscribe(body => { console.log(body); this.data1 = JSON.stringify(body); });
  }

  requestXMLData(): void {
    this.http.get('https://api.openweathermap.org/data/2.5/weather?q=London&mode=xml&appid=25a0801691214cdec4c44e5b125b6396')
      .pipe(take(1))
      .subscribe(body => { console.log(body); this.data2 = JSON.stringify(body); });
  }

  request404Data(): void {
    this.http.get('https://jsonplaceholder.typicode.com/todos/7878')
      .pipe(take(1))
      .subscribe(res => console.log(res));
  }
}
