declare module '*.png';

interface UserProps {
    id: number;
    name: string;
    email: string;
    avatar_url: string;
    password_hash: string;
}

interface ServiceProps {
    id: number;
    name: string;
    image_url: string;
    value: number;
}

interface TimeProps {
    id: number;
    time: string;
}

interface ReservationProps {
    id: number;
    date: string;
    note: string;
    time: TimeProps;
    service: ServiceProps[];
    reservation_service_times: ReservationServiceTimeProps[];
}


interface ReservationServiceTimeProps {
    id: number;
    service: ServiceProps;
    time: TimeProps;
}