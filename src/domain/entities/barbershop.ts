export default class Barbershop {
  constructor(
    public id: string,
    public name: string,
    public address: string,
    public imageUrl: string,
    public services: string[]
  ) {}

  static create(props: Omit<Barbershop, 'id'>) {
    const id = crypto.randomUUID();
    return new Barbershop(
      id,
      props.name,
      props.address,
      props.imageUrl,
      props.services
    );
  }
}
