package com.example.demo.users;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Document("user")
public class User {

    @Id
    private String id;
    @Field(name = "username")
    @Indexed(name="username", unique=true)
    private String username;
    /*@Indexed(name="email", unique=true)
    @Field(name = "email")
    private String email;*/
    @Field(name = "password")
    private String password;
    @Field(name = "friends")
    private String[] friends;

    public User() {

    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    /*public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }*/

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String[] getFriends() {
        return friends;
    }

    public void setFriends(String[] friends) {
        this.friends = friends;
    }

    @Override
    public String toString(){
        return "User [ id = "+id+", username = "+username+" ]";
    }
}
