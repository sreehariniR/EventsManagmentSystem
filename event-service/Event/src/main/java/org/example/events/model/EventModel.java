package org.example.events.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection="events")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class EventModel {
    @Id
    private String id;
    private String studentName;
    private String rollNo;
    private String eventName;
    private String eventDate;
    private String eventLocation;
    private String eventDescription;
    private String facultyID;
}
