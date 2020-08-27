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
    return this.http.get(`https://dhsgis.wi.gov/server/rest/services/DHS_COVID19/COVID19_WI/FeatureServer/10/query?outFields=*&returnGeometry=false&resultOffset=0&resultRecordCount=${geoIDs.length}&f=json&orderByFields=DATE desc&where=GEO = 'Census tract' AND (${filter})`)
  }

  getHistory(geoIDs:any[], daysAgo:number, currDataEpoch:number): Observable<any> {
    var now = new Date(currDataEpoch);
    now.setDate(now.getDate() - daysAgo);
    var filter = "";
    for (var x=0; x<geoIDs.length; x++) {
      
      filter = filter + `GEOID='${geoIDs[x]}'`
      if (x != geoIDs.length-1) {
        filter = filter + " OR "
      }
    }
    return this.http.get(`https://dhsgis.wi.gov/server/rest/services/DHS_COVID19/COVID19_WI/FeatureServer/10/query?outFields=*&returnGeometry=false&resultOffset=0&resultRecordCount=${geoIDs.length}&f=json&orderByFields=DATE desc&where=GEO = 'Census tract' AND DATE >= TIMESTAMP '${now.toISOString().split("T")[0] + " " + "00:00:00"}' AND DATE <= TIMESTAMP '${now.toISOString().split("T")[0] + " " + "23:59:59"}' AND (${filter})`)
  }

  getDataTimestamp(): Observable<any> {
    return this.http.get(`https://dhsgis.wi.gov/server/rest/services/DHS_COVID19/COVID19_WI/FeatureServer/10/query?outFields=*&returnGeometry=false&resultOffset=0&resultRecordCount=1&f=json&orderByFields=DATE desc&where=GEO = 'Census tract'`)
  }

}
