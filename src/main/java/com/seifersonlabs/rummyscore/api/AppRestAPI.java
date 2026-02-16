package com.seifersonlabs.rummyscore.api;

import com.seifersonlabs.rummyscore.model.entity.Match;
import com.seifersonlabs.rummyscore.model.entity.Player;
import com.seifersonlabs.rummyscore.model.repo.MatchRepo;
import com.seifersonlabs.rummyscore.model.repo.PlayerRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.annotation.AuthenticationPrincipal;

import java.util.Optional;

import static com.seifersonlabs.rummyscore.util.Constants.AVATAR_ATTRS;
import static com.seifersonlabs.rummyscore.util.Constants.DICEBEAR_URL;

@RestController
@RequestMapping("/api/v1")
public class AppRestAPI {

    @Autowired
    private PlayerRepo playerRepo;

    @Autowired
    private MatchRepo matchRepo;

    @GetMapping("/matches")
    public ResponseEntity<Page<Match>> getMatches(@AuthenticationPrincipal OAuth2User principal, @RequestParam int page) {
        Pageable pageable = PageRequest.of(page, 5, Sort.by("startDate"));
        Page<Match> matches = matchRepo.findAll(pageable);

        return ResponseEntity.ok(matches);
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
