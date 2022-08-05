package com.example.demo.subTasks;


import com.example.demo.users.User;
import com.example.demo.users.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping("/api/subTask")
public class SubTaskController {

    private final SubTaskService subTaskService;

    public SubTaskController(SubTaskService subTaskService) {
        this.subTaskService = subTaskService;
    }

    @PostMapping
    public ResponseEntity addSubTask(@RequestBody SubTask subTask){
        subTaskService.addSubTask(subTask);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @PutMapping
    public ResponseEntity updateSubTask(@RequestBody SubTask subTask){
        subTaskService.updateSubTask(subTask);
        return ResponseEntity.ok().build();
    }
    @GetMapping
    public ResponseEntity<List<SubTask>> getAllSubTasks(){
        return ResponseEntity.ok(subTaskService.getAllSubTasks());
    }

    @GetMapping("/{tId}")
    public ResponseEntity<List<SubTask>> getSubTaskByTaskId(@PathVariable String tId){
        return ResponseEntity.ok(subTaskService.getSubTaskByTaskId(tId));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity deleteSubTask(@PathVariable String id){
        subTaskService.deleteSubTask(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @DeleteMapping("/mainTask/{tId}")
    public ResponseEntity deleteSubTaskByTId(@PathVariable String tId){
        subTaskService.deleteSubTaskByTId(tId);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @DeleteMapping("/project/{pId}")
    public ResponseEntity deleteSubTaskByPId(@PathVariable String pId){
        subTaskService.deleteSubTaskByPId(pId);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }
}
