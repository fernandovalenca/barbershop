export default class Service {
  constructor(
    public id: string,
    public name: string,
    public description: string,
    public imageUrl: string,
    public price: number,
    public barbershopId: string
  ) {}

  static create(props: Omit<Service, 'id'>) {
    const id = crypto.randomUUID();
    return new Service(
      id,
      props.name,
      props.description,
      props.imageUrl,
      props.price,
      props.barbershopId
    );
  }
}
