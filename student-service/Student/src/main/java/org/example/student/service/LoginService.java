package org.example.student.service;

import org.example.events.model.EventModel;
import org.example.events.repository.EventRepository;
import org.example.student.Rest.RestTemplateConfig;
import org.example.student.model.LoginModel;
import org.example.student.model.RegisterModel;
import org.example.student.repository.StudentRepository;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.lang.reflect.Array;
import java.util.Arrays;
import java.util.List;

@Service
public class LoginService {
    public final StudentRepository studentRepo;
    public final RestTemplate restTemplate;
    public LoginService(StudentRepository studentRepo, RestTemplate restTemplate){
        this.studentRepo=studentRepo;
        this.restTemplate = restTemplate;
    }

    public List<EventModel> fetchEvents(LoginModel loginDetails){
        RegisterModel studentDetails=studentRepo.findByEmail(loginDetails.getEmail());
        if (studentDetails==null){
            return null;
        }
        if(studentDetails.getPassword().equals(loginDetails.getPassword())){
            String EventURL="http://localhost:8080/api/stu_events/student/"+studentDetails.getRollNo();
            ResponseEntity<EventModel[]> response=restTemplate.getForEntity(EventURL,EventModel[].class);
            if (response.getStatusCode().is2xxSuccessful()){
                return Arrays.asList(response.getBody());
            }
        }
        return null;
    }

}
//response entity is used to customise the http request which consists of the header,body and status code