import { getBooks } from "../services/OpenLibraryApiService.js";
import SearchResult from "./SearchResult.js";


class BookSearch{
    async search(text,type){

        const books=await getBooks(text,type);
        const results=new SearchResult(text);

    }

}



export default BookSearch;