import fs from 'fs';
import {dirname, resolve} from 'path';
import rimraf from 'rimraf';

export class DiskCache {
  rootPath: string;

  constructor(rootPath: string) {
    this.rootPath = rootPath;
  }

  async has(key: string) {
    await this.ensurePathExists(key);

    return new Promise((resolve) => {
      fs.promises
        .access(this.getFilename(key), fs.constants.F_OK)
        .then(() => resolve(true))
        .catch(() => resolve(false));
    });
  }

  async readThrough<T>(key: string, loadCallback: () => Promise<T>) {
    await this.ensurePathExists(key);

    if (await this.has(key)) {
      return this.get<T>(key);
    } else {
      const value = await loadCallback();
      this.set(key, value);
      return value;
    }
  }

  async get<T>(key: string) {
    await this.ensurePathExists(key);

    const filename = this.getFilename(key);
    const json = await fs.promises.readFile(filename, {encoding: 'utf8'});
    return JSON.parse(json) as T;
  }

  async set<T>(key: string, value: T) {
    await this.ensurePathExists(key);

    const filename = this.getFilename(key);
    const json = JSON.stringify(value);
    return fs.promises.writeFile(filename, json, {encoding: 'utf8'});
  }

  async clear() {
    return new Promise<void>((resolve, reject) => {
      rimraf(this.rootPath, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve(this.ensurePathExists());
        }
      });
    });
  }

  private async ensurePathExists(key?: string) {
    const dir = key ? dirname(this.getFilename(key)) : this.rootPath;
    await fs.promises.mkdir(dir, {recursive: true});
  }

  private getFilename(key: string) {
    return resolve(this.rootPath, `${key}.json`);
  }
}
