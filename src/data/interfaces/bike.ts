import { Detail } from './detail';

export interface Bike {
  id: number,
  name: string;
  year: number;
  details: Detail[];
}