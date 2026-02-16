package com.seifersonlabs.rummyscore.model.repo;

import com.seifersonlabs.rummyscore.model.entity.Match;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;

import java.util.UUID;

public interface MatchRepo extends CrudRepository<Match, UUID> {

    public Page<Match> findAll(Pageable pageable);
}
