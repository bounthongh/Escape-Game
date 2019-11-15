export interface User {
    First_name: string,
    Last_name: string,
    email: string,
    // password: string,
    idusers: number
}


export interface Buyer {
  Civilite: string,
  Nom: string,
  Prenom: string,
  Age: number,
  Email: string,
}

export interface Game {
  Nom: string,
  Jour: string,
  Horaire: string,
  VR: string,
}

export interface Reservation {
  [index: number]: { Spectator : Spectator };
  Tarif: string,
}

export interface Spectator {
  Civilite: string,
  Nom: string,
  Prenom: string,
  Age: number
}
