import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AllUsersResponse, DeleteUserRequest, MessageResponse, UserResponse } from "../../types/api-types";
import { User } from "../../types/types";
import axios from "axios";
import { key } from "../../utils/server";



export const userApi = createApi({
    reducerPath: "userApi",
    baseQuery: fetchBaseQuery({ baseUrl: `${key}/api/v1/user/` }),
    tagTypes:["users"],
    endpoints: (builder) => ({
        login: builder.mutation<MessageResponse, User>({
            query: (user) => ({
                url: "new",
                method: "POST",
                body: user,
            }),
            invalidatesTags:["users"]
        }),
        deleteUser: builder.mutation<MessageResponse, DeleteUserRequest>({
            query: ({ userId, adminId }) => ({
              url: `${userId}?id=${adminId}`,
              method: "DELETE",
            }),
            invalidatesTags: ["users"],
          }),

        allUsers:builder.query<AllUsersResponse, string>({
            query:id=> `all?id=${id}`,
            providesTags:["users"]
        })
    }),

});


export const getUser = async(id:string)=>{
    try {
        const {data}:{data:UserResponse} = await axios.get(`${key}/api/v1/user/${id}`);
        return data
        
    } catch (error) {
        throw error
        
    }
}

export const { useLoginMutation, useAllUsersQuery, useDeleteUserMutation } = userApi;