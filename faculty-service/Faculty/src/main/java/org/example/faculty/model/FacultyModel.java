package org.example.faculty.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection="faculty")
@Data
public class FacultyModel {
    @Id
    private String facultyID;
    private String facultyName;
    private String email;
    private String password;
}
