package org.example.faculty.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import org.example.faculty.model.FacultyModel;

@Repository
public interface FacultyRepository extends MongoRepository<FacultyModel, String> {
    FacultyModel findByEmail(String email);
    boolean existsByEmail(String email);
}