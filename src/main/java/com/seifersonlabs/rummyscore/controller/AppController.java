package com.seifersonlabs.rummyscore.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@Controller
public class AppController {

    @GetMapping("/matches/{matchId}")
    public String matches(@PathVariable String matchId) {
        return "forward:/match.html";
    }
}
