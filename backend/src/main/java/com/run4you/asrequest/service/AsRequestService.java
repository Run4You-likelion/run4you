package com.run4you.asrequest.service;

import com.run4you.asrequest.dto.AsRequestCreateDto;
import com.run4you.asrequest.dto.AsRequestResponseDto;
import com.run4you.asrequest.entity.AsRequest;
import com.run4you.asrequest.repository.AsRequestRepository;
import com.run4you.equipment.entity.Equipment;
import com.run4you.equipment.enums.EquipmentStatus;
import com.run4you.equipment.repository.EquipmentRepository;
import com.run4you.store.entity.Store;
import com.run4you.store.repository.StoreRepository;
import com.run4you.user.entity.User;
import com.run4you.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
@Transactional
public class AsRequestService {

    private final AsRequestRepository asRequestRepository;
    private final EquipmentRepository equipmentRepository;
    private final StoreRepository storeRepository;
    private final UserRepository userRepository;

    // A/S 접수 생성
    public AsRequestResponseDto createAsRequest(Long storeId, Long requesterId, AsRequestCreateDto createDto){

        // 기자재 존재 여부 확인
        Equipment equipment = equipmentRepository.findById(createDto.getEquipmentId())
                .orElseThrow(() -> new RuntimeException("기자재를 찾을 수 없습니다."));

        // 중복 접수 확인
        boolean hasActiveRequest  = asRequestRepository
                .existsActiveByEquipmentId(createDto.getEquipmentId());
        if(hasActiveRequest){
            throw new RuntimeException("이미 진행 중인 접수가 있습니다.");
        }

        // 매장 조회
        Store store = storeRepository.findById(storeId)
                .orElseThrow(() -> new RuntimeException("매장을 찾을 수 없습니다."));

        // 점수자 조회
        User requester = userRepository.findById(requesterId)
                .orElseThrow(() -> new RuntimeException("접수자를 찾을 수 없습니다."));

        // A/S 접수 생성
        AsRequest asRequest = AsRequest.builder()
                .equipment(equipment)
                .store(store)
                .requester(requester)
                .priority(createDto.getPriority())
                .errorCode(createDto.getErrorCode())
                .symptom(createDto.getSymptom())
                .requestedAt(LocalDateTime.now())
                .build();

        AsRequest saved = asRequestRepository.save(asRequest);

        // 기자재 현황 화면 - 상태 변경 (OPERATIONAL -> FAULTY)
        equipment.updateStatus(EquipmentStatus.FAULTY);

        return AsRequestResponseDto.builder()
                .id(saved.getId())
                .priority(saved.getPriority())
                .status(saved.getStatus())
                .requestedAt(saved.getRequestedAt())
                .equipmentId(equipment.getId())
                .equipmentName(equipment.getName())
                .build();
    }
}
