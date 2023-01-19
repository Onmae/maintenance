package com.maintenance.board;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@EnableJpaAuditing
@SpringBootApplication
public class    MaintenanceBoardApplication {

    public static void main(String[] args) {
        SpringApplication.run(MaintenanceBoardApplication.class, args);
    }

}
