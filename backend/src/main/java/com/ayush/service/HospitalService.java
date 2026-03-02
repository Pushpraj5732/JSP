package com.ayush.service;

import com.ayush.model.Hospital;
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
public class HospitalService {
    
    private List<Hospital> hospitals = new ArrayList<>();
    private final ObjectMapper objectMapper = new ObjectMapper();
    
    @PostConstruct
    public void init() {
        loadHospitals();
    }
    
    private void loadHospitals() {
        try {
            ClassPathResource resource = new ClassPathResource("data/hospitals_anand.json");
            InputStream inputStream = resource.getInputStream();
            hospitals = objectMapper.readValue(inputStream, new TypeReference<List<Hospital>>() {});
            System.out.println("Loaded " + hospitals.size() + " hospitals from JSON file");
        } catch (IOException e) {
            System.err.println("Error loading hospitals: " + e.getMessage());
            hospitals = new ArrayList<>();
        }
    }
    
    public List<Hospital> getAllHospitals() {
        return new ArrayList<>(hospitals);
    }
    
    public List<Hospital> getHospitalsByCity(String city) {
        return hospitals.stream()
                .filter(h -> h.getAddress() != null && 
                        h.getAddress().toLowerCase().contains(city.toLowerCase()))
                .collect(Collectors.toList());
    }
    
    public Hospital getHospitalById(Integer id) {
        return hospitals.stream()
                .filter(h -> h.getId().equals(id))
                .findFirst()
                .orElse(null);
    }
    
    public List<Hospital> searchHospitals(String query) {
        String lowerQuery = query.toLowerCase();
        return hospitals.stream()
                .filter(h -> 
                    (h.getHospitalName() != null && h.getHospitalName().toLowerCase().contains(lowerQuery)) ||
                    (h.getAddress() != null && h.getAddress().toLowerCase().contains(lowerQuery)) ||
                    (h.getType() != null && h.getType().toLowerCase().contains(lowerQuery))
                )
                .collect(Collectors.toList());
    }
    
    public int getTotalHospitalCount() {
        return hospitals.size();
    }
}
