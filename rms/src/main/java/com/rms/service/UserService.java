package com.rms.service;

import com.rms.model.User;
import com.rms.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User saveUser(User user) {
        return userRepository.save(user);
    }
    public List<User> getUsersExceptEmail(String email) {
        return userRepository.findAllExceptEmail(email);
    }
    public User loginUser(String email, String password) {
        String storedPassword = userRepository.findPasswordByEmail(email);

        if (storedPassword != null && storedPassword.equals(password)) {
            return userRepository.findUserByEmail(email);
        } else {
            return null; // or throw custom exception / return error message
        }
    }

    public User getUserById(Integer id) {
        return userRepository.findById(id).orElse(null);
    }

    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public List<User> getUsersByCompany(String companyName) {
        return userRepository.findByCompanyName(companyName);
    }
}
