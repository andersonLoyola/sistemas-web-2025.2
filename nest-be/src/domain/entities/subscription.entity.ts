export class Subscription {
  constructor(
    public readonly id: string,
    public userId: string,
    public status: string,
    public plan: string,
    public startedAt: Date,
    public expiresAt: Date
  ) {}
}
