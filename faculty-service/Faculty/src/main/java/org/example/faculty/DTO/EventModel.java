package org.example.faculty.DTO;

public class EventModel {
    private String id;
    private String eventName;
    private String date;
    private String description;
    private String location;

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getEventName() { return eventName; }
    public void setEventName(String eventName) { this.eventName = eventName; }
    public String getDate() { return date; }
    public void setDate(String date) { this.date = date; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }
}