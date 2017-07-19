import { Component, OnInit, Input, EventEmitter, Output, ElementRef, ViewChild, OnChanges, SimpleChanges } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'click-edit-text',
    styleUrls: ['click_edit_text.component.css'],
    host: {
		'(document:click)': 'handleMouseClick($event)'
	},
    template:
    `
        <div #container>
            <div [hidden]="editing" (click)="ToggleEdit()" [ngClass]="{'editable': permission}">
                {{ value }}
            </div>

            <div [hidden]="!editing" (keypress)="KeypressHandler($event)">
                <div [className]="classstyle">
                    <input type="text" value="{{ value }}" #modValueElef>
                </div>
            </div>
        </div>
    `
})

export class ClickEditTextComponent implements OnInit, OnChanges
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
        this.value = "Write a Title...";
        this.editing = false;
    }

    ngOnInit()
    {
        if (this.value == null || this.value == '') {
            this.value = "Write a Title...";
        }
    }

    public ngOnChanges(changes: SimpleChanges)
	{
		if (changes['value']) {
			if (this.value == null || this.value == '') {
				this.value = "Write a Title...";
			};
		}
	}

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

    KeypressHandler(event)
    {
        if (event.keyCode == 13) {
            this.UpdateChanges();
            this.ToggleEdit();
        }
        //console.log(event, event.keyCode, event.keyIdentifier);
    }

    UpdateChanges()
    {
        if (this.value !== this.modValueElement.nativeElement.value) {
            this.value = this.modValueElement.nativeElement.value;
            this.OnSave.emit(this.value);
        }
    }
}
