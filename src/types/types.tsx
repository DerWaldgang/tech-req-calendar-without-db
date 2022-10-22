export type IUser = {
  username: string | null;
  password: string;
};

export interface IEvent {
  author: string | null;
  guest: string;
  date: string;
  description: string;
}
