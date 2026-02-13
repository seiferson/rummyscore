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
        return ResponseEntity.ok(principal.getAttribute("name"));
    }
}
