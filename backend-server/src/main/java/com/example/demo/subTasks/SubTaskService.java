package com.example.demo.subTasks;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SubTaskService{

    private final SubTaskRepository subTaskRepository;

    public SubTaskService(SubTaskRepository subTaskRepository) {
        this.subTaskRepository = subTaskRepository;
    }

    public void addSubTask(SubTask subTask){
        subTaskRepository.insert(subTask);
    }

    public void updateSubTask(SubTask subTask){
        SubTask savedSubTask = subTaskRepository.findById(subTask.getId())
                .orElseThrow(() -> new RuntimeException(
                        String.format("Cannon Find subTask by subTask %s", subTask.getId())));

        savedSubTask.setCategory(subTask.getCategory());
        savedSubTask.setDescription(subTask.getDescription());
        savedSubTask.setColor(subTask.getColor());
        savedSubTask.setStatus(subTask.getStatus());
        savedSubTask.setMembers(subTask.getMembers());
        savedSubTask.setComplete(subTask.getComplete());
        savedSubTask.setMembers(subTask.getDate());
        savedSubTask.setDeadline(subTask.getDeadline());
        savedSubTask.setConnected(subTask.getConnected());
        savedSubTask.setCreator(subTask.getCreator());
        savedSubTask.setToDo(subTask.getToDo());
        savedSubTask.setpId(subTask.getpId());
        savedSubTask.settId(subTask.gettId());
        savedSubTask.setConnPrev(subTask.getConnPrev());
        subTaskRepository.save(subTask);
    }
    public List<SubTask> getAllSubTasks(){
        return subTaskRepository.findAll();
    }

    public List<SubTask> getSubTaskByTaskId(String tId){
        return subTaskRepository.findByTId(tId)
                .orElseThrow(() -> new RuntimeException(
                        String.format("Cannon Find subTask by subTask %s", tId)));
    }

    public void deleteSubTask(String id){
        subTaskRepository.deleteById(id);
    }

    public void deleteSubTaskByTId(String tId){
        subTaskRepository.deleteByTId(tId);
    }

    public void deleteSubTaskByPId(String pId){
        subTaskRepository.deleteByPId(pId);
    }
}
