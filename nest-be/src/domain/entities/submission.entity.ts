export class Submission {
  constructor(
    public readonly id: string,
    public gameJamId: string,
    public teamId: string,
    public title: string,
    public description: string | null,
    public buildUrl: string,
    public createdAt: Date
  ) {}
}
