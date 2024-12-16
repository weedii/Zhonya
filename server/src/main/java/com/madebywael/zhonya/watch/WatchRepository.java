package com.madebywael.zhonya.watch;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface WatchRepository extends JpaRepository<Watch, Long> {

    @Query("""
            SELECT watch
            FROM Watch watch
            WHERE watch.brand = :brand
            AND watch.model = :model
            """)
    Watch findByBrandAndModel(String brand, String model);
}
