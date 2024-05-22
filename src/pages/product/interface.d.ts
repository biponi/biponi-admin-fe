export interface IProduct {
  id: string;
  sku: string;
  name: string;
  active: boolean;
  quantity: number;
  unitPrice: number;
  manu_id: string;
  discount: number;
  description: string;
  thumbnail: string;
  productCode: string;
  totalPrice: number;
  categoryName?: string;
  hasVariation?: boolean;
  variation: IVariation[];
  manufacturerName: string;
  manufacturerNumber: string;
  created_at: string; // Assuming the date/time string format
  timestamps: {
    createdAt: string;
    updatedAt: string;
  };
}

export interface IOrderProduct extends IProduct {
  selectedQuantity: number;
  selectedVariant?: IVariation;
}

export interface IVariation {
  id: number;
  size: string;
  color: string;
  name: string;
  title: string;
  sku: string;
  quantity: number;
  unitPrice: number;
}

export interface IProductCreateData {
  name: string;
  active: boolean;
  quantity: number;
  unitPrice: number;
  manu_id: string;
  discount: number;
  description: string;
  thumbnail: File | null;
  variation: IVariation[]; // Assuming variation can be an array of any type
  sku: string;
  categoryId: string;
}

export interface IProductUpdateData {
  id: string;
  name: string;
  active: boolean;
  quantity: number;
  unitPrice: number;
  manu_id: string;
  discount: number;
  description: string;
  thumbnail: string | File | null;
  variation: IVariation[]; // Assuming variation can be an array of any type
  sku: string;
  categoryId: string;
}

export interface ICategory {
  id: string;
  name: string;
  discount: number;
  active: boolean;
  img: string;
  totalProducts: number;
}

export interface ICreateCategory {
  name: string;
  discount: number;
  active: boolean;
  img: string | File;
}

export interface IChangeEvent extends React.ChangeEvent<HTMLInputElement> {
  target: {
    name: string;
    value: any;
  };
}
