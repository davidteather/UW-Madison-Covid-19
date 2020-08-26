import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataCollectorService {

  constructor(private http: HttpClient) { }

  getData(geoIDs:any[]): Observable<any> {
    var filter = "";
    for (var x=0; x<geoIDs.length; x++) {
      
      filter = filter + `GEOID='${geoIDs[x]}'`
      if (x != geoIDs.length-1) {
        filter = filter + " OR "
      }
    }
    return this.http.get(`https://dhsgis.wi.gov/server/rest/services/DHS_COVID19/COVID19_WI/FeatureServer/10/query?outFields=*&returnGeometry=false&resultOffset=0&resultRecordCount=${geoIDs.length}&f=json&orderByFields=DATE desc&where=GEO = 'Census tract' AND ${filter}`)
  }
}
