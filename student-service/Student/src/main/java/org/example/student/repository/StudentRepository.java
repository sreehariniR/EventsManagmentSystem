package org.example.student.repository;

import org.example.student.model.RegisterModel;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StudentRepository extends MongoRepository<RegisterModel,String> {
    public void deleteByRollNo(String rollNo);
    public RegisterModel findByEmail(String email);
}
