package com.run4you.dispatch.repository;

import com.run4you.dispatch.entity.DispatchStatusHistory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface DispatchStatusHistoryRepository extends JpaRepository<DispatchStatusHistory, Long> {

    /** 배정의 상태 타임라인(오래된 순) — 점주 추적 화면용 */
    List<DispatchStatusHistory> findByAssignmentIdOrderByChangedAtAsc(Long assignmentId);

    /** 배정의 가장 최근 이력 — 현재 ETA/위치 조회용 */
    Optional<DispatchStatusHistory> findFirstByAssignmentIdOrderByChangedAtDesc(Long assignmentId);
}
