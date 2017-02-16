import { Injectable, ElementRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { MapsAPILoader } from 'angular2-google-maps/core';
import 'rxjs/add/operator/map';

@Injectable()
export class GoogleService
{

	constructor(
		private googleApiLoader: MapsAPILoader
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
					var url = place.photos[1].getUrl({maxWidth: 300, maxHeight: 300});
					console.log(url);
					console.log(place.photos[0].html_attributions);
					image.nativeElement.src = url || 'https://melbournebitsandpieces.files.wordpress.com/2010/08/sany0251.jpg';
				}
			})
		});
	}



	private extractData(res: any)
	{
		return res.photos[0].getUrl({maxWidth: 300, maxHeigh: 300}) || "";
	}

}

