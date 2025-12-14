package app.aurafitbackend.Repositories;

import app.aurafitbackend.material.Material;
import org.springframework.data.jpa.repository.JpaRepository;


public interface MaterialRepository extends JpaRepository<Material, Long> {
}
