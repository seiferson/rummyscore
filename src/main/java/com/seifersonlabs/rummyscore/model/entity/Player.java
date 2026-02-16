package com.seifersonlabs.rummyscore.model.entity;

import jakarta.persistence.*;

import java.util.UUID;

@Entity
@Table(name = "players")
public class Player {

    @Id
    @Column(columnDefinition = "UUID")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @Column(length = 5, unique = true, nullable = false)
    private String nickname;

    @Column(unique = true, nullable = false)
    private String email;

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getNickname() {
        return nickname;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
