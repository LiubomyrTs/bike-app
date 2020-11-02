import { createElement } from "./tools/jsxFactory";
import { ServiceForm } from "./serviceForm";
import { formValues } from "./decorators";
import { MODAL_MODE } from "./data/enums/modalMode";
import { Detail } from "./data/interfaces/detail";
import { ServiceCenter } from "./data/interfaces/serviceCenter";

export class ActiveModal {
  props: {
    show: boolean;
    mode: MODAL_MODE;
    details: Detail[];
    services: ServiceCenter[];
    toggle: () => void;
    submitServiceRecord: (serviceData: any) => void;
  };

  submitForm() {
    if (this.props.mode === MODAL_MODE.SERVICE_FORM) {
      this.saveServiceRecord();
    }
  }

  @formValues(["detail", "serviceCenter"])
  saveServiceRecord() {
    return this.props.submitServiceRecord;
  }

  getContent() {
    let modalForm;
    let btns;

    switch (this.props.mode) {
      case MODAL_MODE.SERVICE_FORM:
        modalForm = (
          <ServiceForm
            details={this.props.details}
            services={this.props.services}
          />
        );
        btns = (
          <div>
            <button
              type="button"
              onclick={this.submitForm.bind(this)}
              className="btn btn-primary btn-small mr-2"
            >
              Save
            </button>
            <button
              type="button"
              className="btn btn-danger btn-small"
              onclick={this.props.toggle}
            >
              Cancel
            </button>
          </div>
        );
        break;
      case MODAL_MODE.SUCCESS:
        modalForm = <div>Service was succesfully saved</div>;
        btns = (
          <button
            type="button"
            className="btn btn-danger btn-small"
            onclick={this.props.toggle}
          >
            Close
          </button>
        );
        break;
    }

    return this.props.show ? (
      <div className="app-modal">
        <div className="app-backdrop" onclick={this.props.toggle}></div>
        <div className="app-modal-content">
          <div className="app-modal-header">
            <h3>Add service</h3>
          </div>
          <div className="app-modal-body">{modalForm}</div>
          <div className="app-modal-button-group">{btns}</div>
        </div>
      </div>
    ) : (
      ""
    );
  }
}
