import styled from "@emotion/styled";

export const Container = styled.div`
  min-height: 100vh;
  background: #f5f7fa;
`;

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 5%;
  background: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
`;

export const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  cursor: pointer;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

export const Nav = styled.nav`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

export const NavButton = styled.button`
  padding: 0.5rem 1.5rem;
  background: white;
  border: 2px solid #667eea;
  color: #667eea;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;

  &:hover {
    background: #667eea;
    color: white;
    transform: translateY(-2px);
  }
`;

export const Content = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: 3rem 2rem;
`;

export const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: white;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  color: #666;
  margin-bottom: 2rem;
  transition: all 0.3s ease;

  &:hover {
    border-color: #667eea;
    color: #667eea;
  }
`;

export const DetailCard = styled.div`
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
`;

export const ImageSection = styled.div<{ imageUrl?: string }>`
  width: 100%;
  height: 400px;
  background: ${(props) =>
    props.imageUrl
      ? `url(${props.imageUrl}) center/cover`
      : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 5rem;
`;

export const InfoSection = styled.div`
  padding: 3rem;
`;

export const TopRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 2rem;
  gap: 2rem;
`;

export const LeftColumn = styled.div`
  flex: 1;
`;

export const TypeBadge = styled.div`
  display: inline-block;
  padding: 0.5rem 1rem;
  background: #f0f0f0;
  border-radius: 12px;
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 1rem;
`;

export const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 1rem;
`;

export const Address = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.1rem;
  color: #666;
  margin-bottom: 2rem;
`;

export const PriceCard = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 2rem;
  border-radius: 12px;
  color: white;
  min-width: 250px;
`;

export const PriceLabel = styled.div`
  font-size: 1rem;
  opacity: 0.9;
  margin-bottom: 0.5rem;
`;

export const Price = styled.div`
  font-size: 2.5rem;
  font-weight: bold;
`;

export const PriceUnit = styled.span`
  font-size: 1.2rem;
  opacity: 0.9;
`;

export const Description = styled.div`
  font-size: 1.1rem;
  line-height: 1.8;
  color: #555;
  margin-bottom: 3rem;
  white-space: pre-wrap;
`;

export const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
`;

export const InfoItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const InfoLabel = styled.div`
  font-size: 0.9rem;
  color: #999;
  font-weight: 600;
`;

export const InfoValue = styled.div`
  font-size: 1.1rem;
  color: #333;
  font-weight: 500;
`;

export const MapSection = styled.div`
  margin-top: 3rem;
  border-top: 2px solid #f0f0f0;
  padding-top: 3rem;
`;

export const SectionTitle = styled.h2`
  font-size: 1.8rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 1.5rem;
`;

export const MapContainer = styled.div`
  width: 100%;
  height: 400px;
  background: #f0f0f0;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
`;

export const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 3rem;
`;

export const PrimaryButton = styled.button`
  flex: 1;
  padding: 1rem 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(102, 126, 234, 0.4);
  }
`;

export const SecondaryButton = styled.button`
  flex: 1;
  padding: 1rem 2rem;
  background: white;
  color: #667eea;
  border: 2px solid #667eea;
  border-radius: 12px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #667eea;
    color: white;
  }
`;

export const Loading = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  font-size: 1.5rem;
  color: #666;
`;

export const Error = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
`;

export const ErrorIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 1rem;
`;

export const ErrorText = styled.p`
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 2rem;
`;
