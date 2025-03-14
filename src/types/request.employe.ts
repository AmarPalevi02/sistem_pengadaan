import { Priority } from "@prisma/client";

export interface CreateRequestItemInput {
   itemName: string;
   quantity: number;
   unit: string;
   specification?: string;
}

export interface CreateRequestInput {
   title: string;
   description?: string;
   priority: Priority;
   items: CreateRequestItemInput[];
}