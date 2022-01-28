import { Organisation } from "../organisations/organisation";

export interface Weatherstation {
  id: number;
  organisation_id: number | null,
  name: string;
  gsm: string;
  relais_name: string | null;
  latitude: string | null;
  longitude: string | null;
  is_active: boolean;
  is_public: boolean;
  is_location_alarm: boolean;
  is_no_data_alarm: boolean;
  number_of_cycles: number | null;
  is_manual_relais: boolean;
  organisation: Organisation | null;
}
