package com.ayush.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Appointment {
    
    @JsonProperty("id")
    private Integer id;
    
    @JsonProperty("patientName")
    private String patientName;
    
    @JsonProperty("patientEmail")
    private String patientEmail;
    
    @JsonProperty("patientContact")
    private String patientContact;
    
    @JsonProperty("doctorId")
    private Integer doctorId;
    
    @JsonProperty("doctorName")
    private String doctorName;
    
    @JsonProperty("hospitalId")
    private Integer hospitalId;
    
    @JsonProperty("hospitalName")
    private String hospitalName;
    
    @JsonProperty("appointmentDate")
    private String appointmentDate;
    
    @JsonProperty("appointmentTime")
    private String appointmentTime;
    
    @JsonProperty("status")
    private String status;
    
    @JsonProperty("symptoms")
    private String symptoms;
    
    @JsonProperty("createdAt")
    private String createdAt;
    
    public Appointment() {
    }
    
    public Appointment(Integer id, String patientName, String patientEmail, String patientContact,
                       Integer doctorId, String doctorName, Integer hospitalId, String hospitalName,
                       String appointmentDate, String appointmentTime, String status, String symptoms, String createdAt) {
        this.id = id;
        this.patientName = patientName;
        this.patientEmail = patientEmail;
        this.patientContact = patientContact;
        this.doctorId = doctorId;
        this.doctorName = doctorName;
        this.hospitalId = hospitalId;
        this.hospitalName = hospitalName;
        this.appointmentDate = appointmentDate;
        this.appointmentTime = appointmentTime;
        this.status = status;
        this.symptoms = symptoms;
        this.createdAt = createdAt;
    }
    
    public Integer getId() {
        return id;
    }
    
    public void setId(Integer id) {
        this.id = id;
    }
    
    public String getPatientName() {
        return patientName;
    }
    
    public void setPatientName(String patientName) {
        this.patientName = patientName;
    }
    
    public String getPatientEmail() {
        return patientEmail;
    }
    
    public void setPatientEmail(String patientEmail) {
        this.patientEmail = patientEmail;
    }
    
    public String getPatientContact() {
        return patientContact;
    }
    
    public void setPatientContact(String patientContact) {
        this.patientContact = patientContact;
    }
    
    public Integer getDoctorId() {
        return doctorId;
    }
    
    public void setDoctorId(Integer doctorId) {
        this.doctorId = doctorId;
    }
    
    public String getDoctorName() {
        return doctorName;
    }
    
    public void setDoctorName(String doctorName) {
        this.doctorName = doctorName;
    }
    
    public Integer getHospitalId() {
        return hospitalId;
    }
    
    public void setHospitalId(Integer hospitalId) {
        this.hospitalId = hospitalId;
    }
    
    public String getHospitalName() {
        return hospitalName;
    }
    
    public void setHospitalName(String hospitalName) {
        this.hospitalName = hospitalName;
    }
    
    public String getAppointmentDate() {
        return appointmentDate;
    }
    
    public void setAppointmentDate(String appointmentDate) {
        this.appointmentDate = appointmentDate;
    }
    
    public String getAppointmentTime() {
        return appointmentTime;
    }
    
    public void setAppointmentTime(String appointmentTime) {
        this.appointmentTime = appointmentTime;
    }
    
    public String getStatus() {
        return status;
    }
    
    public void setStatus(String status) {
        this.status = status;
    }
    
    public String getSymptoms() {
        return symptoms;
    }
    
    public void setSymptoms(String symptoms) {
        this.symptoms = symptoms;
    }
    
    public String getCreatedAt() {
        return createdAt;
    }
    
    public void setCreatedAt(String createdAt) {
        this.createdAt = createdAt;
    }
    
    @Override
    public String toString() {
        return "Appointment{" +
                "id=" + id +
                ", patientName='" + patientName + '\'' +
                ", patientEmail='" + patientEmail + '\'' +
                ", patientContact='" + patientContact + '\'' +
                ", doctorId=" + doctorId +
                ", doctorName='" + doctorName + '\'' +
                ", hospitalId=" + hospitalId +
                ", hospitalName='" + hospitalName + '\'' +
                ", appointmentDate='" + appointmentDate + '\'' +
                ", appointmentTime='" + appointmentTime + '\'' +
                ", status='" + status + '\'' +
                ", symptoms='" + symptoms + '\'' +
                ", createdAt='" + createdAt + '\'' +
                '}';
    }
}
