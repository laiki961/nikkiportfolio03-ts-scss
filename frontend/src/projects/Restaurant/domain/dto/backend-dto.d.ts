export type ProductReqDto = {
  name: string;
  description: string;
  category: string;
  price: number;
  img?: string;
};

export type PaymentInfoRequestDto = {
  amount: number;
  currency: string;
  receiptEmail: string | undefined;
};

export type ReservationInfoRequestDto = {
  name: string;
  contact: string;
  email: string;
  date: string;
  time: string;
  persons: number;
};
