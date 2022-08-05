package com.example.demo.mainTask;

import com.example.demo.Messages.Messages;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.List;

@Document(collection = "maintask")
public class MainTask {

    @Id
    private String id;
    @Field(name = "description")
    private String description;
    @Field(name = "date")
    private String date;
    @Field(name = "deadline")
    private String deadline;
    @Field(name = "members")
    private String members;
    @Field(name = "complete")
    private Integer complete;
    @Field(name = "connected")
    private String[] connected;
    @Field(name = "pId")
    private String pId;
    @Field(name = "generated")
    private Boolean generated;

    @Field(name = "issue")
    private Boolean issue;

    @Field(name = "measure")
    private Boolean measure;

    @Field(name = "tool")
    private Boolean tool;

    @Field(name = "high")
    private Boolean high;

    @Field(name = "insight")
    private Boolean insight;

    @Field(name = "goal")
    private Boolean goal;

    @Field(name = "decision")
    private Boolean decision;

    @Field(name = "hasIssue")
    private Boolean hasIssue;

    public MainTask(String id, String description, String date, String deadline, String members, Integer complete, String[] connected, String pId, Boolean generated, Boolean issue, Boolean measure, Boolean tool, Boolean high, Boolean insight, Boolean goal, Boolean decision, Boolean hasIssue) {
        this.id = id;
        this.description = description;
        this.date = date;
        this.deadline = deadline;
        this.members = members;
        this.complete = complete;
        this.connected = connected;
        this.pId = pId;
        this.generated = generated;
        this.issue = issue;
        this.measure = measure;
        this.tool = tool;
        this.high = high;
        this.insight = insight;
        this.goal = goal;
        this.decision = decision;
        this.hasIssue = hasIssue;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
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

    public String[] getConnected() {
        return connected;
    }

    public void setConnected(String[] connected) {
        this.connected = connected;
    }

    public String getpId() {
        return pId;
    }

    public void setpId(String pId) {
        this.pId = pId;
    }

    public Boolean getGenerated() {
        return generated;
    }

    public void setGenerated(Boolean generated) {
        this.generated = generated;
    }

    public Boolean getIssue() {
        return issue;
    }

    public void setIssue(Boolean issue) {
        this.issue = issue;
    }

    public Boolean getMeasure() {
        return measure;
    }

    public void setMeasure(Boolean measure) {
        this.measure = measure;
    }

    public Boolean getTool() {
        return tool;
    }

    public void setTool(Boolean tool) {
        this.tool = tool;
    }

    public Boolean getHigh() {
        return high;
    }

    public void setHigh(Boolean high) {
        this.high = high;
    }

    public Boolean getInsight() {
        return insight;
    }

    public void setInsight(Boolean insight) {
        this.insight = insight;
    }

    public Boolean getGoal() {
        return goal;
    }

    public void setGoal(Boolean goal) {
        this.goal = goal;
    }

    public Boolean getDecision() {
        return decision;
    }

    public void setDecision(Boolean decision) {
        this.decision = decision;
    }

    public Boolean getHasIssue() {
        return hasIssue;
    }

    public void setHasIssue(Boolean hasIssue) {
        this.hasIssue = hasIssue;
    }
}
