package com.ayush.controller;

import com.ayush.model.Appointment;
import com.ayush.service.AppointmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/appointments")
@CrossOrigin(origins = "http://localhost:5173")
public class AppointmentController {
    
    private final AppointmentService appointmentService;
    
    @Autowired
    public AppointmentController(AppointmentService appointmentService) {
        this.appointmentService = appointmentService;
    }
    
    @PostMapping
    public ResponseEntity<Map<String, Object>> createAppointment(@RequestBody Appointment appointment) {
        Map<String, Object> response = new HashMap<>();
        
        try {
            // Validate required fields
            if (appointment.getPatientName() == null || appointment.getPatientName().trim().isEmpty()) {
                response.put("success", false);
                response.put("message", "Patient name is required");
                return ResponseEntity.badRequest().body(response);
            }
            
            if (appointment.getDoctorId() == null) {
                response.put("success", false);
                response.put("message", "Doctor ID is required");
                return ResponseEntity.badRequest().body(response);
            }
            
            if (appointment.getHospitalId() == null) {
                response.put("success", false);
                response.put("message", "Hospital ID is required");
                return ResponseEntity.badRequest().body(response);
            }
            
            if (appointment.getAppointmentDate() == null || appointment.getAppointmentDate().trim().isEmpty()) {
                response.put("success", false);
                response.put("message", "Appointment date is required");
                return ResponseEntity.badRequest().body(response);
            }
            
            if (appointment.getAppointmentTime() == null || appointment.getAppointmentTime().trim().isEmpty()) {
                response.put("success", false);
                response.put("message", "Appointment time is required");
                return ResponseEntity.badRequest().body(response);
            }
            
            Appointment savedAppointment = appointmentService.createAppointment(appointment);
            
            response.put("success", true);
            response.put("message", "Appointment booked successfully");
            response.put("appointment", savedAppointment);
            
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
            
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Error creating appointment: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
    
    @GetMapping
    public ResponseEntity<Map<String, Object>> getAllAppointments(
            @RequestParam(required = false) String patientEmail,
            @RequestParam(required = false) Integer doctorId,
            @RequestParam(required = false) Integer hospitalId) {
        
        List<Appointment> appointments;
        
        if (patientEmail != null) {
            appointments = appointmentService.getAppointmentsByPatientEmail(patientEmail);
        } else if (doctorId != null) {
            appointments = appointmentService.getAppointmentsByDoctorId(doctorId);
        } else if (hospitalId != null) {
            appointments = appointmentService.getAppointmentsByHospitalId(hospitalId);
        } else {
            appointments = appointmentService.getAllAppointments();
        }
        
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("count", appointments.size());
        response.put("appointments", appointments);
        
        return ResponseEntity.ok(response);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Map<String, Object>> getAppointmentById(@PathVariable Integer id) {
        Appointment appointment = appointmentService.getAppointmentById(id);
        
        Map<String, Object> response = new HashMap<>();
        
        if (appointment != null) {
            response.put("success", true);
            response.put("appointment", appointment);
            return ResponseEntity.ok(response);
        } else {
            response.put("success", false);
            response.put("message", "Appointment not found with id: " + id);
            return ResponseEntity.notFound().build();
        }
    }
    
    @PutMapping("/{id}/status")
    public ResponseEntity<Map<String, Object>> updateAppointmentStatus(
            @PathVariable Integer id,
            @RequestParam String status) {
        
        Appointment appointment = appointmentService.updateAppointmentStatus(id, status);
        
        Map<String, Object> response = new HashMap<>();
        
        if (appointment != null) {
            response.put("success", true);
            response.put("message", "Appointment status updated successfully");
            response.put("appointment", appointment);
            return ResponseEntity.ok(response);
        } else {
            response.put("success", false);
            response.put("message", "Appointment not found with id: " + id);
            return ResponseEntity.notFound().build();
        }
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, Object>> deleteAppointment(@PathVariable Integer id) {
        boolean deleted = appointmentService.deleteAppointment(id);
        
        Map<String, Object> response = new HashMap<>();
        
        if (deleted) {
            response.put("success", true);
            response.put("message", "Appointment deleted successfully");
            return ResponseEntity.ok(response);
        } else {
            response.put("success", false);
            response.put("message", "Appointment not found with id: " + id);
            return ResponseEntity.notFound().build();
        }
    }
    
    @GetMapping("/count")
    public ResponseEntity<Map<String, Object>> getAppointmentCount(
            @RequestParam(required = false) String status) {
        
        int count;
        if (status != null) {
            count = appointmentService.getAppointmentCountByStatus(status);
        } else {
            count = appointmentService.getTotalAppointmentCount();
        }
        
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("totalAppointments", count);
        
        return ResponseEntity.ok(response);
    }
}
