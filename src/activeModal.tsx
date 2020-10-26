import { createElement } from "./tools/jsxFactory";
import { ServiceForm } from './serviceForm';
import { Detail, ServiceCenter } from './data/entities';
import { formValues } from './decorators';

export class ActiveModal {
  props: {
    show: boolean;
    toggle: () => void;
    submitServiceRecord: (serviceData: any) => void;

    details: Detail[],
    services: ServiceCenter[]
  };

  @formValues(['detail', 'service'])
  submitForm() {
    return this.props.submitServiceRecord;
  }

  getContent() {
    return this.props.show ? (
      <div className="app-modal">
        <div className="app-backdrop"></div>
        <div className="app-modal-content">
          <div className="app-modal-header">
              <h3>Add service</h3>
          </div>
          <div className="app-modal-body">
            <ServiceForm
              details={ this.props.details }
              services={ this.props.services }
              submitServiceRecord={ this.props.submitServiceRecord }
              submitForm={ this.submitForm.bind(this) }
            />
          </div>
          <div className="app-modal-button-group">
            <button type="button" onclick={ this.submitForm.bind(this) } className="btn btn-primary btn-small mr-2">Save</button>
            <button type="button" className="btn btn-danger btn-small" onclick={this.props.toggle}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    ) : (
      ""
    );
  }
}
