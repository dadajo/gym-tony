import {
  Inject,
  Injectable
} from '@angular/core';

import {
  Observable
} from 'rxjs/Observable';

import {
  Http,
  Headers
} from '@angular/http';

import 'rxjs/add/operator/map';

@Injectable()
export class GymService {
  
  static ENDPOINT: string = '/api/user/:id';

  constructor(@Inject(Http) private _http: Http) {

  }

  add(user: any):Observable<any> {
    
    let headers = new Headers();

    headers.append('Content-Type', 'application/json');

    return this._http
               .post(GymService.ENDPOINT.replace(':id', ''), user, {headers})
               .map((r) => r.json());
  }


}
