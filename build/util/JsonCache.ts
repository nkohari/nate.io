import fs from 'node:fs/promises';
import { dirname, resolve } from 'node:path';

export class JsonCache {
  readonly rootPath: string;

  constructor(rootPath: string) {
    this.rootPath = rootPath;
  }

  async has(key: string) {
    await this.ensurePathExists(key);

    return new Promise((resolve) => {
      fs.access(this.getFilename(key), fs.constants.F_OK)
        .then(() => resolve(true))
        .catch(() => resolve(false));
    });
  }

  async readThrough<T>(key: string, loadCallback: () => Promise<T>) {
    await this.ensurePathExists(key);

    if (await this.has(key)) {
      return this.get<T>(key);
    }

    const value = await loadCallback();
    this.set(key, value);
    return value;
  }

  async get<T>(key: string) {
    await this.ensurePathExists(key);

    const filename = this.getFilename(key);
    const json = await fs.readFile(filename, { encoding: 'utf-8' });
    return JSON.parse(json) as T;
  }

  async set<T>(key: string, value: T) {
    await this.ensurePathExists(key);

    const filename = this.getFilename(key);
    const json = JSON.stringify(value);
    return fs.writeFile(filename, json, { encoding: 'utf-8' });
  }

  async clear() {
    await fs.rm(this.rootPath, { force: true, recursive: true });
    await this.ensurePathExists();
  }

  private async ensurePathExists(key?: string) {
    const dir = key ? dirname(this.getFilename(key)) : this.rootPath;
    await fs.mkdir(dir, { recursive: true });
  }

  private getFilename(key: string) {
    return resolve(this.rootPath, `${key}.json`);
  }
}
