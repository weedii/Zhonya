package com.madebywael.zhonya.watch;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "watches")
public class Watch {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long reference;

    private String brand;
    private String model;
    private String description;
    private String pictureUrl;
    private Double price;
    private Long quantity;

}
