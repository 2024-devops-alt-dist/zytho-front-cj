export interface Users {
    id: number;
    firstname: string;
    email: string;
    password: string; // minimum 8 caractères
    role: 'admin' | 'user';
}