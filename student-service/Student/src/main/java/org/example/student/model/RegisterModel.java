package org.example.student.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection="students")
@Data
public class RegisterModel {
    @Id
    private String id;
    private String studentName;
    private String rollNo;
    private String password;
    private String email;
}
