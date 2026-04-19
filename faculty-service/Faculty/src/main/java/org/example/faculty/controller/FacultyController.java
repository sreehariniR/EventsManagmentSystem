package org.example.faculty.controller;
import org.example.faculty.DTO.EventModel;
import org.example.faculty.model.FacultyModel;
import org.example.faculty.service.FacultyService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = {"http://localhost:5173",
        "https://events-management-system-teti.vercel.app"})
@RestController
@RequestMapping("/faculty")
public class FacultyController {
    private final FacultyService facultyService;

    public FacultyController(FacultyService facultyService){
        this.facultyService=facultyService;
    }

    @PostMapping("/")
    public ResponseEntity<FacultyModel> registerFaculty(@RequestBody FacultyModel faculty){
        return ResponseEntity.status(HttpStatus.CREATED).body(facultyService.registerFaculty(faculty));
    }

    @PostMapping("/events")
    public ResponseEntity<EventModel> registerEvent(@RequestBody EventModel event){
        return ResponseEntity.status(HttpStatus.CREATED).body(facultyService.registerEvent(event));
    }

    @GetMapping("/events/{facultyID}")
    public ResponseEntity<List<EventModel>> getEvents(@PathVariable String facultyID){
        return ResponseEntity.status(HttpStatus.OK).body(facultyService.getEvents(facultyID));
    }

    @GetMapping("/events/{facultyID}/{rollNo}")
    public ResponseEntity<List<EventModel>> getEventsByRollNo(@PathVariable String facultyID,@PathVariable String rollNo){
        return ResponseEntity.status(HttpStatus.OK).body(facultyService.getEventsByRollNo(facultyID,rollNo));
    }



    @GetMapping("/eventsbymonth/{month}/{facultyID}")
    public ResponseEntity<List<EventModel>> getEventsByMonth(@PathVariable String month,@PathVariable String facultyID){
        return ResponseEntity.status(HttpStatus.OK).body(facultyService.viewEventsByMonth(facultyID,month));
    }

    @DeleteMapping("/{facultyID}/{rollNo}/{eventName}")
    public ResponseEntity<Void> deleteEvents(@PathVariable String facultyID,@PathVariable String rollNo,@PathVariable String eventName){
        facultyService.deleteEvent(facultyID,rollNo,eventName);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{facultyID}/{rollNo}/{eventName}")
    public ResponseEntity<EventModel> updateEventByRollNo(
            @PathVariable String facultyID,
            @PathVariable String rollNo,
            @PathVariable String eventName,
            @RequestBody EventModel updatedEvent){
        EventModel event = facultyService.updateEvent(facultyID,rollNo, eventName, updatedEvent);
        if(event == null){
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(event);
    }

}
