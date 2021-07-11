import {proxy,key} from '../config';
import axios from 'axios' ;

export default class Search{
        constructor(query,number=10){
            this.query=query;
            this.number=number
        }

        async getResult(){
       
        try {
            
            //const res = await axios(`https://api.spoonacular.com/recipes/search?apiKey=${key}&query=${this.query}&number=${this.number}`);
            const res = await axios(`http://forkify-api.herokuapp.com/api/search?&q=${this.query}`);
            this.result=res.data.recipes;
            
            
        } catch (error) {
            console.log(error)
        }
    
        }
        
    
}