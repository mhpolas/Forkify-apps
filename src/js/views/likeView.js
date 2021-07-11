import { elements } from './base';
import { trimTitle} from './searchView'


export const togggleLike=isLiked=>{
    const iconL=isLiked? 'icon-heart' : 'icon-heart-outlined';

    document.querySelector('.header__likes use').setAttribute('href',`img/icons.svg#${iconL}`);
} 

export const likeMenu=likeCount=>{
    elements.likesMenu.style.visibility=likeCount > 0 ? 'visible' : 'hidden';
}

export const renderView=like=>{
    const markup=`<li>
    <a class="likes__link" href="#${like.id}">
        <figure class="likes__fig">
            <img src="${like.image}" alt="Test">
        </figure>
        <div class="likes__data">
            <h4 class="likes__name">${ trimTitle(like.title)}</h4>
            <p class="likes__author">${like.author}</p>
        </div>
    </a>
</li>`;
elements.likes__list.insertAdjacentHTML('beforeend',markup);

}


export const deleteView=id=>{
 const el= document.querySelector(`.likes__link[href*="${id}"]`).parentElement;
 if(el) el.parentElement.removeChild(el);

}