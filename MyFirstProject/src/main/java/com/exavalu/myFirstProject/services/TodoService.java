package com.exavalu.myFirstProject.services;

import java.util.List;

import com.exavalu.myFirstProject.entity.Todo;


public interface TodoService {
	
	public Todo createTodo(Todo todo);
	
	public List<Todo> getAllTodos();
	
	public Todo getTodo(Long todoId);
	
	public Todo updateTodo (Long todoId, Todo todo);
	
	public void deleteTodo(Long todoId);
	
	public Todo completeTodo(Long todoId, Todo todo);
	
	public void deleteTodosInBatch(List<Long> todoIds );
	
	public List<Todo> completeTodosInBatch(List<Todo> todos);
	
	public Long getTodoCount();
	
	
	


}
