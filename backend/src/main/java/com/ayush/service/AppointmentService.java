package com.ayush.service;

import com.ayush.model.Appointment;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import jakarta.annotation.PostConstruct;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.stream.Collectors;

@Service
public class AppointmentService {
    
    private List<Appointment> appointments = new ArrayList<>();
    private final ObjectMapper objectMapper;
    private final AtomicInteger idGenerator;
    private Path appointmentsFilePath;
    
    public AppointmentService() {
        this.objectMapper = new ObjectMapper();
        this.objectMapper.registerModule(new JavaTimeModule());
        this.objectMapper.disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);
        this.objectMapper.enable(SerializationFeature.INDENT_OUTPUT);
        this.idGenerator = new AtomicInteger(1);
    }
    
    @PostConstruct
    public void init() {
        initializeFilePath();
        loadAppointments();
    }
    
    private void initializeFilePath() {
        try {
            // Try to find or create the appointments.json file
            String userDir = System.getProperty("user.dir");
            Path dataDir = Paths.get(userDir, "src", "main", "resources", "data");
            
            if (!Files.exists(dataDir)) {
                Files.createDirectories(dataDir);
            }
            
            appointmentsFilePath = dataDir.resolve("appointments.json");
            
            if (!Files.exists(appointmentsFilePath)) {
                Files.createFile(appointmentsFilePath);
                Files.write(appointmentsFilePath, "[]".getBytes());
            }
            
            System.out.println("Appointments file path: " + appointmentsFilePath.toAbsolutePath());
        } catch (IOException e) {
            System.err.println("Error initializing appointments file: " + e.getMessage());
            // Fallback to classpath resource
            appointmentsFilePath = null;
        }
    }
    
    private void loadAppointments() {
        try {
            InputStream inputStream;
            
            if (appointmentsFilePath != null && Files.exists(appointmentsFilePath)) {
                inputStream = Files.newInputStream(appointmentsFilePath);
            } else {
                ClassPathResource resource = new ClassPathResource("data/appointments.json");
                if (!resource.exists()) {
                    appointments = new ArrayList<>();
                    return;
                }
                inputStream = resource.getInputStream();
            }
            
            appointments = objectMapper.readValue(inputStream, new TypeReference<List<Appointment>>() {});
            
            // Set the ID generator to the next available ID
            int maxId = appointments.stream()
                    .mapToInt(Appointment::getId)
                    .max()
                    .orElse(0);
            idGenerator.set(maxId + 1);
            
            System.out.println("Loaded " + appointments.size() + " appointments from JSON file");
        } catch (IOException e) {
            System.err.println("Error loading appointments: " + e.getMessage());
            appointments = new ArrayList<>();
        }
    }
    
    private void saveAppointments() {
        try {
            if (appointmentsFilePath != null) {
                objectMapper.writeValue(appointmentsFilePath.toFile(), appointments);
                System.out.println("Saved " + appointments.size() + " appointments to JSON file");
            } else {
                System.err.println("Cannot save appointments: file path not initialized");
            }
        } catch (IOException e) {
            System.err.println("Error saving appointments: " + e.getMessage());
            throw new RuntimeException("Failed to save appointment", e);
        }
    }
    
    public Appointment createAppointment(Appointment appointment) {
        appointment.setId(idGenerator.getAndIncrement());
        appointment.setStatus("Scheduled");
        appointment.setCreatedAt(LocalDateTime.now().format(DateTimeFormatter.ISO_LOCAL_DATE_TIME));
        
        appointments.add(appointment);
        saveAppointments();
        
        return appointment;
    }
    
    public List<Appointment> getAllAppointments() {
        return new ArrayList<>(appointments);
    }
    
    public Appointment getAppointmentById(Integer id) {
        return appointments.stream()
                .filter(a -> a.getId().equals(id))
                .findFirst()
                .orElse(null);
    }
    
    public List<Appointment> getAppointmentsByPatientEmail(String patientEmail) {
        return appointments.stream()
                .filter(a -> a.getPatientEmail() != null && 
                        a.getPatientEmail().equalsIgnoreCase(patientEmail))
                .collect(Collectors.toList());
    }
    
    public List<Appointment> getAppointmentsByDoctorId(Integer doctorId) {
        return appointments.stream()
                .filter(a -> a.getDoctorId().equals(doctorId))
                .collect(Collectors.toList());
    }
    
    public List<Appointment> getAppointmentsByHospitalId(Integer hospitalId) {
        return appointments.stream()
                .filter(a -> a.getHospitalId().equals(hospitalId))
                .collect(Collectors.toList());
    }
    
    public Appointment updateAppointmentStatus(Integer id, String status) {
        Appointment appointment = getAppointmentById(id);
        if (appointment != null) {
            appointment.setStatus(status);
            saveAppointments();
        }
        return appointment;
    }
    
    public boolean deleteAppointment(Integer id) {
        boolean removed = appointments.removeIf(a -> a.getId().equals(id));
        if (removed) {
            saveAppointments();
        }
        return removed;
    }
    
    public int getTotalAppointmentCount() {
        return appointments.size();
    }
    
    public int getAppointmentCountByStatus(String status) {
        return (int) appointments.stream()
                .filter(a -> a.getStatus() != null && a.getStatus().equalsIgnoreCase(status))
                .count();
    }
}
