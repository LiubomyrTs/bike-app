import Axios from "axios";
import { Bike } from './entities';

const protocol = "http";
const hostname = "localhost";
const port = 4600;

const urls = {
  bikes: `${protocol}://${hostname}:${port}/bikes`,
};

export function loadBikes(): Promise<{ data: Bike[] }> {
  return Axios.get(urls.bikes);
}

export class DataSource {
  loadBikes(): Promise<{ data: Bike[] }> {
    return Axios.get(urls.bikes);
  }
}