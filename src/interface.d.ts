export interface Transaction {
  id: number | null;
  order_id: number | null;
  intent: string;
  payment_from: string;
  vendor_id: number | null;
  vendor_transaction_id: string;
  amount: number;
  success: boolean;
}
