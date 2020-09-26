import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  data1; data2;

  constructor(private swUpdate: SwUpdate, private http: HttpClient) {

  }

  ngOnInit(): void {
    if (this.swUpdate.isEnabled) {
      this.swUpdate.available.subscribe(() => {
        if (confirm('New version available. Load New Version?')) {

          window.location.reload();
        }
      });
    }
  }

  requestXMLData(): void {
    this.http.get('https://api.openweathermap.org/data/2.5/weather?q=London&mode=xml&appid=25a0801691214cdec4c44e5b125b6396')
      .pipe(take(1))
      .subscribe(body => { console.log(body), this.data2 = JSON.stringify(body); });
  }
}
