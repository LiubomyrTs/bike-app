import { createElement } from "./tools/jsxFactory";
import { Bike } from "./data/interfaces/bike";

export class BikeCard {
  props: {
    bike: Bike;
    toggleServiceModal: (bike: Bike) => void;
  };

  public getContent() {
    return (
      <div>
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">
              {this.props.bike.name} {this.props.bike.year}
            </h5>
          </div>
          <ul className="list-group list-group-flush">
            {this.props.bike.details.map((detail) => {
              return (
                <li className="list-group-item">
                  {detail.type.toLowerCase()} - {detail.brand} {detail.name}
                </li>
              );
            })}
          </ul>
          <div className="card-body">
            <button
              onclick={() => this.props.toggleServiceModal(this.props.bike)}
              className="btn card-link btn-primary"
            >
              Add Service
            </button>
          </div>
        </div>
      </div>
    );
  }
}
