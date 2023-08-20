package com.exavalu.myFirstProject.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="todos")

public class Todo {
	
	@Id
	@GeneratedValue(strategy= GenerationType.IDENTITY)
	private Long todoId;
	private String todoTitle;
	private String todoStartTime;
	private String todoEndTime;
	@Column(columnDefinition="tinyInt default 1")
	private boolean todoCompleted;
	public Long getTodoId() {
		return todoId;
	}
	public void setTodoId(Long todoId) {
		this.todoId = todoId;
	}
	public String getTodoTitle() {
		return todoTitle;
	}
	public void setTodoTitle(String todoTitle) {
		this.todoTitle = todoTitle;
	}
	public String getTodoStartTime() {
		return todoStartTime;
	}
	public void setTodoStartTime(String todoStartTime) {
		this.todoStartTime = todoStartTime;
	}
	public String getTodoEndTime() {
		return todoEndTime;
	}
	public void setTodoEndTime(String todoEndTime) {
		this.todoEndTime = todoEndTime;
	}
	public boolean getTodoCompleted() {
		return todoCompleted;
	}
	public void setTodoCompleted(boolean todoCompleted) {
		this.todoCompleted = todoCompleted;
	}

}
