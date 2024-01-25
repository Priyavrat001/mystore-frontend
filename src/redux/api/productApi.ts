import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import axios from "axios";
import { AllProductResponse } from "../../types/api-types";


const key = "http://localhost:4000"

export const productApi = createApi({
    reducerPath: "productApi",
    baseQuery: fetchBaseQuery({ baseUrl: `${key}/api/v1/product/` }),
    endpoints: (builder) => ({

        latestProduct:builder.query<AllProductResponse, string>({query:()=>"letest"})
    }),

});

export const {useLatestProductQuery} = productApi;