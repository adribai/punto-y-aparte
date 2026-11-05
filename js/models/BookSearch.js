import { getBooks } from "../services/OpenLibraryApiService.js";
import SearchResult from "./SearchResult.js";


class BookSearch{
    async search(text,type){

        const books=await getBooks(text,type);
        const results=new SearchResult(text);
        const result=new SearchResult(text);
        result.classify(books,type);
        return result;

    }

}



export default BookSearch;