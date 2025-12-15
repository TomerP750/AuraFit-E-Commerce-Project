package app.aurafitbackend.size;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SizeRepository extends JpaRepository<Size, Long> {
    List<Size> findByProductTypeId(Long productTypeId);
}
