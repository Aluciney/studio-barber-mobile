declare module '*.png';

interface UserProps {
    name: string;
    email: string;
    avatar_url: string;
    password_hash: string;
}

interface ServiceProps {
    id: number;
    name: string;
    image_url: string;
    number_of_time: number;
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
}