import {key,proxy} from '../config';
import axios from 'axios';

export default class Recipe{
    constructor(id){
        this.id=id;
    }

    async getRecipeResult(){

        try{
            const res = await axios(`https://forkify-api.herokuapp.com/api/get?rId=${this.id}`);
            const resultSingle=res.data.recipe;
            this.title=res.data.recipe.title;
            this.publisher=res.data.recipe.publisher;
            this.ingredients=res.data.recipe.ingredients;
            this.image_url=res.data.recipe.image_url;
            this.source_url=res.data.recipe.source_url;
            
        }catch(error){
            console.log(error)
        }
  

    }

    calcTime(){
        const numIng= this.ingredients.length;
        const period=Math.ceil(numIng / 3);
        this.time=period*15;
    }

    calcServing(){
        this.serving=4;
    }

    ingredient(){
        const unitsLong = ['tablespoons', 'tablespoon', 'ounces', 'ounce', 'teaspoons', 'teaspoon', 'cups', 'pounds'];
        const unitsShort = ['tbsp', 'tbsp', 'oz', 'oz', 'tsp', 'tsp', 'cup', 'pound'];

        const newIngrdients= this.ingredients.map(el=>{
             let ingredient=el.toLowerCase();
             unitsLong.forEach((unit,i)=>{
                ingredient=ingredient.replace(unit,unitsShort[i]);
             });

             ingredient = ingredient.replace(/ *\([^)]*\) */g, ' ');

            const arring=ingredient.split(" ");

            const unitIndex=arring.findIndex(el2=>unitsShort.includes(el2));
             let objIng;
            if(unitIndex > -1){
                const arrCount=arring.slice(0,unitIndex);
                let count;
                if(arrCount.length===1){
                    count=eval(arring[0].replace('-','+'));
                }else{
                    count=eval(arring.slice(0,unitIndex).join('+'));
                }

                objIng={
                    count,
                    unit:arring[unitIndex],
                    ingredient:arring.slice(unitIndex +1).join(' ')
                }

                
            }else if(parseInt(arring[0], 10)){
                objIng={
                    count:parseInt(arring[0], 10),
                    unit:'',
                    ingredient:arring.slice(1).join(" ")
                }

            }else if(unitIndex === -1){
                objIng={
                    count:1,
                    unit:'',
                    ingredient: ingredient
                }
            }

            return objIng;

        });
        this.ingredients=newIngrdients;

    }

    updateServings(type){
        const newServings= type === 'dec' ? this.serving -1 : this.serving +1;

        

        this.ingredients.forEach(ing=>{
            ing.count=ing.count *(newServings/this.serving);
        })

        this.serving=newServings;
    }

}