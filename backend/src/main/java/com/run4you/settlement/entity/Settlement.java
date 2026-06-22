package com.run4you.settlement.entity;

import jakarta.persistence.*;
import lombok.Getter;
import java.math.BigDecimal;

@Entity
@Getter
@Table(name = "settlements")
public class Settlement { // 테스트용 임시 구현

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "report_id")
    private Long reportId;

    @Column(name = "invoice_number")
    private String invoiceNumber;

    @Column(name = "billed_amount", precision = 12, scale = 2)
    private BigDecimal billedAmount;       // 최종 합계

    @Column(name = "commission_amount", precision = 12, scale = 2)
    private BigDecimal commissionAmount;   // 긴급 수수료

    @Column(name = "vat_amount", precision = 12, scale = 2)
    private BigDecimal vatAmount;          // 부가세
}