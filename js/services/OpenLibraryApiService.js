import { FailureDoingFetchError } from "../utils/Errors";



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


