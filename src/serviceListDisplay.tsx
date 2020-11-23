import { createElement } from "./tools/jsxFactory";
import { Display } from "./display";
import { DISPLAY_MODE } from "./data/enums/displayMode";
import { ServiceRecordExtended } from "./data/interfaces/serviceRecord";

export class ServiceListDisplay extends Display {
  serviceRecords: ServiceRecordExtended[];

  updateContent() {
    this.props.dataSource.getServiceRecord().subscribe((req) => {
      this.serviceRecords = req.response;
      this.containerElement.innerHTML = "";
      let content = (
        <div className="container my-2">
          <button
            onclick={() => this.props.changeDisplayMode(DISPLAY_MODE.BIKES)}
            className="my-3 btn-info btn"
          >
            View Bikes
          </button>
          <table className="table table-bordered">
            <tr>
              <th>Bike Name</th>
              <th>Detail Fixed</th>
              <th>Service Center</th>
            </tr>
            <tbody>
              {this.serviceRecords.map((sr) => {
                return (
                  <tr>
                    <td>{sr.bike.name}</td>
                    <td>{`${sr.detail.brand} ${sr.detail.name}`}</td>
                    <td>{sr.serviceCenter.name}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      );
      this.containerElement.appendChild(content);
    });
  }
}
