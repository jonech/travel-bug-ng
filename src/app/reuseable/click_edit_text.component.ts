import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'click-edit-text',
    styleUrls: ['click_edit.component.css'],
    template:
    `
        <div [hidden]="editing" (click)="ToggleEdit()" [ngClass]="{'editable': permission}">
            {{ value }}
        </div>

        <div [hidden]="!editing" (keypress)="KeypressHandler($event)">
            <div [className]="classstyle" (click)="InputClickHandler($event)">
                <input type="text" value="{{ value }}">
            </div>
        </div>
    `
})

export class ClickEditTextComponent implements OnInit
{
    @Input('permission') permission: boolean;
    @Input('value') value: string;
    @Input('id') id: string;
    @Input('classstyle') classstyle: string;

    @Output() OnSave = new EventEmitter<string>();

    editing: boolean;

    constructor()
    {
        this.permission = true;
        this.value = "none";
        this.editing = false;
    }

    ngOnInit()
    {
        if (this.permission) {
        }
    }

    ToggleEdit()
    {
        if (this.permission) {
            this.editing = !this.editing;
        }
    }

    KeypressHandler(event)
    {
        if (event.keyCode == 13) {
            this.ToggleEdit();
        }
        console.log(event, event.keyCode, event.keyIdentifier);
    }

    InputClickHandler(event)
    {
        console.log(event)
    }
}
