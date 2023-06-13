import { createApi } from 'unsplash-js'
import { type Photos } from 'unsplash-js/dist/methods/search/types/response'

const api = createApi({
  accessKey: import.meta.env.VITE_KEY
})

const fetchImage = async (query: string): Promise<Photos> => {
  const apiCall = await api.search.getPhotos({
    query,
    page: 2,
    perPage: 10
  })
  console.log('made a call in fetcher!!!!!!!');
  if (apiCall.type !== 'success') throw new Error('Error retrieving photo.')
  return apiCall.response
}

export { fetchImage }
