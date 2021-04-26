export interface Drone {
  id: number;
  name: string;
  brand: string;
  model: string;
  additional?: string;
}

export interface User {
  id: number;
  name: string;
  username: string;
}

export interface Coordinate {
  latitude: number;
  longitude: number;
}

export interface Picture {
  id: number;
}

export interface Analytic {
  id: number;
  name?: string;
  description?: string;
  location?: Coordinate;
  timestamp?: Date;
}
