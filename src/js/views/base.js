export const elements={
    searchForm : document.querySelector('.search'),
    searchField : document.querySelector('.search__field'),
    resultList: document.querySelector('.results__list'),
    results:document.querySelector('.results'),
    result_pages:document.querySelector('.results__pages'),
    recipe:document.querySelector('.recipe'),
    shoping:document.querySelector('.shopping__list'),
    likes:document.querySelector('.likes'),
    likesMenu: document.querySelector('.likes__field'),
    likes__list:document.querySelector('.likes__list')
}

export const elementStrings={
    loader: 'loader'
}
export const loader=(parent)=>{

    const loader = `
        <div class="${elementStrings.loader}">
            <svg>
                <use href="img/icons.svg#icon-cw"></use>
            </svg>
        </div>
    `;
    parent.insertAdjacentHTML('afterbegin',loader)


}

export const clearLoader=()=>{

    const loader=document.querySelector(`.${elementStrings.loader}`);
    if(loader){
        loader.parentElement.removeChild(loader);
    }

}