# DIY Client (사용자 클라이언트)

Next.js 기반 DIY 여행 견적 조회 웹 애플리케이션

## 🚀 기술 스택

- **프레임워크**: Next.js 13
- **언어**: TypeScript
- **스타일링**: Emotion (CSS-in-JS), Tailwind CSS
- **상태 관리**: Zustand, React Query
- **지도**: Google Maps, React Leaflet, Mapbox
- **배포**: Vercel

## 📝 최근 업데이트

### 2025-11-15
- ✅ **404 오류 수정**: 존재하지 않는 페이지 링크를 푸터에서 # 으로 변경
- ✅ **CSP 헤더**: HTTP API 요청을 허용하는 CSP 헤더 추가
- ✅ **QuotationModal batchId 지원**: batchId 지원 추가 및 TypeScript 빌드 오류 무시
- ✅ **HeroSection className**: HeroSection 컴포넌트에 className prop 추가
- ✅ **onlyPlace 필터**: 견적 표시에 onlyPlace 필터 적용
- ✅ **견적 페이지 UI 개선**: UI 개선 및 Draft.js 렌더링 수정
- ✅ **Draft.js 처리**: Draft.js JSON과 일반 텍스트 모두 처리하도록 개선
- ✅ **지도 중심 수정**: 지도 중심이 핀 위치를 제대로 표시하도록 수정
- ✅ **아이템 설명 변환**: 아이템 설명(description)도 Draft.js JSON을 HTML로 변환
- ✅ **추가 정보 표시**: Draft.js JSON을 HTML로 변환하여 견적서 추가 정보 표시

## 📦 설치

```bash
yarn install
# 또는
npm install
```

## 🛠️ 개발

```bash
# 개발 서버 (포트 3000)
yarn dev
# 또는
npm run dev

# 프로덕션 환경 테스트
yarn start:prod
```

## 🏗️ 빌드

```bash
# 프로덕션 빌드
yarn build
# 또는
yarn build:prod

# 로컬 빌드
yarn build:local
```

## 🌍 환경 변수

`.env.local` 및 `.env.production` 파일 생성:

```env
# API
NEXT_PUBLIC_API_URL=http://localhost:9191/api
NEXT_PUBLIC_ASSET_URL=https://diy-files2.s3.ap-northeast-2.amazonaws.com/dev
NEXT_PUBLIC_CLIENT_URL=http://localhost:3000

# 외부 API
NEXT_PUBLIC_KAKAO_API_KEY=your_kakao_key
NEXT_PUBLIC_GOOGLE_API_KEY=your_google_key

# 쿠키
NEXT_PUBLIC_COOKIE_PREFIX=
```

## ✨ 주요 기능

### 견적서 조회
- **해시 기반 접근**: 고유 해시를 통한 견적서 직접 접근
- **인터랙티브 지도**: 모든 여행지 위치 표시
- **일별 타임라인**: 시간순 일정 표시
- **사진 갤러리**: 모든 항목 이미지
- **가격 상세**: 항목별 비용 (숨김 설정 가능)
- **에이전트 정보**: 연락처 및 비상 연락처

### 디자인
- **반응형**: 모바일 최적화
- **모던 UI**: 깔끔하고 직관적인 인터페이스
- **Draft.js 지원**: 리치 텍스트 콘텐츠 HTML 변환

## 📁 프로젝트 구조

```
src/
├── pages/            # Next.js 페이지
│   ├── _app.tsx      # 앱 래퍼
│   ├── index.tsx     # 루트 (404로 리다이렉트)
│   ├── 404/          # Not found 페이지
│   └── quotation/    # 메인 기능
│       └── [hash].tsx # 동적 견적 조회
├── containers/       # 컨테이너 로직
│   └── quotation/    # 견적 표시 로직
├── components/       # 재사용 가능한 컴포넌트
│   ├── Map/          # Google Maps
│   ├── Timeline/     # 일정 타임라인
│   └── ...
└── shared/           # 공유 로직
    ├── apis/         # API 호출
    ├── hooks/        # 커스텀 훅
    ├── store/        # Zustand 스토어
    └── utils/        # 유틸리티
```

## 🎨 핵심 기능

### 지도 통합
- **Google Maps**: 여행지 위치 표시
- **React Leaflet**: 대체 지도 옵션
- **Mapbox**: 고급 지도 기능

### 상태 관리
- **Zustand**: 전역 클라이언트 상태
- **React Query**: 서버 상태 관리 및 캐싱

### 콘텐츠 렌더링
- **Draft.js**: JSON을 HTML로 변환
- **리치 텍스트**: 견적서 상세 정보 표시

## 📝 사용 가능한 스크립트

- `yarn dev` - 개발 서버 시작 (포트 3000)
- `yarn build` - 프로덕션 빌드
- `yarn build:prod` - 환경 변수와 함께 프로덕션 빌드
- `yarn build:local` - 로컬 빌드
- `yarn start:local` - 로컬 환경으로 시작
- `yarn start:prod` - 프로덕션 환경으로 시작
- `yarn page` - 새 페이지 생성 (create_page.sh)
- `yarn lint` - ESLint 실행

## 🚀 배포

### Vercel (자동)

```bash
# GitHub에 push하면 자동 배포
git push origin main
```

### Vercel 빌드 설정

- **Framework Preset**: Next.js
- **Build Command**: `yarn build:prod`
- **Output Directory**: `.next`
- **Install Command**: `yarn install`

## ⚠️ 중요 사항

### 루트 경로 동작

루트 경로 (`/`)는 **의도적으로** `/404`로 리다이렉트됩니다.

**이유**:
- 사용자 클라이언트는 견적 조회 전용 앱
- 공개 랜딩 페이지 불필요
- 직접 견적 링크를 통해서만 접근: `/quotation/{hash}`

```typescript
// pages/index.tsx
useEffect(() => {
  replace("/404");  // 의도적인 동작
}, []);
```

### TypeScript 빌드 오류

개발 환경에서만 TypeScript 오류를 무시하도록 설정:

```javascript
// next.config.mjs
typescript: {
  ignoreBuildErrors: process.env.NODE_ENV === 'development',
}
```

## 🔗 관련 프로젝트

- **백엔드 API**: diy-server-develop
- **관리자 패널**: DIY-admin-client-main

## 📄 라이선스

MIT
