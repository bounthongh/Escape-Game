export class Reservate {
    Acheteur: {
        Civilite?: String,
        Nom?: String,
        Prenom?: String,
        Age?: String,
        Email?: String
    };
    Game: {
        Nom?: String,
        Jour?: String,
        Horaire?: String,
        VR?: String
    };
    Reservation: Array<Spectateur>; 
}

export class Spectateur {
    Civilite: String
    Nom: String
    Prenom: String
    Age: Number
    Tarif: String
}