class SearchResult{
    constructor(search,exactlyBooksResults=[],coincidencesBooksResults=[]){
        this.search=search;
        this.exactlyBooksResults=exactlyBooksResults;
        this.coincidencesBooksResults=coincidencesBooksResults;
    }



    classify(books,type){
        const search=SearchResult.normalize(this.search);

        books.forEach(book=>{

            let isExact;

            if(type==="author"){
                isExact=(book.author ?? []).some(author=>SearchResult.normalize(author)===search);
            }else{
                isExact=SearchResult.normalize(book.title)===search;
            }

            if(isExact){
                this.exactlyBooksResults.push(book);
            }else{
                this.coincidencesBooksResults.push(book);
            }
        });
    }



    isEmpty(){
        return this.exactlyBooksResults.length===0 && this.coincidencesBooksResults.length===0;
    }


    static normalize(text=""){
        return text.normalize("NFD").replace(/[̀-ͯ]/g,"").toLowerCase().trim();
    }


}


export default SearchResult;