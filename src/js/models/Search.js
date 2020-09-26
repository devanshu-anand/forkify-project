import axios from 'axios';
import {domElements} from '../views/base';
import {key} from '../config';

export default class Search {
    constructor(query){
        this.query = query;
    }

    async getSearchResult() {
        
        try{
            const res = await axios(`https://api.spoonacular.com/recipes/search?apiKey=${key}&query=${this.query}&number=${domElements.numOfSearchRes}`);
            this.result = res.data.results;
            // console.log(this.result);
        }
        catch(error){
            alert(error);
        }
        
    }

}