import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:9191/api';

export interface EstimateDetail {
  id: number;
  estimateId: number;
  itemId: number;
  days: number;
  sequence: number;
  quantity: number;
  originPrice: string;
  price: string;
  enableContent: boolean;
  item: {
    id: number;
    type: string;
    nameKor: string;
    nameEng: string;
    price: number;
    description?: string;
    files?: Array<{
      id: number;
      type: string;
      itemSrc: string;
    }>;
  };
}

export interface Estimate {
  id: number;
  batchId: number;
  version: number;
  status: string;
  comment: string;
  timeline: Record<string, string>;
}

export interface Batch {
  id: number;
  title: string;
  source: 'manual' | 'ai';
  status?: string;
  startDate: string;
  endDate: string;
  validDate: string;
  adultsCount: number;
  childrenCount: number;
  infantsCount: number;
  recipient: string;
  onlyPlace: boolean;
  hidePrice: boolean;
  itemFilter?: string;
  quotation?: string;
  preparedBy?: string;
  address?: string;
  email?: string;
  officeHours?: string;
  officeNumber?: string;
  emergencyNumber?: string;
  manualAdjustment?: number;
  adjustmentReason?: string;
  quoteStatus?: string;
  viewedAt?: string | null;
  sentAt?: string | null;
  respondedAt?: string | null;
}

export interface QuotationResponse {
  batchInfo: Batch;
  estimateInfo: Estimate;
  estimateDetails: EstimateDetail[];
}

// Get quotation by hash (customer-facing, no auth required)
export const getQuotationByHash = async (hash: string): Promise<QuotationResponse> => {
  const response = await axios.get(`${API_URL}/estimate/client/detail/${hash}`);
  return response.data;
};

// Get quotation by batchId (requires auth)
export const getQuotationByBatchId = async (batchId: number): Promise<QuotationResponse> => {
  const response = await axios.get(`${API_URL}/estimate/batch/${batchId}`);
  return response.data;
};

// Customer quote response types
export type CustomerResponseType = 'approve' | 'reject' | 'request_changes';

export interface CustomerQuoteResponsePayload {
  batchId: number;
  responseType: CustomerResponseType;
  message?: string;
}

export interface CustomerQuoteResponseResult {
  success: boolean;
  batchId: number;
  newStatus: string;
  message: string;
}

// Submit customer response to a quote (approve/reject/request changes)
export const submitCustomerQuoteResponse = async (
  payload: CustomerQuoteResponsePayload
): Promise<CustomerQuoteResponseResult> => {
  const response = await axios.post(`${API_URL}/batch/customer-response`, payload);
  return response.data;
};
