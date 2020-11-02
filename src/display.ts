import { DataSource } from './data/remoteDataSource';
import { DISPLAY_MODE } from './data/enums/displayMode';

export abstract class Display {
  protected containerElement: HTMLElement;
  constructor() {
    this.containerElement = document.createElement("div");
  }

  props: {
    dataSource: DataSource,
    changeDisplayMode: (mode: DISPLAY_MODE) => void;
  }

  async getContent(): Promise<HTMLElement> {
    await this.updateContent();
    return this.containerElement;
  }

  async abstract updateContent(): Promise<void>;
}