import { Injectable, ElementRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Headers } from '@angular/http'
//import { MapsAPILoader } from 'angular2-google-maps/core';
import { MapsAPILoader } from '@agm/core';
import 'rxjs/add/operator/map';
import { DomSanitizer } from '@angular/platform-browser'

@Injectable()
export class GoogleService
{
	private baseUrl: string = "https://maps.googleapis.com/maps/api/place/photo";

	constructor(
		private googleApiLoader: MapsAPILoader,
		private http: Http,
		private sanitizer: DomSanitizer
	){}

	// getPhotoUrl(placeId: string, image: ElementRef)
	// {
	// 	let service = new google.maps.places.PlacesService(image.nativeElement);
	// 	var request = {
	// 		placeId: placeId,
	// 	};

	// 	service.getDetails(request, (place, status) => {
	// 		if (status == google.maps.places.PlacesServiceStatus.OK) {
	// 			var url = place.photos[0].getUrl({maxWidth: 300, maxHeight: 300});
	// 			console.log(url);
	// 			console.log(place.photos[0].html_attributions);
	// 			image.nativeElement.src = url || 'https://melbournebitsandpieces.files.wordpress.com/2010/08/sany0251.jpg';
	// 		}
	// 	});
	// }

	getPhotoUrl(placeId: string, image: ElementRef)
	{
		this.googleApiLoader.load().then(() => {
			let service = new google.maps.places.PlacesService(image.nativeElement);
			var request = {
				placeId: placeId,
			};

			service.getDetails(request, (place, status) => {
				if (status == google.maps.places.PlacesServiceStatus.OK) {

					// places with no photos
					if (!place.hasOwnProperty('photos')) {
						console.log(place);
						let ref = place.html_attributions;
						console.log(ref);
						//image.nativeElement.src = `${this.baseUrl}?maxwidth=400&photoreference=${place.reference}`
					}
					else {
						var url = place.photos[0].getUrl({maxWidth: 300, maxHeight: 300});
						//console.log(url);
						//this.download(url);
						// this.getImage(url).subscribe(imageData => {
						// 	console.log(imageData);
						//  	image.nativeElement.src = URL.createObjectURL(new Blob([imageData]));
						// });
						image.nativeElement.src = url || 'https://melbournebitsandpieces.files.wordpress.com/2010/08/sany0251.jpg';
					}
				}
			})
		});
	}

	getImageUrlBG(placeId: string, image: ElementRef, url: string)
	{
		this.googleApiLoader.load().then(() => {
			let service = new google.maps.places.PlacesService(image.nativeElement);
			var request = {
				placeId: placeId,
			};


			service.getDetails(request, (place, status) => {
				if (status == google.maps.places.PlacesServiceStatus.OK) {

					// places with no photos
					if (!place.hasOwnProperty('photos')) {
						console.log(place);
						let ref = place.html_attributions;
						console.log(ref);
					}
					else {
						url = place.photos[0].getUrl({maxWidth: 300, maxHeight: 300});
						//image.nativeElement.style.background-image =
					}
				}
			})
		});
	}

	getImage(url: string)
	{
		return Observable.create(observer => {
			let req = new XMLHttpRequest();
			req.open('GET',url);
			req.responseType = "arraybuffer";
			req.setRequestHeader('Access-Control-Allow-Origin', '*');
			req.onreadystatechange = function() {
				if (req.readyState == 4 && req.status == 200) {
					observer.next(req.response);
					observer.complete();
				}
			};
			req.send();
		});
	}

	download(url: string)
	{
		let headers = new Headers();
		headers.append('Access-Control-Allow-Origin', '*');
		this.http.get(url, { headers: headers}).subscribe(
			data => {
				var image = data.arrayBuffer();
			},
			err => console.log('Error is..:' + err)
		);
	}

	private extractData(res: any)
	{
		return res.photos[0].getUrl({maxWidth: 300, maxHeigh: 300}) || "";
	}

}

