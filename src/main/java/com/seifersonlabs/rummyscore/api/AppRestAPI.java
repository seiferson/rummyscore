package com.seifersonlabs.rummyscore.api;

import com.seifersonlabs.rummyscore.model.entity.Player;
import com.seifersonlabs.rummyscore.model.repo.PlayerRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.security.core.annotation.AuthenticationPrincipal;

import java.util.Optional;

import static com.seifersonlabs.rummyscore.util.Constants.AVATAR_ATTRS;
import static com.seifersonlabs.rummyscore.util.Constants.DICEBEAR_URL;

@RestController
@RequestMapping("/api/v1")
public class AppRestAPI {

    @Autowired
    PlayerRepo playerRepo;

    @GetMapping("/test/{test}")
    public ResponseEntity<String> test(@PathVariable String test) {
        Player p = new Player();
        p.setNickname(test);
        playerRepo.save(p);
        return ResponseEntity.ok(test);
    }

    @GetMapping("/players")
    public ResponseEntity<Iterable<Player>> getPlayers() {
        return ResponseEntity.ok(playerRepo.findAll());
    }

    @GetMapping("/check")
    public ResponseEntity<String> check(@AuthenticationPrincipal OAuth2User principal) {
        if(principal != null) {
            return ResponseEntity.ok(principal.getAttribute("email"));
        } else {
            return ResponseEntity.ok("anon");
        }

    }


    @GetMapping("/authx/getuserinfo")
    public ResponseEntity<Player> getUserInfo(@AuthenticationPrincipal OAuth2User principal) {
        if(principal != null) {
            Optional<Player> playerInfo = playerRepo.findByEmail(principal.getAttribute("email"));
            if(playerInfo.isPresent()) {
                return ResponseEntity.ok(playerInfo.get());
            } else {
                Player newPlayer = new Player();
                newPlayer.setEmail(principal.getAttribute("email"));
                newPlayer.setNickname(principal.getAttribute("email").toString().substring(0, 5));
                newPlayer.setAvatar(DICEBEAR_URL + AVATAR_ATTRS + newPlayer.getNickname());
                newPlayer = playerRepo.save(newPlayer);
                return ResponseEntity.ok(newPlayer);
            }
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
