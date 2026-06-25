import { useState, useEffect } from "react";
import { Zap, ChevronDown, AlertTriangle, CheckCircle } from "lucide-react";
import { getEquipmentList } from "../../api/equipment";
import type { Equipment } from "../../api/equipment";
import { createAsRequest } from "../../api/asRequest";
import type { Priority } from "../../api/asRequest";

export function StoreASForm({ onComplete }: { onComplete: () => void }) {
    const [equipmentId, setEquipmentId] = useState("");
    const [symptom, setSymptom] = useState("");
    const [errorCode, setErrorCode] = useState("");
    const [priority, setPriority] = useState<Priority>("NORMAL");

    const [equipments, setEquipments] = useState<Equipment[]>([]);
    const [loading, setLoading] = useState(true);

    // 기자재 목록 로드
    const loadEquipments = () => {
        const token = localStorage.getItem("accessToken") || "";
        setLoading(true);
        getEquipmentList(token)
            .then((data) => setEquipments(data.equipments))
            .catch((err) => console.error("기자재 로드 실패:", err))
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        loadEquipments();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!equipmentId || !symptom) return;

        try {
            const token = localStorage.getItem("accessToken") || "";
            await createAsRequest(token, {
                equipmentId: parseInt(equipmentId),
                priority,
                errorCode: errorCode || undefined,
                symptom,
            });

            // 폼 초기화
            setEquipmentId("");
            setSymptom("");
            setErrorCode("");
            setPriority("NORMAL");

            // 기자재 현황으로 이동 (고장 상태 확인)
            onComplete();
        } catch (err) {
            console.error("A/S 접수 실패:", err);
        }
    };

    // 정상(OPERATIONAL) 상태인 기자재만 접수 가능
    const availableEquipments = equipments.filter((eq) => eq.status === "OPERATIONAL");

    return (
        <div className="max-w-2xl">
            <div className="mb-6">
                <h1 style={{ color: "#0F172A", letterSpacing: "-0.02em" }}>긴급 A/S 접수</h1>
                <p style={{ color: "#64748B", fontSize: 13, marginTop: 2 }}>정확한 증상 입력 시 엔지니어 배정이 빨라집니다</p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                {/* Priority */}
                <div className="flex flex-col gap-2">
                    <label style={{ fontSize: 14, fontWeight: 600, color: "#374151" }}>우선순위 <span style={{ color: "#DC2626" }}>*</span></label>
                    <div className="flex gap-3">
                        <button
                            type="button"
                            onClick={() => setPriority("EMERGENCY")}
                            className="flex-1 flex items-center gap-3 p-4.5 rounded-xl transition-all"
                            style={{
                                border: priority === "EMERGENCY" ? "2px solid #DC2626" : "1px solid rgba(15,23,42,0.1)",
                                background: priority === "EMERGENCY" ? "#FEF2F2" : "#fff",
                            }}
                        >
                            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: priority === "EMERGENCY" ? "#DC2626" : "#F1F5F9" }}>
                                <Zap size={16} color={priority === "EMERGENCY" ? "#fff" : "#94A3B8"} />
                            </div>
                            <div className="text-left">
                                <div style={{ fontSize: 15, fontWeight: 700, color: priority === "EMERGENCY" ? "#DC2626" : "#374151" }}>EMERGENCY</div>
                                <div style={{ fontSize: 13, color: "#94A3B8" }}>즉각 대응 · 30분 내 배정</div>
                            </div>
                        </button>
                        <button
                            type="button"
                            onClick={() => setPriority("NORMAL")}
                            className="flex-1 flex items-center gap-3 p-4.5 rounded-xl transition-all"
                            style={{
                                border: priority === "NORMAL" ? "2px solid #2563EB" : "1px solid rgba(15,23,42,0.1)",
                                background: priority === "NORMAL" ? "#EFF6FF" : "#fff",
                            }}
                        >
                            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: priority === "NORMAL" ? "#2563EB" : "#F1F5F9" }}>
                                <CheckCircle size={16} color={priority === "NORMAL" ? "#fff" : "#94A3B8"} />
                            </div>
                            <div className="text-left">
                                <div style={{ fontSize: 15, fontWeight: 700, color: priority === "NORMAL" ? "#2563EB" : "#374151" }}>NORMAL</div>
                                <div style={{ fontSize: 13, color: "#94A3B8" }}>일반 처리 · 2시간 내 배정</div>
                            </div>
                        </button>
                    </div>
                </div>

                {/* Equipment select — 정상 상태 기자재만 동적 로드 */}
                <div className="flex flex-col gap-2">
                    <label style={{ fontSize: 14, fontWeight: 600, color: "#374151" }}>고장 기자재 <span style={{ color: "#DC2626" }}>*</span></label>
                    <div className="relative">
                        <select
                            value={equipmentId}
                            onChange={(e) => setEquipmentId(e.target.value)}
                            disabled={loading || availableEquipments.length === 0}
                            className="w-full appearance-none px-4 py-3 rounded-xl"
                            style={{ border: "1px solid rgba(15,23,42,0.1)", background: "#fff", fontSize: 14, color: equipmentId ? "#0F172A" : "#94A3B8", outline: "none" }}
                        >
                            <option value="" disabled>
                                {loading
                                    ? "로딩 중..."
                                    : availableEquipments.length === 0
                                        ? "접수 가능한 기자재가 없습니다"
                                        : "기자재를 선택하세요"}
                            </option>
                            {availableEquipments.map((eq) => (
                                <option key={eq.id} value={eq.id}>
                                    {eq.name} ({eq.modelName})
                                </option>
                            ))}
                        </select>
                        <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2" style={{ color: "#94A3B8" }} />
                    </div>

                    {/* 접수 가능한 기자재가 없을 때 안내 */}
                    {!loading && availableEquipments.length === 0 && (
                        <div className="flex items-start gap-2 px-3 py-2.5 rounded-lg" style={{ background: "#F8FAFC", border: "1px solid rgba(15,23,42,0.08)" }}>
                            <AlertTriangle size={14} style={{ color: "#94A3B8", marginTop: 2, flexShrink: 0 }} />
                            <span style={{ fontSize: 12, color: "#64748B", lineHeight: 1.5 }}>
                                현재 모든 기자재가 고장 또는 수리중 상태입니다. 정상 상태의 기자재만 A/S 접수가 가능합니다.
                            </span>
                        </div>
                    )}
                </div>

                {/* Error code */}
                <div className="flex flex-col gap-2">
                    <label style={{ fontSize: 14, fontWeight: 600, color: "#374151" }}>에러 코드</label>
                    <input
                        value={errorCode}
                        onChange={(e) => setErrorCode(e.target.value)}
                        placeholder="예: E-0x3F, PUMP_FAIL, ERR-209"
                        className="px-4 py-3 rounded-xl"
                        style={{ border: "1px solid rgba(15,23,42,0.1)", background: "#fff", fontSize: 14, outline: "none", fontFamily: "var(--font-mono)" }}
                    />
                </div>

                {/* Symptom */}
                <div className="flex flex-col gap-2">
                    <label style={{ fontSize: 14, fontWeight: 600, color: "#374151" }}>고장 증상 <span style={{ color: "#DC2626" }}>*</span></label>
                    <textarea
                        value={symptom}
                        onChange={(e) => setSymptom(e.target.value)}
                        placeholder="고장 증상을 최대한 상세히 입력해주세요.&#10;예: 에스프레소 추출 시 펌프 소음이 크게 나며, 추출량이 절반으로 줄었습니다. 화면에 PUMP_FAIL 에러가 표시됩니다."
                        rows={4}
                        className="px-4 py-3 rounded-xl resize-none"
                        style={{ border: "1px solid rgba(15,23,42,0.1)", background: "#fff", fontSize: 14, outline: "none", lineHeight: 1.6 }}
                    />
                    <div style={{ fontSize: 11, color: "#94A3B8", textAlign: "right" }}>{symptom.length} / 500자</div>
                </div>

                {priority === "EMERGENCY" && (
                    <div className="flex items-start gap-3 px-4 py-3 rounded-xl" style={{ background: "#FEF2F2", border: "1px solid #FCA5A5" }}>
                        <AlertTriangle size={16} style={{ color: "#DC2626", marginTop: 1, flexShrink: 0 }} />
                        <div style={{ fontSize: 13, color: "#991B1B", lineHeight: 1.6 }}>
                            <strong>긴급 접수</strong>는 추가 비용(30%)이 발생할 수 있습니다. 영업 손실이 발생하는 경우에만 선택하세요.
                        </div>
                    </div>
                )}

                <button
                    type="submit"
                    disabled={!equipmentId || !symptom || loading}
                    className="w-full py-3.5 rounded-xl transition-all mt-2"
                    style={{
                        background: !equipmentId || !symptom ? "#F1F5F9" : priority === "EMERGENCY" ? "#DC2626" : "#2563EB",
                        color: !equipmentId || !symptom ? "#94A3B8" : "#fff",
                        fontSize: 14,
                        fontWeight: 700,
                        cursor: !equipmentId || !symptom ? "not-allowed" : "pointer",
                        boxShadow: equipmentId && symptom ? "0 2px 8px rgba(37,99,235,0.25)" : "none",
                    }}
                >
                    {priority === "EMERGENCY" ? "🚨 긴급 A/S 접수하기" : "A/S 접수하기"}
                </button>
            </form>
        </div>
    );
}