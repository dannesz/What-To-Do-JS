export default class Model{
    constructor() {
        this.view = null;
        this.todolist = JSON.parse(localStorage.getItem('todolist'));
        if(!this.todolist || this.todolist.length < 1) {
            this.todolist = [
                {
                    id: 0,
                    title: 'Choco Pro',
                    description: 'Cocolate Pro Wrestling',
                    completed: false,
                }
            ]
            this.currentId = 1;
        } else {
            this.currentId = this.todolist[this.todolist.length - 1].id + 1;
        }
        
    }


    setView(view){
        this.view = view;

    }


    save(){
        localStorage.setItem('todolist', JSON.stringify(this.todolist));
    }


    getToDos(){
        // const todolist = [];
        // for (const todo of this.todolist) {
        //     todolist.push({...todo});
        // }

        // return todolist;

        return this.todolist.map((todo) => ({...todo})); // Se devuelve una COPIA de la lista
    }


    findTodo(id){
        return this.todolist.findIndex((todo) => todo.id === id);
    }


    toggleCompleted(id){
        // console.log(id);
        const index = this.findTodo(id);
        const todo = this.todolist[index];
        todo.completed = !todo.completed;
        // console.log(this.todolist);
        this.save();
    }


    editTodo(id, values) {
        const index = this.findTodo(id);
        Object.assign(this.todolist[index], values);
        this.save();
    }


    addTodo(title, description) {
        const todo = {
            id: this.currentId++,
            title,
            description,
            completed: false,
        }

        this.todolist.push(todo); 
        console.log(this.todolist);

        this.save();

        return {...todo};  
    }


    removeTodo(id) {
        const index = this.findTodo(id);
        this.todolist.splice(index, 1);

        this.save();
    
    }
    
}