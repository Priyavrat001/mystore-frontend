import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { key } from "../../utils/server";
import { StatsResponse } from "../../types/api-types";

export const dashboardApi = createApi({
    reducerPath: "dashboardApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${key}/api/v1/order/`,
    }),
    tagTypes: ["orders"],
    endpoints: (builder) => ({
        stats: builder.query<StatsResponse, string>({
            query: id => `stats?id=${id}`
        }),
        pie: builder.query<string, string>({
            query: id => `pie?id=${id}`
        }),
        bar: builder.query<string, string>({
            query: id => `bar?id=${id}`
        }),
        line: builder.query<string, string>({
            query: id => `line?id=${id}`
        }),
    }),
});


export const { useBarQuery, useLineQuery, useStatsQuery, usePieQuery } = dashboardApi;