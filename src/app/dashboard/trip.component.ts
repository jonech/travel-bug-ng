import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router'
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable} from 'angularfire2/database';

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
		private firebase: AngularFireDatabase,
		private router: Router,
	){}

	ngOnInit()
	{
		this._trip = this.firebase.object(`/Trip/${this.tripId}`);
		this._tripDays = this.firebase.list(`/Trip/${this.tripId}/Days`);
		this._tripRegulars = this.firebase.list(`/Trip/${this.tripId}/User/Regular`);
		this._tripAdmins = this.firebase.list(`/Trip/${this.tripId}/User/Admin`);
		//this._tripRegulars.push(this._tripAdmins);
	}

	showTripDetail(id: string)
	{
		if (id != null) {
			this.router.navigate(['/trip', id]);
		}
	}
}
