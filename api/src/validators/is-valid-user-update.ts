import { UserUpdateModel } from '../models';


export function isValidUserUpdate(x: unknown): x is UserUpdateModel {
  if (typeof x !== 'object')
    return false;

  if (x === null)
    return false;

  return true;
}
