import { createElement } from "./tools/jsxFactory";
import { Bike } from "./data/entities";
import { BikeList } from "./bikesList";
import { DataSource } from "./data/remoteDataSource";
import { ActiveModal } from "./activeModal";

export class HTMLDisplay {
  private containerElement: HTMLElement;
  showModal = false;

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
    let serviceCenters = (await  this.props.dataSource.loadServiceCenters()).data;
    this.containerElement.innerHTML = '';
    let content =
      <div>
        <ActiveModal
          show={ this.showModal }
          toggle={ this.toggleServiceModal.bind(this) }
          submitServiceRecord={ this.submitServiceRecord.bind(this) }
          details={ bikes[0].details }
          services={ serviceCenters }
        />
        <BikeList 
          toggleServiceModal={ this.toggleServiceModal.bind(this) }
          bikes={ bikes }
        />
      </div>
    this.containerElement.appendChild(content);
  }

  async submitServiceRecord(serviceRecordData) {
    console.log(serviceRecordData);
    console.log(this);
    this.props.dataSource.storeOrder(serviceRecordData).then((response) => {
      console.log(response);
    });
  }

  async toggleServiceModal() {
    this.showModal = !this.showModal;
    await this.updateContent();
  }
}
