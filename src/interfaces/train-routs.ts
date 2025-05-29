// Interface for each route station
export interface IRouteStation {
  city: string;
  arrival_time: string | null;
  departure_time: string | null;
  halt: string | null;
  duration: string | null;
}

// Interface for the train data
export interface ITrainData {
  days: string[];
  routes: IRouteStation[];
  total_duration: string;
  train_name: string;
}

// Interface for the full response
export interface ITrainResponse {
  data: ITrainData;
  extra: {
    hash: string;
  };
}