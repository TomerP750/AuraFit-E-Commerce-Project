package app.aurafitbackend.Services;

import app.aurafitbackend.Beans.Order;
import app.aurafitbackend.Beans.User;
import app.aurafitbackend.DTOS.AuthDTOS.UserDTO;
import app.aurafitbackend.DTOS.Cart_And_Orders_DTOS.OrderResponseDTO;
import app.aurafitbackend.Exceptions.NotExistsException;
import app.aurafitbackend.Repositories.OrderRepository;
import app.aurafitbackend.Repositories.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final OrderRepository orderRepository;



    public UserDTO getAccountDetails(Long userId) {
        User user = userRepository.findById(userId).orElseThrow(()->new NotExistsException("Account not exists"));
        return UserDTO.builder()
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .email(user.getEmail())
                .role(user.getRole())
                .build();
    }

    @Transactional
    public void updateUserDetails(User user) {
        User userFromDb = userRepository.findById(user.getId()).orElseThrow(()->new NotExistsException("User not found"));

        userFromDb.setFirstName(user.getFirstName());
        userFromDb.setLastName(user.getLastName());
        if (user.getEmail() != null) {
            userFromDb.setEmail(user.getEmail());
        }
        userFromDb.setPassword(user.getPassword());

        userRepository.save(userFromDb);
    }

    public void deleteUser(Long userId, String password) {
        User user = userRepository.findById(userId).orElseThrow(()->new NotExistsException("User not found"));
        if (userRepository.existsById(userId)) {
            if (user.getPassword().equals(password)) {
                userRepository.deleteById(userId);
            }
        }
    }

    public List<OrderResponseDTO> getUserOrders(Long userId) {

        List<Order> userOrders = orderRepository.findByUserId(userId);
        List<OrderResponseDTO> orderResponseDTOS = new ArrayList<>();

        for (Order order : userOrders) {
            orderResponseDTOS.add(OrderResponseDTO.builder()
                    .id(order.getId())
                    .orderDate(order.getOrderDate())
                    .totalPrice(order.getTotalPrice())
                    .orderItems(order.getOrderItems())
                    .status(order.getStatus())
                    .build());
        }

        return orderResponseDTOS;

    }





}
