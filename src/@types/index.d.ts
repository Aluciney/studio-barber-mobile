declare module '*.png';

interface User {
  id: number;
  name: string;
  email: string;
  avatar_url: string;
  password_hash: string;
}

interface Service {
  id: number;
  name: string;
  image_url: string;
  value: number;
  active: boolean;
}

interface Reservation {
  id: number;
  id_user: number;
  date: string;
  note: string;
  reservation_service_times?: ReservationServiceTime[];
}

interface Time {
  id: number;
  time: string;
  name?: string;
}

interface ReservationServiceTime {
  id: number;
  id_reservation: number;
  id_service: number;
  id_time: number;
  reservation?: Reservation;
  service?: Service;
  time?: Time;
}