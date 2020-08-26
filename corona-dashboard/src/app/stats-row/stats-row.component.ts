import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-stats-row',
  templateUrl: './stats-row.component.html',
  styleUrls: ['./stats-row.component.css']
})
export class StatsRowComponent implements OnInit {

  @Input() data: any;
  constructor() {
   }

  ngOnInit(): void {
    console.log(this.data)
  }

}
