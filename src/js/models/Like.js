export default class Like{
    constructor(){
        this.likes=[];
    }

    addLikes(id,title,author,image){
            const like={
                id,
                title,
                author,
                image
            }

            this.likes.push(like);
            this.persistData();
            return like;
    }

    deleteLike(id){
        const index=this.likes.findIndex(el=>el.id===id);
        this.likes.splice(index,1);
        this.persistData();
    }

    isLiked(id){
        return this.likes.findIndex(el=>el.id===id) !==-1;
    }

    likeNum(){
    return this.likes.length;
    
    }
    persistData(){
        localStorage.setItem('likes',JSON.stringify(this.likes));
     }

    readStorage(){
        const storage=JSON.parse(localStorage.getItem('likes'));
        if(storage) this.likes=storage;
    }
}