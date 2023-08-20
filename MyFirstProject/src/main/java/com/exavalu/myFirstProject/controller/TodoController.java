package com.exavalu.myFirstProject.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.exavalu.myFirstProject.entity.Todo;
import com.exavalu.myFirstProject.services.TodoService;

@RestController
@CrossOrigin
@RequestMapping("todos")
public class TodoController {

	@Autowired
	private TodoService todoService;

	@PostMapping
	public Todo createTodo(@RequestBody Todo todo) {

		return todoService.createTodo(todo);

	}

	@GetMapping
	public List<Todo> getAllTodos() {

		return todoService.getAllTodos();
	}

	@GetMapping("/{todoId}")
	public Todo getTodo(@PathVariable Long todoId) {
		return todoService.getTodo(todoId);
	}

	@PutMapping("/{todoId}")
	public Todo updateTodo(@PathVariable Long todoId, @RequestBody Todo todo) {

		return todoService.updateTodo(todoId, todo);
	}

	@DeleteMapping("/{todoId}")
	public String deleteTodo(@PathVariable Long todoId) {
		todoService.deleteTodo(todoId);
		return "todo deleted";
	}

	@PutMapping("/completeTodo/{todoId}")
	public Todo completeTodo(@PathVariable Long todoId, @RequestBody Todo todo) {

		return todoService.completeTodo(todoId, todo);
	}
	
	@CrossOrigin
	@DeleteMapping("/deleteSelectedTodos")
	public String deleteSelectedTodos(@RequestParam("todoIds") List<Long> todoIds) {
	    System.out.println(todoIds);
	    todoService.deleteTodosInBatch(todoIds);
	    return "Selected todos deleted";
	}
	@PutMapping("/completeSelectedTodos")
	public List<Todo> completeSelectedTodos(@RequestBody List<Todo> todos){
		return todoService.completeTodosInBatch(todos);
	}
	
	@GetMapping("/getTodoCount")
	public Long getTodoCount(){
		return todoService.getTodoCount();
	}

}
