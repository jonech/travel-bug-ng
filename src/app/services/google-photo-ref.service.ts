import { Injectable } from '@angular/core';
import { Http, Response, Jsonp, URLSearchParams, XHRBackend, Headers } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';



@Injectable()
export class GooglePhotoRefService
{
	private baseUrl = "https://maps.googleapis.com/maps/api/place/details/json";
	private googleApiKey = "AIzaSyBNT4gDmMljV3Oko-E5WLMnNvW9mBfQ5FE";

	constructor(
		private http: Http,
		private jsonp: Jsonp,
		private xhr: XHRBackend
	){}


	getPhotoReference(placeId: string): Observable<any>
	{
		let params = new URLSearchParams();
		params.set('placeid', placeId);
		params.set('key', this.googleApiKey);
		//params.set('callback', 'JSONP_CALLBACK');

		let headers = new Headers();


		// var url = `${this.baseUrl}?placeid=${placeId}&key=${this.googleApiKey}`;
		 return this.http.get(this.baseUrl).map(this.extractData);

		//return this.xhr.createConnection()

		// return this.jsonp.get(this.baseUrl, { search: params})
		// 	.map(response => response.json());
	}


	private extractData(res: Response)
	{
		let body = res.json();
		return body.result.photos || {};
	}

}
