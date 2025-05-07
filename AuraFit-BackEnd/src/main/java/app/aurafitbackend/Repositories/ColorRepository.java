package app.aurafitbackend.Repositories;

import app.aurafitbackend.Beans.Color;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ColorRepository extends JpaRepository<Color, Long> {
}
