import styled from "@emotion/styled";

export const Container = styled.div`
  min-height: 100vh;
  background: #ffffff;
`;

// Header
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
`;

export const Logo = styled.div`
  font-size: 24px;
  font-weight: 700;
  color: #667eea;
  cursor: pointer;
`;

export const Nav = styled.nav`
  display: flex;
  gap: 12px;
`;

export const NavButton = styled.button`
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

export const NavButtonPrimary = styled(NavButton)`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
  }
`;

// User Menu
export const UserMenu = styled.div`
  position: relative;
`;

export const UserButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 600;
  color: #1a202c;
  background: #f7fafc;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #edf2f7;
    border-color: #cbd5e0;
  }
`;

export const UserAvatar = styled.div`
  width: 32px;
  height: 32px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 14px;
`;

export const DropdownArrow = styled.span<{ isOpen: boolean }>`
  font-size: 10px;
  color: #718096;
  transition: transform 0.2s;
  transform: ${(props) => (props.isOpen ? "rotate(180deg)" : "rotate(0)")};
`;

export const Dropdown = styled.div`
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  min-width: 200px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  z-index: 1000;
  animation: fadeIn 0.2s ease-in-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export const DropdownItem = styled.button`
  display: block;
  width: 100%;
  padding: 12px 16px;
  font-size: 14px;
  font-weight: 500;
  color: #1a202c;
  text-align: left;
  background: white;
  border: none;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #f7fafc;
    color: #667eea;
  }
`;

export const DropdownDivider = styled.div`
  height: 1px;
  background: #e2e8f0;
  margin: 4px 0;
`;

// Hero Section
export const HeroSection = styled.section`
  padding: 120px 40px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  text-align: center;

  @media (max-width: 768px) {
    padding: 80px 20px;
  }
`;

export const HeroContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

export const Badge = styled.div`
  display: inline-block;
  padding: 8px 16px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 24px;
`;

export const HeroTitle = styled.h1`
  font-size: 56px;
  font-weight: 800;
  line-height: 1.2;
  margin-bottom: 24px;

  @media (max-width: 768px) {
    font-size: 36px;
  }
`;

export const Highlight = styled.span`
  background: linear-gradient(to right, #ffd700, #ff6b6b);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

export const HeroDescription = styled.p`
  font-size: 20px;
  line-height: 1.6;
  opacity: 0.9;
  margin-bottom: 40px;

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

export const CTAButtons = styled.div`
  display: flex;
  gap: 16px;
  justify-content: center;
  margin-bottom: 24px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

export const PrimaryButton = styled.button`
  padding: 16px 32px;
  font-size: 18px;
  font-weight: 700;
  color: #667eea;
  background: white;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  }

  &:active {
    transform: translateY(-2px);
  }
`;

export const SecondaryButton = styled.button`
  padding: 16px 32px;
  font-size: 18px;
  font-weight: 700;
  color: white;
  background: rgba(255, 255, 255, 0.2);
  border: 2px solid white;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: translateY(-4px);
  }

  &:active {
    transform: translateY(-2px);
  }
`;

export const TrustBadge = styled.div`
  font-size: 14px;
  opacity: 0.8;
`;

// Features Section
export const FeaturesSection = styled.section`
  padding: 100px 40px;
  background: #f7fafc;

  @media (max-width: 768px) {
    padding: 60px 20px;
  }
`;

export const SectionTitle = styled.h2`
  font-size: 40px;
  font-weight: 700;
  text-align: center;
  color: #1a202c;
  margin-bottom: 60px;

  @media (max-width: 768px) {
    font-size: 28px;
    margin-bottom: 40px;
  }
`;

export const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const FeatureCard = styled.div`
  padding: 32px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transition: all 0.3s;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
  }
`;

export const FeatureIcon = styled.div`
  font-size: 48px;
  margin-bottom: 16px;
`;

export const FeatureTitle = styled.h3`
  font-size: 20px;
  font-weight: 700;
  color: #1a202c;
  margin-bottom: 12px;
`;

export const FeatureDescription = styled.p`
  font-size: 14px;
  line-height: 1.6;
  color: #718096;
`;

// How It Works Section
export const HowItWorksSection = styled.section`
  padding: 100px 40px;
  background: white;

  @media (max-width: 768px) {
    padding: 60px 20px;
  }
`;

export const StepsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 32px;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 24px;
  }
`;

export const Step = styled.div`
  flex: 1;
  text-align: center;
  padding: 32px;
  background: #f7fafc;
  border-radius: 16px;
`;

export const StepNumber = styled.div`
  width: 60px;
  height: 60px;
  margin: 0 auto 16px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: 700;
`;

export const StepTitle = styled.h3`
  font-size: 20px;
  font-weight: 700;
  color: #1a202c;
  margin-bottom: 12px;
`;

export const StepDescription = styled.p`
  font-size: 14px;
  line-height: 1.6;
  color: #718096;
`;

export const StepArrow = styled.div`
  font-size: 32px;
  color: #cbd5e0;

  @media (max-width: 768px) {
    transform: rotate(90deg);
  }
`;

// CTA Section
export const CTASection = styled.section`
  padding: 100px 40px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  text-align: center;

  @media (max-width: 768px) {
    padding: 60px 20px;
  }
`;

export const CTAContent = styled.div`
  max-width: 600px;
  margin: 0 auto;
`;

export const CTATitle = styled.h2`
  font-size: 40px;
  font-weight: 700;
  color: white;
  margin-bottom: 16px;

  @media (max-width: 768px) {
    font-size: 28px;
  }
`;

export const CTADescription = styled.p`
  font-size: 18px;
  color: white;
  opacity: 0.9;
  margin-bottom: 32px;
`;

// Footer
export const Footer = styled.footer`
  padding: 40px;
  background: #1a202c;
  color: white;
  text-align: center;
`;

export const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

export const FooterLogo = styled.div`
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 16px;
`;

export const FooterText = styled.p`
  font-size: 14px;
  opacity: 0.7;
`;
