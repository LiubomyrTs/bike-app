import { createElement } from './tools/jsxFactory';
import { Bike } from './data/entities';
import { BikeCard } from './bikeCard';

export class BikeList {
    props: {
        bikes: Bike[];
        toggleServiceModal: () => void;
    }

    getContent() {
        return (this.props.bikes.map((bike) => {
            return <BikeCard toggleServiceModal={ this.props.toggleServiceModal } bike={ bike } />
        }));
    }
}