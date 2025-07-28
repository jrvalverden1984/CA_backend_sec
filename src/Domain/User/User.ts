export class User {
  constructor(
    public readonly UserID: number,
    public CompanyID: number,
    public Login: string,
    public FirstName: string,
    public LastName: string,
    public Password: string,
    public ExpirationDate?: Date,
    public Metadata?: any
  ) {}

  changeName(newFirstName: string, newLastName: string): void {
    this.FirstName = newFirstName;
    this.LastName = newLastName;
  }
}