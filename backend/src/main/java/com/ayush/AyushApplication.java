package com.ayush;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
public class AyushApplication {
    
    public static void main(String[] args) {
        SpringApplication.run(AyushApplication.class, args);
        System.out.println("========================================");
        System.out.println("AYUSH Healthcare Management System");
        System.out.println("Backend Server Started Successfully!");
        System.out.println("========================================");
        System.out.println("API Base URL: http://localhost:8080/api");
        System.out.println("Hospital API: http://localhost:8080/api/hospitals/anand");
        System.out.println("Doctor API: http://localhost:8080/api/doctors");
        System.out.println("Appointment API: http://localhost:8080/api/appointments");
        System.out.println("========================================");
    }
    
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/api/**")
                        .allowedOrigins("http://localhost:5173")
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                        .allowedHeaders("*")
                        .allowCredentials(true);
            }
        };
    }
}
