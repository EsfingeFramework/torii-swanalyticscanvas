package com.example.demo.users;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserService implements UserDetailsService {

    private UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public void addUser(User user){
        userRepository.insert(user);
    }
    public void updateUser(User user){
        User savedUser = userRepository.findById(user.getId())
                .orElseThrow(() -> new RuntimeException(
                        String.format("Cannon Find User by ID %s", user.getId())));

        savedUser.setUsername(user.getUsername());
        //savedUser.setEmail(user.getEmail());

        userRepository.save(user);
    }
    public List<User> getAllUsers(){
        return userRepository.findAll();
    }

    public User findUser(String username){
        return userRepository.findUser(username)
                .orElseThrow(() -> new RuntimeException(
                        String.format("Cannon Find User by Username %s", username)));
    }

    /*
    public void deleteUser(String id){
        userRepository.deleteById(id);
    }*/

    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User foundUser = userRepository.findByUsername(username);
        if(foundUser == null){
            return null;
        }

        String name = foundUser.getUsername();
        String pwd = foundUser.getPassword();

        return new org.springframework.security.core.userdetails.User(name,pwd,new ArrayList<>());

    }
}
