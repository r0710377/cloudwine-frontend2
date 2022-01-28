import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { PopupService } from '../popup.service';
import * as L from "leaflet";
import { ValueService } from '../value.service';
import { Value } from '../value';
import { Subscription } from 'rxjs';
import { WeatherstationService } from 'src/app/super-admin/weatherstations/weatherstation.service';
import { Weatherstation } from 'src/app/super-admin/weatherstations/weatherstation';

const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';
const iconDefault = L.icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});
L.Marker.prototype.options.icon = iconDefault;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, OnChanges {
  private map: any;

  lat: number = 0;
  lon: number = 0;
  values: Value[] = [];
  values$: Subscription = new Subscription();

  @Input() weatherstationId: number = 0;
  weatherstation: Weatherstation = { id: 0, organisation_id: null, name: "", gsm: "", relais_name: "", latitude: "", longitude: "", is_active: false, is_public: false, is_location_alarm: false, is_no_data_alarm: false, number_of_cycles: 0, is_manual_relais: false, organisation: null };

  constructor(private popupService: PopupService, private valueService: ValueService, private weatherstationService: WeatherstationService) {
  }

  ngOnInit(): void {
    this.onInitActions();
  }

  ngOnChanges(): void {
    this.onInitActions();
  }

  onInitActions() {
    if (this.weatherstationId != null && this.weatherstationId > 0) {
      this.weatherstationService.getWeatherstationById(this.weatherstationId).subscribe(result => {
        this.weatherstation = result;

        this.values$ = this.valueService.getCoordinates(this.weatherstationId).subscribe(result => {
          this.values = result;
          this.fillCoordinates();
        });
      });
    }
  }

  private initMap(): void {
    this.map = L.map('map', {
      center: [ 50.85, 4.35 ],
      zoom: 7
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);

    this.makeMarkers(this.map);
  }

  fillCoordinates(){
    this.values.forEach(value => {
      if (value.graph_type.name == "GLA"){
        this.lat = +value.value;
      }
      if (value.graph_type.name == "GLO"){
        this.lon = +value.value;
      }
    });
    this.initMap();
  }

  makeMarkers(map: L.Map): void {
    const marker = L.marker([this.lat, this.lon]);

    let text: string = this.weatherstation.name + ' (' + this.lat + ', ' + this.lon + ')';

    marker.bindPopup(this.popupService.makePopup(text));

    marker.addTo(map);
   }

}
