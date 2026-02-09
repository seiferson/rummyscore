package com.seifersonlabs.rummyscore.api;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v0/score")
public class ScoreRestAPI {

    @GetMapping("/test/{test}")
    public ResponseEntity<String> test(@PathVariable String test) {
        return ResponseEntity.ok(test);
    }
}
