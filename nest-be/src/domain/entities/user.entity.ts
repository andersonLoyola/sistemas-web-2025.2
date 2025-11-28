export class User {
  constructor(
    public readonly id: string,
    public name: string,
    public email: string,
    public passwordHash: string,
    public bio: string | null,
    public role: string,
    public createdAt: Date
  ) {}

  updateProfile(name: string, bio: string | null) {
    this.name = name;
    this.bio = bio;
  }
}
