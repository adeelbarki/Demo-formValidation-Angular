import { ISkill } from './skill';

export interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone?: number;
  contactPreference: string;
  skills: ISkill[];
}
