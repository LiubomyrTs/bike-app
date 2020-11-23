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
import { ServiceCenter } from "./data/interfaces/serviceCenter";
import { DISPLAY_MODE } from "./data/enums/displayMode";
import { forkJoin } from "rxjs";

export class BikesDisplay extends Display implements ModalWithModes {
  showModal = false;
  modalMode = MODAL_MODE.SERVICE_FORM;
  bikeOnService: Bike;
  bikes: Bike[];
  serviceCenters: ServiceCenter[];

  updateContent() {
    forkJoin(
      this.props.dataSource.loadBikes(),
      this.props.dataSource.loadServiceCenters()
    ).subscribe(([b, sc]) => {
      this.bikes = b.response;
      this.serviceCenters = sc.response;

      this.containerElement.innerHTML = "";
      const modal = this.showModal ? (
        <ActiveModal
          mode={this.modalMode}
          show={this.showModal}
          toggle={this.toggleModal.bind(this)}
          header="Add Service"
          submitServiceRecord={this.submitServiceRecord.bind(this)}
          details={this.bikeOnService.details}
          services={this.serviceCenters}
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
              bikes={this.bikes}
            />
          </div>
        </div>
      );
      this.containerElement.appendChild(content);
    });
  }

  submitServiceRecord(data: ServiceRecord) {
    data.bike = this.bikeOnService.id;
    const bikeExtended = this.bikes.find(
      (bike) => Number(data.bike) === bike.id
    );
    const detailExtended = bikeExtended.details.find(
      (detail) => Number(data.detail) === detail.id
    );
    const serviceCenterExtended = this.serviceCenters.find(
      (serviceCenter) => Number(data.serviceCenter) === serviceCenter.id
    );

    const serviceRecordData: ServiceRecordExtended = {
      bike: bikeExtended,
      detail: detailExtended,
      serviceCenter: serviceCenterExtended,
    };

    this.props.dataSource
      .storeServiceRecord(serviceRecordData)
      .subscribe(this.switchMode.bind(this));
  }

  toggleModal(bike?: Bike) {
    if (!!bike) {
      this.modalMode = MODAL_MODE.SERVICE_FORM;
      this.bikeOnService = bike;
    }
    this.showModal = !this.showModal;
    this.updateContent();
  }

  switchMode() {
    switch (this.modalMode) {
      case MODAL_MODE.SERVICE_FORM:
        this.modalMode = MODAL_MODE.SUCCESS;
        break;
      case MODAL_MODE.SUCCESS:
        this.toggleModal();
        return;
    }

    this.updateContent();
  }
}
