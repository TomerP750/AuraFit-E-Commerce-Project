package app.aurafitbackend.DTOS.Cart_And_Orders_DTOS;


import app.aurafitbackend.Beans.OrderItem;
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
    private List<OrderItem> orderItems;
    private LocalDateTime orderDate;
    private Status status;
}
