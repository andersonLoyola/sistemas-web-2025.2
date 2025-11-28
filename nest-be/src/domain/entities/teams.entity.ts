export class Team {
  constructor(
    public readonly id: string,
    public gameJamId: string,
    public name: string,
    public createdAt: Date
  ) {}
}
