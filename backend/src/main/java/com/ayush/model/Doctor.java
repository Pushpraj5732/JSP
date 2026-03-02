package com.ayush.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Doctor {
    
    @JsonProperty("id")
    private Integer id;
    
    @JsonProperty("hospitalId")
    private Integer hospitalId;
    
    @JsonProperty("name")
    private String name;
    
    @JsonProperty("specialization")
    private String specialization;
    
    @JsonProperty("experience")
    private Integer experience;
    
    @JsonProperty("qualification")
    private String qualification;
    
    @JsonProperty("contactNumber")
    private String contactNumber;
    
    @JsonProperty("email")
    private String email;
    
    @JsonProperty("consultationFee")
    private Double consultationFee;
    
    @JsonProperty("availableDays")
    private String availableDays;
    
    @JsonProperty("availableTime")
    private String availableTime;
    
    public Doctor() {
    }
    
    public Doctor(Integer id, Integer hospitalId, String name, String specialization, Integer experience,
                  String qualification, String contactNumber, String email, Double consultationFee,
                  String availableDays, String availableTime) {
        this.id = id;
        this.hospitalId = hospitalId;
        this.name = name;
        this.specialization = specialization;
        this.experience = experience;
        this.qualification = qualification;
        this.contactNumber = contactNumber;
        this.email = email;
        this.consultationFee = consultationFee;
        this.availableDays = availableDays;
        this.availableTime = availableTime;
    }
    
    public Integer getId() {
        return id;
    }
    
    public void setId(Integer id) {
        this.id = id;
    }
    
    public Integer getHospitalId() {
        return hospitalId;
    }
    
    public void setHospitalId(Integer hospitalId) {
        this.hospitalId = hospitalId;
    }
    
    public String getName() {
        return name;
    }
    
    public void setName(String name) {
        this.name = name;
    }
    
    public String getSpecialization() {
        return specialization;
    }
    
    public void setSpecialization(String specialization) {
        this.specialization = specialization;
    }
    
    public Integer getExperience() {
        return experience;
    }
    
    public void setExperience(Integer experience) {
        this.experience = experience;
    }
    
    public String getQualification() {
        return qualification;
    }
    
    public void setQualification(String qualification) {
        this.qualification = qualification;
    }
    
    public String getContactNumber() {
        return contactNumber;
    }
    
    public void setContactNumber(String contactNumber) {
        this.contactNumber = contactNumber;
    }
    
    public String getEmail() {
        return email;
    }
    
    public void setEmail(String email) {
        this.email = email;
    }
    
    public Double getConsultationFee() {
        return consultationFee;
    }
    
    public void setConsultationFee(Double consultationFee) {
        this.consultationFee = consultationFee;
    }
    
    public String getAvailableDays() {
        return availableDays;
    }
    
    public void setAvailableDays(String availableDays) {
        this.availableDays = availableDays;
    }
    
    public String getAvailableTime() {
        return availableTime;
    }
    
    public void setAvailableTime(String availableTime) {
        this.availableTime = availableTime;
    }
    
    @Override
    public String toString() {
        return "Doctor{" +
                "id=" + id +
                ", hospitalId=" + hospitalId +
                ", name='" + name + '\'' +
                ", specialization='" + specialization + '\'' +
                ", experience=" + experience +
                ", qualification='" + qualification + '\'' +
                ", contactNumber='" + contactNumber + '\'' +
                ", email='" + email + '\'' +
                ", consultationFee=" + consultationFee +
                ", availableDays='" + availableDays + '\'' +
                ", availableTime='" + availableTime + '\'' +
                '}';
    }
}
