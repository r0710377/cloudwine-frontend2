import { Component, Input, OnChanges, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexYAxis,
  ApexTitleSubtitle,
  ApexNoData,
  ApexStroke
} from "ng-apexcharts";
import { Subscription } from 'rxjs';
import { Value } from '../value';
import { ValueService } from '../value.service';

export type ChartOptions = {
  series: ApexAxisChartSeries | any;
  chart: ApexChart | any;
  xaxis: ApexXAxis | any;
  yaxis: ApexYAxis | ApexYAxis[] | any;
  title: ApexTitleSubtitle | any;
  subtitle: ApexTitleSubtitle | any;
  noData: ApexNoData | any;
  stroke: ApexStroke | any;
};


@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss']
})
export class GraphComponent implements OnInit, OnChanges, OnDestroy {
  @ViewChild("chart") chart: ChartComponent;
  public chart1Options: Partial<ChartOptions>;
  public chart2Options: Partial<ChartOptions>;
  public chart3Options: Partial<ChartOptions>;

  batteryValue: number = 0;
  temperatureValue: number = 0;
  relativeHumidityValue: number = 0;
  rainfallValue: number = 0;
  luxValue: number = 0;

  tempValues: Value[] = [];
  rhValues: Value[] = [];
  rfValues: Value[] = [];
  lxValues: Value[] = [];
  temperatureValues: number[] = [];
  temperatureTimestamps: string[] = [];
  relativeHumidityValues: number[] = [];
  rainfallValues: number[] = [];
  rainfallTimestamps: string[] = [];
  luxValues: number[] = [];
  luxTimestamps: string[] = [];

  @Input() weatherstationId: number = 0;
  sensorId: number = 0;

  batteryValue$: Subscription = new Subscription();
  tempValues$: Subscription = new Subscription();
  rhValues$: Subscription = new Subscription();
  rfValues$: Subscription = new Subscription();
  lxValues$: Subscription = new Subscription();

  constructor(private valueService: ValueService) {
  }

  ngOnInit(): void {
    this.onInitActions();
  }

  ngOnChanges() {
    this.onInitActions();
  }

  ngOnDestroy(): void {
    this.tempValues$.unsubscribe();
    this.rhValues$.unsubscribe();
    this.rfValues$.unsubscribe();
    this.lxValues$.unsubscribe();
  }

  onInitActions() {
    // Battery value
    this.batteryValue$ = this.valueService.getValueOfBattery(this.weatherstationId).subscribe(result => this.batteryValue = +result.value);

    // Temperature graph
    this.tempValues$ = this.valueService.getValuesBySensor(this.weatherstationId, 4).subscribe(result => {
      this.tempValues = result;
      this.fillArraysTemperature();

      // Relative Humidity
      this.rhValues$ = this.valueService.getValuesBySensor(this.weatherstationId, 3).subscribe(result => {
        this.rhValues = result;
        this.fillArraysRelativeHumidity();

        // Rainfall graph
        this.rfValues$ = this.valueService.getValuesBySensor(this.weatherstationId, 7).subscribe(result => {
          this.rfValues = result;
          this.fillArraysRainfall();

          // LUX graph
          this.lxValues$ = this.valueService.getValuesBySensor(this.weatherstationId, 11).subscribe(result => {
            this.lxValues = result;
            this.fillArraysLux();
          });
        });
      });
    });
  }

  fillArraysTemperature() {
    this.tempValues.forEach(value => {
      this.temperatureValues.push(+value.value);
      this.temperatureTimestamps.push(value.timestamp);
    });

    this.temperatureValue = this.temperatureValues[this.temperatureValues.length - 1];
  }

  fillArraysRelativeHumidity() {
    this.rhValues.forEach(value => {
      this.relativeHumidityValues.push(+value.value);
    });

    this.relativeHumidityValue = this.relativeHumidityValues[this.temperatureValues.length - 1];
  }

  fillArraysRainfall() {
    this.rfValues.forEach(value => {
      this.rainfallValues.push(+value.value);
      this.rainfallTimestamps.push(value.timestamp);
    });

    this.rainfallValue = this.rainfallValues[this.temperatureValues.length - 1];
  }

  fillArraysLux() {
    this.lxValues.forEach(value => {
      this.luxValues.push(+value.value);
      this.luxTimestamps.push(value.timestamp);
    });

    this.luxValue = this.luxValues[this.temperatureValues.length - 1];

    this.initCharts();
  }

  initCharts(): void {
    this.chart1Options = {
      series: [
        {
          name: "temperatuur",
          data: this.temperatureValues
        }
      ],
      chart: {
        height: 350,
        type: "line"
      },
      title: {
        text: "Temperaturen"
      },
      noData: {
        text: 'Laden...'
      },
      xaxis: {
        range: 96,
        categories: this.temperatureTimestamps
      },
    };

    this.chart2Options = {
      series: [
        {
          name: "Neerslag",
          data: this.rainfallValues
        },
        {
          name: "Relatieve vochtigheid",
          data: this.relativeHumidityValues
        }
      ],
      chart: {
        height: 350,
        type: "line"
      },
      title: {
        text: "Vocht"
      },
      noData: {
        text: 'Laden...'
      },
      subtitle: {
        text: "Neerslag & Rel.hum"
      },
      xaxis: {
        range: 96,
        categories: this.rainfallTimestamps
      },
      yaxis: [
        {
          title: {
            text: "Neerslag (mm/m²)"
          }
        },
        {
          opposite: true,
          title: {
            text: "Rel. Hum (%)"
          }
        }
      ]
    };

    this.chart3Options = {
      series: [
        {
          name: "chart3",
          data: this.luxValues
        }
      ],
      chart: {
        height: 350,
        type: "line"
      },
      stroke: {
        curve: "smooth"
      },
      title: {
        text: "Licht"
      },
      noData: {
        text: 'Laden...'
      },
      subtitle: {
        text: "Lux"
      },
      xaxis: {
        range: 96,
        categories: this.luxTimestamps
      }
    };
  }
}
