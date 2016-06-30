// MODEL TODO
var mongoose = require('mongoose');
var todoSchema = new mongoose.Schema({
  description: String
});
var Todo = {
    
    model: mongoose.model('Todo', todoSchema),
    
    create: function(req, res) {
		Todo.model.create({
			description: req.body.description
		}, function(){
			res.sendStatus(200);
		})
	},
	findAll: function(req, res) {
		Todo.model.find(function (err, data) {
			res.send(data);
		});
	},
	update: function(req, res){
		Todo.model.findByIdAndUpdate(req.params.id, {
			description: req.body.description
		}, function(){
			res.sendStatus(200);
		})
	},
	delete: function(req, res){
		Todo.model.findByIdAndRemove(req.params.id, function(){
			res.sendStatus(200);
		})
	} 
}
module.exports = Todo;
