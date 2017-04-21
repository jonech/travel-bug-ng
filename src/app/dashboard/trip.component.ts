import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router'
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';

@Component({
	selector: 'trip',
	templateUrl: './trip.component.html',
	styleUrls: ['./trip.component.css']
})

export class TripComponent implements OnInit
{
	@Input() tripId:string;
	_trip: FirebaseObjectObservable<any>;
	_tripDays: FirebaseListObservable<any[]>;
	_tripRegulars: FirebaseListObservable<any[]>;
	_tripAdmins: FirebaseListObservable<any[]>;

	constructor(
		private firebase: AngularFire,
		private router: Router,
	){}

	ngOnInit()
	{
		this._trip = this.firebase.database.object(`/Trip/${this.tripId}`);
		this._tripDays = this.firebase.database.list(`/Trip/${this.tripId}/Days`);
		this._tripRegulars = this.firebase.database.list(`/Trip/${this.tripId}/User/Regular`);
		this._tripAdmins = this.firebase.database.list(`/Trip/${this.tripId}/User/Admin`);
	}

	showTripDetail(id: string)
	{
		if (id != null) {
			this.router.navigate(['/trip', id]);
		}
	}
}
