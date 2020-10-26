import Axios from "axios";
import { Bike, ServiceCenter } from './entities';

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

  storeOrder(serviceRecordData): Promise<number> {
    return Axios.post(urls.serviceRecords, serviceRecordData).then(
      (response) => response.data.id
    );
  }
}