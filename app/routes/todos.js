// ROUTES TODOS
var Todo = require('../models/todo.js');
module.exports 	= function(app) {
	app.get('/todos', Todo.findAll);
	app.post('/todos', Todo.create);
	app.put('/todos/:id', Todo.update);
	app.delete('/todos/:id', Todo.delete);
    
}
