export class GameJam {
  constructor(
    public readonly id: string,
    public creatorUserId: string | null,
    public creatorCompanyId: string | null,
    public title: string,
    public description: string | null,
    public category: string,
    public type: string,
    public startDate: Date,
    public endDate: Date,
    public isPrivate: boolean,
    public createdAt: Date
  ) {}
}
