import { Component, OnInit, Input } from '@angular/core';
import { FirebaseObjectObservable, AngularFire } from 'angularfire2';

@Component({
	selector: 'comment-component',
	template:
	`
		<div>
			{{ (_comment | async)?.date }}
			{{ (_comment | async)?.comment }}
		</div>
	`
})

export class CommentComponent implements OnInit
{
	@Input() commentId : string;
	@Input() userId : string;

	_comment: FirebaseObjectObservable<any>;

	constructor(
		private firebase: AngularFire
	) { }

	ngOnInit()
	{
		console.log(this.commentId, this.userId);
		this._comment = this.firebase.database.object(`/Comment/${this.commentId}`);
	}
}
