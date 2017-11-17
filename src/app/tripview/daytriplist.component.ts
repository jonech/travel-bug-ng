import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2/database';
import { InviteService } from './invite-members-component/invite.service';

@Component({
	selector: 'daytriplist',
	templateUrl: './daytriplist.component.html',
	styleUrls: ['./daytriplist.component.css', '../dashboard/goingUser.component.scss'],
	//encapsulation: ViewEncapsulation.None //Make css style in this component globally
})

export class DayTripListComponent implements OnInit, OnDestroy
{

	private paramSub: any;
	_tripId: string;

	_trip: FirebaseObjectObservable<any>;
	_dayTrips: FirebaseListObservable<any[]>;

	_tripRegulars: FirebaseListObservable<any[]>;
	_tripAdmins: FirebaseListObservable<any[]>;


	constructor(
		private firebase: AngularFireDatabase,
		private route: ActivatedRoute,
		private inviteService: InviteService
	){}

	public ngOnInit()
	{
		this.paramSub = this.route.params.subscribe(params => {
			this._tripId = params['id'];

			this._trip = this.firebase.object(`/Trip/${this._tripId}`);


			this._tripRegulars = this.firebase.list(`/Trip/${this._tripId}/User/Regular`);
			this._tripAdmins = this.firebase.list(`/Trip/${this._tripId}/User/Admin`);

			this._dayTrips = this.firebase.list(`/Trip/${this._tripId}/Days`, {
                // arrange daytrip in ascending order
                // works well for now, rely on firebase auto-increment when creating daytrip
                query: { orderByValue: true }
            });
			this._tripRegulars = this.firebase.list(`/Trip/${this._tripId}/User/Regular`);
			this._tripAdmins = this.firebase.list(`/Trip/${this._tripId}/User/Admin`);
		});

		this.inviteService.newMember.subscribe(
			(uid:string) => {
				this.inviteMembers(uid);
			}
		);


	}



	inviteMembers(uid: string) {
		//console.log(uid);
		this.firebase.object(`/User/${uid}/Trip/${this._tripId}`).set('not sure');
		this.firebase.object(`/Trip/${this._tripId}/User/Regular/${uid}`).set('not sure');
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

        this.firebase.object(`/Trip/${tripId}/isPast`).set(true);

        // iterate over all admin and regular, remove trip from them, add to past trip
        // dumbest idea... ever...
        this.firebase.list(`/Trip/${tripId}/User/Admin`, {
            preserveSnapshot: true
        }).subscribe(snapshots => snapshots.forEach((admin) => {
            this.firebase.object(`/User/${admin.key}/PastTrip/${tripId}`).set(true);
            this.firebase.object(`/User/${admin.key}/Trip/${tripId}`).remove();
        }));

        this.firebase.list(`/Trip/${tripId}/User/Regular`, {
            preserveSnapshot: true
        }).subscribe(snapshots => snapshots.forEach((regular) => {
            this.firebase.object(`/User/${regular.key}/PastTrip/${tripId}`).set(true);
            this.firebase.object(`/User/${regular.key}/Trip/${tripId}`).remove();
        }));
    }
}
