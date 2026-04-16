package org.example.faculty.service;
import org.example.events.model.EventModel;
import org.example.faculty.model.FacultyModel;
import org.example.faculty.repository.FacultyRepository;
import org.jspecify.annotations.Nullable;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

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
    public FacultyModel registerFaculty(FacultyModel faculty){
        return repo.save(faculty);
    }
     public EventModel addEvent(EventModel event,String facultyID){
         String url="http://localhost:8080/api/stu_events/";
         ResponseEntity<EventModel> response=restTemplate.postForEntity(url,event,EventModel.class);
         if( response.getStatusCode().is2xxSuccessful()){
             return response.getBody();
         }
         return null;
     }
    public List<EventModel> getEvents(String facultyID){
        String url="http://localhost:8080/api/stu_events/faculty/"+facultyID;
        ResponseEntity<EventModel[]> response=restTemplate.getForEntity(url,EventModel[].class);
        if( response.getStatusCode().is2xxSuccessful()){
            return Arrays.asList(response.getBody());
        }
        return null;
    }

    public List<EventModel> viewEventsByMonth(String facultyID,String month){
         String url="http://localhost:8080/api/stu_events/eventsByMonth/"+facultyID+"/"+month;
         ResponseEntity<EventModel[]> response=restTemplate.getForEntity(url,EventModel[].class);
         if( response.getStatusCode().is2xxSuccessful()){
             return Arrays.asList(response.getBody());
         }
         return null;
     }


    public void deleteEvent(String facultyID, String rollNo, String eventName) {
        String url = "http://localhost:8080/api/stu_events/" + facultyID + "/" + rollNo + "/" + eventName;
        restTemplate.delete(url);
    }


    public EventModel updateEvent(String facultyID, String rollNo, String eventName, EventModel updatedEvent) {
        String url = "http://localhost:8080/api/stu_events/" + facultyID + "/" + rollNo + "/" + eventName;
        HttpEntity<EventModel> request = new HttpEntity<>(updatedEvent);
        ResponseEntity<EventModel> response =
                restTemplate.exchange(url, HttpMethod.PUT, request, EventModel.class);
        if(response.getStatusCode().is2xxSuccessful()){
            return response.getBody();
        }
        return null;
    }

    public EventModel registerEvent(EventModel event) {
        String url="http://localhost:8080/api/stu_events/";
        ResponseEntity<EventModel> response=restTemplate.postForEntity(url,event,EventModel.class);
        if( response.getStatusCode().is2xxSuccessful()){
            return response.getBody();
        }
        return null;
    }


    public List<EventModel> getEventsByRollNo(String facultyID, String rollNo) {
        String url="http://localhost:8080/api/stu_events/faculty/"+facultyID+"/"+rollNo;
        ResponseEntity<EventModel[]> response=restTemplate.getForEntity(url,EventModel[].class);
        if(response.getStatusCode().is2xxSuccessful()){
            return Arrays.asList(response.getBody());
        }
        return null;
    }
}
