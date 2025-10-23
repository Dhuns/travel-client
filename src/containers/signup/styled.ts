import styled from "@emotion/styled";

export const Container = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
`;

export const FormWrapper = styled.div`
  background: white;
  padding: 40px;
  border-radius: 16px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 480px;
`;

export const Title = styled.h1`
  font-size: 28px;
  font-weight: 700;
  color: #1a202c;
  text-align: center;
  margin-bottom: 32px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const Label = styled.label`
  font-size: 14px;
  font-weight: 600;
  color: #4a5568;
`;

export const Input = styled.input`
  padding: 12px 16px;
  font-size: 14px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  outline: none;
  transition: all 0.2s;

  &:focus {
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }

  &::placeholder {
    color: #cbd5e0;
  }
`;

export const InputGroup = styled.div`
  display: flex;
  gap: 8px;
`;

export const CheckButton = styled.button`
  padding: 12px 20px;
  font-size: 14px;
  font-weight: 600;
  color: #667eea;
  background: white;
  border: 1px solid #667eea;
  border-radius: 8px;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s;

  &:hover {
    background: #667eea;
    color: white;
  }

  &:active {
    transform: scale(0.98);
  }
`;

export const ErrorText = styled.p`
  font-size: 12px;
  color: #e53e3e;
  margin: 0;
`;

export const SuccessText = styled.p`
  font-size: 12px;
  color: #38a169;
  margin: 0;
`;

export const SubmitButton = styled.button`
  padding: 14px;
  font-size: 16px;
  font-weight: 700;
  color: white;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 8px;
  transition: all 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

export const Divider = styled.div`
  display: flex;
  align-items: center;
  margin: 24px 0;
  color: #a0aec0;
  font-size: 14px;

  &::before,
  &::after {
    content: "";
    flex: 1;
    height: 1px;
    background: #e2e8f0;
  }

  span {
    padding: 0 16px;
  }
`;

export const OAuthButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const OAuthButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 12px;
  font-size: 14px;
  font-weight: 600;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #f7fafc;
    border-color: #cbd5e0;
  }

  &:active {
    transform: scale(0.98);
  }
`;

export const GoogleButton = styled(OAuthButton)`
  color: #1a202c;
  background: white;
`;

export const AppleButton = styled(OAuthButton)`
  color: white;
  background: #000;
  border-color: #000;

  &:hover {
    background: #1a1a1a;
    border-color: #1a1a1a;
  }
`;

export const OAuthIcon = styled.span`
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 16px;
`;

export const LinkText = styled.p`
  text-align: center;
  margin-top: 24px;
  font-size: 14px;
  color: #718096;
`;

export const Link = styled.span`
  color: #667eea;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;
