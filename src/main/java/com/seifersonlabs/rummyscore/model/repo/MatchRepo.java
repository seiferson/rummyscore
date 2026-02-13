package com.seifersonlabs.rummyscore.model.repo;

import com.seifersonlabs.rummyscore.model.entity.Match;
import org.springframework.data.repository.CrudRepository;

import java.util.UUID;

public interface MatchRepo extends CrudRepository<Match, UUID> {
}
