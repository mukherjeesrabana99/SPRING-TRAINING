package com.exavalu.myFirstProject.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.exavalu.myFirstProject.entity.Todo;

public interface TodoRepository extends JpaRepository<Todo, Long> {

}
