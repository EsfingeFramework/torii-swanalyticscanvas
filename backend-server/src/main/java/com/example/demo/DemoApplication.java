package com.example.demo;

import com.example.demo.mainTask.MainTaskRepository;
import com.example.demo.project.ProjectRepository;
import com.example.demo.subTasks.SubTaskRepository;
import com.example.demo.users.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

@SuppressWarnings("SpringJavaInjectionPointsAutowiringInspection")
@SpringBootApplication
public class DemoApplication{

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private SubTaskRepository subTaskRepository;

	@Autowired
	private ProjectRepository projectRepository;

	@Autowired
	private MainTaskRepository mainTaskRepository;


	public static void main(String[] args) {
		final ApplicationContext ctx = SpringApplication.run(DemoApplication.class, args);
	}

	@Bean
	public WebMvcConfigurer corsConfigurer() {
		return new WebMvcConfigurer() {
			@Override
			public void addCorsMappings(CorsRegistry registry) {
				registry.addMapping("/**").allowedOrigins("http://localhost:3000");
			}
		};
	}
}
