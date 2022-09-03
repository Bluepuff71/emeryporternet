//Ensures the specified object exists. Throws an error otherwise. 
export function ensure<T>(obj: T | null | undefined) {
    if(obj === undefined || obj === null) {
        throw new Error("Ensure failed for Object.");
    } else {
        return obj;
    }
}