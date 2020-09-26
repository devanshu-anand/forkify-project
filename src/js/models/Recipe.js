import axios from 'axios';
import {key} from '../config';

export default class Recipe {
    constructor(id){
        this.id = id;
    }

    async getRecipe(){
        try{
            const res = await axios(`https://api.spoonacular.com/recipes/${this.id}/information?apiKey=${key}`);
            this.recipeDetails = res.data;
            
            // console(this.recipe);
        }
        catch(error){
            alert(error);
        }
        
    }
}