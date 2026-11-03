import { FailureDoingFetchError } from "../utils/Errors";



const API_URL="https://covers.openlibrary.org/b/$key/$value-$size.jpg";


/**
 * 
 * GETs Book Cover img
 * 
 * @async
 * @param {string} key ISBN, OCLC, LCCN, ID
 * @param {string | number} value Of chosen key
 * @param {string} size default size = M
 * @returns {Promise<Blob>} cover img
 * 
 * @throws {FailureDoingFetchError}
 */


async function getCover(key,value,size="M"){

    const response=await fetch(API_URL.replace("$key/$value-$size",`${key}/${value}-${size}`));

    if(!response.ok){
        throw new FailureDoingFetchError;
     }else{ 
        
        const cover=await response.blob();
        return cover;

    }
}