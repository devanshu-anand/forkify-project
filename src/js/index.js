// Global App Controller
import Search from './models/Search';
import Recipe from './models/Recipe';
import {domElements, renderLoader, clearLoader} from './views/base';
import * as SearchView from './views/searchView';

/** Global State of the app 
 * - Search Object
 * - Current Recipe Object
 * - Shopping List Object\
 * - Liked Recipes
*/

const state = {};

/**
 * - Search Controller
 */

const controlSearch = async () => {
    // 1. Get Query From search view
    const query = SearchView.getInput(); // TODO
    // console.log(query);
    
    if(query){
      // 2. New search object and add to state
        state.search = new Search(query);
        try{
          // 3. Prepare UI for results
            SearchView.clearInput();
            SearchView.clearList();
            renderLoader(domElements.searchRes);

          // 4. Search for recipes
            await state.search.getSearchResult();
          // 5. Render results on UI
            clearLoader();
            SearchView.renderRecipes(state.search.result);  
          // console.log(state.search.result);
        }
        catch(error){
          alert(`Something went wrong with Search !!, Please try again later :-) Msg:- ${error}`);
        }
      
    }
     
};

domElements.searchForm.addEventListener('submit',e => {
  e.preventDefault();
  controlSearch();
});

domElements.searchResPages.addEventListener('click', e => {
  const btn = e.target.closest('.btn-inline');
  
  if(btn){
      const goToPage = parseInt(btn.dataset.goto, 10);
      SearchView.clearList();
      SearchView.renderRecipes(state.search.result,goToPage);
  }  
  // console.log(btn);
});


/**
 * - Recipe Controller 
 */

const controlRecipe = async () => {
    const id = window.location.hash.replace('#','');
    // console.log(id);
    if(id){
      // Prepare the UI for changes

      // Create new recipe object 
        state.recipe = new Recipe(id);
      
       try{
          // Get recipe data  
            await state.recipe.getRecipe();
          // Calculate serving quantity
  
          // Render Recipe
          console.log(state.recipe.recipeDetails);
       }
       catch(error){
         alert(`Something went wrong with Recipe, Please try again later !! :-) Msg:- ${error}`);
       }
        
    }
};

['hashchange','load'].forEach(event => window.addEventListener(event, controlRecipe));
// window.addEventListener('hashchange', controlRecipe);

