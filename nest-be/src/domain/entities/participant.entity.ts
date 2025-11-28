export class Participant {
  constructor(
    public readonly id: string,
    public userId: string,
    public gameJamId: string,
    public teamId: string | null,
    public joinedAt: Date
  ) {}
}
