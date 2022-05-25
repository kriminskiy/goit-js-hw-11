import axios from 'axios';

export default class NewsApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  async fetchData() {
    const params = {
      key: '27200028-8fc69fbb3d566c8420050baaa',
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: 'true',
    };

    return await axios
      .get(
        `https://pixabay.com/api/?key=27200028-8fc69fbb3d566c8420050baaa&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=40`,
      )
      .then(object => {
        this.pageIncrement();
        return {
          totalHits: object.data.totalHits,
          hits: object.data.hits,
        };
      })
      .catch(error => console.log('error', error));

    // return fetch(`https://pixabay.com/api/?key=27200028-8fc69fbb3d566c8420050baaa&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=40`)
    //     .then(response => {
    //         if (!response.ok) {
    //             throw new Error(response.status);
    //         }
    //         return response.json();
    //     })
    //     .then(data => {
    //         this.pageIncrement();
    //         return {
    //             totalHits: data.totalHits,
    //             hits: data.hits,
    //         };
    //     })
    //     .catch(error => console.log('error', error));
  }
  resetpage() {
    this.page = 1;
  }
  pageIncrement() {
    this.page += 1;
  }
  nowPage() {
    return this.page - 1;
  }
  get query() {
    return this.searchQuery;
  }
  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
