import { TRoles } from "./global.type";

export type TUserInfo = {
  _id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  role: TRoles;
  createdAt: string;
  updatedAt: string;
  __v: number;
};
