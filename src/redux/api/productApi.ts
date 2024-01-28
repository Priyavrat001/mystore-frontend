import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AllProductResponse, CategoriesResponse, SearchProductRequest, SearchProductResponse } from "../../types/api-types";


const key = "http://localhost:4000"

export const productApi = createApi({
    reducerPath: "productApi",
    baseQuery: fetchBaseQuery({ baseUrl: `${key}/api/v1/product/` }),
    tagTypes: ["product"],
    endpoints: (builder) => ({

        latestProduct:builder.query<AllProductResponse, string>({query:()=>"letest",
    }),

        allProducts:builder.query<AllProductResponse, string>({query:(id)=>`admin-product?id=${id}`,
    }),
        categories:builder.query<CategoriesResponse, string>({query:()=>`category`,
    }),

    searchProducts:builder.query<SearchProductResponse, SearchProductRequest>({query:({ price, sort, search, category, page})=>{

        let base = `all?search${search}&page${page}`

        if(price){
            base+= `&price=${price}`
        }
        if(category){
            base+= `&category=${category}`
        }
        if(sort){
            base+= `&sort=${sort}`
        }

        return base;
    },
}),
        
    }),

});

export const {
    useLatestProductQuery,
    useAllProductsQuery,
    useCategoriesQuery,
    useSearchProductsQuery

} = productApi;