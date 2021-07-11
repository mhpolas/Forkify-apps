import Search from './models/Search';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import list from './models/List';
import Likes from './models/Like';
import * as likeView from './views/likeView';
import * as listView from './views/listView';
import { elements,loader,clearLoader } from './views/base';
import Recipe from './models/Recipe';

const state={};
window.state=state;
const controlSearch= async () =>{

const query=searchView.getInput();



if(query){

     state.search= new Search(query);
     searchView.clearField();
     searchView.clearResult();
     loader(elements.results);
     await state.search.getResult();
     clearLoader();
     searchView.renderResult(state.search.result);

}

}

elements.searchForm.addEventListener('submit', e=>{
e.preventDefault();
controlSearch();

})

// window.addEventListener('load', e=>{
//     e.preventDefault();
//     controlSearch();
    
//     })


//pagination
elements.result_pages.addEventListener('click',e=>{
        let btn=e.target.closest('.btn-inline');
        console.log(btn.dataset.goto);
        if(btn){
            const id=parseInt(btn.dataset.goto,10);
            searchView.clearResult();
            searchView.renderResult(state.search.result,id);
        
        }
});


//const recipe= new Recipe(47746);

//recipe.getRecipeResult();


const controlRecipe=async ()=>{
    let id=window.location.hash.replace("#",'');
    if(id){
        loader(elements.recipe);
        state.recipe=new Recipe(id);

        if (state.search) searchView.highlightSelected(id);

        try {
            await state.recipe.getRecipeResult()
            recipeView.clearRecipe();
            state.recipe.calcTime();
            state.recipe.calcServing()
            state.recipe.ingredient();
            clearLoader();
            recipeView.renderRecipe(state.recipe,state.likes.isLiked(id));


        } catch (error) {
            alert(error);
        }

    
    }
}
 
const controlList=()=>{
    if(!state.list) state.list=new list();

    state.recipe.ingredients.forEach(el=>{
        const item=state.list.addItems(el.count, el.unit, el.ingredient);
         listView.renderItem(item)
    });
}



const controlLikes=()=>{
        //if(!state.likes) state.likes= new Likes();
    const id=state.recipe.id;
    if(!state.likes.isLiked(id)){
        const newlike=state.likes.addLikes(id,state.recipe.title,state.recipe.publisher,state.recipe.image_url);
        likeView.togggleLike(true);
        likeView.renderView(newlike);
        console.log(state.likes);

    }else{
        state.likes.deleteLike(id);
        likeView.togggleLike(false);
        likeView.deleteView(id);
        console.log(state.likes);
    }
    likeView.likeMenu(state.likes.likeNum());
 
}

window.addEventListener('load',()=>{
state.likes= new Likes();
state.likes.readStorage();
state.likes.likes.forEach(like=>likeView.renderView(like));

likesview.likeMenu(state.likes.likeNum());

});

elements.shoping.addEventListener('click',e=>{
    const id=e.target.closest('.shopping__item').dataset.itemid;

    if(e.target.matches('.shopping__delete,.shopping__delete *')){
        state.list.deleteitem(id);
       listView.deleteItem(id);
    }else if(e.target.matches('.shoping__count-value')){
        const val=parseFloat(e.target.value);
        state.list.updateCount(id,val);
    }
});




//window.addEventListener('hashchange', controlRecipe);
//window.addEventListener('load',controlRecipe);

['hashchange','load'].forEach(event=>window.addEventListener(event,controlRecipe));

elements.recipe.addEventListener('click',e=>{
    if(e.target.matches('.btn-decrease, .btn-decrease *')){
        if(state.recipe.serving>1){
        state.recipe.updateServings('dec');
        recipeView.updateServingsIngredients(state.recipe);
        }
    }else if(e.target.matches('.btn-increase, .btn-increase *')){
        state.recipe.updateServings('inc');
        recipeView.updateServingsIngredients(state.recipe);
    }else if(e.target.matches('.recipe__btn-list,.recipe__btn-list *')){
        controlList();
    }else if(e.target.matches('.recipe__love, .recipe__love *')){
        controlLikes();
    }

})

window.l=new list();