package app.aurafitbackend.DTOS;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SearchDTO {


    private String query;
    private int page = 0;
    private int size = 20;
}
