package com.seifersonlabs.rummyscore.model.repo;

import com.seifersonlabs.rummyscore.model.entity.Tournament;
import org.springframework.data.repository.CrudRepository;

import java.util.UUID;

public interface TournamentRepo extends CrudRepository<Tournament, UUID> {
}
