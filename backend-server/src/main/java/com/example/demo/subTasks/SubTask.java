package com.example.demo.subTasks;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Document(collection = "subtask")
public class SubTask {
    @Id
    private String id;
    @Field(name = "category")
    private String category;
    @Field(name = "description")
    private String description;
    @Field(name = "color")
    private String color;
    @Field(name = "status")
    private String status;
    @Field(name = "members")
    private String members;
    @Field(name = "complete")
    private Integer complete;
    @Field(name = "date")
    private String date;
    @Field(name = "deadline")
    private String deadline;

    @Field(name = "connected")
    private String[] connected;

    @Field(name = "connFlag")
    private Boolean[] connFlag;

    @Field(name = "creator")
    private String creator;

    @Field(name = "connPrev")
    private String[] connPrev;

    @Field(name = "todo")
    private ToDo[] toDo;
    @Field(name = "pId")
    private String pId;
    @Field(name = "tId")
    private String tId;




    public SubTask(String id, String category, String description, String color, String status, String members, Integer complete, String date, String deadline, String[] connected, Boolean[] connFlag, String creator, String[] connPrev, ToDo[] toDo, String pId, String tId) {
        this.id = id;
        this.category = category;
        this.description = description;
        this.color = color;
        this.status = status;
        this.members = members;
        this.complete = complete;
        this.date = date;
        this.deadline = deadline;
        this.connected = connected;
        this.connFlag = connFlag;
        this.creator = creator;
        this.connPrev = connPrev;
        this.toDo = toDo;
        this.pId = pId;
        this.tId = tId;

    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getMembers() {
        return members;
    }

    public void setMembers(String members) {
        this.members = members;
    }

    public Integer getComplete() {
        return complete;
    }

    public void setComplete(Integer complete) {
        this.complete = complete;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getDeadline() {
        return deadline;
    }

    public void setDeadline(String deadline) {
        this.deadline = deadline;
    }

    public String[] getConnPrev() {
        return connPrev;
    }

    public void setConnPrev(String[] connPrev) {
        this.connPrev = connPrev;
    }

    public ToDo[] getToDo() {
        return toDo;
    }

    public void setToDo(ToDo[] toDo) {
        this.toDo = toDo;
    }

    public String getpId() {
        return pId;
    }

    public void setpId(String pId) {
        this.pId = pId;
    }

    public String gettId() {
        return tId;
    }

    public void settId(String tId) {
        this.tId = tId;
    }

    public String[] getConnected() {
        return connected;
    }

    public void setConnected(String[] connected) {
        this.connected = connected;
    }

    public Boolean[] getConnFlag() {
        return connFlag;
    }

    public void setConnFlag(Boolean[] connFlag) {
        this.connFlag = connFlag;
    }

    public String getCreator() {
        return creator;
    }

    public void setCreator(String creator) {
        this.creator = creator;
    }



}
