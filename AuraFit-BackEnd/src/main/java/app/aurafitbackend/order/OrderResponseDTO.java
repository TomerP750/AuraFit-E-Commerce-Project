package app.aurafitbackend.order;


import app.aurafitbackend.Beans.ContactInformation;
import app.aurafitbackend.Enums.Status;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class OrderResponseDTO {
    private Long id;
    private BigDecimal totalPrice;
    private List<OrderItemResponseDTO> orderItems;
    private LocalDateTime orderDate;
    private Status status;
    private String orderNumber;
    private ContactInformation contactInformation;
}
