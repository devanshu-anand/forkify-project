import {domElements} from './base';

export const getInput = () => domElements.searchInput.value;

export const clearInput = () => domElements.searchInput.value = '';

export const clearList = () => {
    domElements.searchResList.innerHTML = '';
    domElements.searchResPages.innerHTML = '';
};

const limitTitle = (title, limit = 17) => {
    const newTitle = [];
    if (title.length <= limit){
        
        title.split(' ').reduce((acc,cur) => {
            if(acc + cur.length <= limit){
                newTitle.push(cur);
            }
            return acc + cur.length;
        }, 0);
        return `${newTitle.join(' ')} ...`;
    }
    return title;


}; 

const renderRecipe = recipe => {
    const imgLink = "https://spoonacular.com/recipeImages/";
    const recipeMarkup = `<li>
                            <a class="results__link" href="#${recipe.id}">
                                <figure class="results__fig">
                                    <img src="${imgLink + recipe.image}" alt="${imgLink + recipe.image}">
                                </figure>
                                <div class="results__data">
                                    <h4 class="results__name">${limitTitle(recipe.title)}</h4>
                                    <p class="results__author">Ready in ${recipe.readyInMinutes} minutes</p>
                                    <p class="results__author">Serve for ${recipe.servings} peoples</p>

                                </div>
                            </a>
                        </li>`;
            // console.log(recipeMarkup);
        domElements.searchResList.insertAdjacentHTML('beforeend',recipeMarkup);
};

// type next and prev
const createButton = (page,type) => {
    const button = `<button class="btn-inline results__btn--${type}" data-goto=${type === 'prev' ? page - 1 : page + 1}>
                        <span>Page ${type === 'prev' ? page - 1 : page + 1}</span>
                        <svg class="search__icon">
                            <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
                        </svg>
                        
                    </button>`;
    return button;
};


const renderButtons = (page, numOfRecipe, resPerPage) => {
    const pages = Math.ceil(numOfRecipe / resPerPage);

    let button;
    if(page === 1 && pages > 1){
        // Render only next page button
        button = createButton(page,'next');
    } 
    else if( page < pages && pages > 1){
        // Render both next and prev buttons
        button = `${createButton(page,'prev')}
                ${createButton(page,'next')}`;
    }
    else if(page === pages && pages > 1){
        // Render only prev page button 
        button = createButton(page,'prev')
    }

    domElements.searchResPages.insertAdjacentHTML('afterbegin',button);

};

export const renderRecipes = (recipes, page = 1, resPerPage = 10) => {
    // render results of current page
    const start = (page-1) * resPerPage;
    const end = page * resPerPage;
    recipes.slice(start, end).forEach(renderRecipe);

    // render pagination buttons 
    renderButtons(page,recipes.length,resPerPage);
}