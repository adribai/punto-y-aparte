import Library from "../models/Library.js";
import BookSearch from "../models/BookSearch.js";
import { createBookCard } from "../components/BookCard.js";


class DOMController{
    constructor(basePath=""){
        this.library=new Library();
        this.bookSearch=new BookSearch();
        this.basePath=basePath; //"" en index.html y "../" en pages/
        this.sortCriteria="date-desc";
        this.lastResult=null;
    }



     init(){
        this.library.load();

        //Buscador (index.html)
        this.searchForm=document.querySelector("#searchForm");
        if(this.searchForm){
            this.searchInput=document.querySelector("#searchInput");
            this.searchType=document.querySelector("#searchType");
            this.searchMessage=document.querySelector("#searchMessage");
            this.exactList=document.querySelector("#exactResults");
            this.coincidenceList=document.querySelector("#coincidenceResults");
            this.resultsBox=document.querySelector("#results");
            this.searchForm.addEventListener("submit",event=>this.onSearch(event));
        }

        //Mi biblioteca (profile.html)
        this.libraryList=document.querySelector("#libraryList");
        if(this.libraryList){
            this.libraryCount=document.querySelector("#libraryCount");
            this.sortSelect=document.querySelector("#sortSelect");
            this.sortSelect.addEventListener("change",()=>{
                this.sortCriteria=this.sortSelect.value;
                this.renderLibrary();
            });
            this.renderLibrary();
        }
    }




    async onSearch(event){
        event.preventDefault();

        const text=this.searchInput.value.trim();
        const type=this.searchType.value;

        if(text.length<2){
            this.showMessage("Escribe al menos 2 letras para buscar.");
            return;
        }

        this.clearResults();
        this.showMessage("Buscando…");

        try{
            const result=await this.bookSearch.search(text,type);
            this.lastResult=result;
            this.renderResults(result);
        }catch(error){
            console.error(error);
            this.showMessage("No se ha podido conectar con Open Library. Inténtalo de nuevo en un momento.");
        }
    }



    renderResults(result){
        this.clearResults();

        if(result.isEmpty()){
            this.showMessage(`No hay resultados para "${result.search}".`);
            return;
        }

        this.showMessage("");
        this.resultsBox.hidden=false;
        this.fillResultList(this.exactList,result.exactlyBooksResults,"Ningún resultado exacto.");
        this.fillResultList(this.coincidenceList,result.coincidencesBooksResults,"Ningún resultado coincidente.");
    }

 


    fillResultList(list,books,emptyText){
        if(books.length===0){
            const p=document.createElement("p");
            p.classList.add("results__empty");
            p.textContent=emptyText;
            list.append(p);
            return;
        }

        books.forEach(book=>{
            const saved=this.library.has(book.id);
            const card=createBookCard(book,{
                buttonText: saved ? "En tu biblioteca" : "Añadir",
                disabled: saved,
                basePath: this.basePath,
                onClick: (book,button)=>this.onAdd(book,button)
            });
            list.append(card);
        });
    }



    onAdd(book,button){
        this.library.add(book);
        button.textContent="En tu biblioteca";
        button.disabled=true;
    }



    renderLibrary(){
        const books=this.library.sort(this.sortCriteria);

        this.libraryList.replaceChildren();
        this.libraryCount.textContent=books.length===1 ? "1 libro" : `${books.length} libros`;

        if(books.length===0){
            const p=document.createElement("p");
            p.classList.add("results__empty");
            p.textContent="Todavía no has añadido libros. Búscalos en Inicio y pulsa Añadir.";
            this.libraryList.append(p);
            return;
        }

        books.forEach(book=>{
            const card=createBookCard(book,{
                buttonText: "Eliminar",
                basePath: this.basePath,
                onClick: book=>{
                    this.library.remove(book.id);
                    this.renderLibrary();
                }
            });

            const pDate=document.createElement("p");
            pDate.classList.add("book__date");
            if(book.addedDate){
                pDate.textContent=`Añadido el ${book.addedDate.toLocaleDateString("es-ES")}`;
                card.querySelector(".book__info").insertBefore(pDate,card.querySelector(".book__button"));
            }

            this.libraryList.append(card);
        });
    }


    clearResults(){
        this.resultsBox.hidden=true;
        this.exactList.replaceChildren();
        this.coincidenceList.replaceChildren();
    }


    showMessage(text){
        this.searchMessage.textContent=text;
    }

}


export default DOMController;