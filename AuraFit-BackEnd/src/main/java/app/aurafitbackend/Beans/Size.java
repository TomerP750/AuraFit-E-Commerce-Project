package app.aurafitbackend.Beans;

import app.aurafitbackend.Enums.SubCategory;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "variant_attributes")
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Size {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String size;

    @Enumerated(EnumType.STRING)
    private SubCategory subCategory;
}
