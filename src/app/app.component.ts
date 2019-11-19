import { Component, OnInit } from '@angular/core';
import { ServerService } from './server.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Gracenote';
  events: any[] = [];
  constructor(private server: ServerService) { }
  ngOnInit() {
    this.getEvents();
  }
  private getEvents() {
    this.server.getEvents().then((response: any) => {
      // console.log(response.data.toJSON());
      this.events = response.data;
    });
  }
  // castThree(cast: Array<Object>): any[] {
  //   console.log(cast.slice(3));
  //   return cast.slice(3);
  // }
}
