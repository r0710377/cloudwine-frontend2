import { GraphType } from "./graph-type";

export interface Value {
    id: number;
    weather_station_id: number;
    graph_type_id: number;
    value: string;
    timestamp: string;
    graph_type: GraphType;
}
