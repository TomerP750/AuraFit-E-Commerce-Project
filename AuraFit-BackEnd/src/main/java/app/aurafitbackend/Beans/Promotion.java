package app.aurafitbackend.Beans;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@Entity
@Table(name = "promotions")
@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class Promotion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Setter(AccessLevel.NONE)
    private Long id;
    private String name;
    private Integer discountPercent;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private Boolean isActive = false;
    @ManyToOne
    private ProductVariant productVariant;


}
