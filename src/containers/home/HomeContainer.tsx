import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { PATHS } from "@shared/path";
import { useAuthStore } from "@shared/store/authStore";
import { logout, getUserMe } from "@shared/apis/user";
import { getCookie, removeCookie, COOKIE_KEYS } from "@shared/utils/cookie";
import * as S from "./styled";

const HomeContainer: React.FC = () => {
  const router = useRouter();
  const { user, isAuthenticated, setUser, clearUser } = useAuthStore();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // 페이지 로드 시 토큰 확인 및 사용자 정보 불러오기
  useEffect(() => {
    const checkAuth = async () => {
      const accessToken = getCookie(COOKIE_KEYS.ACCESS_TOKEN);
      if (accessToken && !user) {
        try {
          const userInfo = await getUserMe();
          setUser(userInfo);
        } catch (error) {
          console.error('인증 확인 실패:', error);
          // 토큰이 유효하지 않으면 쿠키 삭제
          removeCookie(COOKIE_KEYS.ACCESS_TOKEN);
          removeCookie(COOKIE_KEYS.REFRESH_TOKEN);
          clearUser();
        }
      }
    };
    checkAuth();
  }, [user, setUser, clearUser]);

  // 드롭다운 외부 클릭 감지
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleGetStarted = () => {
    if (isAuthenticated) {
      router.push(PATHS.REQUEST_ESTIMATE);
    } else {
      router.push(PATHS.LOGIN);
    }
  };

  const handleLogin = () => {
    router.push(PATHS.LOGIN);
  };

  const handleSignUp = () => {
    router.push(PATHS.SIGNUP);
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      removeCookie(COOKIE_KEYS.ACCESS_TOKEN);
      removeCookie(COOKIE_KEYS.REFRESH_TOKEN);
      clearUser();
      setIsDropdownOpen(false);
      router.push(PATHS.HOME);
    }
  };

  return (
    <S.Container>
      {/* Header */}
      <S.Header>
        <S.Logo onClick={() => router.push(PATHS.HOME)}>✈️ DIY Travel</S.Logo>
        <S.Nav>
          <S.NavButton onClick={() => router.push("/packages")}>
            여행 상품
          </S.NavButton>
          {isAuthenticated && user ? (
            <S.UserMenu ref={dropdownRef}>
              <S.UserButton onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                <S.UserAvatar>{user.name[0]}</S.UserAvatar>
                <span>{user.name}</span>
                <S.DropdownArrow isOpen={isDropdownOpen}>▼</S.DropdownArrow>
              </S.UserButton>
              {isDropdownOpen && (
                <S.Dropdown>
                  <S.DropdownItem onClick={() => router.push(PATHS.MY_ESTIMATES)}>
                    📋 내 견적서
                  </S.DropdownItem>
                  <S.DropdownItem onClick={() => router.push(PATHS.REQUEST_ESTIMATE)}>
                    ✨ 견적 요청
                  </S.DropdownItem>
                  <S.DropdownDivider />
                  <S.DropdownItem onClick={handleLogout}>
                    🚪 로그아웃
                  </S.DropdownItem>
                </S.Dropdown>
              )}
            </S.UserMenu>
          ) : (
            <>
              <S.NavButton onClick={handleLogin}>로그인</S.NavButton>
              <S.NavButtonPrimary onClick={handleSignUp}>
                회원가입
              </S.NavButtonPrimary>
            </>
          )}
        </S.Nav>
      </S.Header>

      {/* Hero Section */}
      <S.HeroSection>
        <S.HeroContent>
          <S.Badge>🤖 AI Powered</S.Badge>
          <S.HeroTitle>
            자연어로 설명하면
            <br />
            <S.Highlight>맞춤 여행 견적서</S.Highlight>가 자동으로
          </S.HeroTitle>
          <S.HeroDescription>
            복잡한 여행 계획, 이제 AI에게 맡기세요.
            <br />
            원하는 여행을 설명하면 최적의 일정과 견적을 즉시 받아보실 수
            있습니다.
          </S.HeroDescription>
          <S.CTAButtons>
            <S.PrimaryButton onClick={handleGetStarted}>
              지금 시작하기 →
            </S.PrimaryButton>
            <S.SecondaryButton onClick={() => router.push("/packages")}>
              여행 상품 둘러보기
            </S.SecondaryButton>
          </S.CTAButtons>
          <S.TrustBadge>
            ✓ 무료 체험 • ✓ 회원가입 필수 • ✓ 실시간 견적
          </S.TrustBadge>
        </S.HeroContent>
      </S.HeroSection>

      {/* Features Section */}
      <S.FeaturesSection>
        <S.SectionTitle>왜 DIY Travel을 선택해야 할까요?</S.SectionTitle>
        <S.FeaturesGrid>
          <S.FeatureCard>
            <S.FeatureIcon>🧠</S.FeatureIcon>
            <S.FeatureTitle>AI 자동 분석</S.FeatureTitle>
            <S.FeatureDescription>
              자연어로 입력한 여행 계획을 AI가 분석하여 최적의 일정과 상품을
              자동으로 추천합니다.
            </S.FeatureDescription>
          </S.FeatureCard>

          <S.FeatureCard>
            <S.FeatureIcon>⚡</S.FeatureIcon>
            <S.FeatureTitle>즉시 견적 산출</S.FeatureTitle>
            <S.FeatureDescription>
              기다릴 필요 없이 실시간으로 정확한 여행 견적서를 받아볼 수
              있습니다.
            </S.FeatureDescription>
          </S.FeatureCard>

          <S.FeatureCard>
            <S.FeatureIcon>🎯</S.FeatureIcon>
            <S.FeatureTitle>맞춤형 추천</S.FeatureTitle>
            <S.FeatureDescription>
              예산, 선호도, 여행 스타일에 맞춰 개인화된 여행 일정을 제안합니다.
            </S.FeatureDescription>
          </S.FeatureCard>

          <S.FeatureCard>
            <S.FeatureIcon>📊</S.FeatureIcon>
            <S.FeatureTitle>투명한 가격</S.FeatureTitle>
            <S.FeatureDescription>
              숨겨진 비용 없이 모든 항목의 가격을 명확하게 확인할 수 있습니다.
            </S.FeatureDescription>
          </S.FeatureCard>

          <S.FeatureCard>
            <S.FeatureIcon>🗺️</S.FeatureIcon>
            <S.FeatureTitle>최적 동선 계획</S.FeatureTitle>
            <S.FeatureDescription>
              지도 기반으로 효율적인 여행 동선을 자동으로 계획해드립니다.
            </S.FeatureDescription>
          </S.FeatureCard>

          <S.FeatureCard>
            <S.FeatureIcon>💾</S.FeatureIcon>
            <S.FeatureTitle>견적서 저장</S.FeatureTitle>
            <S.FeatureDescription>
              생성된 견적서를 저장하고 언제든 다시 확인하거나 수정할 수
              있습니다.
            </S.FeatureDescription>
          </S.FeatureCard>
        </S.FeaturesGrid>
      </S.FeaturesSection>

      {/* How It Works Section */}
      <S.HowItWorksSection>
        <S.SectionTitle>어떻게 작동하나요?</S.SectionTitle>
        <S.StepsContainer>
          <S.Step>
            <S.StepNumber>1</S.StepNumber>
            <S.StepTitle>여행 계획 입력</S.StepTitle>
            <S.StepDescription>
              &quot;3박 4일 서울 여행, 2명, 호텔 위주&quot;처럼 자연어로 원하는 여행을
              설명하세요.
            </S.StepDescription>
          </S.Step>

          <S.StepArrow>→</S.StepArrow>

          <S.Step>
            <S.StepNumber>2</S.StepNumber>
            <S.StepTitle>AI 분석 및 추천</S.StepTitle>
            <S.StepDescription>
              AI가 입력을 분석하여 최적의 숙소, 관광지, 교통편을 자동으로
              선택합니다.
            </S.StepDescription>
          </S.Step>

          <S.StepArrow>→</S.StepArrow>

          <S.Step>
            <S.StepNumber>3</S.StepNumber>
            <S.StepTitle>견적서 확인</S.StepTitle>
            <S.StepDescription>
              일정별 세부 사항과 가격이 포함된 완성된 견적서를 즉시 받아보세요.
            </S.StepDescription>
          </S.Step>
        </S.StepsContainer>
      </S.HowItWorksSection>

      {/* CTA Section */}
      <S.CTASection>
        <S.CTAContent>
          <S.CTATitle>지금 바로 시작해보세요!</S.CTATitle>
          <S.CTADescription>
            회원가입 후 첫 견적서를 무료로 생성해보세요.
          </S.CTADescription>
          <S.PrimaryButton onClick={handleGetStarted}>
            무료로 시작하기 →
          </S.PrimaryButton>
        </S.CTAContent>
      </S.CTASection>

      {/* Footer */}
      <S.Footer>
        <S.FooterContent>
          <S.FooterLogo>✈️ DIY Travel</S.FooterLogo>
          <S.FooterText>
            © 2025 DIY Travel. All rights reserved.
          </S.FooterText>
        </S.FooterContent>
      </S.Footer>
    </S.Container>
  );
};

export default HomeContainer;
