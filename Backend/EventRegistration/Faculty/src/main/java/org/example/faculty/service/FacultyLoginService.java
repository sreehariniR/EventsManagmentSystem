package org.example.faculty.service;
import org.example.events.model.EventModel;
import org.example.events.repository.EventRepository;
import org.example.faculty.model.FacultyModel;
import org.example.faculty.model.LoginModel;
import org.example.faculty.repository.FacultyRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Arrays;
import java.util.List;

@Service
public class FacultyLoginService {
    private final FacultyRepository facultyRepo;
    private final RestTemplate restTemplate;
    public FacultyLoginService(FacultyRepository facultyRepo, RestTemplate restTemplate){
        this.facultyRepo=facultyRepo;
        this.restTemplate=restTemplate;
    }

    public List<EventModel> loginFaculty(LoginModel loginDetails){
        FacultyModel faculty=facultyRepo.findByEmail(loginDetails.getEmail());
        if (faculty==null){
            return null;
        }
        else if (faculty.getPassword().equals(loginDetails.getPassword())){
            String url="http://localhost:8080/api/stu_events/faculty/"+faculty.getFacultyID();
            ResponseEntity<EventModel[]> response=restTemplate.getForEntity(url,EventModel[].class);
            if (response.getStatusCode().is2xxSuccessful()){
                assert response.getBody() != null;
                return Arrays.asList(response.getBody());
            }
        }
        return null;
    }


}
