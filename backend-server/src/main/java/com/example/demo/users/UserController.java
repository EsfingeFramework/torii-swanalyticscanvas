package com.example.demo.users;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping("/api/user")
public class UserController{

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping
    public ResponseEntity addUser(@RequestBody User user){
        userService.addUser(user);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }
    @PutMapping
    public ResponseEntity updateUser(@RequestBody User user){
        userService.updateUser(user);
        return ResponseEntity.ok().build();
    }
    @GetMapping
    public ResponseEntity<List<User>> getAllUsers(){
        return ResponseEntity.ok(userService.getAllUsers());
    }

    @GetMapping("/{username}")
    public ResponseEntity<User> getUserByUsername(@PathVariable String username){
        return ResponseEntity.ok(userService.findUser(username));
    }
    /*
    @DeleteMapping("/{id}")
    public ResponseEntity deleteUser(@PathVariable String id){
       userService.deleteUser(id);
       return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }*/
}
