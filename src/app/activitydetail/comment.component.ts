import { Component, OnInit, Input } from '@angular/core';
import { FirebaseObjectObservable, AngularFire } from 'angularfire2';

@Component({
	selector: 'comment-component',
    styleUrls: ['comment.component.css'],
	template:
	`
		<div class="comment"
            [ngClass]="{'even-row': isEven, 'odd-row': isOdd}">
            <div class="section group">
                <div class="col user-image">
                    <going-user [goingUserId]="userId"></going-user>
                </div>

                <div class="col span_70">
                    <div class="username">
                        {{ (_user|async)?.firstName }}
                    </div>

                    <div class="datetime">
                        {{ (_comment | async)?.date }}
                    </div>

                    <div class="message">
                        {{ (_comment | async)?.comment }}
                    </div>
                </div>
            </div>

		</div>
	`
})

export class CommentComponent implements OnInit
{
	@Input() commentId : string;
	@Input() userId : string;
    @Input() index: number;

	_comment: FirebaseObjectObservable<any>;
    _user: FirebaseObjectObservable<any>;

    isEven: boolean;
    isOdd: boolean;

	constructor(
		private firebase: AngularFire
	) { }

	ngOnInit()
	{
		this._comment = this.firebase.database.object(`/Comment/${this.commentId}`);
        this._user = this.firebase.database.object(`/User/${this.userId}/UserDetails`);

        if (this.index % 2 != 0) {
            this.isOdd = true;
        }
        else {
            this.isEven = true;
        }
	}
}
