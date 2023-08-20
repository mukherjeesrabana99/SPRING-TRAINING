package com.exavalu.myFirstProject.services.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.exavalu.myFirstProject.entity.Todo;
import com.exavalu.myFirstProject.repository.TodoRepository;
import com.exavalu.myFirstProject.services.TodoService;

@Service
public class TodoServiceImpl implements TodoService {
	
	@Autowired
	private TodoRepository todoRepository;

	@Override
	public Todo createTodo(Todo todo) {
		// TODO Auto-generated method stub
		return todoRepository.save(todo);
	}

	@Override
	public List<Todo> getAllTodos() {
		// TODO Auto-generated method stub
		return todoRepository.findAll();
	}

	@Override
	public Todo updateTodo(Long todoId, Todo todo) {
		// TODO Auto-generated method stub
		Todo todoToUpdate= getTodo(todoId);
		todoToUpdate.setTodoTitle(todo.getTodoTitle());
		todoToUpdate.setTodoStartTime(todo.getTodoStartTime());
		todoToUpdate.setTodoEndTime(todo.getTodoEndTime());
		return todoRepository.save(todoToUpdate);
	}

	@Override
	public Todo getTodo(Long todoId) {
		// TODO Auto-generated method stub
		
		return todoRepository.findById(todoId).orElse(null);
	}

	@Override
	public void deleteTodo(Long todoId) {
		// TODO Auto-generated method stub
		todoRepository.deleteById(todoId);
//		todoRepository.deleteInBatch(getAllTodos());
		
	}

	@Override
	public Todo completeTodo(Long todoId, Todo todo) {
		// TODO Auto-generated method stub
		Todo todoToComplete= getTodo(todoId);
		todoToComplete.setTodoTitle(todo.getTodoTitle());
		todoToComplete.setTodoStartTime(todo.getTodoStartTime());
		todoToComplete.setTodoEndTime(todo.getTodoEndTime());
		todoToComplete.setTodoCompleted(todo.getTodoCompleted());
		return todoRepository.save(todoToComplete);
	}


	@Override
	public void deleteTodosInBatch(List<Long> todoIds) {
		// TODO Auto-generated method stub
		todoRepository.deleteAllByIdInBatch(todoIds);
		
	
		
	}

	@Override
	public List<Todo> completeTodosInBatch(List<Todo> todos) {
		// TODO Auto-generated method stub
		return todoRepository.saveAll(todos);
	}

	@Override
	public Long getTodoCount() {
		// TODO Auto-generated method stub
		return todoRepository.count();
	}

	

}
