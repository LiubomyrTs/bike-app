import { createElement } from "./tools/jsxFactory";
import { Bike } from "./data/entities";

export class HTMLDisplay {
  props: {
    bikes: Bike[];
  };

  quantity = 1;

  public clearBikes = () => {
    console.log('clearBikes');
    this.quantity++;
    this.props.bikes = [];
    console.log(this.quantity);
  }

  public getContent() {
    return (
      <div>
        <h1>{this.quantity}</h1>
        {this.props.bikes.map((bike) => {
          return (
            <div className="card" style="width: 18rem;">
              <div className="card-body">
                <h5 className="card-title">
                  {bike.name} ({bike.year})
                </h5>
              </div>
              <ul className="list-group list-group-flush">
                {bike.details.map((detail) => {
                  return (
                    <li className="list-group-item">
                      {detail.type.toLowerCase()} - {detail.brand} {detail.name}
                    </li>
                  );
                })}
              </ul>
              <div className="card-body">
                <a onclick={ this.clearBikes } className="card-link">
                  Card link
                </a>
                <a className="card-link">
                  Another link
                </a>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}
