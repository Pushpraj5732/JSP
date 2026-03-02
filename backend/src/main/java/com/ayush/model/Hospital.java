package com.ayush.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Hospital {
    
    @JsonProperty("id")
    private Integer id;
    
    @JsonProperty("hospitalName")
    private String hospitalName;
    
    @JsonProperty("address")
    private String address;
    
    @JsonProperty("latitude")
    private Double latitude;
    
    @JsonProperty("longitude")
    private Double longitude;
    
    @JsonProperty("contactNumber")
    private String contactNumber;
    
    @JsonProperty("email")
    private String email;
    
    @JsonProperty("type")
    private String type;
    
    @JsonProperty("beds")
    private Integer beds;
    
    public Hospital() {
    }
    
    public Hospital(Integer id, String hospitalName, String address, Double latitude, Double longitude,
                    String contactNumber, String email, String type, Integer beds) {
        this.id = id;
        this.hospitalName = hospitalName;
        this.address = address;
        this.latitude = latitude;
        this.longitude = longitude;
        this.contactNumber = contactNumber;
        this.email = email;
        this.type = type;
        this.beds = beds;
    }
    
    public Integer getId() {
        return id;
    }
    
    public void setId(Integer id) {
        this.id = id;
    }
    
    public String getHospitalName() {
        return hospitalName;
    }
    
    public void setHospitalName(String hospitalName) {
        this.hospitalName = hospitalName;
    }
    
    public String getAddress() {
        return address;
    }
    
    public void setAddress(String address) {
        this.address = address;
    }
    
    public Double getLatitude() {
        return latitude;
    }
    
    public void setLatitude(Double latitude) {
        this.latitude = latitude;
    }
    
    public Double getLongitude() {
        return longitude;
    }
    
    public void setLongitude(Double longitude) {
        this.longitude = longitude;
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
    
    public String getType() {
        return type;
    }
    
    public void setType(String type) {
        this.type = type;
    }
    
    public Integer getBeds() {
        return beds;
    }
    
    public void setBeds(Integer beds) {
        this.beds = beds;
    }
    
    @Override
    public String toString() {
        return "Hospital{" +
                "id=" + id +
                ", hospitalName='" + hospitalName + '\'' +
                ", address='" + address + '\'' +
                ", latitude=" + latitude +
                ", longitude=" + longitude +
                ", contactNumber='" + contactNumber + '\'' +
                ", email='" + email + '\'' +
                ", type='" + type + '\'' +
                ", beds=" + beds +
                '}';
    }
}
