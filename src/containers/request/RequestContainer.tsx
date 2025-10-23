import React, { useState } from "react";
import { useRouter } from "next/router";
import { PATHS } from "@shared/path";
import { useAuthStore } from "@shared/store/authStore";
import { createEstimate } from "@shared/apis/estimate";
import * as S from "./styled";

interface FormData {
  title: string;
  destination: string;
  startDate: string;
  endDate: string;
  participants: number;
  budget: string;
  description: string;
  accommodationType: string;
  transportation: string;
}

const RequestContainer: React.FC = () => {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>({
    title: "",
    destination: "",
    startDate: "",
    endDate: "",
    participants: 2,
    budget: "",
    description: "",
    accommodationType: "",
    transportation: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError(null);
  };

  const validateForm = (): boolean => {
    if (!formData.title.trim()) {
      setError("여행 제목을 입력해주세요.");
      return false;
    }
    if (!formData.destination.trim()) {
      setError("여행 목적지를 입력해주세요.");
      return false;
    }
    if (!formData.startDate || !formData.endDate) {
      setError("여행 날짜를 선택해주세요.");
      return false;
    }
    if (new Date(formData.startDate) > new Date(formData.endDate)) {
      setError("종료일은 시작일보다 늦어야 합니다.");
      return false;
    }
    if (formData.participants < 1) {
      setError("참가 인원은 최소 1명 이상이어야 합니다.");
      return false;
    }
    if (!formData.description.trim()) {
      setError("여행 설명을 입력해주세요.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isAuthenticated) {
      alert("로그인이 필요합니다.");
      router.push(PATHS.LOGIN);
      return;
    }

    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const payload = {
        ...formData,
        budget: formData.budget ? Number(formData.budget) : 0,
      };

      const result = await createEstimate(payload);
      alert("견적 요청이 성공적으로 제출되었습니다!");

      // 생성된 견적서로 이동
      if (result.hash) {
        router.push(`/quotation/${result.hash}`);
      } else {
        router.push(PATHS.MY_ESTIMATES);
      }
    } catch (err: any) {
      console.error("Failed to create estimate:", err);
      setError(
        err.response?.data?.message ||
          "견적 요청 중 오류가 발생했습니다. 다시 시도해주세요."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    if (
      confirm(
        "작성 중인 내용이 삭제됩니다. 정말 취소하시겠습니까?"
      )
    ) {
      router.back();
    }
  };

  return (
    <S.Container>
      <S.Header>
        <S.Logo onClick={() => router.push(PATHS.HOME)}>✈️ DIY Travel</S.Logo>
        <S.Nav>
          <S.NavButton onClick={() => router.push(PATHS.MY_ESTIMATES)}>
            내 견적서
          </S.NavButton>
          <S.NavButton onClick={() => router.push(PATHS.HOME)}>
            홈으로
          </S.NavButton>
        </S.Nav>
      </S.Header>

      <S.Content>
        <S.PageTitle>AI 여행 견적 요청</S.PageTitle>
        <S.PageDescription>
          여행 계획을 자연어로 입력하면 AI가 자동으로 최적의 일정과 견적을
          생성합니다
        </S.PageDescription>

        <S.FormCard>
          <form onSubmit={handleSubmit}>
            {error && <S.ErrorMessage>{error}</S.ErrorMessage>}

            <S.FormSection>
              <S.SectionTitle>기본 정보</S.SectionTitle>

              <S.FormGroup>
                <S.Label>
                  여행 제목 <S.Required>*</S.Required>
                </S.Label>
                <S.Input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="예: 가족과 함께하는 제주도 여행"
                  required
                />
              </S.FormGroup>

              <S.FormGroup>
                <S.Label>
                  여행 목적지 <S.Required>*</S.Required>
                </S.Label>
                <S.Input
                  type="text"
                  name="destination"
                  value={formData.destination}
                  onChange={handleChange}
                  placeholder="예: 제주도, 서울, 부산 등"
                  required
                />
              </S.FormGroup>

              <S.FormGroup>
                <S.Label>
                  여행 기간 <S.Required>*</S.Required>
                </S.Label>
                <S.DateRangeRow>
                  <S.Input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                    required
                  />
                  <S.Input
                    type="date"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleChange}
                    required
                  />
                </S.DateRangeRow>
              </S.FormGroup>

              <S.FormGroup>
                <S.Label>
                  참가 인원 <S.Required>*</S.Required>
                </S.Label>
                <S.Input
                  type="number"
                  name="participants"
                  value={formData.participants}
                  onChange={handleChange}
                  min="1"
                  required
                />
                <S.HelpText>함께 여행하는 총 인원을 입력해주세요</S.HelpText>
              </S.FormGroup>

              <S.FormGroup>
                <S.Label>예상 예산 (선택)</S.Label>
                <S.Input
                  type="number"
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  placeholder="예산을 입력하세요 (원)"
                />
                <S.HelpText>
                  예산을 입력하시면 더 정확한 견적을 제공해드립니다
                </S.HelpText>
              </S.FormGroup>
            </S.FormSection>

            <S.FormSection>
              <S.SectionTitle>선호 사항</S.SectionTitle>

              <S.FormGroup>
                <S.Label>숙소 유형 (선택)</S.Label>
                <S.Select
                  name="accommodationType"
                  value={formData.accommodationType}
                  onChange={handleChange}
                >
                  <option value="">선택하지 않음</option>
                  <option value="호텔">호텔</option>
                  <option value="리조트">리조트</option>
                  <option value="게스트하우스">게스트하우스</option>
                  <option value="펜션">펜션</option>
                  <option value="민박">민박</option>
                  <option value="에어비앤비">에어비앤비</option>
                </S.Select>
              </S.FormGroup>

              <S.FormGroup>
                <S.Label>주요 교통수단 (선택)</S.Label>
                <S.Select
                  name="transportation"
                  value={formData.transportation}
                  onChange={handleChange}
                >
                  <option value="">선택하지 않음</option>
                  <option value="자차">자차</option>
                  <option value="렌터카">렌터카</option>
                  <option value="대중교통">대중교통</option>
                  <option value="택시">택시</option>
                  <option value="자전거">자전거</option>
                </S.Select>
              </S.FormGroup>
            </S.FormSection>

            <S.FormSection>
              <S.SectionTitle>상세 설명</S.SectionTitle>

              <S.FormGroup>
                <S.Label>
                  여행 계획 설명 <S.Required>*</S.Required>
                </S.Label>
                <S.Textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="자연어로 자유롭게 여행 계획을 설명해주세요..."
                  required
                />
                <S.ExampleBox>
                  <S.ExampleTitle>✨ 작성 예시</S.ExampleTitle>
                  <S.ExampleText>
                    3박 4일로 제주도 여행을 계획하고 있습니다. 가족 4명이 함께 가며,
                    자연 경관을 중심으로 둘러보고 싶습니다. 호텔에서 숙박하고,
                    렌터카를 이용할 예정입니다. 성산일출봉, 한라산, 우도는 꼭
                    방문하고 싶고, 현지 맛집도 추천받고 싶습니다. 예산은 1인당
                    50만원 정도로 생각하고 있습니다.
                  </S.ExampleText>
                </S.ExampleBox>
                <S.HelpText>
                  • 방문하고 싶은 장소
                  <br />
                  • 선호하는 활동 (관광, 휴양, 쇼핑 등)
                  <br />
                  • 식사 선호도
                  <br />
                  • 특별한 요청사항
                  <br />등 자유롭게 작성해주세요
                </S.HelpText>
              </S.FormGroup>
            </S.FormSection>

            <S.ButtonGroup>
              <S.CancelButton type="button" onClick={handleCancel}>
                취소
              </S.CancelButton>
              <S.SubmitButton type="submit" disabled={loading}>
                {loading ? "처리 중..." : "AI 견적 생성 요청 →"}
              </S.SubmitButton>
            </S.ButtonGroup>
          </form>
        </S.FormCard>
      </S.Content>
    </S.Container>
  );
};

export default RequestContainer;
