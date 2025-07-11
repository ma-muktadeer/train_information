export interface Station {
  id: number;
  name: string;
  value: string;
}
export interface TrainScearchPayload {
  from_city: string;
  to_city: string;
  date_of_journey: string;
  seat_class: string;
}
