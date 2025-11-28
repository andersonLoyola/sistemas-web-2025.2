export class Vote {
  constructor(
    public readonly id: string,
    public submissionId: string,
    public userId: string,
    public score: number,
    public comment: string | null,
    public createdAt: Date
  ) {}
}
