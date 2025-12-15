package app.aurafitbackend.user;

import app.aurafitbackend.Exceptions.NotExistsException;
import app.aurafitbackend.order.OrderRepository;
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
        return UserDTO.builder()
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .email(user.getEmail())
                .role(user.getRole())
                .build();
    }

    @Transactional
    public void updateUserDetails(UpdateUserDTO user) {

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






}
