import { DETAIL_TYPE } from '../enums/detailType';

export interface Detail {
  id: number;
  name: string;
  brand: string;
  type: DETAIL_TYPE;
}