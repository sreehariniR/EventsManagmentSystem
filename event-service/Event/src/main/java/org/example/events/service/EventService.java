package org.example.events.service;

import org.example.events.model.EventModel;
import org.example.events.repository.EventRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class EventService {
    private final EventRepository repo;
    public EventService(EventRepository repo){
        this.repo=repo;
    }
    public EventModel saveEvent(EventModel saveEvent){
        List<EventModel>events=repo.findAllByRollNo(saveEvent.getRollNo());
        for(EventModel event:events){
            if(event.getEventName().equals(saveEvent.getEventName())){
                throw new ResponseStatusException(HttpStatus.CONFLICT, "Event already registered for this student");
            }
        }
        return repo.save(saveEvent);
    }

    public List<EventModel> getEventsByFacultyID(String facultyID){
        return repo.findAllByFacultyID(facultyID);
    }
    public List<EventModel> getEventsByFacultyIDAndMonth(String facultyID,String month){
        return repo.findAllByFacultyIDAndEventDateStartsWith(facultyID,month);
    }

    public List<EventModel> getEventByRollNo(String rollNo){
        return repo.findAllByRollNo(rollNo);
    }

    public EventModel updateEvent(String facultyID,String rollNo,String eventName,EventModel updatedEvent){
        EventModel event=repo.findByFacultyIDAndRollNoAndEventName(facultyID,rollNo,eventName);
        if(event==null){
            return null;
        }
        event.setEventName(updatedEvent.getEventName());
        event.setEventLocation(updatedEvent.getEventLocation());
        event.setEventDescription(updatedEvent.getEventDescription());
        return repo.save(event);
    }

    public void deleteEventByRollNoAndEventName(String facultyID,String rollNo,String eventName){
        repo.deleteByFacultyIDAndRollNoAndEventName(facultyID,rollNo,eventName);
    }

    public List<EventModel> getEventByFacultyIDAndRollNo(String facultyID,String rollNo) {
        return repo.findAllByFacultyIDAndRollNo(facultyID,rollNo);
    }
}