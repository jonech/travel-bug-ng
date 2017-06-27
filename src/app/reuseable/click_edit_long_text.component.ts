import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
    selector: 'click-edit-long-text',
    host: {
		'(document:click)': 'handleMouseClick($event)'
	},
    styleUrls: ['click_edit_long_text.component.css'],
    template:
    `
        <div #container>
            <div [hidden]="editing" (click)="ToggleEdit()" [ngClass]="{'editable': permission}">
                {{ value }}
            </div>

            <div [hidden]="!editing">
                <form>
                    <textarea value="{{ value }}" #modValueElef></textarea>
                </form>
                <button class="save" (click)="SaveEdit()">save</button>
                <button class="cancel" (click)="CancelEdit()">cancel</button>
            </div>
        </div>
    `
})

export class ClickEditLongTextComponent implements OnInit
{
    @Input('permission') permission: boolean;
    @Input('value') value: string;
    @Input('id') id: string;
    @Input('classstyle') classstyle: string;

    @Output() OnSave = new EventEmitter<string>();

    @ViewChild('container') container: ElementRef;
    @ViewChild('modValueElef') modValueElement: ElementRef;

    editing: boolean;
    firstclick: boolean = true;

    constructor()
    {
        this.permission = true;
        this.value = "none";
        this.editing = false;
    }


    ngOnInit()
    {}

    ToggleEdit()
    {
        if (this.permission) {
            this.editing = !this.editing;
        }
    }

    handleMouseClick(event)
	{
		// prevent pop up closing too soon
        if (this.firstclick) {
			this.firstclick = false;
			return;
		}

		if (!this.container.nativeElement.contains(event.target) && this.editing) {
			//console.log(event.target);

            this.UpdateChanges();
            this.ToggleEdit();
		}
	}

    UpdateChanges()
    {
        if (this.value !== this.modValueElement.nativeElement.value) {
            this.value = this.modValueElement.nativeElement.value;
            this.OnSave.emit(this.value);
        }
    }

    SaveEdit()
    {
        this.UpdateChanges();
        this.CancelEdit();
    }

    CancelEdit()
    {
        this.editing = false;
    }
}
