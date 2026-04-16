package org.example.student.service;

import org.example.student.model.RegisterModel;
import org.example.student.repository.StudentRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RegisterService {
    private final StudentRepository repo;
    RegisterService(StudentRepository repo){
        this.repo=repo;
    }
    public RegisterModel registerStudent(RegisterModel student){
        return repo.save(student);
    }
    public List<RegisterModel> getStudents(){
        return repo.findAll();
    }

    public void deleteStudent(String rollNo){
        repo.deleteByRollNo(rollNo);
    }
}
