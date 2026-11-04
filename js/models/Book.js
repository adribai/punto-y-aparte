class Book{
    constructor(id,title,author,year,coverId){
        this.id=id;
        this.title=title;
        this.author=author;
        this.year=year;
        this.coverId=coverId;

    }

    getCoverUrl(size="M"){
       return `https://covers.openlibrary.org/b/id/${this.coverId}-${size}.jpg`;
    }
}



export default Book;