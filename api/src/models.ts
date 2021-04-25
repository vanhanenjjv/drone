import { Drone, Picture, User } from './entities';


export interface UserDTO {
  name: string;
}


export interface DronePictureDTO {
  drone: {
    id: number;
  };
  user: {
    id: number;
  }
  picture: Picture;
}
