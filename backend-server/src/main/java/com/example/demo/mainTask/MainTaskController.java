package com.example.demo.mainTask;

import com.example.demo.subTasks.SubTask;
import com.example.demo.users.User;
import com.example.demo.users.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping("/api/mainTask")
public class MainTaskController {

    private final MainTaskService mainTaskService;

    public MainTaskController(MainTaskService mainTaskService) {
        this.mainTaskService = mainTaskService;
    }

    @PostMapping
    public ResponseEntity addMainTask(@RequestBody MainTask mainTask){
        mainTaskService.addMainTask(mainTask);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @GetMapping
    public ResponseEntity<List<MainTask>> getAllMainTasks(){
        return ResponseEntity.ok(mainTaskService.getAllMainTasks());
    }

    @PutMapping
    public ResponseEntity updateMainTask(@RequestBody MainTask mainTask){
        mainTaskService.updateMainTask(mainTask);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/{pId}")
    public ResponseEntity<List<MainTask>> getMainTaskByProjId(@PathVariable String pId){
        return ResponseEntity.ok(mainTaskService.getMainTaskByProjId(pId));
    }

    @GetMapping("/tData/{id}")
    public ResponseEntity<MainTask> getMainTaskById(@PathVariable String id){
        return ResponseEntity.ok(mainTaskService.getMainTaskById(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity deleteMainTask(@PathVariable String id){
        mainTaskService.deleteMainTask(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @DeleteMapping("/project/{pId}")
    public ResponseEntity deleteMainTaskByPId(@PathVariable String pId){
        mainTaskService.deleteMainTaskByPId(pId);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }
}
