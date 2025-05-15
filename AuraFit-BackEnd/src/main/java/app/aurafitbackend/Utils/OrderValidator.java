package app.aurafitbackend.Utils;

import app.aurafitbackend.Beans.Order;
import app.aurafitbackend.Enums.Status;
import app.aurafitbackend.Exceptions.NotExistsException;
import app.aurafitbackend.Exceptions.RequestException;
import app.aurafitbackend.Exceptions.TimeExpiredException;
import app.aurafitbackend.Exceptions.UnauthorizedException;

import java.time.LocalDateTime;

public class OrderValidator {


    private OrderValidator() {
    }

    public static boolean isValidOrder(Order order) {
        return false;
    }


    public static boolean isValidOrderForCancel(Order order, String principalEmail) {
        LocalDateTime now = LocalDateTime.now();

        if (order == null) {
            throw new NotExistsException("Order not found");
        }

        if (now.isAfter(order.getOrderDate().plusHours(1))) { // if a hour has passed since the order time
            throw new TimeExpiredException("Cannot refund, Time of refund has expired");
        }

        if (order.getStatus() == Status.CANCELLED) {
            throw new RequestException("Order is already cancelled");
        }
        if (order.getStatus() == Status.PENDING) {
            throw new RequestException("Order still pending");
        }

        return true;
    }

}
