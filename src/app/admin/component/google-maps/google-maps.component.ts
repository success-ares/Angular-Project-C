import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-google-maps',
  templateUrl: './google-maps.component.html',
  styleUrls: ['./google-maps.component.css']
})
export class GoogleMapsComponent implements OnInit {
  @Input() location;
  // google maps zoom level
  zoom = 16;
  // initial center position for the map
  latitude: number;
  longitude: number;
  // location marker
  marker: Marker;

  constructor() { }

  ngOnInit() {
    this.marker = {
      latitude: (this.location.get('latitude').value),
      longitude: (this.location.get('longitude').value),
      label: 'A',
      draggable: true
    };
    console.log('inner' ,this.marker);
    this.latitude = (this.location.get('latitude').value);
    this.longitude = (this.location.get('longitude').value);
    console.log(this.latitude , this.longitude);
  }

  markerDragEnd($event: any) {
    this.location.get('latitude').setValue($event.coords.lat);
    this.location.get('longitude').setValue($event.coords.lng);
  }
}

interface Marker {
  latitude: number;
  longitude: number;
  label?: string;
  draggable: boolean;
}

