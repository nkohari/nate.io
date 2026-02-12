import fs from 'node:fs/promises';
import { dirname, resolve } from 'node:path';

export class ImageCache {
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

  async readThrough(key: string, loadCallback: () => Promise<Buffer>) {
    await this.ensurePathExists(key);

    if (await this.has(key)) {
      return this.get(key);
    }

    const value = await loadCallback();
    this.set(key, value);
    return value;
  }

  async get(key: string) {
    await this.ensurePathExists(key);

    const filename = this.getFilename(key);
    return fs.readFile(filename);
  }

  async set(key: string, value: Buffer) {
    await this.ensurePathExists(key);

    const filename = this.getFilename(key);
    return fs.writeFile(filename, value);
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
    return resolve(this.rootPath, key);
  }
}
