export default class Barbershop {
  constructor(
    public id: string,
    public name: string,
    public phone: string,
    public address: string,
    public imageUrl: string
  ) {}

  static create(props: Omit<Barbershop, 'id'>) {
    const id = crypto.randomUUID();
    return new Barbershop(
      id,
      props.name,
      props.phone,
      props.address,
      props.imageUrl
    );
  }
}
