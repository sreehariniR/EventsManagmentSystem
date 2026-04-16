package org.example.events.repository;
import jdk.jfr.Event;
import org.example.events.model.EventModel;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EventRepository extends MongoRepository<EventModel,String> {
    List<EventModel> findAllByFacultyID(String facultyID);
    List<EventModel> findAllByRollNo(String rollNo);
    void deleteByRollNo(String rollNo);
    EventModel findByRollNoAndEventName(String rollNo,String eventName);
    List<EventModel> findAllByFacultyIDAndEventDateStartsWith(String facultyID, String month);
    void deleteByFacultyIDAndRollNoAndEventName(String facultyID,String rollNo, String eventName);
    EventModel findByFacultyIDAndRollNoAndEventName(String FacultyID,String rollNo, String eventName);

    List<EventModel> findAllByFacultyIDAndRollNo(String facultyID, String rollNo);
}