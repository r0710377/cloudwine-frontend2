import { Weatherstation } from "../weatherstations/weatherstation";
import { OtaUpdate } from "./ota-update";

export interface WeatherstationUpdate {
  id: number;
  ota_update_id: number;
  weather_station_id: number;
  ota_update: OtaUpdate | null;
  weather_station: Weatherstation | null;
}
