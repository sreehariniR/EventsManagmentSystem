package org.example.faculty.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.example.faculty.model.FacultyModel;
public interface FacultyRepository extends MongoRepository<FacultyModel,String> {
    FacultyModel findByEmail(String email);
}
