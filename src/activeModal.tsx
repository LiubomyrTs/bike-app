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
    header: string;
    toggle: () => void;

    letter?: string;
    count?: number;

    details?: Detail[];
    services?: ServiceCenter[];
    submitServiceRecord?: (serviceData: any) => void;
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
    let modalBody;
    let modalBtns;

    switch (this.props.mode) {
      case MODAL_MODE.SERVICE_FORM:
        modalBody = (
          <ServiceForm
            details={this.props.details}
            services={this.props.services}
          />
        );
        modalBtns = (
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
        modalBody = <div>Service was succesfully saved</div>;
        modalBtns = (
          <button
            type="button"
            className="btn btn-danger btn-small"
            onclick={this.props.toggle}
          >
            Close
          </button>
        );
        break;
      case MODAL_MODE.CHECK:
        modalBody = (
          <div>
            {Array(this.props.count).fill(0).map(() => <span className="badge badge-success mr-2 p-2 d-inline-block"></span>)}
            <h2 id="dynamic-letter">{this.props.letter}</h2>
          </div>
        );
        modalBtns = "";
    }

    return this.props.show ? (
      <div className="app-modal">
        <div className="app-backdrop" onclick={this.props.toggle}></div>
        <div className="app-modal-content">
          <div className="app-modal-header">
            <h3>{this.props.header}</h3>
          </div>
          <div className="app-modal-body">{modalBody}</div>
          <div className="app-modal-button-group">{modalBtns}</div>
        </div>
      </div>
    ) : (
      ""
    );
  }
}
