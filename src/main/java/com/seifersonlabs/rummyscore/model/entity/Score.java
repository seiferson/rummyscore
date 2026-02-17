package com.seifersonlabs.rummyscore.model.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.util.UUID;

@Entity
@Table(
        name = "scores",
        uniqueConstraints = {
                @UniqueConstraint(columnNames = {"playerId", "matchId"})
        })
public class Score {

    @Id
    @Column(columnDefinition = "UUID")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "playerId")
    private Player player;

    @ManyToOne
    @JoinColumn(name = "matchId")
    @JsonIgnore
    private Match match;

    private Integer round1Score;
    private Integer round2Score;
    private Integer round3Score;
    private Integer round4Score;
    private Integer round5Score;
    private Integer round6Score;
    private Integer round7Score;

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public Integer getRound1Score() {
        return round1Score;
    }

    public void setRound1Score(Integer round1Score) {
        this.round1Score = round1Score;
    }

    public Integer getRound2Score() {
        return round2Score;
    }

    public void setRound2Score(Integer round2Score) {
        this.round2Score = round2Score;
    }

    public Integer getRound3Score() {
        return round3Score;
    }

    public void setRound3Score(Integer round3Score) {
        this.round3Score = round3Score;
    }

    public Integer getRound4Score() {
        return round4Score;
    }

    public void setRound4Score(Integer round4Score) {
        this.round4Score = round4Score;
    }

    public Integer getRound5Score() {
        return round5Score;
    }

    public void setRound5Score(Integer round5Score) {
        this.round5Score = round5Score;
    }

    public Integer getRound6Score() {
        return round6Score;
    }

    public void setRound6Score(Integer round6Score) {
        this.round6Score = round6Score;
    }

    public Integer getRound7Score() {
        return round7Score;
    }

    public void setRound7Score(Integer round7Score) {
        this.round7Score = round7Score;
    }

    public Player getPlayer() {
        return player;
    }

    public void setPlayer(Player player) {
        this.player = player;
    }

    public Match getMatch() {
        return match;
    }

    public void setMatch(Match match) {
        this.match = match;
    }
}
