package com.example.demo.project;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Document(collection = "project")
public class Project {
    @Id
    private String id;
    @Indexed(name="pname", unique=true)
    private String pname;
    @Field(name = "description")
    private String description;
    @Field(name = "imgUrl")
    private String imgUrl;
    @Field(name = "members")
    private String[] members;
    @Field(name = "date")
    private String date;
    @Field(name = "deadline")
    private String deadline;

    public Project(String id, String pname, String description, String imgUrl, String[] members,String date, String deadline) {
        this.id = id;
        this.pname = pname;
        this.description = description;
        this.imgUrl = imgUrl;
        this.members = members;
        this.date = date;
        this.deadline = deadline;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getPname() {
        return pname;
    }

    public void setPname(String pname) {
        this.pname = pname;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getImgUrl() {
        return imgUrl;
    }

    public void setImgUrl(String imgUrl) {
        this.imgUrl = imgUrl;
    }

    public String[] getMembers() {
        return members;
    }

    public void setMembers(String[] members) {
        this.members = members;
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
}
