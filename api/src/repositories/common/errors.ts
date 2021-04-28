export class MoreThanOneError extends Error {
  constructor() {
    super('More than one element matched the predicate.');
  }
}
