import { UserInsertModel } from '../models';
import { isSameStructure } from './common';


export function isValidUserInsert(x: unknown): x is UserInsertModel {
  if (typeof x !== 'object')
    return false;

  if (x === null)
    return false;

  if (!isSameStructure(x, { name: '', username: '' }))
    return false;

  return true;
}
