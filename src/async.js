// async function getImages(searchQuery) {
//     try {
//       const response = await axios.get(BASE_URL, {
//         params: {
//           key: API_KEY,
//           q: searchQuery,
//           image_type: 'photo',
//           orientation: 'horizontal',
//           safesearch: true,
//           per_page: 40,
//           page: page,
//         },
//       });
  
//       return response.data;
//     } catch (error) {
//       console.error(error);
//       throw error;
//     }
//   }


//   export default getImages;
