# <div align="center"> 🏃‍➡️ Run For You (런포유) </div>

> ### 런포유 레포지토리 
> 프랜차이즈 카페 및 무인 매장 기자재 긴급 출동 관제 시스템 <br>
> 개발 기간 : 2026.06.10. ~ 2026.07.08.<br>


## <div align="center">프로젝트 소개</div>

**Run For You (런포유)** 는 프랜차이즈 카페 및 무인 매장의 기자재(에스프레소 머신, 제빙기, 냉장고, 키오스크 등) 고장 시 긴급 A/S 출동을 관제하는 플랫폼입니다.

기존 전화·콜센터 중심의 A/S 접수 방식은 처리 속도가 느리고 기사 도착 시간(ETA)을 확인할 수 없어 점주의 대응이 어렵다는 문제, 그리고 수리 이력과 부품 교체 정보가 체계적으로 관리되지 않아 반복 고장 분석과 정산이 어렵다는 문제에서 출발했습니다.

점주가 긴급 A/S를 접수하면 거리·전문분야·평점·가용성·긴급도를 종합한 가중치 스코어로 최적의 엔지니어가 자동 배정되고, 출동 전 과정이 실시간(SSE)으로 공유됩니다. 수리 완료 후에는 표준화된 정비 리포트와 건강 진단서(A~D 등급)가 발급되고, 부품 단가·공임 정합성 검증을 거쳐 정산까지 자동으로 처리됩니다.

> ### 사용자 구성
| 역할 | 핵심 기능 |
|---|---|
| 점주 (STORE_OWNER) | 기자재 등록·관리, 긴급 A/S 접수, 실시간 위치·ETA 조회, 진단서·영수증 확인 |
| 정비 엔지니어 (ENGINEER) | 긴급 출동 요청 수락, LMS 기술 교육, 출동 상태 관리, 정비 리포트 작성 |
| 본사 관리자 (BRAND_ADMIN) | 통합 관제 대시보드, 정산 승인·정합성 검증, 결함 통계 분석, 교육 콘텐츠 관리 |
| 플랫폼 총괄 (SUPER_ADMIN) | 브랜드·엔지니어 가입 승인, 수수료율 설정, 전체 통계·운영 지표 관리 |
<br>

## <div align="center">팀원 소개</div>

<table align="center">
  <thead>
    <tr>
      <th>
        <a href="https://github.com/roof1004">
          <img src="https://github.com/roof1004.png" width="100" />
        </a>
      </th>
      <th>
        <a href="https://github.com/min9gu">
          <img src="https://github.com/min9gu.png" width="100" />
        </a>
      </th>
      <th>
        <a href="https://github.com/HoHyun-Dev">
          <img src="https://github.com/HoHyun-Dev.png" width="100" />
        </a>
      </th>
      <th>
        <a href="https://github.com/JA3WOOK">
          <img src="https://github.com/JA3WOOK.png" width="100" />
        </a>
      </th>
      <th>
        <a href="https://github.com/alsrud1114">
          <img src="https://github.com/alsrud1114.png" width="100" />
        </a>
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td align="center">류진환<br>출동 관제·실시간(SSE)·ETA</td>
      <td align="center">경민구<br>정비 리포트·정산·관제 대시보드</td>
      <td align="center">김호현<br>인증·권한·플랫폼 총괄</td>
      <td align="center">배재욱<br>엔지니어 매칭·배정 엔진</td>
      <td align="center">송민경<br>점주·기자재·긴급 A/S 접수</td>
    </tr>
  </tbody>
</table>

<br>

## <div align="center">기술 스택</div>

> ### Front-End
<table align="center">
  <thead>
    <tr>
      <th>용도</th>
      <th>사용한 스택</th>
      <th>선택 이유</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td align="center">Language</td>
      <td align="center">
        <img src="https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white"/>
      </td>
      <td align="center">정적 타입을 통한 런타임 에러 방지 및 코드 안정성 확보</td>
    </tr>
    <tr>
      <td align="center">Library</td>
      <td align="center">
        <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB">
      </td>
      <td align="center">컴포넌트 기반 UI 개발 및 선언적 프로그래밍을 통한 효율적 관리</td>
    </tr>
    <tr>
      <td align="center">Build</td>
      <td align="center">
        <img src="https://img.shields.io/badge/vite-646CFF?style=for-the-badge&logo=vite&logoColor=white"/>
      </td>
      <td align="center">빠르고 효율적인 번들링 환경 구축</td>
    </tr>
    <tr>
      <td align="center">Real-time</td>
      <td align="center">
        <img src="https://img.shields.io/badge/SSE-000000?style=for-the-badge">
      </td>
      <td align="center">출동 상태 변경, 위치, ETA를 실시간으로 수신하기 위한 서버 푸시</td>
    </tr>
  </tbody>
</table>

> ### Back-End
<table align="center">
  <thead>
    <tr>
      <th>용도</th>
      <th>사용한 스택</th>
      <th>선택 이유</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td align="center">Language</td>
      <td align="center">
        <img src="https://img.shields.io/badge/Java-007396?style=for-the-badge&logo=openjdk&logoColor=white">
      </td>
      <td align="center">안정적인 타입 시스템과 풍부한 엔터프라이즈 생태계 활용</td>
    </tr>
    <tr>
      <td align="center">Framework</td>
      <td align="center">
        <img src="https://img.shields.io/badge/Spring%20Boot-6DB33F?style=for-the-badge&logo=springboot&logoColor=white">
      </td>
      <td align="center">도메인(접수/매칭/관제/정산/교육)별 패키지 분리로 관심사 분리</td>
    </tr>
    <tr>
      <td align="center">Build Tool</td>
      <td align="center">
        <img src="https://img.shields.io/badge/Maven-C71A36?style=for-the-badge&logo=apachemaven&logoColor=white">
      </td>
      <td align="center">의존성 관리 및 빌드 자동화</td>
    </tr>
    <tr>
      <td align="center">Database</td>
      <td align="center">
        <img src="https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=MySQL&logoColor=white">
      </td>
      <td align="center">28개 테이블 규모의 관계형 데이터(접수·배정·정산·교육) 관리</td>
    </tr>
    <tr>
      <td align="center">Cache / Lock</td>
      <td align="center">
        <img src="https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white">
      </td>
      <td align="center">Redisson 분산 락으로 동시 배정 시 중복 배정 방지</td>
    </tr>
    <tr>
      <td align="center">AI</td>
      <td align="center">
        <img src="https://img.shields.io/badge/Gemini-8E75B2?style=for-the-badge&logo=googlegemini&logoColor=white">
      </td>
      <td align="center">고장 증상 분석 및 예상 원인·추천 부품 가이드 제공</td>
    </tr>
    <tr>
      <td align="center">Authentication</td>
      <td align="center">
        <img src="https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20Web%20Tokens&logoColor=white">
      </td>
      <td align="center">역할 기반(점주/엔지니어/본사 관리자/플랫폼 총괄) 인증·인가 처리</td>
    </tr>
  </tbody>
</table>

> ### Architecture
<div align="center">
  <img width="734" height="510" alt="architecture" src="https://github.com/user-attachments/assets/7da7362c-4320-4d90-9586-6cb556df32be" />
</div>

<br>

## <div align="center">개발 시작하기</div>

> ### .env 설정하기 (BE)

```
DB_URL=jdbc:mysql://localhost:3306/your_db_name
DB_USERNAME=your_db_username
DB_PASSWORD=your_db_password

JWT_SECRET=your_jwt_secret_key

GEMINI_API_KEY=your_gemini_api_key
```

> ### 로컬 서버 접속하기
- FE

```
cd frontend
npm install
npm run dev
```

- BE

```
cd backend
./mvnw spring-boot:run
```

> ### 사전 준비
- MySQL 서버가 실행 중이어야 하며, `DB_URL`에 명시한 데이터베이스가 미리 생성되어 있어야 합니다.
- Redis 서버가 로컬(`localhost:6379`)에서 실행 중이어야 합니다.
- 백엔드는 기본적으로 `8080` 포트에서 실행되며, 프론트엔드는 이 주소(`http://localhost:8080/api`)로 API를 호출합니다.

  <br>

## <div align="center">폴더 구조</div>
```
run4you/
├─ 📁 backend/ (BE)
│ ├─ 📁 .mvn/
│ │ └─ 📁 wrapper/
│ │
│ ├─ 📁 src/
│ │ ├─ 📁 main/
│ │ │ ├─ 📁 java/com/run4you/
│ │ │ │ ├─ 📁 asrequest/ (긴급 A/S 접수)
│ │ │ │ │ ├─ 📁 controller/
│ │ │ │ │ ├─ 📁 dto/
│ │ │ │ │ ├─ 📁 entity/
│ │ │ │ │ ├─ 📁 repository/
│ │ │ │ │ └─ 📁 service/
│ │ │ │ │
│ │ │ │ ├─ 📁 auth/ (인증·인가)
│ │ │ │ │ ├─ 📁 controller/
│ │ │ │ │ ├─ 📁 dto/
│ │ │ │ │ ├─ 📁 security/
│ │ │ │ │ └─ 📁 service/
│ │ │ │ │
│ │ │ │ ├─ 📁 brand/ (본사·브랜드 관리)
│ │ │ │ │ ├─ 📁 controller/
│ │ │ │ │ ├─ 📁 dto/
│ │ │ │ │ ├─ 📁 entity/
│ │ │ │ │ ├─ 📁 repository/
│ │ │ │ │ └─ 📁 service/
│ │ │ │ │
│ │ │ │ ├─ 📁 certificate/ (건강 진단서)
│ │ │ │ │ ├─ 📁 controller/
│ │ │ │ │ ├─ 📁 dto/
│ │ │ │ │ ├─ 📁 entity/
│ │ │ │ │ ├─ 📁 repository/
│ │ │ │ │ └─ 📁 service/
│ │ │ │ │
│ │ │ │ ├─ 📁 common/ (공통 모듈)
│ │ │ │ │ ├─ 📁 config/
│ │ │ │ │ ├─ 📁 enums/
│ │ │ │ │ ├─ 📁 exception/
│ │ │ │ │ ├─ 📁 response/
│ │ │ │ │ ├─ 📁 util/
│ │ │ │ │ └─ 📁 validation/
│ │ │ │ │
│ │ │ │ ├─ 📁 dashboard/ (통합 관제 대시보드)
│ │ │ │ │ ├─ 📁 controller/
│ │ │ │ │ ├─ 📁 dto/
│ │ │ │ │ └─ 📁 service/
│ │ │ │ │
│ │ │ │ ├─ 📁 dispatch/ (출동 관제·실시간) ★
│ │ │ │ │ ├─ 📁 config/
│ │ │ │ │ ├─ 📁 controller/
│ │ │ │ │ ├─ 📁 domain/
│ │ │ │ │ ├─ 📁 dto/
│ │ │ │ │ ├─ 📁 entity/
│ │ │ │ │ ├─ 📁 exception/
│ │ │ │ │ ├─ 📁 port/
│ │ │ │ │ │ └─ 📁 jdbc/
│ │ │ │ │ ├─ 📁 repository/
│ │ │ │ │ ├─ 📁 service/
│ │ │ │ │ ├─ 📁 sse/
│ │ │ │ │ └─ 📁 support/
│ │ │ │ │
│ │ │ │ ├─ 📁 education/ (교육 콘텐츠)
│ │ │ │ │ ├─ 📁 controller/
│ │ │ │ │ ├─ 📁 dto/
│ │ │ │ │ └─ 📁 service/
│ │ │ │ │
│ │ │ │ ├─ 📁 equipment/ (기자재)
│ │ │ │ │ ├─ 📁 controller/
│ │ │ │ │ ├─ 📁 dto/
│ │ │ │ │ ├─ 📁 entity/
│ │ │ │ │ ├─ 📁 repository/
│ │ │ │ │ └─ 📁 service/
│ │ │ │ │
│ │ │ │ ├─ 📁 lms/ (LMS 교육·시험)
│ │ │ │ │ ├─ 📁 controller/
│ │ │ │ │ ├─ 📁 dto/
│ │ │ │ │ ├─ 📁 entity/
│ │ │ │ │ ├─ 📁 repository/
│ │ │ │ │ └─ 📁 service/
│ │ │ │ │
│ │ │ │ ├─ 📁 matching/ (엔지니어 배정 엔진)
│ │ │ │ │ ├─ 📁 controller/
│ │ │ │ │ ├─ 📁 dto/
│ │ │ │ │ ├─ 📁 entity/
│ │ │ │ │ ├─ 📁 event/
│ │ │ │ │ ├─ 📁 lock/ (Redisson 분산 락)
│ │ │ │ │ ├─ 📁 repository/
│ │ │ │ │ └─ 📁 service/
│ │ │ │ │
│ │ │ │ ├─ 📁 notification/ (실시간 알림)
│ │ │ │ │ ├─ 📁 controller/
│ │ │ │ │ ├─ 📁 dto/
│ │ │ │ │ ├─ 📁 entity/
│ │ │ │ │ ├─ 📁 repository/
│ │ │ │ │ ├─ 📁 service/
│ │ │ │ │ └─ 📁 sse/
│ │ │ │ │
│ │ │ │ ├─ 📁 part/ (부품 마스터)
│ │ │ │ │ ├─ 📁 controller/
│ │ │ │ │ ├─ 📁 entity/
│ │ │ │ │ ├─ 📁 repository/
│ │ │ │ │ └─ 📁 service/
│ │ │ │ │
│ │ │ │ ├─ 📁 report/ (정비 리포트)
│ │ │ │ │ ├─ 📁 controller/
│ │ │ │ │ ├─ 📁 dto/
│ │ │ │ │ ├─ 📁 entity/
│ │ │ │ │ ├─ 📁 repository/
│ │ │ │ │ └─ 📁 service/
│ │ │ │ │
│ │ │ │ ├─ 📁 settlement/ (정산)
│ │ │ │ │ ├─ 📁 controller/
│ │ │ │ │ ├─ 📁 dto/
│ │ │ │ │ ├─ 📁 entity/
│ │ │ │ │ ├─ 📁 repository/
│ │ │ │ │ └─ 📁 service/
│ │ │ │ │
│ │ │ │ ├─ 📁 store/ (점포)
│ │ │ │ │ ├─ 📁 controller/
│ │ │ │ │ ├─ 📁 dto/
│ │ │ │ │ ├─ 📁 entity/
│ │ │ │ │ ├─ 📁 repository/
│ │ │ │ │ └─ 📁 service/
│ │ │ │ │
│ │ │ │ └─ 📁 user/ (통합 계정)
│ │ │ │ ├─ 📁 controller/
│ │ │ │ ├─ 📁 dto/
│ │ │ │ ├─ 📁 entity/
│ │ │ │ ├─ 📁 repository/
│ │ │ │ └─ 📁 service/
│ │ │ │
│ │ │ └─ 📁 resources/
│ │ │ ├─ 📁 static/
│ │ │ └─ 📁 templates/
│ │ │
│ │ └─ 📁 test/java/com/run4you/
│ │ ├─ 📁 dispatch/
│ │ │ ├─ 📁 domain/
│ │ │ └─ 📁 service/
│ │ └─ 📁 matching/
│ │ └─ 📁 service/
│ │
│ └─ 📃 pom.xml
│
└─ 📁 frontend/ (FE)
├─ 📁 public/
└─ 📁 src/
├─ 📁 api/ (axios 인터셉터, API 페칭)
├─ 📁 assets/
├─ 📁 components/
│ ├─ 📁 admin/ (본사 관리자용 컴포넌트)
│ ├─ 📁 common/
│ ├─ 📁 engineer/ (엔지니어용 컴포넌트)
│ │ └─ 📁 education/
│ ├─ 📁 layout/
│ └─ 📁 super/ (플랫폼 총괄용 컴포넌트)
│
├─ 📁 context/
├─ 📁 hooks/
├─ 📁 pages/
│ ├─ 📁 auth/
│ ├─ 📁 engineer/
│ ├─ 📁 store/
│ └─ 📁 super/
│
├─ 📁 styles/
└─ 📁 utils/

```

## <div align="center">개발 규칙</div>

> ### 폴더/파일명 규칙
- 폴더명 : **kebab-case** (`user-profile`, `utils` 등)
- 로직 / 함수 / css 등 일반 파일명 : **camelCase** (`authController`, `api` 등)
- 컴포넌트 파일명 : **PascalCase** (`UserProfile`, `Home` 등)

> ### PR 및 Merge 규칙
- 커밋을 바로 `develop`이나 `main`에 머지하지 않고, 되도록 PR 후 Merge

> ### 커밋 규칙

- 커밋의 끝맺음은 "~ 기능 추가", "~ 작업", "~ 개발" 과 같이 명사로 통일
- 너무 많은 변경을 하나의 커밋에 담지 말기 (세부 작업마다 틈틈이 커밋하기!)

```
Init: 프로젝트 세팅
Feat: 새로운 기능 추가
Fix: 버그 수정
Design: UI 스타일/디자인 수정
Refactor: 코드 리팩토링
Typo: 오타 수정,타입 수정
Rename: 폴더 구조 이동, 파일명 변경
Assets: 이미지, 폰트 등 리소스 추가/삭제
Del: 파일 삭제
Docs: 문서 수정, 목데이터 작업 등
Chore: 설정파일 보완, 환경 설정
Deps: 새로운 라이브러리 설치
Deps: 불필요한 라이브러리 삭제
Revert : 커밋 내용 복구
```

예시

```
Feat: 메인페이지 개발
Refactor: 등록 플로우 - 글 작성 페이지 로직 정리
```

> ### 브랜치 전략

- 이슈를 사용하지 않는다면 `feat/기능이름` 처럼 작성

| 태그이름                    | 설명                       |
| --------------------------- | -------------------------- |
| main                        | 실제 배포용 브랜치         |
| develop                     | 개발용 브랜치(기능 통합용) |
| feat/#이슈번호/기능이름     | 새로운 기능 개발 시        |
| refactor/#이슈번호/기능이름 | 코드 리팩토링              |
| fix/#이슈번호/버그이름      | 버그 수정                  |
| design/#이슈번호/요소       | 디자인 및 스타일 변경      |
| chore/#이슈번호/내용        | 설정, 의존성 등 기타 작업  |

예시

```
feat/#12/login-page  // 로그인 기능 개발
refactor/#34/reduce-duplicated-code  // 코드 리팩토링
chore/#56/update-eslint  // eslint 설정 수정
```
