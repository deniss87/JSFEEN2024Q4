import {HttpMethod} from '../app/enums';
import { Callback } from '../app/types';
/*global console, fetch */

type LoaderOptions = {
    [key: string]: string;
}

class Loader {
    private baseLink: string;
    private options: LoaderOptions; 


    constructor(baseLink: string, options: LoaderOptions) {
        this.baseLink = baseLink;
        this.options = options;
    }

    protected getResp<Type>(
        { endpoint, options = {} }: {
            endpoint: string;
            options?: LoaderOptions
        },
        callback: Callback<Type> = () => {
            console.error('No callback for GET response');
        }
    ): void {
        this.load(HttpMethod.GET, endpoint, callback, options);
    }

    private errorHandler(res: Response): Response {
        if (!res.ok) {
            if (res.status === 401 || res.status === 404) {
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            }
            throw Error(res.statusText);
        }
        return res;
    }

    private makeUrl(options: Record<string, string>, endpoint: string): string {
        const urlOptions = { ...this.options, ...options };
        let url = `${this.baseLink}${endpoint}?`;

        Object.keys(urlOptions).forEach((key) => {
            url += `${key}=${urlOptions[key]}&`;
        });
        return url.slice(0, -1);
    }

    private load<Type>(
        method: string, 
        endpoint: string, 
        callback: Callback<Type>, 
        options: Record<string, string> = {}
    ) {
        fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler)
            .then((res) => res.json())
            .then((data) => callback(data))
            .catch((err) => console.error(err));
    }
}

export default Loader;
