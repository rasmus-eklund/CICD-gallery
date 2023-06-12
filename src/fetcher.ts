import { createApi } from 'unsplash-js';

const api = createApi({
  accessKey: import.meta.env.VITE_KEY,
});

const fetchImage = async (query: string) => {
  const apiCall = await api.search.getPhotos({
    query: query,
    page: 2,
    perPage: 10,
  });

  if (apiCall.type === 'success') return apiCall.response;

  //  return new Error('Error retrieving photo.');
};

export { fetchImage };
