import { createElement } from "./tools/jsxFactory";
import { BikeCard } from "./bikeCard";
import { Bike } from './data/interfaces/bike';

export class BikeList {
  props: {
    bikes: Bike[];
    toggleServiceModal: () => void;
  };

  getContent() {
    return (
      <div className="row">
        {this.props.bikes.map((bike) => {
          return (
            <div className="col-sm-4">
              <BikeCard
                toggleServiceModal={this.props.toggleServiceModal}
                bike={bike}
              />
            </div>
          );
        })}
      </div>
    );
  }
}
