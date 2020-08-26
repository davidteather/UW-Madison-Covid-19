import { Component, OnInit } from '@angular/core';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { DataCollectorService } from 'src/app/services/data-collector.service';
declare var $: any;
@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})


export class LandingComponent implements OnInit {
  on_campus: string[] = ['32', '11.02', '11.01', '16.03', '16.06'];
  near_campus: string[] = ['101', '8', '9.02', '3', '9.01', '10', '12', '16.05',
    '16.04', '17.04', '17.05', '18.02', '18.04', '19', '21',
    '13', '9.01', '2.01', '4.02', '10'];
  madison: string[] = ['11.02', '32', '101', '1', '2.05', '109.01',
    '109.03', '5.04', '4.06', '4.05', '2.04', '4.07', '4.08', '2.02',
    '5.01', '4.02', '3', '2.01', '7', '14.02', '14.01', '15.01', '4.01',
    '8', '9.02', '10', '9.01', '13', '12', '16.05', '16.06', '11.01',
    '16.03', '16.04', '17.04', '17.05', '19', '18.02', '18.04', '21',
    '22', '102', '23.01', '23.02', '24.01', '24.02', '25', '26.01',
    '20', '27', '30.01', '28', '103', '31', '29', '104'];
  date_obj: any;

  covid_data: any;

  constructor(private dataService: DataCollectorService) {
    $(function () {
      $('[data-toggle="tooltip"]').tooltip()
    })

    dataService.getData().subscribe((results) => {
      this.date_obj =  new Date(results.features[0].attributes.DATE)
      this.covid_data = {
        'on_campus': {
          "positive": 0,
          "negative": 0
        },
        'near_campus': {
          "positive": 0,
          "negative": 0
        },
        'madison': {
          "positive": 0,
          "negative": 0
        },
        'updated': (this.date_obj.getMonth()+1) + "-"  + this.date_obj.getDate() + "-" + this.date_obj.getFullYear()
      }

      function refine_number(inp) {
        if (inp > 0) {
          return inp
        } else {
          return 0
        }
      }
      results.features.forEach(e => {
        
        if (this.on_campus.includes(e.attributes.NAME)) {
          this.covid_data.on_campus.positive += refine_number(e.attributes.POSITIVE);
          this.covid_data.on_campus.negative += refine_number(e.attributes.NEGATIVE);
        }

        if (this.near_campus.includes(e.attributes.NAME)) {
          this.covid_data.near_campus.positive += refine_number(e.attributes.POSITIVE);
          this.covid_data.near_campus.negative +=refine_number(e.attributes.NEGATIVE);
        }

        if (this.madison.includes(e.attributes.NAME)) {
          this.covid_data.madison.positive += refine_number(e.attributes.POSITIVE);
          this.covid_data.madison.negative += refine_number(e.attributes.NEGATIVE);
        }
      });
    })
  }

  ngOnInit(): void {

  }

}
