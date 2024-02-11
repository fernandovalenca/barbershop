export default class Booking {
  constructor(
    public id: string,
    public date: Date,
    public userId: string,
    public serviceId: string,
    public barbershopId: string
  ) {}

  static create(props: Omit<Booking, 'id'>) {
    const id = crypto.randomUUID();
    return new Booking(
      id,
      props.date,
      props.userId,
      props.serviceId,
      props.barbershopId
    );
  }
}
