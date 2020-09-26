export const domElements = {
    searchForm: document.querySelector('.search'),
    searchInput: document.querySelector('.search__field'),
    searchRes: document.querySelector('.results'),
    searchResList: document.querySelector('.results__list'),
    searchResPages: document.querySelector('.results__pages'),
    numOfSearchRes: 100
}

export const domElementsStrings = {
    loader : 'loader',
};

export const renderLoader = parent => {

    const loader = `<div class="${domElementsStrings.loader}">
                        <svg>
                            <use href="img/icons.svg#icon-cw"></use>
                        </svg>
                    </div>`;

    parent.insertAdjacentHTML('afterbegin', loader);

};

export const clearLoader = () => {
    const loader = document.querySelector(`.${domElementsStrings.loader}`);
    if (loader) loader.parentElement.removeChild(loader);
}
