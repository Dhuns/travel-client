import { getRequest } from "./apiActions";

// Types
export interface PackageItem {
  id: number;
  type: string;
  name: string;
  address: string;
  description: string;
  price: number;
  latitude: number;
  longitude: number;
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface PackageListResponse {
  items: PackageItem[];
  total: number;
  page: number;
  countPerPage: number;
}

// APIs
export const getPackageList = (params?: {
  keyword?: string;
  type?: string;
  page?: number;
  countPerPage?: number;
}): Promise<[PackageItem[], number]> =>
  getRequest("/item/list", params);

export const getPackageDetail = (id: number): Promise<PackageItem> =>
  getRequest(`/item/${id}`);

export const searchPackages = (params: {
  keyword?: string;
  type?: string;
  page?: number;
  countPerPage?: number;
}): Promise<[PackageItem[], number]> =>
  getRequest("/item/admin/search", params);
