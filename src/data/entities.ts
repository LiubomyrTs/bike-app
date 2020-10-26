export interface Bike {
  id: number,
  name: string;
  year: number;
  details: Detail[];
}

export interface Detail {
  id: number;
  name: string;
  brand: string;
  type: DETAIL_TYPE;
  services: ServiceRecord[];
}

export enum DETAIL_TYPE {
  FRAME = 'FRAME',
  FORK = 'FORK',
  REERSHOCK = 'REERSHOCK'
}

export interface Craftsman {
  id: number;
  name: string;
  surname: string;
  companyName?: string;
}

export interface HomeCraftsman extends Craftsman {
  address: string;
  companyName: null;
  repairableDetails: DETAIL_TYPE[];
}

export class ServiceRecord {
  constructor(
    public bike: Bike,
    public date: Date,
    public price: number,
    public craftsman: Craftsman
  ) {}
}

abstract class Service {
  constructor(
    public address: string,
    public repairableDetails: DETAIL_TYPE[],
  ) { }

  protected abstract repairDetail(
    bike: Bike,
    detail: Detail,
    date: Date,
    price: number,
    craftsman?: Craftsman
  ): void;
}

export interface ServiceCenter {
  id: number;
  name: string;
  address: string;
  repairableDetails: DETAIL_TYPE[],
  craftsmans: Craftsman[]
}

// export class ServiceCenter extends Service {
//   protected craftsmans = new Map<number, Craftsman>();

//   constructor(
//     public name: string,
//     public address: string,
//     public repairableDetails: DETAIL_TYPE[],
//     public initialCraftsmans?: Craftsman[],
//   ) {
//     super(address, repairableDetails)
//     if (initialCraftsmans) {
//       initialCraftsmans.forEach(ic => {
//         ic.companyName = name;
//         this.craftsmans.set(ic.id, ic);
//       });
//     }
//   }

//   getCraftsmanById(id: number): Craftsman {
//     return this.craftsmans.get(id);
//   }

//   get serviceCrafstmans(): IterableIterator<Craftsman> {
//     return this.craftsmans.values();
//   }

//   public repairDetail(bike: Bike, detail: Detail, date: Date, price: number, craftsman: Craftsman) {
//     if (this.repairableDetails.includes(detail.type)) {
//       const serviceRecord = new ServiceRecord(bike, new Date(), price, craftsman);
//       detail.services.push(serviceRecord);
//     } else {
//       alert('Sorry we can\'t repair your detail');
//     }
//   }
// }

export class HomeService extends Service {
   constructor(
    public address: string,
    public craftsman: HomeCraftsman,
  ) {
    super(address, craftsman.repairableDetails)
  }

  public repairDetail(bike: Bike, detail: Detail, date: Date, price: number) {
    if (this.repairableDetails.includes(detail.type)) {
      const serviceRecord = new ServiceRecord(bike, new Date(), price, this.craftsman);
      detail.services.push(serviceRecord);
    } else {
      alert('Sorry we can\'t repair your detail');
    }
  }
}
