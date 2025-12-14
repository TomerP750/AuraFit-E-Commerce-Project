package app.aurafitbackend.Repositories;

import app.aurafitbackend.fitType.FitType;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FitTypeRepository extends JpaRepository<FitType, Long> {
}
