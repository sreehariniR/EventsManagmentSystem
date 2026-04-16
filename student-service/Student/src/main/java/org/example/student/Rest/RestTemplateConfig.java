package org.example.student.Rest;

import org.springframework.beans.factory.annotation.Configurable;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;
//rest template is not available in our dependencies that is why we configure that
//synchronous-waits until it gets a response from the client
//asynchronous-WebClient
//OpenFeign is a third party library which is also used for making a communication between 2 services
@Configuration

public class RestTemplateConfig {
    @Bean

    public RestTemplate restTemplate(){
        return new RestTemplate();
    }

}
