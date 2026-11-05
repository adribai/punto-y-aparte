import Book from "./Book.js";


const STORAGE_KEY="pya-library";


class Library{
    constructor(books=[]){
        this.books=books;
    }



    add(book){

        if(this.has(book.id)){
            return false;
        }

        book.addedDate=new Date();

        this.books.push(book);
        this.save();

        return true;
    }


    remove(id){

        this.books=this.books.filter(book=>book.id!==id);
        this.save();
    }


    has(id){

        return this.books.some(book=>book.id===id);
    }


    sort(criteria="date-desc"){
        const books=[...this.books];

        switch(criteria){
            case "date-asc":
                return books.sort((a,b)=>a.addedDate-b.addedDate);
            case "title-asc":
                return books.sort((a,b)=>a.title.localeCompare(b.title,"es"));
            case "title-desc":
                return books.sort((a,b)=>b.title.localeCompare(a.title,"es"));
            default:
                return books.sort((a,b)=>b.addedDate-a.addedDate);
        }
    }


    save(){
        try{
            localStorage.setItem(STORAGE_KEY,JSON.stringify(this.books));
        }catch(error){
            console.error("No se ha podido guardar la biblioteca",error);
        }
    }



    load(){
        try{
            const data=JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? [];
            this.books=data.map(item=>Book.fromJSON(item));
        }catch(error){
            console.error("No se ha podido cargar la biblioteca",error);
            this.books=[];
        }
    }



}



export default Library;