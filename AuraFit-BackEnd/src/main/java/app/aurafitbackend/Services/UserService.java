package app.aurafitbackend.Services;

import app.aurafitbackend.Beans.User;
import app.aurafitbackend.DTOS.AuthDTOS.UserDTO;
import app.aurafitbackend.Exceptions.NotExistsException;
import app.aurafitbackend.Repositories.OrderRepository;
import app.aurafitbackend.Repositories.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@AllArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final OrderRepository orderRepository;



    public UserDTO getAccountDetails(Long userId) {
        User user = userRepository.findById(userId).orElseThrow(()->new NotExistsException("Account not exists"));
        return new UserDTO(user.getFirstName(), user.getLastName(), user.getEmail(), user.getRole());
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




//    public List<OrderResponse> getUserOrders(Long userId) {
//
//        List<Order> userOrders = orderRepository.findByUserId(userId);
//
//        return userOrders.stream().map(order ->
//                        new OrderResponse(
//                                order.getId(),
//                                order.getFirstName(),
//                                order.getOrderNumber(),
//                                order.getTotalPrice(),
//                                order.getStatus()))
//                .toList();
//    }





}
