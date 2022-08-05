package com.example.demo.project;

import com.example.demo.users.User;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping("/api/project")
public class ProjectController {

    private final ProjectService projectService;

    public ProjectController(ProjectService projectService) {
        this.projectService = projectService;
    }

    @PostMapping
    public ResponseEntity addProject(@RequestBody Project project){
        projectService.addProject(project);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }
    @PutMapping
    public ResponseEntity updateProject(@RequestBody Project project){
        projectService.updateProject(project);
        return ResponseEntity.ok().build();
    }
    @GetMapping
    public ResponseEntity<List<Project>> getAllProjects(){
        return ResponseEntity.ok(projectService.getAllProjects());
    }

    @GetMapping("/{members}")
    public ResponseEntity<List<Project>> getProjectByMember(@PathVariable String members){
        return ResponseEntity.ok(projectService.getProjectByMember(members));
    }
    @DeleteMapping("/{id}")
    public ResponseEntity deleteProject(@PathVariable String id){
        projectService.deleteProject(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

}
