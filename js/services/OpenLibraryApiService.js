import { FailureDoingFetchError } from "../utils/Errors.js";
import Book from "../models/Book.js";

/**
 * 
 * Gets found books
 * 
 * @param {string | number} input title, author, ISBN of chosen book
 * @param {string} type type of input
 * @returns {Promise<Object[]>} Book
 * 
 * @throws {FailureDoingFetchError}
 * 
 */

async function getBooks(input,inputType){

    const response=await fetch(`https://openlibrary.org/search.json?${inputType}=${encodeURIComponent(input)}&limit=20`);
     
    if(!response.ok){
        throw new FailureDoingFetchError(response);

    }else{

        const responseJSON=await response.json();
        return responseJSON.docs.map(element=>{

            const book= new Book(element.key.replace("/works/",""),element.title,element.author_name,element.first_publish_year,element.cover_i);

            return book;
        });

    }
}


export{
    getBooks
}


