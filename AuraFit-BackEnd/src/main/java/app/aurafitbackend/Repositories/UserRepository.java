package app.aurafitbackend.Repositories;

import app.aurafitbackend.Beans.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
}
