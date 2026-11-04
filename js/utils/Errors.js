
/**
 * Represents a Fetch Error.
 *
 * @class
 * @property {string} name Error name
 * @property {string} status Response Status
 */


class FailureDoingFetchError extends Error{
    constructor(response){
        super("Failure doing fetch: "+response.statusText),

        this.name="Failure doing fetch";
        this.status= response.status;
    
    }
}


export{
    FailureDoingFetchError
}