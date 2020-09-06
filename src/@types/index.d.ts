declare module '*.png';

interface UserProps {
    name: string;
    email: string;
    avatar_url: string;
    password_hash: string;
}

interface ServiceProps {
    id: number;
    label: string;
    image_url: string;
}