import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFire, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2';
import { InviteService } from './invite-members-component/invite.service';

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
		private inviteService: InviteService
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
			this._tripRegulars = this.firebase.database.list(`/Trip/${this._tripId}/User/Regular`);
			this._tripAdmins = this.firebase.database.list(`/Trip/${this._tripId}/User/Admin`);
		});

		this.inviteService.newMember.subscribe(
			(uid:string) => {
				this.inviteMembers(uid);
			}
		);
	}

	OpenInvitation() 
	{
		this._isInvitationOpen = true;
	}

	closeInvitation()
	{
		this._isInvitationOpen = false;
	}

	inviteMembers(uid: string) {
		//console.log(uid);
		this.firebase.database.object(`/User/${uid}/Trip/${this._tripId}`).set('not sure');
		this.firebase.database.object(`/Trip/${this._tripId}/User/Regular/${uid}`).set('not sure');
	}

	public ngOnDestroy()
	{
		this.paramSub.unsubscribe();
	}

    public ArchiveTrip(tripId: string)
    {
        if (tripId == null) {
            return;
        }

        this.firebase.database.object(`/Trip/${tripId}/isPast`).set(true);

        // iterate over all admin and regular, remove trip from them, add to past trip
        // dumbest idea... ever...
        this.firebase.database.list(`/Trip/${tripId}/User/Admin`, {
            preserveSnapshot: true
        }).subscribe(snapshots => snapshots.forEach((admin) => {
            this.firebase.database.object(`/User/${admin.key}/PastTrip/${tripId}`).set(true);
            this.firebase.database.object(`/User/${admin.key}/Trip/${tripId}`).remove();
        }));

        this.firebase.database.list(`/Trip/${tripId}/User/Regular`, {
            preserveSnapshot: true
        }).subscribe(snapshots => snapshots.forEach((regular) => {
            this.firebase.database.object(`/User/${regular.key}/PastTrip/${tripId}`).set(true);
            this.firebase.database.object(`/User/${regular.key}/Trip/${tripId}`).remove();
        }));
    }
}
