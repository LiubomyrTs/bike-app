import { createElement } from './tools/jsxFactory';
import { Detail, ServiceCenter } from './data/entities';

export class ServiceForm {
  props: {
    details: Detail[];
    services: ServiceCenter[];
    submitServiceRecord: (serviceData: any) => void;
    submitForm: () => void;
  }

  logData = () => {
    const detail = (document.getElementById("detail") as HTMLSelectElement).value;
    const service = (document.getElementById("service") as HTMLSelectElement).value;
    const serviceData = {
      detail,
      service
    };
    this.props.submitServiceRecord(serviceData);
  }

  getContent() {
    return <form id="form">
      <div className="form-group">
        <label htmlFor="detail">
          Choose detail
        </label>
        <select name="detail" id="detail" className="form-control">
          { 
            this.props.details.map((detail) => {
              return (
                <option value={ detail.id }>
                  { detail.name }
                </option>
              )
            })
          }
        </select>
      </div>
      <div className="form-group">
        <label  htmlFor="service">
          Choose service
        </label>
        <select name="service" id="service"  className="form-control">
          { 
            this.props.services.map((service) => {
              return (
                <option value={ service.id }>
                  { service.name }
                </option>
              )
            })
          }
        </select>
      </div>
    </form>
  }
}