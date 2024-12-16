package com.madebywael.zhonya.admin;

import java.util.Collection;
import java.util.List;

import org.springframework.stereotype.Service;

import com.madebywael.zhonya.admin.DTO.GetAllUsersResponse;
import com.madebywael.zhonya.user.User;
import com.madebywael.zhonya.user.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AdminService {

    private final UserRepository userRepository;
    private final AdminMapper adminMapper;

    public Collection<GetAllUsersResponse> getAllUsers() {
        List<User> users = userRepository.findAll();
        return users.stream()
                .map(user -> adminMapper.toGetAllUsersResponse(user))
                .toList();
    }
}
