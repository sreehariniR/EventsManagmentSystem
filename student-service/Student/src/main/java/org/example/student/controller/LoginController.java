package org.example.student.controller;

import org.example.student.DTO.EventModel;
import org.example.student.model.LoginModel;
import org.example.student.service.LoginService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = {"http://localhost:5173",
        "https://events-management-system-teti.vercel.app"})
@RestController
@RequestMapping("/login")
public class LoginController {
    public final LoginService loginService;
    public LoginController(LoginService loginService){
        this.loginService=loginService;
    }

    @PostMapping("/")
    public List<EventModel> fetchEvents(@RequestBody LoginModel login){
        return loginService.fetchEvents(login);
    }
}
