export interface Drone {
  id: number;
  name: string;
  brand: string;
  model: string;
  additional?: string;
}

export interface User {
  name: string;
  username: string;
  password: string;
  token: string;
}

export interface Coordinate {
  latitude: number;
  longitude: number;
}

export interface Picture {
  id: number;
  name: string;
  description: string;
  location: Coordinate;
  timestamp: Date;
}