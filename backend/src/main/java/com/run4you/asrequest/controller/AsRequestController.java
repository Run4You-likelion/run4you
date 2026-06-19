package com.run4you.asrequest.controller;

import com.run4you.asrequest.dto.AsRequestCreateDto;
import com.run4you.asrequest.dto.AsRequestResponseDto;
import com.run4you.asrequest.service.AsRequestService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/as-requests")
@RequiredArgsConstructor
public class AsRequestController {

    private final AsRequestService asRequestService;

    // A/S 접수 생성
    @PostMapping
    public ResponseEntity<AsRequestResponseDto> createAsRequest(
            @RequestParam Long storeId,
            @RequestParam Long requesterId,
            @RequestBody @Valid AsRequestCreateDto createDto){

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(asRequestService.createAsRequest(storeId, requesterId, createDto));
    }

}
