import { UserInsertModel } from '../models';


function isSameStructure(a: object, b: object): boolean {
  const aEntries = Object.entries(a).sort(([aName], [bName]) => aName.localeCompare(bName));
  const bEntries = Object.entries(b).sort(([aName], [bName]) => aName.localeCompare(bName));

  if (aEntries.length !== bEntries.length)
    return false;

  for (let i = 0; i < aEntries.length; ++i) {
    const aEntry = aEntries[i];
    const bEntry = bEntries[i];

    if (aEntry[0] !== bEntry[0])
      return false;

    if (typeof aEntry[1] !== typeof bEntry[1])
      return false;
  }

  return true;
}

export function isValidUserInsert(x: unknown): x is UserInsertModel {
  if (typeof x !== 'object')
    return false;

  if (x === null)
    return false;

  if (!isSameStructure(x, { name: '', username: '' }))
    return false;

  return true;
}
