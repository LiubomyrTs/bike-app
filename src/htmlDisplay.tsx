import { createElement } from "./tools/jsxFactory";
import { Bike } from "./data/entities";
import { BikeList } from "./bikesList";
import { DataSource } from "./data/remoteDataSource";
import { ActiveModal } from "./activeModal";

export class HTMLDisplay {
  private containerElement: HTMLElement;

  constructor() {
    this.containerElement = document.createElement('div');
  }

  props: {
    dataSource: DataSource;
  };

  async getContent(): Promise<HTMLElement> {
    await this.updateContent();
    return this.containerElement;
  }

  async updateContent() {
    let bikes = (await this.props.dataSource.loadBikes()).data;
    this.containerElement.innerHTML = '';
    let content =
      <div>
        <ActiveModal />
        <BikeList 
          toggleServiceModal={ this.toggleServiceModal.bind(this) }
          bikes={ bikes }
        />
      </div>
    this.containerElement.appendChild(content);
  }

  async toggleServiceModal() {
    console.log('toggleServiceModal');
  }
}
