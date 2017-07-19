import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, OnChanges, SimpleChanges } from '@angular/core';


@Component({
    selector: 'click-edit-time',
    host: {
		'(document:click)': 'handleMouseClick($event)'
	},
    styleUrls: ['click_edit_time.component.css'],
    template:
    `
        <div #container>
            <div [hidden]="editing" (click)="ToggleEdit()" [ngClass]="{'editable': permission}">
                {{ value }}
            </div>

            <div [hidden]="!editing">
                <input value="{{value}}" class="time" type="time" #time>
                <br/>
                <button class="save" (click)="SaveEdit()">save</button>
                <button class="cancel" (click)="CancelEdit()">cancel</button>
            </div>
        </div>
    `
})

export class ClickEditTimeComponent implements OnInit, OnChanges
{
    @Input('permission') permission: boolean;
    @Input('value') value: string;
    @Input('id') id: string;
    @Input('classstyle') classstyle: string;

    @Output() OnSave = new EventEmitter<string>();

    @ViewChild('container') container: ElementRef;
    @ViewChild('modValueElef') modValueElement: ElementRef;
    @ViewChild('time') time: ElementRef;

    editing: boolean;
    firstclick: boolean = true;

    constructor()
    {
        this.permission = true;
        this.value = "Insert a time";
        this.editing = false;
    }


    ngOnInit()
    {
        if (this.value == null || this.value == '') {
            this.value = "Insert a time";
        }
    }

    ngOnChanges(changes: SimpleChanges)
    {
        if (changes['value']) {
			if (this.value == null || this.value == '') {
				this.value = "Insert a time";
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

    UpdateChanges()
    {
        if (this.value !== this.time.nativeElement.value) {
            this.value = this.time.nativeElement.value;
            //console.log(GetTimeSort(this.value));
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
