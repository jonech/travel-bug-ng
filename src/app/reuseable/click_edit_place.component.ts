import { Component, OnInit, Input, EventEmitter, Output, ElementRef, ViewChild, NgZone, SimpleChanges, OnChanges } from '@angular/core';
import { MapsAPILoader } from '@agm/core';
import { GoogleLocation } from '../_model/googleLocation.model';


@Component({
    selector: 'click-edit-place',
    styleUrls: ['click_edit_place.component.css'],
    host: {
		'(document:click)': 'handleMouseClick($event)'
	},
    template:
    `
        <div #container>
            <div [hidden]="editing" (click)="ToggleEdit()" [ngClass]="{'editable': permission}">
                <i class="fa fa-map-marker" aria-hidden="true"></i>{{ value }}
            </div>

            <div [hidden]="!editing" (keypress)="KeypressHandler($event)">
                <div [className]="classstyle">
                    <!-- <input type="text" value="{{ value }}" #modValueElef> -->
                    <input value="{{ value }}" autocorrect="off" autocapitalize="off" spellcheck="off"
                        type="text" class="form-control" #location />

                    <button class="save" (click)="SaveEdit()">save</button>
                    <button class="cancel" (click)="CancelEdit()">cancel</button>
                </div>
            </div>
        </div>
    `
})

export class ClickEditPlaceComponent implements OnInit, OnChanges
{
    @Input('permission') permission: boolean;
    @Input('value') value: string;
    @Input('id') id: string;
    @Input('classstyle') classstyle: string;

    @Output() OnSave = new EventEmitter<GoogleLocation>();

    @ViewChild('container') container: ElementRef;
    @ViewChild('location') locationElement: ElementRef;

    editing: boolean = false;
    firstclick: boolean = true;

    newLocation: GoogleLocation;

    constructor(
        private googleApiLoader: MapsAPILoader,
		private ngZone: NgZone
    )
    {
        this.value = "Find a location";
    }

    ngOnChanges(changes: SimpleChanges)
    {
        if (changes['value']) {
			if (this.value == null || this.value == '') {
				this.value = "Find a location";
			};
		}
    }

    ngOnInit()
    {
        if (this.value == null || this.value == '') {
            this.value = "Find a location";
        }

        this.googleApiLoader.load().then(() => {
			let autocomplete = new google.maps.places.Autocomplete(this.locationElement.nativeElement, {
				types: ["establishment"]
			});

			autocomplete.addListener("place_changed", () => {
				this.ngZone.run(() => {
					let place: google.maps.places.PlaceResult = autocomplete.getPlace();

					if (place.geometry === undefined || place.geometry === null) {
						return;
					}
					// console.log(place.name);
					// console.log(place.geometry.location.lat());
					// console.log(place.geometry.location.lng());
					// console.log(place.formatted_address);
					// console.log(place.place_id);


					this.newLocation = {
                        address: place.formatted_address,
                        lat: place.geometry.location.lat(),
                        lng: place.geometry.location.lng(),
                        id: place.place_id,
                        name: place.name
                    }

				});
			});
		});
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

            //this.UpdateChanges(this.newLocation);
            //this.ToggleEdit();
		}
	}

    KeypressHandler(event)
    {
        if (event.keyCode == 13) {
            //this.UpdateChanges();
            //this.ToggleEdit();
        }
        //console.log(event, event.keyCode, event.keyIdentifier);
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

    UpdateChanges()
    {
        if (this.value !== this.locationElement.nativeElement.value) {
            this.value = this.locationElement.nativeElement.value;
            this.OnSave.emit(this.newLocation);
        }
    }
}
