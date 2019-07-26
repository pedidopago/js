export interface Row {
    id: number;
    domain_id: number;
    name: string;
    username: string;
    auth_role: AuthRole;
    directive: Directive;
    email: string;
    phone: string;
    firstname: string;
    lastname: string;
    enabled: boolean;
    created_at: string;
}

export interface AuthRole {
    id: number;
    name: string;
}

export interface Directive {
    id: number;
    name: string;
}
