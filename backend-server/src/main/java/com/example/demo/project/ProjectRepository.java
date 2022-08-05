package com.example.demo.project;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;
import java.util.Optional;

public interface ProjectRepository extends MongoRepository<Project, String> {

    @Query("{'members':{$all: [?0]}}")
    Optional<List<Project>> findByPName(String members);
}
