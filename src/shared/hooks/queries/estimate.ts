import { getEstimateClientDetail } from "@shared/apis/estimate";
import { GetEstimateDetailSchema } from "@typings/schema";
import { useQuery, UseQueryResult } from "react-query";

export const ESTIMATE_KEYS = {
  getEstimateClientDetail: (payload?: string): [string, string | undefined] => [
    "getEstimateClientDetail",
    payload,
  ],
};

// Get List
export const useGetEstimateDetail = (
  payload?: string
): UseQueryResult<GetEstimateDetailSchema, any> =>
  useQuery(
    ESTIMATE_KEYS.getEstimateClientDetail(payload),
    async () => {
      console.log("Fetching estimate detail with payload:", payload);
      const response = await getEstimateClientDetail(payload);
      console.log("Estimate detail response:", response);
      return response;
    },
    {
      enabled: !!payload,
      onSuccess: (data) => {
        console.log("✅ Query Success:", data);
      },
      onError: (error) => {
        console.error("❌ Query Error:", error);
      },
    }
  );
