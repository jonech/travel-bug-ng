import { Component, OnInit } from '@angular/core'
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';

@Component({
	selector: 'trip-list',
	templateUrl: './trip_list.component.html',
	styleUrls: ['./dashboard.component.css', './trip_list.component.css'],
})

export class TripListComponent implements OnInit
{
	_trips: FirebaseListObservable<any[]>;
	//_Users: Observable<any[]>;

	constructor(
		private _afAuth: AngularFireAuth,
		private _afDB: AngularFireDatabase
	)
	{}

	ngOnInit()
	{
		this._afAuth.authState.subscribe(auth => {
			if (!auth) { return; }

			let uid = auth.uid;
			this._trips = this._afDB.list(`/User/${uid}/Trip`);
		});
	}
}
