export interface TrainResponse {
  data: TrainData;
  extra: {
    hash: string;
  };
}

export interface TrainData {
  recommendations: Recommendation[];
  selected_seat_class: string;
  trains: Train[];
}

export interface Recommendation {
  // আপনি চাইলে এখানে structure বাড়াতে পারেন
  [key: string]: any;
}

export interface Train {
  trip_number: string;
  train_model: string;
  departure_date_time: string;
  departure_date_time_jd: string;
  departure_full_date: string;
  arrival_date_time: string;
  travel_time: string;
  origin_city_name: string;
  destination_city_name: string;
  is_open_for_all: boolean;
  is_international: number;
  is_from_city_international: boolean;
  is_eid_trip: number;
  seat_types: SeatType[];
  boarding_points: BoardingPoint[];
  parent_route: ParentRoute;
}

export interface SeatType {
  key: number;
  type: string;
  trip_id: number;
  trip_route_id: number;
  route_id: number;
  // অন্য ফিল্ড থাকলে সেগুলা যোগ করতে পারেন
  [key: string]: any;
}

export interface BoardingPoint {
  // এর ভিতরে যেগুলা থাকে, সেটা অনুসারে আপডেট করুন
  [key: string]: any;
}

export interface ParentRoute {
  origin_city_name: string;
  destination_city_name: string;
  departure_date: string;
  departure_time: string;
  arrival_date: string;
  arrival_time: string;
  // অন্যান্য route related details থাকলে যোগ করুন
}
