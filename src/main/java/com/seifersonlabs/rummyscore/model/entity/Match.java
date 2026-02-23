package com.seifersonlabs.rummyscore.model.entity;

import jakarta.persistence.*;

import java.util.Date;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "matches")
public class Match {

    @Id
    @Column(columnDefinition = "UUID")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "tournamentId")
    private Tournament tournament;

    @ManyToOne
    @JoinColumn(name = "hostId", nullable = false)
    private Player host;

    @OneToMany
    @JoinColumn(name = "matchId")
    private List<Score> scores;

    @Column(nullable = false)
    private Date startDate;
    private Date endDate;

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public Date getStartDate() {
        return startDate;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    public Date getEndDate() {
        return endDate;
    }

    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }

    public Tournament getTournament() {
        return tournament;
    }

    public void setTournament(Tournament tournament) {
        this.tournament = tournament;
    }

    public Player getHost() {
        return host;
    }

    public void setHost(Player host) {
        this.host = host;
    }

    public List<Score> getScores() {
        return scores;
    }

    public void setScores(List<Score> scores) {
        this.scores = scores;
    }

    @Transient
    public int getCurrentRound() {
        int currentRound = 7;

        if (scores != null) {

            for (Score score : scores) {
                int playerRound = 7;

                if (score.getRound1Score() == null) {
                    playerRound = 1;
                } else if (score.getRound2Score() == null) {
                    playerRound = 2;
                } else if (score.getRound3Score() == null) {
                    playerRound = 3;
                } else if (score.getRound4Score() == null) {
                    playerRound = 4;
                } else if (score.getRound5Score() == null) {
                    playerRound = 5;
                } else if (score.getRound6Score() == null) {
                    playerRound = 6;
                }

                if (playerRound < currentRound) {
                    currentRound = playerRound;
                }
            }
        } else {
            currentRound = 1;
        }

        return currentRound;
    }
}
