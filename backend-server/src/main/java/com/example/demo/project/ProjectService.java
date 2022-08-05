package com.example.demo.project;

import com.example.demo.users.User;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

@Service
public class ProjectService {

    private final ProjectRepository projectRepository;

    public ProjectService(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }

    public void addProject(Project project){
        projectRepository.insert(project);
    }
    public void updateProject(Project project){
        Project savedProject = projectRepository.findById(project.getId())
                .orElseThrow(() -> new RuntimeException(
                        String.format("Cannon Find User by ID %s", project.getId())));

        savedProject.setPname(project.getPname());
        savedProject.setDescription(project.getDescription());
        savedProject.setImgUrl(project.getImgUrl());
        savedProject.setMembers(project.getMembers());

        projectRepository.save(project);
    }
    public List<Project> getAllProjects(){
        return projectRepository.findAll();
    }

    public List<Project> getProjectByMember(String members){
        return projectRepository.findByPName(members)
                .orElseThrow(() -> new RuntimeException(
                        String.format("Cannon Find Project by Project Member %s", members)));
    }
    public void deleteProject(@PathVariable String id){
        projectRepository.deleteById(id);
    }
}
