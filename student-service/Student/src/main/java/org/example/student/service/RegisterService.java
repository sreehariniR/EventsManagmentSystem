package org.example.student.service;

import org.example.student.model.RegisterModel;
import org.example.student.repository.StudentRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class RegisterService {
    private final StudentRepository repo;
    RegisterService(StudentRepository repo){
        this.repo=repo;
    }
    public RegisterModel registerStudent(RegisterModel student){

        if(student.getStudentName() == null || student.getStudentName().isBlank()){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Student name is required");
        }

        if(student.getEmail() == null || student.getEmail().isBlank()){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Email is required");
        }

        if(student.getPassword() == null || student.getPassword().isBlank()){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Password is required");
        }

        if(student.getRollNo() == null || student.getRollNo().isBlank()){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Roll number is required");
        }

        if(!student.getEmail().matches("^[A-Za-z0-9+_.-]+@(.+)$")){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid email format");
        }

        if(repo.existsByEmail(student.getEmail())){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Email already exists");
        }

        if(repo.existsByRollNo(student.getRollNo())){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Roll number already exists");
        }

        String password = student.getPassword();

        if(password.length() < 8 ||
                !password.matches(".*[A-Z].*") ||
                !password.matches(".*[a-z].*") ||
                !password.matches(".*\\d.*") ||
                !password.matches(".*[@$!%*?&].*")) {

            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Password must be at least 8 characters and include uppercase, lowercase, number, and special character"
            );
        }

        return repo.save(student);
    }
    public List<RegisterModel> getStudents(){
        return repo.findAll();
    }

    public void deleteStudent(String rollNo){
        repo.deleteByRollNo(rollNo);
    }
}
