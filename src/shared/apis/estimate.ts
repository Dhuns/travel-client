import { AxiosResponse } from "axios";
import {
  deleteRequest,
  getRequest,
  postRequest,
  putRequest,
} from "./apiActions";
import { GetEstimateDetailSchema } from "@typings/schema";

// Types
export interface EstimateListItem {
  id: number;
  title: string;
  description?: string;
  status: string;
  totalPrice: number;
  createdAt: string;
  updatedAt: string;
  hash?: string;
}

// Get
export const getEstimateClientDetail = (
  payload?: string
): Promise<GetEstimateDetailSchema> =>
  getRequest(`/estimate/client/detail/${payload}`);

export const getMyEstimates = (params?: {
  page?: number;
  countPerPage?: number;
}): Promise<[EstimateListItem[], number]> =>
  getRequest("/estimate/my-list", params);

// Post
export const createEstimate = (payload: any): Promise<any> =>
  postRequest("/estimate", payload);

// Update
export const updateEstimate = (id: number, payload: any): Promise<any> =>
  putRequest(`/estimate/${id}`, payload);

// Delete
export const deleteEstimate = (id: number): Promise<any> =>
  deleteRequest(`/estimate/${id}`);
