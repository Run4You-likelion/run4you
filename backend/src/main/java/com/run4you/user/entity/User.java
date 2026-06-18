package com.run4you.user.entity;

import jakarta.persistence.*;
import lombok.Getter;

@Entity
@Getter
@Table(name = "users")
public class User { // 테스트용 임의 구현

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
}