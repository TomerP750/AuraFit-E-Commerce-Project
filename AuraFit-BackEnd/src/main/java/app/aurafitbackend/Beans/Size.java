package app.aurafitbackend.Beans;

import app.aurafitbackend.Enums.SubCategory;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "sizes")
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Size {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(unique = true, nullable = false)
    private String size;

    @Enumerated(EnumType.STRING)
    @Column(unique = true ,nullable = false)
    private SubCategory subCategory;


}
