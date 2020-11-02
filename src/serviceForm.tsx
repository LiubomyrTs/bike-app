import { createElement } from './tools/jsxFactory';
import { ServiceCenter } from './data/interfaces/serviceCenter';
import { Detail } from './data/interfaces/detail';

export class ServiceForm {
  props: {
    details: Detail[];
    services: ServiceCenter[];
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
        <label  htmlFor="serviceCenter">
          Choose service
        </label>
        <select name="service" id="serviceCenter"  className="form-control">
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