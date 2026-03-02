package com.ayush.service;

import com.ayush.model.Doctor;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.annotation.PostConstruct;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class DoctorService {
    
    private List<Doctor> doctors = new ArrayList<>();
    private final ObjectMapper objectMapper = new ObjectMapper();
    
    @PostConstruct
    public void init() {
        loadDoctors();
    }
    
    private void loadDoctors() {
        try {
            ClassPathResource resource = new ClassPathResource("data/doctors.json");
            InputStream inputStream = resource.getInputStream();
            doctors = objectMapper.readValue(inputStream, new TypeReference<List<Doctor>>() {});
            System.out.println("Loaded " + doctors.size() + " doctors from JSON file");
        } catch (IOException e) {
            System.err.println("Error loading doctors: " + e.getMessage());
            doctors = new ArrayList<>();
        }
    }
    
    public List<Doctor> getAllDoctors() {
        return new ArrayList<>(doctors);
    }
    
    public List<Doctor> getDoctorsByHospitalId(Integer hospitalId) {
        return doctors.stream()
                .filter(d -> d.getHospitalId().equals(hospitalId))
                .collect(Collectors.toList());
    }
    
    public Doctor getDoctorById(Integer id) {
        return doctors.stream()
                .filter(d -> d.getId().equals(id))
                .findFirst()
                .orElse(null);
    }
    
    public List<Doctor> getDoctorsBySpecialization(String specialization) {
        return doctors.stream()
                .filter(d -> d.getSpecialization() != null && 
                        d.getSpecialization().equalsIgnoreCase(specialization))
                .collect(Collectors.toList());
    }
    
    public List<Doctor> searchDoctors(String query) {
        String lowerQuery = query.toLowerCase();
        return doctors.stream()
                .filter(d -> 
                    (d.getName() != null && d.getName().toLowerCase().contains(lowerQuery)) ||
                    (d.getSpecialization() != null && d.getSpecialization().toLowerCase().contains(lowerQuery)) ||
                    (d.getQualification() != null && d.getQualification().toLowerCase().contains(lowerQuery))
                )
                .collect(Collectors.toList());
    }
    
    public int getTotalDoctorCount() {
        return doctors.size();
    }
    
    public int getDoctorCountByHospitalId(Integer hospitalId) {
        return (int) doctors.stream()
                .filter(d -> d.getHospitalId().equals(hospitalId))
                .count();
    }
}
