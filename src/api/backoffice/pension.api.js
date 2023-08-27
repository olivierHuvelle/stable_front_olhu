import {apiSlice} from '../../shared/store/api-slice'

const tag = 'PENSIONS'
const routePrefix = '/pensions'

const apiPension = apiSlice.injectEndpoints({
	addTagTypes: [tag],
	endpoints: builder => ({
		getPensions: builder.query({
			query: () => `${routePrefix}`,
			transformResponse: response => response.sort((a, b) => b.id - a.id),
			providesTags: [tag]
		}),
		addPension: builder.mutation({
			query: pension => ({
				url: `${routePrefix}`,
				method: 'POST',
				body: pension
			}),
			invalidatesTags: [tag]
		}),
		getPension: builder.query({
			query: pension => `${routePrefix}/${pension.id}`,
			providesTags: [tag]
		}),
		updatePension: builder.mutation({
			query: pension => ({
				url: `${routePrefix}/${pension.id}`,
				method: 'PUT',
				body: pension
			}),
			invalidatesTags: [tag]
		}),
		deletePension: builder.mutation({
			query: pension => ({
				url: `${routePrefix}/${pension.id}`,
				method: 'DELETE'
			}),
			invalidatesTags: [tag]
		})
	})
})

export const {
	useGetPensionsQuery,
	useAddPensionMutation,
	useUpdatePensionMutation,
	useDeletePensionMutation
} = apiPension
