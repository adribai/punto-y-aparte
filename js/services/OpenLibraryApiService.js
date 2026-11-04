import { FailureDoingFetchError } from "../utils/Errors.js";



const API_URL="https://openlibrary.org/openapi.json";



/**
 * GETs all API Endpoints
 * 
 * @async
 * @returns {Promise<string[]>} String Array of endpoints paths
 * 
 * @throws {FailureDoingFetchError}
 */

async function getPaths(){

    const response=await fetch(API_URL);

    if(!response.ok){
        throw new FailureDoingFetchError;
    }else{

        const responseJSON=await response.json();
        const paths=responseJSON.paths;

        return Object.keys(paths);
    }
   
}





/**
 * 
 * Gets found books
 * 
 * @param {string | number} input title, author, ISBN of chosen book
 * @param {string} type of input
 * @returns {Promise<Object[]>} Book
 * 
 * @throws {FailureDoingFetchError}
 * 
 */

async function getBooks(input,inputType){

    const response=await fetch(`https://openlibrary.org/search.json?${inputType}=${input}`);
     
    if(!response.ok){
        throw new FailureDoingFetchError;

    }else{

        const responseJSON=await response.json();
        return responseJSON.docs.map(element=>{

            const book= new Book(element.key,element.title,element.author_name,element.first_publish_year,element.cover_i);

            return book;
        });

    }
}





