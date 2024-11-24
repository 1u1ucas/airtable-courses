export enum Status {
    CONTACTED = 'Contacted',
    NOT_CONTACTED = 'Not Contacted',
    CONTACT_IN_FUTURE = 'Contact in Future',
}

export type Client = {
    id: string;
    firstname: string;
    lastname: string;
    email: string;
    phoneNumber: string;
    notes: string;
    status: Status;
};

export type Clients = Client[];

export type ClientDto = {
    firstname: string;
    lastname: string;
    email: string;
    phoneNumber: string;
};  
