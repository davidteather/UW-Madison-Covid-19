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
  on_campus: string[] = ['55025001102', '55063001101', '55105003200', '55025003200',
    '55079003200', '55127001603', '55063001102', '55025001606', '55025001101', '55025001603']
  near_campus: string[] = ['55117010100', '55079002100', '55117000201', '55105000300', '55079001200', '55105001900', '55059000800', '55105001000', '55063000300', '55063000800',
    '55059001900', '55101001802', '55105000800', '55079001300', '55025000201', '55079001900', '55025000402', '55105002100', '55063001200', '55079001000', '55025010100', '55127000902', '55059001300', '55025001000', '55063001000', '55025000901', '55101001900', '55117000800', '55059001200', '55111000402',
    '55127000800', '55059000300', '55101000300', '55079000201', '55127001000', '55079000800', '55025001300', '55059001000', '55101000901', '55101002100',
    '55025001605', '55025000800', '55127000901', '55101000800', '55127001604', '55117000300', '55117001000', '55111000800', '55059002100', '55025001802', '55101001705', '55025000300', '55025001804', '55025001705', '55025000902', '55111000300', '55025001704', '55025001604', '55025002100', '55025001200', '55025001900']
  madison: string[] = ['55105000100', '55025001102', '55117010100', '55127000501', '55105002700', '55117010400', '55063001101', '55105003200', '55079002200',
    '55079002700', '55105002200', '55025003200', '55079002500', '55079002900', '55079002100', '55079002800', '55025002601', '55101000100', '55117000201',
    '55105000300', '55079002000', '55079001200', '55105001900', '55117010300', '55025010200', '55059000800', '55105001000', '55063000300', '55063000800',
    '55059001900', '55025001501', '55101001802', '55025000408', '55079003200', '55105000800', '55127001603', '55059002500', '55117000100', '55117010200',
    '55079001300', '55059003001', '55105002800', '55105002500', '55025000201', '55025002800', '55079001900', '55079000501', '55025000402', '55105002100',
    '55105002000', '55127001501', '55063001200', '55079001000', '55025010100', '55127000902', '55059002200', '55059001300', '55111000700', '55079003100',
    '55063000700', '55105000700', '55025002301', '55025001000', '55025002900', '55025002500', '55117000202', '55025000100', '55079000700', '55063001000',
    '55025000901', '55101001900', '55117000800', '55059001200', '55111000402', '55127000800', '55059000300', '55025002302', '55101001501', '55059002700',
    '55101000300', '55063001102', '55079000201', '55025000202', '55127001000', '55025002401', '55025000406', '55079000800', '55105003001', '55025001300',
    '55059001000', '55101000901', '55101002100', '55059002800', '55059002000', '55025002402', '55025000401', '55025010400', '55025000700', '55025010903',
    '55025001605', '55059000700', '55025000800', '55105002601', '55127000901', '55025010300', '55025002700', '55101000800', '55059000100', '55101002800',
    '55127001604', '55079000202', '55117000300', '55117001000', '55105003100', '55025001606', '55025002200', '55025000204', '55111000800', '55025003001',
    '55025001101', '55025000205', '55025001603', '55059002100', '55025001802', '55101001705', '55059002601', '55025000501', '55025000300', '55025001402',
    '55025000405', '55025000407', '55101002402', '55101000700', '55025001804', '55025001705', '55101002401', '55025001401', '55025000902', '55025003100',
    '55111000300', '55105002900', '55025001704', '55025000504', '55025001604', '55111000401', '55111000100', '55025002100', '55025001200', '55025002000', '55025010901', '55025001900'];
  date_obj: any;
  tmp_arr: any[];
  covid_data: any;
  max_per_req: number = 50;
  tmp_num: number = 0;

  constructor(private dataService: DataCollectorService) {
    $(function () {
      $('[data-toggle="tooltip"]').tooltip()
    })
    this.tmp_arr = [];

    this.on_campus.forEach(element => {
      if (!this.tmp_arr.includes(element)) {
        this.tmp_arr.push(element)
      }
    });

    this.near_campus.forEach(element => {
      if (!this.tmp_arr.includes(element)) {
        this.tmp_arr.push(element)
      }
    });

    this.madison.forEach(element => {
      if (!this.tmp_arr.includes(element)) {
        this.tmp_arr.push(element)
      }
    });

    this.covid_data = {
      'on_campus': {
        "positive": 0,
        "negative": 0,
        "pos_change": 0,
        "neg_change": 0,
        "pos_14_days_ago": 0,
        "deaths_14_days_ago": 0,
        "deaths": 0,
        "negative_14_days_ago": 0,
        "pos_7_days_ago": 0,
        "neg_7_days_ago": 0,
        "deaths_7_days_ago": 0
      },
      'near_campus': {
        "positive": 0,
        "negative": 0,
        "pos_change": 0,
        "neg_change": 0,
        "pos_14_days_ago": 0,
        "deaths_14_days_ago": 0,
        "deaths": 0,
        "negative_14_days_ago": 0,
        "pos_7_days_ago": 0,
        "neg_7_days_ago": 0,
        "deaths_7_days_ago": 0
      },
      'madison': {
        "positive": 0,
        "negative": 0,
        "pos_change": 0,
        "neg_change": 0,
        "pos_14_days_ago": 0,
        "deaths_14_days_ago": 0,
        "deaths": 0,
        "negative_14_days_ago": 0,
        "pos_7_days_ago": 0,
        "neg_7_days_ago": 0,
        "deaths_7_days_ago": 0
      },
      'updated': null
    }

    this.process_campus()

    while (this.tmp_arr.length > 0) {
      var tmp_arr_2 = this.tmp_arr.splice(this.tmp_num, this.max_per_req + this.tmp_num)
      dataService.getData(tmp_arr_2).subscribe((results) => {
        this.process_results(results)
      })

      dataService.getHistory(tmp_arr_2, 14).subscribe((results) => {
        this.process_14_days(results)
      })

      dataService.getHistory(tmp_arr_2, 7).subscribe((results) => {
        this.process_7_days(results)
      })

      dataService.getHistory(tmp_arr_2, 1).subscribe((results) => {
        this.process_history(results, 1)
      })
    }
  }

  refine_number(inp) {
    if (inp > 0) {
      return inp
    } else {
      return 0
    }
  }

  process_results(results) {
    this.date_obj = new Date(results.features[0].attributes.DATE)
    this.covid_data.updated = (this.date_obj.getMonth() + 1) + "-" + this.date_obj.getDate() + "-" + this.date_obj.getFullYear();

    var arr_arr = [this.on_campus, this.near_campus, this.madison]
    var key_arr = ["on_campus", "near_campus", "madison"]
    for (var i = 0; i < 4; i++) {
      var key = arr_arr[i]
      var key_word = key_arr[i]
      results.features.forEach(e => {
        if (key.includes(e.attributes.GEOID)) {
          this.covid_data[key_word].positive += this.refine_number(e.attributes.POSITIVE);
          this.covid_data[key_word].negative += this.refine_number(e.attributes.NEGATIVE);
          this.covid_data[key_word].pos_change += this.refine_number(e.attributes.POS_NEW);
          this.covid_data[key_word].neg_change += this.refine_number(e.attributes.NEG_NEW);
          this.covid_data[key_word].deaths += this.refine_number(e.attributes.DEATHS)
        }
      })
    }
  }

  process_14_days(results) {
    var arr_arr = [this.on_campus, this.near_campus, this.madison]
    var key_arr = ["on_campus", "near_campus", "madison"]
    for (var i = 0; i < 4; i++) {
      var key = arr_arr[i]
      var key_word = key_arr[i]
      results.features.forEach(e => {
        if (key.includes(e.attributes.GEOID)) {
          this.covid_data[key_word].pos_14_days_ago += this.refine_number(e.attributes.POSITIVE);
          this.covid_data[key_word].negative_14_days_ago += this.refine_number(e.attributes.NEGATIVE);
          this.covid_data[key_word].deaths_14_days_ago += this.refine_number(e.attributes.DEATHS)
        }
      })
    }
  }

  process_history(results, days) {
    var arr_arr = [this.on_campus, this.near_campus, this.madison]
    var key_arr = ["on_campus", "near_campus", "madison"]
    for (var i = 0; i < 4; i++) {
      var key = arr_arr[i]
      var key_word = key_arr[i]
      results.features.forEach(e => {
        if (key.includes(e.attributes.GEOID)) {
          this.covid_data[key_word]['pos_' + String(days) + '_days_ago'] += this.refine_number(e.attributes.POSITIVE);
          this.covid_data[key_word]['negative_' + String(days) + '_days_ago'] += this.refine_number(e.attributes.NEGATIVE);
          this.covid_data[key_word]['deaths_' + String(days) + '_days_ago'] += this.refine_number(e.attributes.DEATHS)
        }
      })
    }
  }

  process_7_days(results) {
    var arr_arr = [this.on_campus, this.near_campus, this.madison]
    var key_arr = ["on_campus", "near_campus", "madison"]
    for (var i = 0; i < 4; i++) {
      var key = arr_arr[i]
      var key_word = key_arr[i]
      results.features.forEach(e => {
        if (key.includes(e.attributes.GEOID)) {
          this.covid_data[key_word].pos_7_days_ago += this.refine_number(e.attributes.POSITIVE);
          this.covid_data[key_word].neg_7_days_ago += this.refine_number(e.attributes.NEGATIVE);
          this.covid_data[key_word].deaths_7_days_ago += this.refine_number(e.attributes.DEATHS)
        }
      })
    }
  }

  

  process_campus() {
    //var url = "http://www.whateverorigin.org/get?url=" + "https://www.wisc.edu/dashboard/"
    // $.get(url, function (response) { console.log(response); });
  }


  ngOnInit(): void {
  }

}
