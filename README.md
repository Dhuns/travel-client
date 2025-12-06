# DIY Client

Next.js 14 기반 DIY 여행 플랫폼 사용자 클라이언트..

## 기술 스택

| 분류 | 기술 | 버전 |
|------|------|------|
| Framework | Next.js (App Router) | 14.2 |
| Language | TypeScript | 5.x |
| Styling | Tailwind CSS | 4.x |
| Styling | Emotion (CSS-in-JS) | 11.x |
| UI Components | Radix UI | 1.x |
| UI Components | shadcn/ui | - |
| Icons | Lucide React | 0.454 |
| State Management | Zustand | 5.x |
| Forms | React Hook Form | 7.x |
| Maps | @vis.gl/react-google-maps | 1.7 |
| HTTP Client | Axios | 1.x |
| Date | Day.js | 1.x |
| Carousel | Embla Carousel | 8.x |
| Charts | Recharts | 2.x |
| Markdown | React Markdown | 10.x |
| Deploy | Vercel | - |

## 설치 및 실행

```bash
# 의존성 설치 (yarn 필수)
yarn install

# 개발 서버 (포트 3000)
yarn dev

# 빌드
yarn build

# 프로덕션 빌드
yarn build:prod

# 프로덕션 서버
yarn start

# 린트
yarn lint

# 타입 체크
yarn typecheck
```

## 환경 변수

`.env.local` 파일 생성:

```env
# ============================================
# 클라이언트 (브라우저에 노출됨)
# ============================================

# Backend API URL
NEXT_PUBLIC_API_URL=http://localhost:9191/api

# S3 이미지 URL
NEXT_PUBLIC_ASSET_URL=https://tumakr-dev.s3.ap-northeast-2.amazonaws.com

# Google Maps API Key
NEXT_PUBLIC_GOOGLE_API_KEY=your_google_api_key

# 견적서 URL 암호화 키 (AES)
NEXT_PUBLIC_ENCRYPTION_KEY=your_encryption_key

# Bokun 위젯 채널 UUID
NEXT_PUBLIC_BOKUN_BOOKING_CHANNEL_UUID=your_bokun_uuid

# ============================================
# 서버 전용 (브라우저에 노출되지 않음)
# API Routes 및 Server Components에서 사용
# ============================================

# Bokun API
BOKUN_API_URL=https://api.bokun.io
BOKUN_ACCESS_KEY=your_access_key
BOKUN_SECRET_KEY=your_secret_key
```

## 프로젝트 구조

```
DIY-client-main/
├── app/                        # Next.js App Router
│   ├── layout.tsx              # 루트 레이아웃
│   ├── page.tsx                # 홈페이지
│   ├── globals.css             # 전역 스타일
│   │
│   ├── api/                    # API Routes
│   │   └── bokun/              # Bokun API 프록시
│   │
│   ├── auth/                   # OAuth 콜백
│   ├── login/                  # 로그인
│   ├── signup/                 # 회원가입
│   ├── forgot-password/        # 비밀번호 찾기
│   ├── reset-password/         # 비밀번호 재설정
│   ├── verify-email/           # 이메일 인증
│   ├── email-verified/         # 이메일 인증 완료
│   ├── email-sent/             # 이메일 발송 완료
│   │
│   ├── tours/                  # 투어 목록/상세
│   │   ├── page.tsx            # 투어 목록
│   │   ├── private/            # 프라이빗 투어
│   │   │   └── [id]/           # 상세 페이지
│   │   ├── multiday/           # 다일 투어
│   │   │   └── [id]/           # 상세 페이지
│   │   └── history/            # 역사 투어
│   │       └── [id]/           # 상세 페이지
│   │
│   ├── search/                 # 투어 검색
│   ├── quotation/              # 견적서 조회
│   │   └── [hash]/             # 암호화된 URL
│   ├── orders/                 # 주문 내역
│   │   └── [id]/               # 주문 상세
│   ├── wishlist/               # 위시리스트
│   │
│   ├── mypage/                 # 마이페이지
│   │   └── profile/            # 프로필 관리
│   ├── chat/                   # AI 챗봇
│   │
│   ├── about/                  # 회사 소개
│   ├── contact/                # 문의하기
│   ├── faq/                    # FAQ
│   ├── privacy/                # 개인정보처리방침
│   └── terms/                  # 이용약관
│
├── components/                 # UI 컴포넌트
│   ├── ui/                     # shadcn/ui 컴포넌트 (~50개)
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── dialog.tsx
│   │   ├── input.tsx
│   │   ├── select.tsx
│   │   └── ...
│   │
│   ├── header.tsx              # 헤더 (네비게이션)
│   ├── footer.tsx              # 푸터
│   ├── hero-section.tsx        # 히어로 섹션
│   ├── home-page-client.tsx    # 홈페이지 클라이언트
│   │
│   ├── BokunWidget.tsx         # Bokun 예약 위젯
│   ├── BokunCartWidget.tsx     # Bokun 장바구니
│   ├── BokunWidgetScript.tsx   # Bokun 스크립트 로더
│   │
│   ├── ChatButton.tsx          # 챗봇 토글 버튼
│   ├── favorite-button.tsx     # 위시리스트 버튼
│   ├── tour-booking-form.tsx   # 투어 예약 폼
│   ├── MultidayTourList.tsx    # 다일 투어 목록
│   ├── popular-destinations.tsx # 인기 여행지
│   ├── PrivateTourInquiryForm.tsx # 프라이빗 투어 문의
│   ├── TripAdvisorWidget.tsx   # TripAdvisor 위젯
│   ├── ErrorBoundary.tsx       # 에러 바운더리
│   └── theme-provider.tsx      # 테마 프로바이더
│
├── config/                     # 설정
│   └── tours.ts                # 투어 설정 (카테고리, 타입)
│
├── hooks/                      # 커스텀 훅
│   ├── use-mobile.ts           # 모바일 감지
│   └── use-toast.ts            # 토스트 알림
│
├── lib/                        # 유틸리티
│   ├── bokun.ts                # Bokun API 클라이언트
│   ├── utils.ts                # 공통 유틸 (cn 함수)
│   └── wishlist.ts             # 위시리스트 로직
│
├── src/
│   ├── components/             # 기능별 컴포넌트
│   │   └── Chat/               # 챗봇 컴포넌트
│   │
│   ├── containers/             # 페이지 컨테이너
│   │   └── quotation/          # 견적서 컨테이너
│   │
│   └── shared/                 # 공유 로직
│       ├── apis/               # API 클라이언트
│       │   ├── chat.ts         # 챗봇 API
│       │   ├── estimate.ts     # 견적 API
│       │   ├── search.ts       # 검색 API
│       │   ├── tour.ts         # 투어 API
│       │   ├── user.ts         # 사용자 API
│       │   └── wishlist.ts     # 위시리스트 API
│       │
│       ├── store/              # Zustand 스토어
│       │   ├── authStore.ts    # 인증 상태
│       │   └── chatStore.ts    # 챗봇 상태
│       │
│       ├── types/              # TypeScript 타입
│       ├── constants/          # 상수
│       └── utils/              # 유틸리티
│           ├── base.ts         # 기본 유틸
│           ├── crypto.ts       # 암호화
│           └── ...
│
├── components.json             # shadcn/ui 설정
├── next.config.mjs             # Next.js 설정
├── postcss.config.mjs          # PostCSS 설정 (Tailwind)
├── tsconfig.json               # TypeScript 설정
└── package.json                # 패키지 설정
```

## 주요 기능

### 1. 투어 예약 시스템
- **Bokun 위젯 연동**: 실시간 투어 예약
- **투어 카테고리**: 프라이빗, 다일, 역사 투어
- **검색 및 필터**: 투어 검색, 카테고리별 필터
- **위시리스트**: 관심 투어 저장

### 2. 견적서 조회
- **암호화된 URL**: AES 암호화로 견적서 접근
- **일정 타임라인**: 일별 여행 일정 표시
- **인터랙티브 지도**: Google Maps로 위치 표시
- **가격 상세**: 항목별 비용 (숨김 설정 가능)

### 3. AI 챗봇
- **여행 상담**: AI 기반 여행 추천
- **세션 관리**: 대화 기록 저장
- **로그인 연동**: 사용자별 대화 관리

### 4. 사용자 인증
- **이메일/비밀번호**: 기본 인증
- **Google OAuth**: 소셜 로그인
- **이메일 인증**: 회원가입 시 이메일 확인
- **비밀번호 재설정**: 이메일로 재설정 링크

### 5. 마이페이지
- **프로필 관리**: 사용자 정보 수정
- **주문 내역**: 예약 현황 확인
- **위시리스트**: 저장한 투어 관리

## Path Aliases

```typescript
// tsconfig.json paths
"@/*"          → "./*"           // 루트 기준
"@components/*" → "src/components/*"
"@shared/*"    → "src/shared/*"
"@containers/*" → "src/containers/*"
```

## 외부 서비스 연동

| 서비스 | 용도 |
|--------|------|
| Bokun | 투어 예약 위젯, API |
| Google Maps | 지도, 위치 표시 |
| Google OAuth | 소셜 로그인 |
| AWS S3 | 이미지 호스팅 |
| TripAdvisor | 리뷰 위젯 |
| Vercel | 호스팅, 배포 |

## 배포

### Vercel (자동)

```bash
# main 브랜치에 push하면 자동 배포
git push origin main
```

### Vercel 설정

| 항목 | 값 |
|------|-----|
| Framework | Next.js |
| Build Command | `yarn build:prod` |
| Output Directory | `.next` |
| Install Command | `yarn install` |

## 관련 프로젝트

| 프로젝트 | 설명 | 기술 스택 |
|---------|------|----------|
| diy-server-develop | Backend API | NestJS 8, TypeORM |
| DIY-admin-client-main | 관리자 대시보드 | React 18, Webpack |

## API 엔드포인트

### Backend (diy-server)
- Local: `http://localhost:9191/api`
- Dev: `https://api-dev.tumakr.com/api`
- Prod: `https://api.tumakr.com/api`

### 주요 API
```
POST /api/user/signin           # 로그인
POST /api/user/signup           # 회원가입
GET  /api/user/me               # 현재 사용자
POST /api/user/reset-password   # 비밀번호 재설정

GET  /api/estimate/:hash        # 견적서 조회

GET  /api/chat/sessions         # 챗봇 세션
POST /api/chat/send             # 메시지 전송

GET  /api/search/tours          # 투어 검색
GET  /api/tour/:id              # 투어 상세

GET  /api/wishlist              # 위시리스트
POST /api/wishlist/:id          # 위시리스트 추가/삭제
```
