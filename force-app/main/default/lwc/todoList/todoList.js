import { LightningElement, wire, api } from 'lwc';
import getTodosListWithFindKey from '@salesforce/apex/TodoHandler.getTodosListWithFindKey';
import getSubtodos from '@salesforce/apex/TodoHandler.getSubtodos';
import { refreshApex } from '@salesforce/apex';

export default class TodoList extends LightningElement {
    
    error;

    todos;
    subtodos;

    wiredTodosResult;
    wiredSubtodosResult;

    findKey = '';

    @wire(getTodosListWithFindKey, {findKey : '$findKey'})
    wiredTodos(result){ 
        this.wiredTodosResult = result;
        if (result.data) {
            this.todos = result.data;
            this.error = undefined;
        } else if (result.error) {
            this.error = result.error;
            this.todos = undefined;
        }
    }

    @wire(getSubtodos)
    wiredSubtodos(result){
        this.wiredSubtodosResult = result;
        if(result.data) {
            this.subtodos = result.data;
            this.error = undefined;
        } else if (result.error) {
            this.error = result.error;
            this.todos = undefined;
        }
    }

    refreshTodos(){
        refreshApex(this.wiredTodosResult);
    }

    refreshSubtodos(){
        refreshApex(this.wiredSubtodosResult);
    }

    handleFind(event){
        window.clearTimeout(this.delayTimeout);
        const findKey = event.target.value;
        this.delayTimeout = setTimeout(() => {
            this.findKey = findKey;
        }, 300);
    }


}