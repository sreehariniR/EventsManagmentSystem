package org.example.events.controller;
import org.example.events.model.EventModel;
import org.example.events.service.EventService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/stu_events")
public class EventController {
    private final EventService eventService;
    public EventController(EventService eventService){
        this.eventService=eventService;
    }

    @PostMapping("/")
    public ResponseEntity<EventModel> postEvent(@RequestBody EventModel event){
        return ResponseEntity.status(HttpStatus.CREATED).body(eventService.saveEvent(event));
    }

    @GetMapping("/faculty/{facultyID}")
    public ResponseEntity<List<EventModel>> getEventsByFacultyID(@PathVariable String facultyID){
        return ResponseEntity.status(HttpStatus.OK).body(eventService.getEventsByFacultyID(facultyID));

    }

    @GetMapping("eventsByMonth/{facultyID}/{month}")
    public ResponseEntity<List<EventModel>> getEventsByFacultyIDAndMonth(@PathVariable String facultyID,@PathVariable String month){
        return ResponseEntity.status(HttpStatus.OK).body(eventService.getEventsByFacultyIDAndMonth(facultyID,month));

    }

    @GetMapping("/student/{rollNo}")
    public ResponseEntity<List<EventModel>> getEventByRollNo(
            @PathVariable String rollNo){
        return ResponseEntity.status(HttpStatus.OK).body(eventService.getEventByRollNo(rollNo));
    }

    @GetMapping("/faculty/{faculty_id}/{rollNo}")
    public ResponseEntity<List<EventModel>> getEventByFacultyIDAndRollNo(
            @PathVariable String faculty_id,
            @PathVariable String rollNo){
        return ResponseEntity.status(HttpStatus.OK).body(eventService.getEventByFacultyIDAndRollNo(faculty_id,rollNo));
    }


    @PutMapping("{facultyID}/{rollNo}/{eventName}")
    public ResponseEntity<EventModel> updateEventByRollNo(
            @PathVariable String facultyID,
            @PathVariable String rollNo,
            @PathVariable String eventName,
            @RequestBody EventModel updatedEvent){
        EventModel event = eventService.updateEvent(facultyID,rollNo, eventName, updatedEvent);
        if(event == null){
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(event);
    }

    @DeleteMapping("/{facultyID}/{rollNo}/{eventName}")
    public ResponseEntity<Void> deleteEventByRollNo(@PathVariable String facultyID,@PathVariable String rollNo,@PathVariable String eventName){
        eventService.deleteEventByRollNoAndEventName(facultyID,rollNo,eventName);
        return ResponseEntity.noContent().build();
    }
}
