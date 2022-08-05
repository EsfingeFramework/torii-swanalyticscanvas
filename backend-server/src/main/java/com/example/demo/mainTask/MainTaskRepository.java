package com.example.demo.mainTask;

import com.example.demo.users.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;
import java.util.Optional;

public interface MainTaskRepository extends MongoRepository<MainTask, String> {

    @Query("{'pId': ?0}")
    Optional<List<MainTask>> findByPId(String pId);

    @Query(value="{'pId': ?0}", delete = true)
    Optional<List<MainTask>> deleteByPId(String pId);

    @Query("{'id':?0}")
    Optional<MainTask> findUser(String id);
}
