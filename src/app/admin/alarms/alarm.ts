import { GraphType } from "src/app/dashboard/graph-type";
import { Weatherstation } from "src/app/super-admin/weatherstations/weatherstation";

export interface Alarm {
  id: number;
  weather_station_id: number;
  graph_type_id: number;
  switch_value: number;
  operator: string;
  is_relais: boolean;
  is_notification: boolean;
  graph_type: GraphType;
  weather_station: Weatherstation;
}
