import { ServiceCenter } from './serviceCenter';
import { Detail } from './detail';
import { Bike } from './bike';
import { MakeAllPropertiesNumbers } from '../../tools/makeAllPropertiesNumbers';

export interface ServiceRecordExtended {
  bike: Bike;
  detail: Detail;
  serviceCenter: ServiceCenter;
}

export type ServiceRecord = MakeAllPropertiesNumbers<ServiceRecordExtended>;
