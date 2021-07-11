import {elements} from './base';

export const getInput=()=> elements.searchField.value;

export const clearField=()=>{
 elements.searchField.value="";
}

export const clearResult=()=>{
    elements.resultList.innerHTML=" ";
    elements.result_pages.innerHTML=" ";

}

export const highlightSelected=id=>{
    const resultArr=Array.from(document.querySelectorAll('.results__link'));
    resultArr.forEach(el=>{
        el.classList.remove();
    })
    document.querySelector(`.results__link[href*="${id}"]`).classList.add('result__link--active');
};
export const trimTitle=(title,titleLength=15)=>{

    const newTitle=[];
    if(title.length > titleLength){
        title.split(" ").reduce((acc,cur)=>{
            if(acc+ cur.length <= titleLength){
                newTitle.push(cur);
            }
            return acc+ cur.length;

        },0);
        return `${newTitle.join(" ")}....`;

    }
    return title;
}
const renderView=(recipes)=>{
        const markup=`<li>
        <a class="results__link results__link--active" href="#${recipes.recipe_id}">
            <figure class="results__fig">   
            <img src="${recipes.image_url}" alt="Test">
            </figure>
            <div class="results__data">
                <h4 class="results__name">${trimTitle(recipes.title)}</h4>
                <p class="results__author">${recipes.publisher}</p>
            </div>
        </a>
    </li>`;

    elements.resultList.insertAdjacentHTML("beforeend", markup); 

}


//pagiation 

const createButton=(type,pageN)=>{
     
     let markup=`<button class="btn-inline results__btn--${type}" data-goto=${type==='prev' ? pageN-1 : pageN+1}>
                    <svg class="search__icon">
                        <use href="img/icons.svg#icon-triangle-${type==='prev' ? 'left' : 'right'}"></use>
                    </svg>
                    <span>Page ${type==='prev' ? pageN-1 : pageN+1}</span>
                </button>`;
    return markup;
}

//pagiation 

const renderButton=(pageN,totalR,recipePerP)=>{

        const pages=Math.ceil(totalR/recipePerP);
        let button;
        if(pageN===1 && pages>1){
            button=createButton('next',pageN)
        }else if(pageN < pages){
            button=`
            ${createButton('prev',pageN)}
            ${createButton('next',pageN)}
            `;

        }else if(pages>1 && pages===pageN){
            button=createButton('prev',pageN);

        }
        elements.result_pages.insertAdjacentHTML('afterbegin',button);

}


//pagiation 

export const renderResult=(recipes,pageN=1,recipePerP=10)=>{
        let start=(pageN-1)*recipePerP;
        let end=recipePerP*pageN;
        recipes.slice(start,end).forEach(renderView);
        renderButton(pageN,recipes.length,recipePerP);
}