import React from "react";
import styled from "@emotion/styled";
import { useRouter } from "next/router";

const TermsPage: React.FC = () => {
  const router = useRouter();

  return (
    <Container>
      <ContentWrapper>
        <Header>
          <BackButton onClick={() => router.back()}>← 뒤로가기</BackButton>
          <Title>이용약관</Title>
        </Header>

        <Content>
          <Section>
            <SectionTitle>제1조 (목적)</SectionTitle>
            <Paragraph>
              본 약관은 DIY 여행 견적 플랫폼(이하 "회사")이 제공하는 서비스의 이용과 관련하여
              회사와 이용자 간의 권리, 의무 및 책임사항, 기타 필요한 사항을 규정함을 목적으로
              합니다.
            </Paragraph>
          </Section>

          <Section>
            <SectionTitle>제2조 (정의)</SectionTitle>
            <Paragraph>
              1. "서비스"란 회사가 제공하는 여행 견적 작성, 상담, 예약 등의 모든 서비스를
              의미합니다.
            </Paragraph>
            <Paragraph>
              2. "이용자"란 본 약관에 따라 회사가 제공하는 서비스를 받는 회원 및 비회원을
              말합니다.
            </Paragraph>
            <Paragraph>
              3. "회원"이란 회사에 개인정보를 제공하여 회원등록을 한 자로서, 회사의 정보를
              지속적으로 제공받으며 회사가 제공하는 서비스를 계속적으로 이용할 수 있는 자를
              말합니다.
            </Paragraph>
          </Section>

          <Section>
            <SectionTitle>제3조 (약관의 게시와 개정)</SectionTitle>
            <Paragraph>
              1. 회사는 본 약관의 내용을 이용자가 쉽게 알 수 있도록 서비스 초기 화면에
              게시합니다.
            </Paragraph>
            <Paragraph>
              2. 회사는 필요한 경우 관련 법령을 위배하지 않는 범위에서 본 약관을 개정할 수
              있습니다.
            </Paragraph>
            <Paragraph>
              3. 회사가 약관을 개정할 경우에는 적용일자 및 개정사유를 명시하여 현행약관과
              함께 서비스 초기 화면에 그 적용일자 7일 이전부터 적용일자 전일까지 공지합니다.
            </Paragraph>
          </Section>

          <Section>
            <SectionTitle>제4조 (서비스의 제공 및 변경)</SectionTitle>
            <Paragraph>
              1. 회사는 다음과 같은 서비스를 제공합니다:
            </Paragraph>
            <List>
              <ListItem>여행 견적서 작성 및 관리</ListItem>
              <ListItem>여행 상담 및 문의</ListItem>
              <ListItem>여행 상품 정보 제공</ListItem>
              <ListItem>기타 회사가 정하는 서비스</ListItem>
            </List>
            <Paragraph>
              2. 회사는 상당한 이유가 있는 경우에 운영상, 기술상의 필요에 따라 제공하고 있는
              전부 또는 일부 서비스를 변경할 수 있습니다.
            </Paragraph>
          </Section>

          <Section>
            <SectionTitle>제5조 (서비스의 중단)</SectionTitle>
            <Paragraph>
              1. 회사는 컴퓨터 등 정보통신설비의 보수점검, 교체 및 고장, 통신의 두절 등의
              사유가 발생한 경우에는 서비스의 제공을 일시적으로 중단할 수 있습니다.
            </Paragraph>
            <Paragraph>
              2. 회사는 제1항의 사유로 서비스의 제공이 일시적으로 중단됨으로 인하여 이용자
              또는 제3자가 입은 손해에 대하여 배상합니다. 단, 회사가 고의 또는 과실이 없음을
              입증하는 경우에는 그러하지 아니합니다.
            </Paragraph>
          </Section>

          <Section>
            <SectionTitle>제6조 (회원가입)</SectionTitle>
            <Paragraph>
              1. 이용자는 회사가 정한 가입 양식에 따라 회원정보를 기입한 후 본 약관에 동의한다는
              의사표시를 함으로써 회원가입을 신청합니다.
            </Paragraph>
            <Paragraph>
              2. 회사는 제1항과 같이 회원으로 가입할 것을 신청한 이용자 중 다음 각 호에 해당하지
              않는 한 회원으로 등록합니다:
            </Paragraph>
            <List>
              <ListItem>등록 내용에 허위, 기재누락, 오기가 있는 경우</ListItem>
              <ListItem>기타 회원으로 등록하는 것이 회사의 기술상 현저히 지장이 있다고 판단되는 경우</ListItem>
            </List>
          </Section>

          <Section>
            <SectionTitle>제7조 (회원 탈퇴 및 자격 상실)</SectionTitle>
            <Paragraph>
              1. 회원은 회사에 언제든지 탈퇴를 요청할 수 있으며 회사는 즉시 회원탈퇴를
              처리합니다.
            </Paragraph>
            <Paragraph>
              2. 회원이 다음 각 호의 사유에 해당하는 경우, 회사는 회원자격을 제한 및 정지시킬 수
              있습니다:
            </Paragraph>
            <List>
              <ListItem>가입 신청 시에 허위 내용을 등록한 경우</ListItem>
              <ListItem>다른 사람의 서비스 이용을 방해하거나 그 정보를 도용하는 등 전자상거래 질서를 위협하는 경우</ListItem>
              <ListItem>서비스를 이용하여 법령 또는 본 약관이 금지하거나 공서양속에 반하는 행위를 하는 경우</ListItem>
            </List>
          </Section>

          <Section>
            <SectionTitle>제8조 (개인정보보호)</SectionTitle>
            <Paragraph>
              회사는 이용자의 개인정보를 보호하기 위하여 정보통신망 이용촉진 및 정보보호 등에
              관한 법률, 개인정보보호법 등 관계 법령에서 정하는 바를 준수합니다. 개인정보의
              보호 및 이용에 대해서는 관련법 및 회사의 개인정보처리방침이 적용됩니다.
            </Paragraph>
          </Section>

          <Section>
            <SectionTitle>제9조 (회사의 의무)</SectionTitle>
            <Paragraph>
              1. 회사는 법령과 본 약관이 금지하거나 공서양속에 반하는 행위를 하지 않으며 본
              약관이 정하는 바에 따라 지속적이고, 안정적으로 서비스를 제공하는데 최선을
              다하여야 합니다.
            </Paragraph>
            <Paragraph>
              2. 회사는 이용자가 안전하게 서비스를 이용할 수 있도록 이용자의 개인정보보호를
              위한 보안 시스템을 구축합니다.
            </Paragraph>
          </Section>

          <Section>
            <SectionTitle>제10조 (이용자의 의무)</SectionTitle>
            <Paragraph>
              이용자는 다음 행위를 하여서는 안 됩니다:
            </Paragraph>
            <List>
              <ListItem>신청 또는 변경 시 허위 내용의 등록</ListItem>
              <ListItem>타인의 정보 도용</ListItem>
              <ListItem>회사가 게시한 정보의 변경</ListItem>
              <ListItem>회사가 정한 정보 이외의 정보(컴퓨터 프로그램 등) 등의 송신 또는 게시</ListItem>
              <ListItem>회사와 기타 제3자의 저작권 등 지적재산권에 대한 침해</ListItem>
              <ListItem>회사 및 기타 제3자의 명예를 손상시키거나 업무를 방해하는 행위</ListItem>
              <ListItem>외설 또는 폭력적인 메시지, 화상, 음성, 기타 공서양속에 반하는 정보를 서비스에 공개 또는 게시하는 행위</ListItem>
            </List>
          </Section>

          <Section>
            <SectionTitle>부칙</SectionTitle>
            <Paragraph>본 약관은 2025년 1월 1일부터 적용됩니다.</Paragraph>
          </Section>
        </Content>
      </ContentWrapper>
    </Container>
  );
};

export default TermsPage;

const Container = styled.div`
  min-height: 100vh;
  background: #f7fafc;
  padding: 40px 20px;
`;

const ContentWrapper = styled.div`
  max-width: 800px;
  margin: 0 auto;
  background: white;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const Header = styled.div`
  margin-bottom: 32px;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  color: #667eea;
  font-size: 14px;
  cursor: pointer;
  margin-bottom: 16px;
  padding: 8px 0;

  &:hover {
    text-decoration: underline;
  }
`;

const Title = styled.h1`
  font-size: 32px;
  font-weight: 700;
  color: #1a202c;
  margin: 0;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const SectionTitle = styled.h2`
  font-size: 20px;
  font-weight: 600;
  color: #2d3748;
  margin: 0;
`;

const Paragraph = styled.p`
  font-size: 15px;
  line-height: 1.7;
  color: #4a5568;
  margin: 0;
`;

const List = styled.ul`
  margin: 0;
  padding-left: 24px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const ListItem = styled.li`
  font-size: 15px;
  line-height: 1.7;
  color: #4a5568;
`;
