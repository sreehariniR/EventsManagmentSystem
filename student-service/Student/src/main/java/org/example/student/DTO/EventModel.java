package org.example.student.DTO;

public class EventModel {
    private String id;
    private String eventName;
    private String date;
    private String description;
    // add any other fields you need

    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getEventName() { return eventName; }
    public void setEventName(String eventName) { this.eventName = eventName; }
    public String getDate() { return date; }
    public void setDate(String date) { this.date = date; }
}