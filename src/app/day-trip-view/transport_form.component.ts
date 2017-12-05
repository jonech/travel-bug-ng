import { Component, OnInit, Input } from '@angular/core';

// import { AngularFireAuth } from 'angularfire2/auth';
// import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Component({
	selector: 'transport-form',
	templateUrl: 'transport_form.component.html'
})

export class TransportFormComponent implements OnInit
{
	@Input() dayTripId: string;
	// dayTripRef: FirebaseListObservable<any[]>;

	constructor(
		// private firebase: AngularFireDatabase
	){}

	ngOnInit()
	{

	}
}
