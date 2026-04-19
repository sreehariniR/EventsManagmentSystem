package org.example.faculty.controller;

import org.example.faculty.DTO.EventModel;
import org.example.faculty.model.FacultyModel;
import org.example.faculty.model.LoginModel;
import org.example.faculty.service.FacultyLoginService;
import org.example.faculty.service.FacultyService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = {"http://localhost:5173",
        "https://events-management-system-teti.vercel.app"})
@RestController
@RequestMapping("/facultylogin")
public class LoginController {
    private final FacultyLoginService facultyLoginService;
    public LoginController(FacultyLoginService facultyLoginService){
        this.facultyLoginService=facultyLoginService;
    }
    @PostMapping("/")
    public ResponseEntity<List<EventModel>> loginFaculty(@RequestBody LoginModel loginDetails){
        return ResponseEntity.ok(facultyLoginService.loginFaculty(loginDetails));
    }
}
