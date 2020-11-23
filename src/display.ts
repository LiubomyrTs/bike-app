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

  getContent(): HTMLElement {
    this.updateContent();
    return this.containerElement;
  }

  abstract updateContent(): void;
}