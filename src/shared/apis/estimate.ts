import { AxiosResponse } from "axios";
import {
  deleteRequest,
  getRequest,
  postRequest,
  putRequest,
} from "./apiActions";
import { GetEstimateDetailSchema } from "@typings/schema";

// Get
export const getEstimateClientDetail = (
  payload?: string
): Promise<GetEstimateDetailSchema> =>
  getRequest(`/estimate/client/detail/${payload}`);

// Post

// Update

// Delete
