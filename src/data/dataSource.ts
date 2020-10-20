import { Detail, DETAIL_TYPE, Bike, Craftsman, ServiceCenter } from './entities';

export const fork: Detail = {
  name: 'reeba',
  brand: 'rockshox',
  type: DETAIL_TYPE.FORK,
  services: []
};

export const frame: Detail = {
  name: 'anthem',
  brand: 'giant',
  type: DETAIL_TYPE.FRAME,
  services: []
}

export const shock: Detail = {
  name: 'monarch',
  brand: 'fox',
  type: DETAIL_TYPE.REERSHOCK,
  services: []
}

export const bike1: Bike = {
  id: 1,
  name: 'giant anthem',
  year: 2014,
  details: [fork, frame, shock]
};

export const craftsman: Craftsman = {
  id: 11,
  name: 'John',
  surname: 'Doe',
}

export const service: ServiceCenter = new ServiceCenter('rover', '14 str.', [DETAIL_TYPE.FRAME], [craftsman]);

service.repairDetail(bike1, frame, new Date('11-01-2002'), 20, service.getCraftsmanById(11));

export function log() {
  console.log(bike1);
}
