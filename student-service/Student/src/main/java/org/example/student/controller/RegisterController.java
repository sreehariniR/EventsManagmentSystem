package org.example.student.controller;

import org.example.student.model.RegisterModel;
import org.example.student.service.RegisterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/student_register")
public class RegisterController {
    private final RegisterService registerService;
    RegisterController(RegisterService registerService){
        this.registerService=registerService;
    }

    @PostMapping("/")
    public ResponseEntity<RegisterModel> registerStudent(@RequestBody RegisterModel student){
        return ResponseEntity.ok(registerService.registerStudent(student));
    }

}
