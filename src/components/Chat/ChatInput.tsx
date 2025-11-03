import React, { FC, KeyboardEvent, useState } from "react";

import styled from "@emotion/styled";

interface Props {
  onSend: (message: string) => void;
  disabled?: boolean;
  placeholder?: string;
}

const ChatInput: FC<Props> = ({
  onSend,
  disabled = false,
  placeholder = "메시지를 입력하세요...",
}) => {
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim() && !disabled) {
      onSend(input.trim());
      setInput("");
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <Container>
      <InputWrapper>
        <TextArea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={placeholder}
          disabled={disabled}
          rows={1}
        />
        <SendButton onClick={handleSend} disabled={!input.trim() || disabled}>
          <SendIcon>→</SendIcon>
        </SendButton>
      </InputWrapper>
    </Container>
  );
};

export default ChatInput;

// Styled Components
const Container = styled.div`
  width: 100%;
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 12px;
  padding: 12px 16px;
  background-color: #f5f5f5;
  border: 1px solid #d9d9d9;
  border-radius: 12px;
  transition: all 0.2s;

  &:focus-within {
    border-color: #007aff;
    box-shadow: 0 0 0 3px rgba(0, 122, 255, 0.1);
  }
`;

const TextArea = styled.textarea`
  flex: 1;
  padding: 4px 0;
  border: none;
  background: transparent;
  font-size: 15px;
  line-height: 1.5;
  resize: none;
  outline: none;
  font-family: inherit;
  min-height: 24px;
  color: #1a1a1a;
  max-height: 120px;

  &::placeholder {
    color: #aaa;
  }

  &:disabled {
    opacity: 0.6;
  }
`;

const SendButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: none;
  border-radius: 6px;
  background-color: ${({ disabled }) => (disabled ? "#e0e0e0" : "#007AFF")};
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  transition: all 0.15s;
  flex-shrink: 0;

  &:hover:not(:disabled) {
    background-color: #0051d5;
  }

  &:disabled {
    opacity: 0.5;
  }
`;

const SendIcon = styled.span`
  color: #ffffff;
  font-size: 18px;
  font-weight: bold;
`;
