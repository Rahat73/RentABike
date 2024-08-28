export type TBooking = {
  _id: string;
  userId: string;
  bikeId: string;
  startTime: Date;
  returnTime?: Date;
  totalCost: number;
  isReturned?: boolean;
  isPaid?: boolean;
};
