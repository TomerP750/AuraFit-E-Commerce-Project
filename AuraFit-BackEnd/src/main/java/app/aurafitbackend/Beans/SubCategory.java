package app.aurafitbackend.Beans;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "sub_categories")
@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class SubCategory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Setter(AccessLevel.NONE)
    private Long id;
    private String name;

}
