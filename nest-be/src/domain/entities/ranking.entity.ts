export class Ranking {
  constructor(
    public readonly id: string,
    public submissionId: string,
    public gameJamId: string,
    public position: number
  ) {}
}
