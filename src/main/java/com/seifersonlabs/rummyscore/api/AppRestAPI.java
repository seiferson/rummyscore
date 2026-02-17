package com.seifersonlabs.rummyscore.api;

import com.seifersonlabs.rummyscore.model.entity.Match;
import com.seifersonlabs.rummyscore.model.entity.Player;
import com.seifersonlabs.rummyscore.model.entity.Score;
import com.seifersonlabs.rummyscore.model.repo.MatchRepo;
import com.seifersonlabs.rummyscore.model.repo.PlayerRepo;
import com.seifersonlabs.rummyscore.model.repo.ScoreRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.annotation.AuthenticationPrincipal;

import java.util.Date;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

import static com.seifersonlabs.rummyscore.util.Constants.AVATAR_ATTRS;
import static com.seifersonlabs.rummyscore.util.Constants.DICEBEAR_URL;

@RestController
@RequestMapping("/api/v1")
public class AppRestAPI {

    @Autowired
    private PlayerRepo playerRepo;

    @Autowired
    private MatchRepo matchRepo;

    @Autowired
    private ScoreRepo scoreRepo;

    @GetMapping("/matches")
    public ResponseEntity<Page<Match>> getMatches(@AuthenticationPrincipal OAuth2User principal, @RequestParam int page) {
        Pageable pageable = PageRequest.of(page, 5, Sort.by("startDate"));
        Page<Match> matches = matchRepo.findAll(pageable);

        return ResponseEntity.ok(matches);
    }

    @GetMapping("/matches/{matchId}")
    public ResponseEntity<Match> getMatch(@PathVariable String matchId) {
        Optional<Match> match = matchRepo.findById(UUID.fromString(matchId));
        return match.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping("/matches")
    public ResponseEntity<Match> createMatch(@AuthenticationPrincipal OAuth2User principal) {
        Optional<Player> host = playerRepo.findByEmail(principal.getAttribute("email"));

        if (host.isPresent()) {
            Match match = new Match();

            match.setId(null);
            match.setStartDate(new Date());
            match.setEndDate(null);
            match.setHost(host.get());

            match = matchRepo.save(match);

            Score score = new Score();

            score.setPlayer(host.get());
            score.setMatch(match);

            scoreRepo.save(score);

            return ResponseEntity.ok(match);
        } else {
            return ResponseEntity.badRequest().build();
        }

    }

    @PostMapping("/scores")
    public ResponseEntity<Score> createMatch(@AuthenticationPrincipal OAuth2User principal, @RequestBody Map<String, Object> data) {
        Optional<Player> host = playerRepo.findByEmail(principal.getAttribute("email"));
        Optional<Match> match = matchRepo.findById(UUID.fromString((String) data.get("matchId")));

        if (host.isPresent() && match.isPresent()) {
            Score newScore = new Score();
            newScore.setPlayer(host.get());
            newScore.setMatch(match.get());

            newScore = scoreRepo.save(newScore);
            return ResponseEntity.ok(newScore);
        } else {
            return ResponseEntity.badRequest().build();
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
