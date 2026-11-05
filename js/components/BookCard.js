import Book from "../models/Book.js";

/**
 * Create Book card
 * 
 * @returns 
 */


 function createBookCard(book,{buttonText,disabled=false,onClick,basePath=""}){

    const article=document.createElement("article");
    article.classList.add("book");
    article.dataset.id=book.id;

    const img=document.createElement("img");
    img.classList.add("book__cover");
    img.src = book.getCoverUrl();
    img.alt = `Portada de ${book.title}`;
    img.setAttribute("loading","lazy");


    img.addEventListener("error",()=>{
        img.src=new Book(book.id,book.title).getCoverUrl("M",basePath);
    },{once:true});


    const div=document.createElement("div");
    div.classList.add("book__info");
    
    const h3=document.createElement("h3");
    h3.textContent=book.title;

    const pAuthor=document.createElement("p");
    pAuthor.classList.add("author");
    pAuthor.textContent=book.getAuthors();

    const pYear=document.createElement("p");
    pYear.classList.add("year");
    pYear.textContent=book.year ? `Publicado en ${book.year}` : "Año desconocido";


    const button=document.createElement("button");
    button.classList.add("button","book__button");
    button.type="button";
    button.textContent=buttonText;
    button.disabled=disabled;
    button.addEventListener("click",()=>onClick(book,button));
    
    div.append(h3,pAuthor,pYear,button);

    article.append(img,div);

    return article;

}

export{
    createBookCard
}