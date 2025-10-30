import React from "react";
import styled from "@emotion/styled";
import { useRouter } from "next/router";

const PrivacyPage: React.FC = () => {
  const router = useRouter();

  return (
    <Container>
      <ContentWrapper>
        <Header>
          <BackButton onClick={() => router.back()}>← 뒤로가기</BackButton>
          <Title>개인정보처리방침</Title>
        </Header>

        <Content>
          <Section>
            <Paragraph>
              DIY 여행 견적 플랫폼(이하 "회사")은 「개인정보 보호법」 제30조에 따라 정보주체의
              개인정보를 보호하고 이와 관련한 고충을 신속하고 원활하게 처리할 수 있도록 하기
              위하여 다음과 같이 개인정보 처리방침을 수립·공개합니다.
            </Paragraph>
          </Section>

          <Section>
            <SectionTitle>제1조 (개인정보의 처리 목적)</SectionTitle>
            <Paragraph>
              회사는 다음의 목적을 위하여 개인정보를 처리합니다. 처리하고 있는 개인정보는 다음의
              목적 이외의 용도로는 이용되지 않으며, 이용 목적이 변경되는 경우에는 「개인정보
              보호법」 제18조에 따라 별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다.
            </Paragraph>
            <SubSection>
              <SubSectionTitle>1. 회원 가입 및 관리</SubSectionTitle>
              <Paragraph>
                회원 가입의사 확인, 회원제 서비스 제공에 따른 본인 식별·인증, 회원자격 유지·관리,
                서비스 부정이용 방지, 각종 고지·통지 목적으로 개인정보를 처리합니다.
              </Paragraph>
            </SubSection>
            <SubSection>
              <SubSectionTitle>2. 여행 서비스 제공</SubSectionTitle>
              <Paragraph>
                여행 견적 작성, 상담, 예약 확인, 결제, 여행 일정 관리 등 서비스 제공을 위하여
                개인정보를 처리합니다.
              </Paragraph>
            </SubSection>
            <SubSection>
              <SubSectionTitle>3. 마케팅 및 광고에의 활용</SubSectionTitle>
              <Paragraph>
                신규 서비스 개발 및 맞춤 서비스 제공, 이벤트 및 광고성 정보 제공 및 참여기회
                제공, 인구통계학적 특성에 따른 서비스 제공 및 광고 게재, 서비스의 유효성 확인,
                접속빈도 파악 또는 회원의 서비스 이용에 대한 통계 등을 목적으로 개인정보를
                처리합니다.
              </Paragraph>
            </SubSection>
          </Section>

          <Section>
            <SectionTitle>제2조 (개인정보의 처리 및 보유 기간)</SectionTitle>
            <Paragraph>
              회사는 법령에 따른 개인정보 보유·이용기간 또는 정보주체로부터 개인정보를 수집 시에
              동의받은 개인정보 보유·이용기간 내에서 개인정보를 처리·보유합니다.
            </Paragraph>
            <List>
              <ListItem>
                <strong>회원 가입 및 관리:</strong> 회원 탈퇴 시까지. 다만, 다음의 사유에 해당하는
                경우에는 해당 사유 종료 시까지
                <SubList>
                  <ListItem>관계 법령 위반에 따른 수사·조사 등이 진행 중인 경우에는 해당 수사·조사 종료 시까지</ListItem>
                  <ListItem>서비스 이용에 따른 채권·채무관계 잔존 시에는 해당 채권·채무관계 정산 시까지</ListItem>
                </SubList>
              </ListItem>
              <ListItem>
                <strong>재화 또는 서비스 제공:</strong> 재화·서비스 공급완료 및 요금결제·정산 완료
                시까지. 다만, 다음의 사유에 해당하는 경우에는 해당 기간 종료 시까지
                <SubList>
                  <ListItem>「전자상거래 등에서의 소비자 보호에 관한 법률」에 따른 표시·광고, 계약내용 및 이행 등 거래에 관한 기록: 5년</ListItem>
                  <ListItem>「전자상거래 등에서의 소비자 보호에 관한 법률」에 따른 소비자의 불만 또는 분쟁처리에 관한 기록: 3년</ListItem>
                  <ListItem>「통신비밀보호법」에 따른 로그인 기록: 3개월</ListItem>
                </SubList>
              </ListItem>
            </List>
          </Section>

          <Section>
            <SectionTitle>제3조 (처리하는 개인정보의 항목)</SectionTitle>
            <Paragraph>회사는 다음의 개인정보 항목을 처리하고 있습니다:</Paragraph>
            <SubSection>
              <SubSectionTitle>1. 회원 가입</SubSectionTitle>
              <List>
                <ListItem>필수항목: 아이디(이메일), 비밀번호, 이름</ListItem>
                <ListItem>선택항목: 이메일 주소, 전화번호, 생년월일, 성별, 프로필 이미지</ListItem>
              </List>
            </SubSection>
            <SubSection>
              <SubSectionTitle>2. 서비스 이용 과정에서 자동 수집되는 정보</SubSectionTitle>
              <List>
                <ListItem>IP 주소, 쿠키, 서비스 이용 기록, 방문 기록, 불량 이용 기록 등</ListItem>
              </List>
            </SubSection>
          </Section>

          <Section>
            <SectionTitle>제4조 (개인정보의 제3자 제공)</SectionTitle>
            <Paragraph>
              회사는 정보주체의 개인정보를 제1조(개인정보의 처리 목적)에서 명시한 범위 내에서만
              처리하며, 정보주체의 동의, 법률의 특별한 규정 등 「개인정보 보호법」 제17조 및
              제18조에 해당하는 경우에만 개인정보를 제3자에게 제공합니다.
            </Paragraph>
          </Section>

          <Section>
            <SectionTitle>제5조 (개인정보처리의 위탁)</SectionTitle>
            <Paragraph>
              회사는 원활한 개인정보 업무처리를 위하여 다음과 같이 개인정보 처리업무를 위탁하고
              있습니다:
            </Paragraph>
            <List>
              <ListItem>
                <strong>클라우드 서비스:</strong> Amazon Web Services (AWS)
                <br />
                위탁업무: 서버 운영 및 데이터 저장
              </ListItem>
            </List>
            <Paragraph>
              회사는 위탁계약 체결 시 「개인정보 보호법」 제26조에 따라 위탁업무 수행목적 외
              개인정보 처리금지, 기술적·관리적 보호조치, 재위탁 제한, 수탁자에 대한 관리·감독,
              손해배상 등 책임에 관한 사항을 계약서 등 문서에 명시하고, 수탁자가 개인정보를
              안전하게 처리하는지를 감독하고 있습니다.
            </Paragraph>
          </Section>

          <Section>
            <SectionTitle>제6조 (정보주체의 권리·의무 및 그 행사방법)</SectionTitle>
            <Paragraph>
              정보주체는 회사에 대해 언제든지 다음 각 호의 개인정보 보호 관련 권리를 행사할 수
              있습니다:
            </Paragraph>
            <List>
              <ListItem>개인정보 열람 요구</ListItem>
              <ListItem>오류 등이 있을 경우 정정 요구</ListItem>
              <ListItem>삭제 요구</ListItem>
              <ListItem>처리정지 요구</ListItem>
            </List>
            <Paragraph>
              제1항에 따른 권리 행사는 회사에 대해 「개인정보 보호법」 시행령 제41조제1항에 따라
              서면, 전자우편, 모사전송(FAX) 등을 통하여 하실 수 있으며 회사는 이에 대해 지체 없이
              조치하겠습니다.
            </Paragraph>
          </Section>

          <Section>
            <SectionTitle>제7조 (개인정보의 파기)</SectionTitle>
            <Paragraph>
              회사는 개인정보 보유기간의 경과, 처리목적 달성 등 개인정보가 불필요하게 되었을 때에는
              지체없이 해당 개인정보를 파기합니다.
            </Paragraph>
            <SubSection>
              <SubSectionTitle>파기절차</SubSectionTitle>
              <Paragraph>
                이용자가 입력한 정보는 목적 달성 후 별도의 DB에 옮겨져(종이의 경우 별도의 서류)
                내부 방침 및 기타 관련 법령에 따라 일정기간 저장된 후 혹은 즉시 파기됩니다. 이 때,
                DB로 옮겨진 개인정보는 법률에 의한 경우가 아니고서는 다른 목적으로 이용되지
                않습니다.
              </Paragraph>
            </SubSection>
            <SubSection>
              <SubSectionTitle>파기방법</SubSectionTitle>
              <List>
                <ListItem>전자적 파일 형태의 정보는 기록을 재생할 수 없는 기술적 방법을 사용합니다</ListItem>
                <ListItem>종이에 출력된 개인정보는 분쇄기로 분쇄하거나 소각을 통하여 파기합니다</ListItem>
              </List>
            </SubSection>
          </Section>

          <Section>
            <SectionTitle>제8조 (개인정보의 안전성 확보 조치)</SectionTitle>
            <Paragraph>
              회사는 개인정보의 안전성 확보를 위해 다음과 같은 조치를 취하고 있습니다:
            </Paragraph>
            <List>
              <ListItem>
                <strong>관리적 조치:</strong> 내부관리계획 수립·시행, 정기적 직원 교육 등
              </ListItem>
              <ListItem>
                <strong>기술적 조치:</strong> 개인정보처리시스템 등의 접근권한 관리, 접근통제시스템
                설치, 고유식별정보 등의 암호화, 보안프로그램 설치
              </ListItem>
              <ListItem>
                <strong>물리적 조치:</strong> 전산실, 자료보관실 등의 접근통제
              </ListItem>
            </List>
          </Section>

          <Section>
            <SectionTitle>제9조 (개인정보 보호책임자)</SectionTitle>
            <Paragraph>
              회사는 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와 관련한
              정보주체의 불만처리 및 피해구제 등을 위하여 아래와 같이 개인정보 보호책임자를
              지정하고 있습니다:
            </Paragraph>
            <ContactBox>
              <ContactItem>
                <strong>개인정보 보호책임자</strong>
              </ContactItem>
              <ContactItem>성명: [담당자명]</ContactItem>
              <ContactItem>직책: [직책명]</ContactItem>
              <ContactItem>연락처: [전화번호]</ContactItem>
              <ContactItem>이메일: [이메일 주소]</ContactItem>
            </ContactBox>
            <Paragraph>
              정보주체께서는 회사의 서비스를 이용하시면서 발생한 모든 개인정보 보호 관련 문의,
              불만처리, 피해구제 등에 관한 사항을 개인정보 보호책임자로 문의하실 수 있습니다.
              회사는 정보주체의 문의에 대해 지체 없이 답변 및 처리해드릴 것입니다.
            </Paragraph>
          </Section>

          <Section>
            <SectionTitle>제10조 (개인정보 처리방침 변경)</SectionTitle>
            <Paragraph>
              이 개인정보처리방침은 시행일로부터 적용되며, 법령 및 방침에 따른 변경내용의 추가,
              삭제 및 정정이 있는 경우에는 변경사항의 시행 7일 전부터 공지사항을 통하여 고지할
              것입니다.
            </Paragraph>
          </Section>

          <Section>
            <SectionTitle>부칙</SectionTitle>
            <Paragraph>본 방침은 2025년 1월 1일부터 시행됩니다.</Paragraph>
          </Section>
        </Content>
      </ContentWrapper>
    </Container>
  );
};

export default PrivacyPage;

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
  gap: 16px;
`;

const SubSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding-left: 16px;
`;

const SectionTitle = styled.h2`
  font-size: 20px;
  font-weight: 600;
  color: #2d3748;
  margin: 0;
`;

const SubSectionTitle = styled.h3`
  font-size: 17px;
  font-weight: 600;
  color: #4a5568;
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

const SubList = styled.ul`
  margin: 8px 0 0 0;
  padding-left: 24px;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const ListItem = styled.li`
  font-size: 15px;
  line-height: 1.7;
  color: #4a5568;
`;

const ContactBox = styled.div`
  background: #f7fafc;
  padding: 20px;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
`;

const ContactItem = styled.p`
  font-size: 15px;
  line-height: 1.7;
  color: #4a5568;
  margin: 0;

  & + & {
    margin-top: 8px;
  }
`;
