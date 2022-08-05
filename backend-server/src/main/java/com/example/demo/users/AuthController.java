package com.example.demo.users;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private UserService userService;

    @PostMapping("/subs")
    private ResponseEntity<?> subscribeClient(@RequestBody AuthenticationRequest authenticationRequest){
        String username = authenticationRequest.getUsername();
        String password = authenticationRequest.getPassword();
        //String email = authenticationRequest.getPassword();
        User user = new User();
        user.setUsername(username);
        user.setPassword(passwordEncoder.encode(password));
        user.setFriends(new String[]{});
        //user.setEmail(email);

        userRepository.save(user);
        return ResponseEntity.ok(new AuthenticationResponse("Successful subscription client " + username));
    }

    @PostMapping("/auth")
    private User authenticateClient(@RequestBody AuthenticationRequest authenticationRequest){

        String username = authenticationRequest.getUsername();
        String password = authenticationRequest.getPassword();

        try{
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
        }
        catch(Exception e){
            return null;//ResponseEntity.ok(new AuthenticationResponse("Error during client Authentication "+ username));
        }

        return userRepository.findByUsername(username);


        //ResponseEntity.ok(
                //new AuthenticationResponse("Successful client Authentication "+ username)
                //new AuthenticationResponse(userService.loadUserByUsername(username));

        //);
    }




}
