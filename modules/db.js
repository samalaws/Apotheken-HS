import {set,del,values,keys} from './idb-src.js'

export const db = {
    readKeys : function(){
        return keys();
    },
    readAllItems: function(){
        return values();
    },
    writeItem: function(key,data){
        set(key,data);
    },
    deleteItem: function(key){
        del(parseInt(key));
    },
    upDateItem: function(data){
        const key = data.id;
        this.writeItem(key,data);
        console.log(key);
    }
}