package org.example.faculty;

import jakarta.annotation.PostConstruct;

import org.jspecify.annotations.NonNull;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
public class FacultyApplication {

    public static void main(String[] args) {
        SpringApplication.run(FacultyApplication.class, args);
    }
    @Value("${spring.data.mongodb.uri:NOT_FOUND}")
    private String mongoUri;



    @PostConstruct
    public void checkMongo() {
        System.out.println("MONGO URI = " + mongoUri);
    }


}
