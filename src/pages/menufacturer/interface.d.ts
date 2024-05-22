export interface IManufectureCreate {
  name: string;
  shopName: string;
  email: string;
  mobileNumber: string;
  address: string;
  ownerName: string;
  whatsappNumber: string;
  mou: string;
}

export interface IManufectureData {
  id: string;
  name: string;
  shopName: string;
  email: string;
  mobileNumber: string;
  address: string;
  ownerName: string;
  whatsappNumber: string;
  mou: string;
  productCount: number;
}
