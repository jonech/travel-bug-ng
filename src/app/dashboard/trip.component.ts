import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router'
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Component({
	selector: 'trip',
	templateUrl: './trip.component.html',
	styleUrls: ['./trip.component.css', './dashboard.component.css']
})

export class TripComponent implements OnInit
{
	@Input() tripId:string;
	private _trip: FirebaseObjectObservable<any>;
	private _tripDays: FirebaseListObservable<any[]>;
	private _tripRegulars: FirebaseListObservable<any[]>;
	private _tripAdmins: FirebaseListObservable<any[]>;

	constructor(
		private firebase: AngularFire,
		private router: Router
	){}

	ngOnInit()
	{
		var uid = localStorage.getItem('currentUserId');
		console.log("stuff-->" + this.tripId);
		this._trip = this.firebase.database.object('/Trip/' + this.tripId);


		this._tripDays = this.firebase.database.list(`/Trip/${this.tripId}/Days`);
		this._tripRegulars = this.firebase.database.list(`/Trip/${this.tripId}/User/Regular`);
		this._tripAdmins = this.firebase.database.list(`/Trip/${this.tripId}/User/Admin`);
	}

	private showTripDetail(id: string)
	{
		if (id != null) {
			this.router.navigate(['/trip', id]);
		}
		console.log("clicked!");
	}

}
