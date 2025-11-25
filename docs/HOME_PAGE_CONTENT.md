# Home Page Content Guide

이 문서는 `components/home-page-client.tsx` 파일의 텍스트 콘텐츠를 빠르게 수정할 수 있도록 정리한 가이드입니다.

---

## 1. Hero Section (첫 화면)

### 배지 텍스트
```
Premium Korea Travel Experience
```
**위치:** 라인 167

### 메인 타이틀
```
tumakr
Korea History Tour
Curated by AI, Guided by Experts.
```
**위치:** 라인 173-179

### 서브 설명
```
Design your perfect trip with our intelligent assistant or explore our premium tour collections.
```
**위치:** 라인 183-184

### 버튼 텍스트
- **첫 번째 버튼:** `Chat with AI Planner` (라인 197)
- **두 번째 버튼:** `Explore Tours` (라인 209)

### 챗봇 미리보기 (오른쪽)
- **AI 메시지:** `Hello! I can help you plan your Korea trip.` (라인 224)
- **AI 서브 메시지:** `Looking for a private family tour or a historical adventure?` (라인 227)
- **사용자 메시지:** `I want to visit Gyeongbokgung and have a Hanbok experience!` (라인 236)

### 스크롤 인디케이터
```
Scroll Down
```
**위치:** 라인 246

---

## 2. Main Services Split Section (AI Chatbot & Oneday Tours)

### 왼쪽 패널 (AI Chatbot) - 배경색: #c4982a (mustard)

#### 배지
```
AI-Powered Planning
```

#### 타이틀
```
Plan Your
Perfect Trip
```

#### 설명
```
Get instant itinerary suggestions, real-time advice, and seamless booking with our intelligent travel assistant.
```

#### 특징 리스트
```
- 24/7 Smart Planning
- Custom Itineraries
- Instant Recommendations
```

#### 버튼
```
Start Chat Now
```

---

### 오른쪽 패널 (Oneday Tours) - 배경색: #651d2a (maroon)

#### 배지
```
Most Popular
```

#### 타이틀
```
Classic
Oneday Tours
```

#### 설명
```
Join thousands of travelers on our beloved daily group tours to Nami Island, DMZ, and iconic Korean destinations.
```

#### 특징 리스트
```
- Daily Departures
- Small Groups
- Expert Guides
```

#### 버튼
```
Explore Tours
```

#### 외부 링크
```
https://www.onedaykorea.com
```

---

## 3. tumakr Exclusives Section (투어 카테고리)

### 섹션 헤더
- **배지:** `Curated Experiences`
- **타이틀:** `tumakr Exclusives`
- **설명:** `Choose your adventure from our premium collection`

### 투어 카테고리 데이터 (라인 59-84)

#### Private Tours
```javascript
{
  title: "Private Tours",
  description: "Exclusive experiences tailored just for you",
  image: "/beautiful-korean-traditional-palace-with-tourists-.jpg",
  link: "/tours/private",
  color: "#651d2a" // maroon
}
```

#### Multiday Tours
```javascript
{
  title: "Multiday Tours",
  description: "Immersive journeys across Korea",
  image: "/beautiful-jeju-island-hallasan-mountain-and-nature.jpg",
  link: "/tours/multiday",
  color: "#c4982a" // mustard
}
```

#### Korea Tour
```javascript
{
  title: "Korea Tour",
  description: "Deep dive into Korea's rich heritage",
  image: "/korean-dmz-border-historical-site-and-observation-.jpg",
  link: "/tours/history",
  color: "#6d8675" // sage-green
}
```

---

## 4. Most Popular Destinations Section

### 섹션 헤더
- **타이틀:** `Most Popular Destinations`
- **설명:** `Discover Korea's most beloved destinations with our expert local guides`

> **참고:** 이 섹션의 투어 데이터는 서버에서 `popularDestinations` props로 전달됩니다.

---

## 5. AI Chatbot Promotion Section

### 배지
```
Powered by AI
```

### 타이틀
```
Not Sure Where
to Start?
```

### 설명
```
Our AI assistant connects you to everything: from classic Oneday tours to custom private adventures.
```

### 기능 카드
```
- Find Legacy Tours
- Custom Itineraries
- Instant Answers
- Local Insights
```

### 버튼
```
Launch AI Chat
```

### 챗봇 프리뷰 (오른쪽 카드)
- **타이틀:** `AI Travel Assistant`
- **상태:** `Online now`
- **사용자 메시지:** `I want to visit Nami Island tomorrow. Any tours available?`
- **AI 응답:** `Perfect! That's one of our popular Oneday Legacy tours. I can show you availability or suggest a private custom tour. Which interests you?`
- **타이핑 인디케이터:** `AI is typing...`

### 플로팅 배지
```
Free to Use! ✨
```

---

## 6. Goods Showcase Section (기념품)

### 섹션 헤더
- **배지:** `Exclusive Benefits`
- **타이틀:** `Memories to Take Home`
- **설명:** `Receive premium Korean souvenirs with select tour bookings`

### 기념품 데이터 (라인 86-101)

```javascript
const goods = [
  {
    name: "Signature Hoodie",
    image: "/images/design-mode/gift-1.png",
    link: "/souvenir",
  },
  {
    name: "Eco-Friendly Tote Bag",
    image: "/images/design-mode/gift-2.png",
    link: "/souvenir",
  },
  {
    name: "Premium Tumbler",
    image: "/images/design-mode/gift-3.png",
    link: "/souvenir",
  },
];
```

### 카드 내 텍스트
- **배지:** `FREE`
- **설명:** `Complimentary with tour`

---

## 7. FAQ Section

### 섹션 헤더
- **타이틀:** `Frequently Asked Questions`
- **설명:** `Everything you need to know about planning your trip`

### FAQ 데이터 (라인 104-119)

```javascript
const faqs = [
  {
    question: "What is the difference between Oneday Tours and other tours?",
    answer: "Oneday Tours focus on classic day trips to popular spots. Our Private, Multiday, and History tours offer deeper, more specialized experiences with custom itineraries.",
  },
  {
    question: "How does the AI Chatbot work?",
    answer: "Our AI Chatbot helps you customize your itinerary, answer questions about Korea, and even guide you to our legacy Oneday Tour options.",
  },
  {
    question: "Are the souvenirs really free?",
    answer: "Yes! We offer exclusive complimentary gifts like hoodies, tote bags, and tumblers with specific tour bookings as a thank you for choosing us.",
  },
];
```

---

## 브랜드 컬러 가이드

| 이름 | Hex 코드 | 용도 |
|------|----------|------|
| Maroon | `#651d2a` | 메인 브랜드 색상, 버튼, 헤더 |
| Mustard | `#c4982a` | AI 챗봇 섹션, 강조 |
| Sage Green | `#6d8675` | 기념품 섹션, 보조 색상 |
| Dusty Pink | `#eda89b` | 배경 그라데이션 |

---

## 자동 스크롤 설정

페이지 로드 후 자동 스크롤 시간: **4.7초** (라인 132)

```javascript
// 변경하려면 이 값을 수정하세요
setTimeout(() => {
  // ...
}, 4700); // 밀리초 단위
```

---

## 이미지 경로

| 섹션 | 이미지 경로 |
|------|------------|
| Hero 배경 | `/images/design-mode/castle4.png` |
| Private Tours | `/beautiful-korean-traditional-palace-with-tourists-.jpg` |
| Multiday Tours | `/beautiful-jeju-island-hallasan-mountain-and-nature.jpg` |
| Korea Tour | `/korean-dmz-border-historical-site-and-observation-.jpg` |
| 기념품 1 | `/images/design-mode/gift-1.png` |
| 기념품 2 | `/images/design-mode/gift-2.png` |
| 기념품 3 | `/images/design-mode/gift-3.png` |
