import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { MessageResponse, UserResponse } from "../../types/api-types";
import { User } from "../../types/types";
import axios from "axios";
import { key } from "../../utils/server";



export const userApi = createApi({
    reducerPath: "userApi",
    baseQuery: fetchBaseQuery({ baseUrl: `${key}/api/v1/user/` }),
    endpoints: (builder) => ({
        login: builder.mutation<MessageResponse, User>({
            query: (user) => ({
                url: "new",
                method: "POST",
                body: user,
            }),
        }),
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

export const { useLoginMutation } = userApi;