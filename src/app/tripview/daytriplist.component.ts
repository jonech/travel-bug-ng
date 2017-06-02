import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFire, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2';

@Component({
	selector: 'daytriplist',
	templateUrl: './daytriplist.component.html',
	styleUrls: ['./daytriplist.component.css', '../dashboard/goingUser.component.css'],
	//encapsulation: ViewEncapsulation.None //Make css style in this component globally 
})

export class DayTripListComponent implements OnInit, OnDestroy
{
	_isInvitationOpen:boolean = false;

	private paramSub: any;
	_tripId: string;

	_trip: FirebaseObjectObservable<any>;
	_dayTrips: FirebaseListObservable<any[]>;

	_tripRegulars: FirebaseListObservable<any[]>;
	_tripAdmins: FirebaseListObservable<any[]>;


	constructor(
		private firebase: AngularFire,
		private route: ActivatedRoute,

		
	){}

	public ngOnInit()
	{
		this.paramSub = this.route.params.subscribe(params => {
			this._tripId = params['id'];

			this._trip = this.firebase.database.object(`/Trip/${this._tripId}`);


			this._tripRegulars = this.firebase.database.list(`/Trip/${this._tripId}/User/Regular`);
			this._tripAdmins = this.firebase.database.list(`/Trip/${this._tripId}/User/Admin`);

			this._dayTrips = this.firebase.database.list(`/Trip/${this._tripId}/Days`, {
                // arrange daytrip in ascending order
                // works well for now, rely on firebase auto-increment when creating daytrip
                query: { orderByValue: true }
            });

		});
	}

	OpenInvitation() 
	{
		this._isInvitationOpen = true;
	}

	closeInvitation()
	{
		this._isInvitationOpen = false;
	}

	inviteMembers(uemail: string) {
		console.log(uemail);
	}

	public ngOnDestroy()
	{
		this.paramSub.unsubscribe();
	}
}
