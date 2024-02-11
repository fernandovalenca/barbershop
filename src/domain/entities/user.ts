export default class User {
  constructor(public id: string, public name: string, public email: string) {}

  static create(props: Omit<User, 'id'>) {
    const id = crypto.randomUUID();
    return new User(id, props.name, props.email);
  }
}
