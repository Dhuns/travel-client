import { EstimatePreview } from '../types/chat';

// Mock AI 응답 로직
export const getMockAIResponse = (userMessage: string, conversationHistory: string[]): {
  text: string;
  estimate?: EstimatePreview;
} => {
  const lowerMessage = userMessage.toLowerCase();

  // 인사
  if (conversationHistory.length === 0) {
    return {
      text: '안녕하세요! 원데이코리아 AI 여행 플래너입니다 😊\n어떤 여행을 계획중이세요?'
    };
  }

  // 목적지 관련
  if (lowerMessage.includes('제주') || lowerMessage.includes('jeju')) {
    return {
      text: '제주도 여행이시군요! 좋은 선택이에요 ✈️\n몇 박 며칠로 계획하고 계신가요?'
    };
  }

  if (lowerMessage.includes('부산') || lowerMessage.includes('busan')) {
    return {
      text: '부산 여행이시군요! 멋진 곳이죠 🌊\n여행 기간은 어떻게 되시나요?'
    };
  }

  // 기간 관련
  if (lowerMessage.match(/(\d+)박\s*(\d+)일/)) {
    return {
      text: '알겠습니다! 몇 분이 함께 가시나요?\n성인과 어린이 인원을 알려주세요 👨‍👩‍👧‍👦'
    };
  }

  // 인원 관련
  if (lowerMessage.includes('성인') || lowerMessage.includes('명')) {
    return {
      text: '좋아요! 어떤 스타일의 여행을 선호하시나요?\n\n1️⃣ 휴양형 (호텔에서 여유롭게)\n2️⃣ 관광형 (명소 위주 투어)\n3️⃣ 체험형 (액티비티 중심)'
    };
  }

  // 스타일 선택
  if (lowerMessage.includes('관광') || lowerMessage.includes('2')) {
    return {
      text: '관광 위주로 일정을 짜드릴게요! 잠시만 기다려주세요... ⏳',
      estimate: {
        title: '제주도 3박4일 관광 패키지',
        startDate: '2024-04-15',
        endDate: '2024-04-18',
        totalAmount: 1850000,
        adults: 2,
        children: 1,
        infants: 0,
        items: [
          { day: 1, name: '렌터카 (준중형)', type: '교통', price: 180000 },
          { day: 1, name: '제주 신라호텔 (디럭스)', type: '숙박', price: 540000 },
          { day: 1, name: '용두암 관광', type: '관광', price: 0 },
          { day: 1, name: '동문시장 저녁식사', type: '식사', price: 60000 },
          { day: 2, name: '성산일출봉 입장료', type: '관광', price: 15000 },
          { day: 2, name: '섭지코지 투어', type: '관광', price: 0 },
          { day: 2, name: '해산물 BBQ', type: '식사', price: 120000 },
        ]
      }
    };
  }

  // 수정 요청
  if (lowerMessage.includes('호텔') && (lowerMessage.includes('변경') || lowerMessage.includes('바꿔'))) {
    return {
      text: '알겠습니다! 다른 호텔 옵션을 보여드릴게요.\n\n추천 호텔:\n\n1️⃣ 메종글래드 제주 (⭐⭐⭐⭐) - 180,000원/박\n2️⃣ 골든튤립 제주 (⭐⭐⭐⭐) - 150,000원/박\n3️⃣ 베스트웨스턴 (⭐⭐⭐) - 120,000원/박\n\n어떤 호텔로 변경하시겠어요?'
    };
  }

  if (lowerMessage.includes('골든') || lowerMessage.includes('2번')) {
    return {
      text: '호텔을 골든튤립으로 변경했어요! ✅\n총 금액이 1,850,000원 → 1,760,000원으로 조정되었습니다.\n\n다른 수정 사항이 있으신가요?'
    };
  }

  // 확정
  if (lowerMessage.includes('확정') || lowerMessage.includes('이대로')) {
    return {
      text: '감사합니다! 😊\n견적서를 확정하시려면 이메일 주소를 입력해주세요.\n담당자가 확인 후 24시간 내에 연락드리겠습니다.'
    };
  }

  // 이메일 입력
  if (lowerMessage.includes('@')) {
    return {
      text: '완료되었습니다! ✅\n\n입력하신 이메일로 견적서를 발송했습니다.\n담당자가 곧 연락드릴 예정입니다.\n\n추가 문의사항이 있으시면 언제든지 채팅 남겨주세요!\n\n즐거운 여행 되세요! 🌴✈️'
    };
  }

  // 기본 응답
  return {
    text: '말씀하신 내용을 잘 이해하지 못했어요. 😅\n조금 더 구체적으로 말씀해주시겠어요?'
  };
};

// Mock 응답 딜레이 (타이핑 시뮬레이션)
export const simulateAITyping = async (callback: () => void, delay: number = 1500) => {
  return new Promise(resolve => {
    setTimeout(() => {
      callback();
      resolve(true);
    }, delay);
  });
};
