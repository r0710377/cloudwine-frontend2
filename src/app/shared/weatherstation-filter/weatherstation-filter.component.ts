import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { Weatherstation } from 'src/app/super-admin/weatherstations/weatherstation';
import { WeatherstationService } from 'src/app/super-admin/weatherstations/weatherstation.service';

@Component({
  selector: 'app-weatherstation-filter',
  templateUrl: './weatherstation-filter.component.html',
  styleUrls: ['./weatherstation-filter.component.scss']
})
export class WeatherstationFilterComponent implements OnInit {

  @Input() selectedWeatherstationId: number;
  @Input() weatherstations: Weatherstation[] = [];

  @Output() onSelectedWeatherstationIdChange = new EventEmitter<Number>();

  constructor() { }

  ngOnInit(): void {
  }

  onChange(newSelectedWeatherstationId: any) {
    this.onSelectedWeatherstationIdChange.emit(newSelectedWeatherstationId);
  }
}
