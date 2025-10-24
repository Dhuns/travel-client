import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";

// 애니메이션 정의
const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const slideInRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const pulse = keyframes`
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
`;

const shimmer = keyframes`
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
`;

// 전체 컨테이너 - 깔끔한 흰색 배경
export const Container = styled.div`
  min-height: 100vh;
  background: #fafbfc;
  animation: ${fadeIn} 0.4s ease-out;
`;

// Header - 홈 페이지와 동일한 스타일
export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 40px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  position: sticky;
  top: 0;
  z-index: 100;
  border-bottom: 1px solid #e2e8f0;

  @media (max-width: 768px) {
    padding: 16px 20px;
  }

  @media print {
    position: static;
    border-bottom: none;
  }
`;

export const Logo = styled.div`
  font-size: 24px;
  font-weight: 700;
  color: #667eea;
  cursor: pointer;
`;

export const HeaderActions = styled.div`
  display: flex;
  gap: 12px;

  @media print {
    display: none;
  }
`;

export const ActionButton = styled.button`
  padding: 10px 20px;
  font-size: 14px;
  font-weight: 600;
  color: #4a5568;
  background: transparent;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #f7fafc;
    color: #667eea;
  }
`;

// 메인 콘텐츠
export const Content = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;

  @media (max-width: 768px) {
    padding: 24px 16px;
  }
`;

// 기본 정보 섹션
export const InfoCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 40px;
  border: 1px solid #e2e8f0;
  margin-bottom: 32px;
  animation: ${fadeInUp} 0.6s ease-out;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.02);
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.08);
  }

  @media (max-width: 768px) {
    padding: 24px;
  }
`;

export const InfoHeader = styled.div`
  border-bottom: 1px solid #e2e8f0;
  padding-bottom: 24px;
  margin-bottom: 32px;
`;

export const QuotationTitle = styled.h1`
  font-size: 28px;
  font-weight: 700;
  color: #1a202c;
  margin: 0 0 8px 0;
  line-height: 1.3;
`;

export const QuotationSubtitle = styled.p`
  font-size: 14px;
  color: #718096;
  margin: 0;
`;

export const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 24px;
  margin-bottom: 24px;
`;

export const InfoItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const InfoLabel = styled.label`
  font-size: 14px;
  font-weight: 600;
  color: #a0aec0;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

export const InfoValue = styled.p`
  font-size: 16px;
  font-weight: 500;
  color: #2d3748;
  margin: 0;
  line-height: 1.5;
`;

export const PriceHighlight = styled.div`
  background: #f8f9fa;
  border: 2px solid #e2e8f0;
  padding: 24px 32px;
  border-radius: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 32px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
    padding: 20px 24px;
  }
`;

export const PriceLabel = styled.div`
  font-size: 14px;
  color: #64748b;
  font-weight: 500;
`;

export const PriceValue = styled.div`
  font-size: 32px;
  font-weight: 700;
  color: #1e293b;
  letter-spacing: -0.02em;

  @media (max-width: 768px) {
    font-size: 28px;
  }
`;

// 담당자 정보
export const AgentInfo = styled.div`
  background: #f7fafc;
  padding: 24px;
  border-radius: 12px;
  margin-top: 32px;
  border: 1px solid #e2e8f0;
`;

export const AgentTitle = styled.h3`
  font-size: 16px;
  font-weight: 700;
  color: #2d3748;
  margin: 0 0 20px 0;
`;

export const AgentGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 16px;
`;

// 일정 섹션
export const ItinerarySection = styled.section`
  margin-top: 24px;
`;

export const SectionTitle = styled.h2`
  font-size: 24px;
  font-weight: 700;
  color: #1a202c;
  margin: 0 0 24px 0;
  padding-left: 16px;
  border-left: 4px solid #667eea;
`;

export const DayCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 32px;
  border: 1px solid #e2e8f0;
  margin-bottom: 24px;
  page-break-inside: avoid;
  animation: ${fadeInUp} 0.6s ease-out;
  animation-fill-mode: both;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.02);
  transition: all 0.3s ease;

  &:nth-of-type(1) { animation-delay: 0.1s; }
  &:nth-of-type(2) { animation-delay: 0.2s; }
  &:nth-of-type(3) { animation-delay: 0.3s; }
  &:nth-of-type(4) { animation-delay: 0.4s; }
  &:nth-of-type(5) { animation-delay: 0.5s; }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(102, 126, 234, 0.12);
    border-color: #cbd5e0;
  }

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

export const DayHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid #e2e8f0;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
`;

export const DayTitle = styled.h3`
  font-size: 20px;
  font-weight: 700;
  color: #667eea;
  margin: 0;
`;

export const DayDate = styled.span`
  font-size: 14px;
  color: #718096;
  font-weight: 500;
`;

export const ItemsGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 20px;
`;

export const ItemCard = styled.div`
  display: flex;
  gap: 16px;
  padding: 16px;
  background: #fafbfc;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  transition: all 0.2s ease;
  cursor: pointer;

  &:hover {
    background: white;
    border-color: #cbd5e0;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  }

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const ItemThumbnail = styled.div<{ $src?: string }>`
  width: 100px;
  height: 100px;
  flex-shrink: 0;
  border-radius: 8px;
  background: ${(props) =>
    props.$src
      ? `url(${props.$src}) center/cover`
      : "linear-gradient(135deg, #e2e8f0 0%, #cbd5e0 100%)"};
  position: relative;
  overflow: hidden;

  @media (max-width: 768px) {
    width: 100%;
    height: 160px;
  }
`;

export const ItemType = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(26, 32, 44, 0.8);
  backdrop-filter: blur(4px);
  color: white;
  padding: 4px 8px;
  font-size: 11px;
  font-weight: 600;
  text-align: center;
  letter-spacing: 0.03em;
`;

export const ItemInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 6px;
  min-width: 0;
`;

export const ItemName = styled.h4`
  font-size: 18px;
  font-weight: 600;
  color: #2d3748;
  margin: 0;
  line-height: 1.4;

  span {
    font-size: 15px;
    color: #718096;
    font-weight: 400;
    margin-left: 8px;
  }
`;

export const ItemAddress = styled.p`
  font-size: 15px;
  color: #718096;
  margin: 0;
  display: flex;
  align-items: flex-start;
  gap: 4px;
  line-height: 1.5;

  &::before {
    content: "📍";
    flex-shrink: 0;
  }

  &:hover {
    color: #667eea;
  }
`;

export const ItemPrice = styled.div`
  font-size: 18px;
  font-weight: 700;
  color: #667eea;
  margin-top: auto;

  span {
    font-size: 14px;
    color: #a0aec0;
    font-weight: 500;
  }
`;

// 타임라인
export const TimelineCard = styled.div`
  background: #fffaf0;
  border: 1px solid #fbd38d;
  border-left: 3px solid #ed8936;
  padding: 20px;
  border-radius: 10px;
  margin-top: 16px;
`;

export const TimelineTitle = styled.h5`
  font-size: 14px;
  font-weight: 700;
  color: #744210;
  margin: 0 0 12px 0;
  text-transform: uppercase;
  letter-spacing: 0.03em;
`;

export const TimelineContent = styled.div`
  font-size: 14px;
  line-height: 1.7;
  color: #744210;
  white-space: pre-wrap;

  a {
    color: #667eea;
    text-decoration: underline;
    &:hover {
      color: #5568d3;
    }
  }
`;

// 지도 섹션
export const MapSection = styled.div`
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  padding: 20px;
  margin-top: 20px;
`;

export const MapTitle = styled.h4`
  font-size: 16px;
  font-weight: 700;
  color: #2d3748;
  margin: 0 0 8px 0;
  display: flex;
  align-items: center;
  gap: 6px;

  &::before {
    content: "🗺️";
    font-size: 18px;
  }
`;

export const MapInfo = styled.div`
  margin-bottom: 16px;
  font-size: 13px;
  color: #718096;
`;

// 메모 섹션
export const MemoSection = styled.div`
  background: white;
  border-radius: 12px;
  padding: 32px;
  border: 1px solid #e2e8f0;
  margin-top: 32px;

  label {
    display: block;
    font-size: 18px;
    font-weight: 700;
    color: #2d3748;
    margin-bottom: 16px;

    &::before {
      content: "📝 ";
    }
  }

  div {
    font-size: 15px;
    line-height: 1.7;
    color: #4a5568;

    a {
      color: #667eea;
      text-decoration: none;
      &:hover {
        text-decoration: underline;
      }
    }
  }

  @media (max-width: 768px) {
    padding: 24px;
  }
`;

// 인포윈도우 컨텐츠
export const WindowContent = styled.div`
  padding: 8px;
  min-width: 200px;

  img {
    width: 100%;
    height: 100px;
    object-fit: cover;
    border-radius: 6px;
    margin-bottom: 8px;
  }

  span {
    display: block;
    font-size: 12px;
    color: #718096;
    margin-bottom: 4px;
  }

  h1 {
    font-size: 14px;
    font-weight: 600;
    color: #2d3748;
    margin: 4px 0;
  }

  p {
    font-size: 12px;
    color: #718096;
    margin: 4px 0 0;
    line-height: 1.4;
  }
`;

// 로딩 상태
export const LoadingContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fafbfc;
`;

export const LoadingSpinner = styled.div`
  text-align: center;
  color: #667eea;
  font-size: 16px;
  font-weight: 600;

  &::before {
    content: "";
    display: block;
    width: 40px;
    height: 40px;
    margin: 0 auto 16px;
    border: 3px solid #e2e8f0;
    border-top-color: #667eea;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

// 에러 상태
export const ErrorContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fafbfc;
  padding: 20px;
`;

export const ErrorCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 48px;
  border: 1px solid #e2e8f0;
  text-align: center;
  max-width: 480px;
  width: 100%;

  @media (max-width: 768px) {
    padding: 32px 24px;
  }
`;

export const ErrorIcon = styled.div`
  font-size: 64px;
  margin-bottom: 16px;
`;

export const ErrorText = styled.p`
  font-size: 16px;
  color: #718096;
  margin-bottom: 32px;
  line-height: 1.6;
`;

// 반응형
export const TitleDivision = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

export const ItineraryText = styled.h2`
  font-size: 20px;
  font-weight: 700;
  color: #2d3748;
  margin: 0;
`;
