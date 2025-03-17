import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        const apiUrl = process.env.API_URL as string;
        const apiKey = process.env.API_KEY as string;

        super(apiUrl, {apiKey});
    }
}

export default AppLoader;
