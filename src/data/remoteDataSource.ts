import Axios from "axios";

import { Bike } from './interfaces/bike';
import { ServiceCenter } from './interfaces/serviceCenter';
import { ServiceRecordExtended } from './interfaces/serviceRecord';

const protocol = "http";
const hostname = "localhost";
const port = 4600;

const urls = {
  bikes: `${protocol}://${hostname}:${port}/bikes`,
  serviceCenters: `${protocol}://${hostname}:${port}/serviceCenters`,
  serviceRecords: `${protocol}://${hostname}:${port}/serviceRecords`
};

export function loadBikes(): Promise<{ data: Bike[] }> {
  return Axios.get(urls.bikes);
}

export class DataSource {
  loadBikes(): Promise<{ data: Bike[] }> {
    return Axios.get(urls.bikes);
  }

  loadServiceCenters(): Promise<{ data: ServiceCenter[] }>{
    return Axios.get(urls.serviceCenters);
  }

  storeServiceRecord(serviceRecordData: ServiceRecordExtended): Promise<number> {
    return Axios.post(urls.serviceRecords, serviceRecordData).then(
      (response) => response.data.id
    );
  }

  getServiceRecord() {
    return Axios.get(urls.serviceRecords);
  }
}