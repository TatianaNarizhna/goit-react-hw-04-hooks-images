function fetchSearch(search, page) {
  return fetch(
    `https://pixabay.com/api/?q=${search}&page=${page}&key=21902781-05f70a6abac1a4120ac7c9ed1&image_type=photo&orientation=horizontal&per_page=12`
  ).then((response) => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(new Error(`Request ${search} not found`));
  });
}

const api = {
  fetchSearch,
};

export default api;

// .then(response => response.data.hits)
