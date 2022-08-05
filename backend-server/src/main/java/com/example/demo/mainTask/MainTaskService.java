package com.example.demo.mainTask;

import com.example.demo.subTasks.SubTask;
import com.example.demo.subTasks.SubTaskRepository;
import com.example.demo.users.User;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MainTaskService {
    private final MainTaskRepository mainTaskRepository;

    public MainTaskService(MainTaskRepository mainTaskRepository) {
        this.mainTaskRepository = mainTaskRepository;
    }

    public void addMainTask(MainTask mainTask){
        mainTaskRepository.insert(mainTask);
    }

    public List<MainTask> getAllMainTasks(){
        return mainTaskRepository.findAll();
    }

    public void updateMainTask(MainTask mainTask){
        MainTask savedMainTask = mainTaskRepository.findById(mainTask.getId())
                .orElseThrow(() -> new RuntimeException(
                        String.format("Cannon Find User by ID %s", mainTask.getId())));

        savedMainTask.setDescription(mainTask.getDescription());
        savedMainTask.setDate(mainTask.getDate());
        savedMainTask.setDeadline(mainTask.getDeadline());
        savedMainTask.setMembers(mainTask.getMembers());
        savedMainTask.setComplete(mainTask.getComplete());
        savedMainTask.setConnected(mainTask.getConnected());
        savedMainTask.setpId(mainTask.getpId());
        savedMainTask.setGenerated(mainTask.getGenerated());

        savedMainTask.setIssue(mainTask.getIssue());
        savedMainTask.setMeasure(mainTask.getMeasure());
        savedMainTask.setTool(mainTask.getTool());
        savedMainTask.setHigh(mainTask.getHigh());
        savedMainTask.setInsight(mainTask.getHigh());
        savedMainTask.setGoal(mainTask.getGoal());
        savedMainTask.setDecision(mainTask.getDecision());

        savedMainTask.setHasIssue(mainTask.getHasIssue());

        mainTaskRepository.save(mainTask);
    }
    public List<MainTask> getMainTaskByProjId(String pId){
        return mainTaskRepository.findByPId(pId)
                .orElseThrow(() -> new RuntimeException(
                        String.format("Cannon Find subTask by subTask %s", pId)));
    }
    public MainTask getMainTaskById(String id){
        return mainTaskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException(
                        String.format("Cannon Find subTask by subTask %s", id)));
    }
    public void deleteMainTask(String id){
        mainTaskRepository.deleteById(id);
    }

    public void deleteMainTaskByPId(String pId){
        mainTaskRepository.deleteByPId(pId);
    }
}
