import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AllProductResponse, CategoriesResponse, DeleteProductRequest, MessageResponse, NewProductRequest, ProductResponse, SearchProductRequest, SearchProductResponse, UpdateProductRequest } from "../../types/api-types";
import { key } from "../../utils/server";



export const productApi = createApi({
    reducerPath: "productApi",
    baseQuery: fetchBaseQuery({ baseUrl: `${key}/api/v1/product/` }),
    tagTypes: ["product"],
    endpoints: (builder) => ({

        latestProduct: builder.query<AllProductResponse, string>({
            query: () => "letest",
            providesTags:["product"]
        }),

        allProducts: builder.query<AllProductResponse, string>({
            query: (id) => `admin-product?id=${id}`,
            providesTags:["product"]
        }),
        categories: builder.query<CategoriesResponse, string>({
            query: () => `category`,
            providesTags:["product"]
        }),

        searchProducts: builder.query<SearchProductResponse, SearchProductRequest>({
            query: ({ price, sort, search, category, page }) => {

                let base = `all?search=${search}&page=${page}`

                if (price) {
                    base += `&price=${price}`
                }
                if (category) {
                    base += `&category=${category}`
                }
                if (sort) {
                    base += `&sort=${sort}`
                }

                return base;
            },
            providesTags:["product"]
        }),

        productDetails: builder.query<ProductResponse, string>({
            query: (id) => id,
            providesTags:["product"]
        }),

        newProducts: builder.mutation<MessageResponse, NewProductRequest>({
            query: ({ formData, id }) => ({
                url: `new?id=${id}`,
                method: "POST",
                body: formData
            }),
            invalidatesTags:["product"]
        }),

        updateProduct: builder.mutation<MessageResponse, UpdateProductRequest>({
            query: ({ formData, userId, productId }) => ({
                url: `${productId}?id=${userId}`,
                method: "PUT",
                body: formData
            }),
            invalidatesTags:["product"]
        }),

        deleteProduct: builder.mutation<MessageResponse, DeleteProductRequest>({
            query: ({ userId, productId }) => ({
                url: `${productId}?id=${userId}`,
                method: "DELETE",
            }),
            invalidatesTags:["product"]
        }),

    }),

});

export const {
    useLatestProductQuery,
    useAllProductsQuery,
    useCategoriesQuery,
    useSearchProductsQuery,
    useNewProductsMutation,
    useProductDetailsQuery,
    useUpdateProductMutation,
    useDeleteProductMutation

} = productApi;