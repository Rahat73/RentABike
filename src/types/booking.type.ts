import { TBike } from "./bike.type";
import { TUserInfo } from "./loginRegistration.type";

export type TBooking = {
  _id: string;
  userId: TUserInfo;
  bikeId: TBike;
  startTime: Date;
  returnTime?: Date;
  totalCost: number;
  isReturned?: boolean;
  isPaid?: boolean;
  payment_url?: string;
};
