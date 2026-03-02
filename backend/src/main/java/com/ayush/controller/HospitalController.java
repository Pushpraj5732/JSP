package com.ayush.controller;

import com.ayush.model.Hospital;
import com.ayush.service.HospitalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/hospitals")
@CrossOrigin(origins = "http://localhost:5173")
public class HospitalController {
    
    private final HospitalService hospitalService;
    
    @Autowired
    public HospitalController(HospitalService hospitalService) {
        this.hospitalService = hospitalService;
    }
    
    @GetMapping("/anand")
    public ResponseEntity<Map<String, Object>> getAnandHospitals() {
        List<Hospital> hospitals = hospitalService.getAllHospitals();
        
        Map<String, Object> metadata = new HashMap<>();
        metadata.put("city", "Anand");
        metadata.put("totalHospitals", hospitals.size());
        
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("metadata", metadata);
        response.put("hospitals", hospitals);
        
        return ResponseEntity.ok(response);
    }
    
    @GetMapping
    public ResponseEntity<Map<String, Object>> getAllHospitals() {
        List<Hospital> hospitals = hospitalService.getAllHospitals();
        
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("count", hospitals.size());
        response.put("hospitals", hospitals);
        
        return ResponseEntity.ok(response);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Map<String, Object>> getHospitalById(@PathVariable Integer id) {
        Hospital hospital = hospitalService.getHospitalById(id);
        
        Map<String, Object> response = new HashMap<>();
        
        if (hospital != null) {
            response.put("success", true);
            response.put("hospital", hospital);
            return ResponseEntity.ok(response);
        } else {
            response.put("success", false);
            response.put("message", "Hospital not found with id: " + id);
            return ResponseEntity.notFound().build();
        }
    }
    
    @GetMapping("/search")
    public ResponseEntity<Map<String, Object>> searchHospitals(@RequestParam String query) {
        List<Hospital> hospitals = hospitalService.searchHospitals(query);
        
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("count", hospitals.size());
        response.put("query", query);
        response.put("hospitals", hospitals);
        
        return ResponseEntity.ok(response);
    }
    
    @GetMapping("/count")
    public ResponseEntity<Map<String, Object>> getHospitalCount() {
        int count = hospitalService.getTotalHospitalCount();
        
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("totalHospitals", count);
        
        return ResponseEntity.ok(response);
    }
}
