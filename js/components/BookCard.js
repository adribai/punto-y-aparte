

/**
 * Create Book card
 * 
 * @returns 
 */


function createBookCard(){

    const article=document.createElement("article");
    article.classList.add("book");

    const img=document.createElement("img");
    img.classList.add("book__cover");
    img.setAttribute("src");
    img.setAttribute("alt");

    const div=document.createElement("div");
    
    const h3=document.createElement("h3");

    const pAuthor=document.createElement("p");
    pAuthor.classList.add("author");

    const pRate=document.createElement("p");
    pRate.classList.add("rate");

    const pComment=document.createElement("p");
    
    div.append(h3,pAuthor,pRate,pComment);

    article.append(img,div);

    return article;

}