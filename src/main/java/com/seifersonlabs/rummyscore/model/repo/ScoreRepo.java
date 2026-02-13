package com.seifersonlabs.rummyscore.model.repo;

import com.seifersonlabs.rummyscore.model.entity.Score;
import org.springframework.data.repository.CrudRepository;

import java.util.UUID;

public interface ScoreRepo extends CrudRepository<Score, UUID> {
}
