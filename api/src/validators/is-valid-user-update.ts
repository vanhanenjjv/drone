import { UserUpdateModel } from '../models';


export function hasValidPropertyNames(obj: object, names: string[]): boolean {
  return Object.getOwnPropertyNames(obj).every(n => names.includes(n));
}


export function isValidUserUpdate(x: unknown): x is UserUpdateModel {
  if (typeof x !== 'object')
    return false;

  if (x === null)
    return false;

  if (!hasValidPropertyNames(x, ['name', 'username']))
    return false;

  return true;
}
