import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFire, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2';

@Component({
	selector: 'daytriplist',
	templateUrl: './daytriplist.component.html',
	styleUrls: ['./daytriplist.component.css', '../dashboard/dashboard.component.css']
})

export class DayTripListComponent implements OnInit, OnDestroy
{
	private paramSub: any;
	private _tripId: string;

	private _trip: FirebaseObjectObservable<any>;
	private _dayTrips: FirebaseListObservable<any[]>;

	constructor(
		private firebase: AngularFire,
		private route: ActivatedRoute,
	){}

	public ngOnInit()
	{
		this.paramSub = this.route.params.subscribe(params => {
			this._tripId = params['id'];

			this._trip = this.firebase.database.object(`/Trip/${this._tripId}`);
			this._dayTrips = this.firebase.database.list(`/Trip/${this._tripId}/Days`);
		});
	}

	public ngOnDestroy()
	{
		this.paramSub.unsubscribe();
	}

}
