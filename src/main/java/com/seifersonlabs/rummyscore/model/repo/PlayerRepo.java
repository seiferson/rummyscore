package com.seifersonlabs.rummyscore.model.repo;

import com.seifersonlabs.rummyscore.model.entity.Player;
import org.springframework.data.repository.CrudRepository;

import java.util.UUID;

public interface PlayerRepo extends CrudRepository<Player, UUID> {

}
