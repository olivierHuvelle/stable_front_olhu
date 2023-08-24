import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
	reducerPath: 'api',
	baseQuery: fetchBaseQuery({
		baseUrl: 'http://localhost:3001',
		// {getState}
		prepareHeaders: (headers) => {
			headers.set('authorization', `Bearer token`)
		}
	}),
	endpoints: () => ({})
})
