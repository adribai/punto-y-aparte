class Book{
    constructor(id,title,author,year,coverId,addedDate){
        this.id=id;
        this.title=title;
        this.author=author;
        this.year=year;
        this.coverId=coverId;
        this.addedDate=addedDate;


    }


    getAuthors(){

    if(!this.author || this.author.length===0){
        return "Autor desconocido";
    }

    return this.author.join(", ");
    }      


    getCoverUrl(size="M"){
      
        if(!this.coverId){

            return "../../assets/images/no_cover.jpg";
        }else{

        const url=`https://covers.openlibrary.org/b/id/${this.coverId}-${size}.jpg`;
        return url;

        }

    }

    

    static fromJSON(data){
        const addedDate=data.addedDate ? new Date(data.addedDate) : null;
        return new Book(data.id,data.title,data.author,data.year,data.coverId,addedDate);
    }





}



export default Book;