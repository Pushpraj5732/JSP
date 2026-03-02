package com.ayush.controller;

import com.ayush.model.Doctor;
import com.ayush.service.DoctorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/doctors")
@CrossOrigin(origins = "http://localhost:5173")
public class DoctorController {
    
    private final DoctorService doctorService;
    
    @Autowired
    public DoctorController(DoctorService doctorService) {
        this.doctorService = doctorService;
    }
    
    @GetMapping
    public ResponseEntity<Map<String, Object>> getDoctors(
            @RequestParam(required = false) Integer hospitalId,
            @RequestParam(required = false) String specialization) {
        
        List<Doctor> doctors;
        
        if (hospitalId != null) {
            doctors = doctorService.getDoctorsByHospitalId(hospitalId);
        } else if (specialization != null) {
            doctors = doctorService.getDoctorsBySpecialization(specialization);
        } else {
            doctors = doctorService.getAllDoctors();
        }
        
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("count", doctors.size());
        response.put("doctors", doctors);
        
        return ResponseEntity.ok(response);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Map<String, Object>> getDoctorById(@PathVariable Integer id) {
        Doctor doctor = doctorService.getDoctorById(id);
        
        Map<String, Object> response = new HashMap<>();
        
        if (doctor != null) {
            response.put("success", true);
            response.put("doctor", doctor);
            return ResponseEntity.ok(response);
        } else {
            response.put("success", false);
            response.put("message", "Doctor not found with id: " + id);
            return ResponseEntity.notFound().build();
        }
    }
    
    @GetMapping("/hospital/{hospitalId}")
    public ResponseEntity<Map<String, Object>> getDoctorsByHospitalId(@PathVariable Integer hospitalId) {
        List<Doctor> doctors = doctorService.getDoctorsByHospitalId(hospitalId);
        
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("count", doctors.size());
        response.put("hospitalId", hospitalId);
        response.put("doctors", doctors);
        
        return ResponseEntity.ok(response);
    }
    
    @GetMapping("/search")
    public ResponseEntity<Map<String, Object>> searchDoctors(@RequestParam String query) {
        List<Doctor> doctors = doctorService.searchDoctors(query);
        
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("count", doctors.size());
        response.put("query", query);
        response.put("doctors", doctors);
        
        return ResponseEntity.ok(response);
    }
    
    @GetMapping("/count")
    public ResponseEntity<Map<String, Object>> getDoctorCount(
            @RequestParam(required = false) Integer hospitalId) {
        
        int count;
        if (hospitalId != null) {
            count = doctorService.getDoctorCountByHospitalId(hospitalId);
        } else {
            count = doctorService.getTotalDoctorCount();
        }
        
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("totalDoctors", count);
        
        return ResponseEntity.ok(response);
    }
}
