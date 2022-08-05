package com.example.demo.users;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.Optional;

public interface UserRepository extends MongoRepository<User, String> {

    @Query("{'username':?0}")
    Optional<User> findUser(String username);

    User findByUsername(String username);

}
