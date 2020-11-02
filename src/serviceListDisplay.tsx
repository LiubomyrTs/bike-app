import { createElement } from './tools/jsxFactory';
import { DataSource } from './data/remoteDataSource';
import { Display } from './display';
import { DISPLAY_MODE } from './data/enums/displayMode';

export class ServiceListDisplay extends Display { 
  async updateContent() {
    let serviceRecords = (await this.props.dataSource.getServiceRecord()).data;
    this.containerElement.innerHTML = "";
    let content = (
        <div className="container my-2">
          <button onclick={ () => this.props.changeDisplayMode(DISPLAY_MODE.BIKES) } className="my-3 btn-info btn">View Bikes</button>
          <table className="table table-bordered">
            <tr>
              <th>Bike Name</th>
              <th>Detail Fixed</th>
              <th>Service Center</th>
            </tr>
            <tbody>
              {serviceRecords.map((sr) => {
                return (
                  <tr>
                    <td>{sr.bike.name}</td>
                    <td>{`${sr.detail.brand} ${sr.detail.name}`}</td>
                    <td>{sr.serviceCenter.name}</td>
                  </tr>)
              })}
            </tbody>

          </table>
        </div>
    );
    this.containerElement.appendChild(content);
  }
}
