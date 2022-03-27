export class TodolistService {

     todoList = ["Main", "Makan", "Minum", "Tidur"];

     getJsonTodolist() { 
         return JSON.stringify({
            code: 200,
            status: "OK",
            data: this.todoList.map((value, index) => {
                return {
                    id: index,
                    data: value
                }
            })
        })
    }

    getTodolist(request, response) {

        response.write(this.getJsonTodolist());
        response.end();

    }

    createTodo(request, response){
        request.addListener("data", (data) => {
            const body = JSON.parse(data.toString());
            this.todoList.push(body.todo);

            response.write(this.getJsonTodolist());
            response.end();
        })
    }

    updateTodo(request, response){
        request.addListener("data", (data) => {
            const body = JSON.parse(data.toString());
            if (this.todoList[body.id]) {
                this.todoList[body.id] = body.todo;
            }

            response.write(this.getJsonTodolist());
            response.end();
        })
    }

    deleteTodo(request, response){
        request.addListener("data", (data) => {
            const body = JSON.parse(data.toString());
            if (this.todoList[body.id]) {
                this.todoList.splice(body.id, 1);
            }

            response.write(this.getJsonTodolist());
            response.end();
        })
    }
}