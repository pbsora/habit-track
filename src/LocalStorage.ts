import { Week } from "./models/models";

class LocalStorageWrapper {
  private storage: Storage;

  constructor() {
    this.storage = window.localStorage;
  }

  public add(key: string, value: Week[]): void {
    this.storage.setItem(key, JSON.stringify(value));
  }

  public update(key: string, value: Week[]): void {
    if (this.storage.getItem(key)) {
      this.storage.setItem(key, JSON.stringify(value));
    }
  }

  public remove(key: string): void {
    this.storage.removeItem(key);
  }

  get(key: string): Week[] | null {
    const value = this.storage.getItem(key);
    if (value) return JSON.parse(value);
    else return null;
  }
}

const LocalStorage = new LocalStorageWrapper();

export default LocalStorage;
