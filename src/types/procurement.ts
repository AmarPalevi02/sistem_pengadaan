export interface ProcurementItem {
   itemName: string,
   quantity: number,
   unit: string,
   pricePerUnit: number
}

export interface CreateProcurementPayload {
   requestId: string;
   purchaseOrderNumber: string;
   vendorId: string;
   procurementItems: Array<{
     itemName: string;
     quantity: number;
     unit: string;
     pricePerUnit: number;
   }>;
   deliveryDate?: Date;
   notes?: string;
 }