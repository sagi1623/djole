
export class LocalStorageService {

    constructor() {}

    store(key: string, value: string) {

        localStorage.setItem(key,value);
    }

    get(key:string): string
    {
        return localStorage.getItem(key);
    }

    exists(key:string): boolean
    {
        return (localStorage.getItem(key) !== null)    
    }

    clear()
    {
        localStorage.clear();
    }

}