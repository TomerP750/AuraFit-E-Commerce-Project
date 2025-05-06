package app.aurafitbackend.Beans;


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
    @ManyToOne(fetch = FetchType.EAGER)
    private SubCategory subCategory;


}
