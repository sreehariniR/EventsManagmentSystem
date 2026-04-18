package org.example.faculty.service;
import org.example.faculty.DTO.EventModel;
import org.example.faculty.model.FacultyModel;
import org.example.faculty.repository.FacultyRepository;
import org.jspecify.annotations.Nullable;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.server.ResponseStatusException;

import java.util.Arrays;
import java.util.List;

@Service
public class FacultyService {
    private final FacultyRepository repo;
    private final RestTemplate restTemplate;
    public FacultyService(FacultyRepository repo,RestTemplate restTemplate){
        this.repo=repo;
        this.restTemplate=restTemplate;
    }

    private String getEventServiceUrl() {
        String url = System.getenv("EVENT_SERVICE_URL");
        return url != null ? url : "http://localhost:8080";
    }

    public FacultyModel registerFaculty(FacultyModel faculty){

        if(faculty.getFacultyName() == null || faculty.getFacultyName().isBlank()){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Faculty name is required");
        }

        if(faculty.getEmail() == null || faculty.getEmail().isBlank()){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Email is required");
        }

        if(faculty.getPassword() == null || faculty.getPassword().isBlank()){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Password is required");
        }

        if(!faculty.getEmail().matches("^[A-Za-z0-9+_.-]+@(.+)$")){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid email format");
        }

        if(repo.existsByEmail(faculty.getEmail())){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Email already exists");
        }

        String password = faculty.getPassword();

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

        return repo.save(faculty);
    }
     public EventModel addEvent(EventModel event,String facultyID){
         String url = getEventServiceUrl() + "/api/stu_events/";
         ResponseEntity<EventModel> response=restTemplate.postForEntity(url,event,EventModel.class);
         if( response.getStatusCode().is2xxSuccessful()){
             return response.getBody();
         }
         return null;
     }
    public List<EventModel> getEvents(String facultyID){
        String url = getEventServiceUrl() + "/api/stu_events/"+facultyID;
        ResponseEntity<EventModel[]> response=restTemplate.getForEntity(url,EventModel[].class);
        if( response.getStatusCode().is2xxSuccessful()){
            return Arrays.asList(response.getBody());
        }
        return null;
    }

    public List<EventModel> viewEventsByMonth(String facultyID,String month){
        String url = getEventServiceUrl() + "/api/stu_events/"+facultyID+"/"+month;
         ResponseEntity<EventModel[]> response=restTemplate.getForEntity(url,EventModel[].class);
         if( response.getStatusCode().is2xxSuccessful()){
             return Arrays.asList(response.getBody());
         }
         return null;
     }


    public void deleteEvent(String facultyID, String rollNo, String eventName) {
        String url = getEventServiceUrl() + "/api/stu_events/"+ facultyID + "/" + rollNo + "/" + eventName;
        restTemplate.delete(url);
    }


    public EventModel updateEvent(String facultyID, String rollNo, String eventName, EventModel updatedEvent) {
        String url = getEventServiceUrl() + "/api/stu_events/"+ facultyID + "/" + rollNo + "/" + eventName;
        HttpEntity<EventModel> request = new HttpEntity<>(updatedEvent);
        ResponseEntity<EventModel> response =
                restTemplate.exchange(url, HttpMethod.PUT, request, EventModel.class);
        if(response.getStatusCode().is2xxSuccessful()){
            return response.getBody();
        }
        return null;
    }

    public EventModel registerEvent(EventModel event) {
        String url = getEventServiceUrl() + "/api/stu_events/";
        ResponseEntity<EventModel> response=restTemplate.postForEntity(url,event,EventModel.class);
        if( response.getStatusCode().is2xxSuccessful()){
            return response.getBody();
        }
        return null;
    }


    public List<EventModel> getEventsByRollNo(String facultyID, String rollNo) {
        String url = getEventServiceUrl() + "/api/stu_events/"+facultyID+"/"+rollNo;
        ResponseEntity<EventModel[]> response=restTemplate.getForEntity(url,EventModel[].class);
        if(response.getStatusCode().is2xxSuccessful()){
            return Arrays.asList(response.getBody());
        }
        return null;
    }
}
