export class CacheEntry {
  fromCache: boolean;
  response: any; // Adjust the type based on the actual response data type

  constructor(fromCache: boolean, response: any) {
    this.fromCache = fromCache;
    this.response = response;
  }
}
