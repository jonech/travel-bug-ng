import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
    selector: 'create-comment-component',
    styleUrls: ['create_comment.component.css'],
    template:
    `
        <div class="wrapper">
            <div>
                <i class="fa fa-comment-o" aria-hidden="true"></i>
                Add Comment
            </div>

            <div class="comment-box">
                <form #commentForm>
                    <textarea #commentElef></textarea>
                </form>
            </div>

            <button class="comment-button" (click)="AddComment()">Comment</button>
        </div>

    `
})

export class CreateCommentComponent implements OnInit
{
    @Output() OnSave = new EventEmitter<string>();
    @ViewChild('commentElef') commentElef: ElementRef;
    @ViewChild('commentForm') commentForm: ElementRef;

    constructor() { }

    ngOnInit() { }

    AddComment()
    {
        var comment = this.commentElef.nativeElement.value;

        if (comment != "") {
            this.OnSave.emit(comment);
            this.commentForm.nativeElement.reset();
        }
    }
}
