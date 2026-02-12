package com.seifersonlabs.rummyscore.api;

import com.seifersonlabs.rummyscore.model.entity.Player;
import com.seifersonlabs.rummyscore.model.repo.PlayerRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v0/score")
public class ScoreRestAPI {

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
}
