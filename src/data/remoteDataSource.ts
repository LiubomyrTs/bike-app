import { ServiceRecordExtended } from './interfaces/serviceRecord';
import { Observable } from 'rxjs';
import { ajax, AjaxResponse } from 'rxjs/ajax';

const protocol = "http";
const hostname = "localhost";
const port = 4600;

const urls = {
  bikes: `${protocol}://${hostname}:${port}/bikes`,
  serviceCenters: `${protocol}://${hostname}:${port}/serviceCenters`,
  serviceRecords: `${protocol}://${hostname}:${port}/serviceRecords`
};

export class DataSource {
  loadBikes(): Observable<AjaxResponse> {
    return ajax(urls.bikes);
  }

  loadServiceCenters(): Observable<AjaxResponse> {
    return ajax(urls.serviceCenters);
  }

  storeServiceRecord(serviceRecordData: ServiceRecordExtended): Observable<AjaxResponse> {
    return ajax({
      url: urls.serviceRecords,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: serviceRecordData
    });
  }

  getServiceRecord(): Observable<AjaxResponse> {
    return ajax(urls.serviceRecords);
  }
}