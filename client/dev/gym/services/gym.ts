interface IService {
  doStuff():number;
}

export class GymService implements IService {
  doStuff():number {
    return 1;
  }
}
