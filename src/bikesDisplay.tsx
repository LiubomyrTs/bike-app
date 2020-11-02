import { createElement } from "./tools/jsxFactory";
import { BikeList } from "./bikesList";
import { ActiveModal } from "./activeModal";
import { ModalWithModes } from "./data/interfaces/modalWithModes";
import { MODAL_MODE } from "./data/enums/modalMode";
import { Bike } from "./data/interfaces/bike";
import { Display } from "./display";
import {
  ServiceRecord,
  ServiceRecordExtended,
} from "./data/interfaces/serviceRecord";
import { Detail } from "./data/interfaces/detail";
import { ServiceCenter } from "./data/interfaces/serviceCenter";
import { DISPLAY_MODE } from "./data/enums/displayMode";

export class BikesDisplay extends Display implements ModalWithModes {
  showModal = false;
  modalMode = MODAL_MODE.SERVICE_FORM;
  bikeOnService: Bike;

  async updateContent() {
    let bikes = (await this.props.dataSource.loadBikes()).data;
    let serviceCenters = (await this.props.dataSource.loadServiceCenters())
      .data;
    this.containerElement.innerHTML = "";
    const modal = this.showModal ? (
      <ActiveModal
        mode={this.modalMode}
        show={this.showModal}
        toggle={this.toggleModal.bind(this)}
        submitServiceRecord={this.submitServiceRecord.bind(this)}
        details={this.bikeOnService.details}
        services={serviceCenters}
      />
    ) : (
      ""
    );
    let content = (
      <div>
        {modal}
        <div className="container my-2">
          <button
            onclick={() =>
              this.props.changeDisplayMode(DISPLAY_MODE.SERVICE_LIST)
            }
            className="my-3 btn-info btn"
          >
            View Previous Services
          </button>
          <BikeList
            toggleServiceModal={this.toggleModal.bind(this)}
            bikes={bikes}
          />
        </div>
      </div>
    );
    this.containerElement.appendChild(content);
  }

  async submitServiceRecord(data: ServiceRecord) {
    data.bike = this.bikeOnService.id;
    const bikeExtended: Bike = (
      await this.props.dataSource.loadBikes()
    ).data.find((bike) => data.bike === bike.id);

    const detailExtended: Detail = bikeExtended.details.find(
      (detail) => Number(data.detail) === detail.id
    );
    const serviceCenterExtended: ServiceCenter = (
      await this.props.dataSource.loadServiceCenters()
    ).data.find(
      (serviceCenter) => Number(data.serviceCenter) === serviceCenter.id
    );

    const serviceRecordData: ServiceRecordExtended = {
      bike: bikeExtended,
      detail: detailExtended,
      serviceCenter: serviceCenterExtended,
    };

    this.props.dataSource
      .storeServiceRecord(serviceRecordData)
      .then(async () => {
        await this.switchMode();
      });
  }

  async toggleModal(bike?: Bike) {
    if (!!bike) {
      this.modalMode = MODAL_MODE.SERVICE_FORM;
      this.bikeOnService = bike;
    }
    this.showModal = !this.showModal;
    await this.updateContent();
  }

  async switchMode() {
    switch (this.modalMode) {
      case MODAL_MODE.SERVICE_FORM:
        this.modalMode = MODAL_MODE.SUCCESS;
        break;
      case MODAL_MODE.SUCCESS:
        await this.toggleModal();
        return;
    }

    await this.updateContent();
  }
}
