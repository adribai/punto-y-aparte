class SearchResult{
    constructor(search,exactlyBooksResults=[],coincidencesBooksResults=[]){
        this.search=search;
        this.exactlyBooksResults=exactlyBooksResults;
        this.coincidencesBooksResults=coincidencesBooksResults;
    }
}


export default SearchResult;