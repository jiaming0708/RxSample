import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class EnvAPIService {
   public wasteAPI$ = this.http.jsonp(this.generatorUrl('355000000I-001154'), 'callback')
    .pipe(
      map((p: any) => p.result.records)
    );
  generatorUrl(resouceId: string, params?: any[]): string {
    const queryParam = !params ? '' : `&${params.join('&')}`;
    return `${environment.envAPIEndpoint + resouceId}?format=json&toekn=${environment.envToken}${queryParam}`;
  }

  constructor(private http: HttpClient) { }
}
