package com.example.demo.subTasks;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;
import java.util.Optional;

public interface SubTaskRepository extends MongoRepository<SubTask, String> {

    @Query("{'tId': ?0}")
    Optional <List<SubTask>> findByTId(String tId);

    @Query(value="{'tId': ?0}", delete = true)
    Optional <List<SubTask>> deleteByTId(String tId);

    @Query(value="{'pId': ?0}", delete = true)
    Optional <List<SubTask>> deleteByPId(String pId);

}
