import React, { FC, KeyboardEvent, useState, useEffect, useRef } from "react";
import styled from "@emotion/styled";
import {
  MAX_MESSAGE_LENGTH,
  MESSAGE_LENGTH_WARNING_THRESHOLD,
  MESSAGES,
  UI_TEXT,
} from "@shared/constants/chat";

interface Props {
  onSend: (message: string) => void;
  disabled?: boolean;
  placeholder?: string;
}

const ChatInput: FC<Props> = ({
  onSend,
  disabled = false,
  placeholder = UI_TEXT.TYPE_MESSAGE,
}) => {
  const [input, setInput] = useState("");
  const [isComposing, setIsComposing] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${Math.min(textarea.scrollHeight, 160)}px`;
    }
  }, [input]);

  const handleSend = () => {
    const trimmed = input.trim();

    // Validation
    if (!trimmed || disabled) return;

    if (trimmed.length > MAX_MESSAGE_LENGTH) {
      alert(MESSAGES.MESSAGE_TOO_LONG(MAX_MESSAGE_LENGTH));
      return;
    }

    onSend(trimmed);
    setInput("");
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    // Prevent send during Korean/Chinese/Japanese input composition
    if (e.key === "Enter" && !e.shiftKey && !isComposing) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;

    // Allow input up to max length
    if (value.length <= MAX_MESSAGE_LENGTH) {
      setInput(value);
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
    const pastedText = e.clipboardData.getData('text');
    const currentInput = input;

    // Get cursor position
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;

    // Calculate new text
    const newText = currentInput.substring(0, start) + pastedText + currentInput.substring(end);

    // If pasted text would exceed limit, truncate it
    if (newText.length > MAX_MESSAGE_LENGTH) {
      e.preventDefault();
      const allowedLength = MAX_MESSAGE_LENGTH - (currentInput.length - (end - start));
      const truncatedText = pastedText.substring(0, allowedLength);
      const finalText = currentInput.substring(0, start) + truncatedText + currentInput.substring(end);
      setInput(finalText);

      // Set cursor position after paste
      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + truncatedText.length;
      }, 0);
    }
  };

  const charCount = input.length;
  const isNearLimit = charCount > MAX_MESSAGE_LENGTH * MESSAGE_LENGTH_WARNING_THRESHOLD;
  const isOverLimit = charCount > MAX_MESSAGE_LENGTH;

  return (
    <Container>
      <InputWrapper hasError={isOverLimit} disabled={disabled}>
        <TextArea
          ref={textareaRef}
          value={input}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
          onPaste={handlePaste}
          onCompositionStart={() => setIsComposing(true)}
          onCompositionEnd={() => setIsComposing(false)}
          placeholder={placeholder}
          disabled={disabled}
          rows={1}
        />
        <RightSection>
          {isNearLimit && (
            <CharCount isOverLimit={isOverLimit}>
              {charCount}/{MAX_MESSAGE_LENGTH}
            </CharCount>
          )}
          <SendButton onClick={handleSend} disabled={!input.trim() || disabled || isOverLimit}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
            </svg>
          </SendButton>
        </RightSection>
      </InputWrapper>
      {disabled && (
        <DisabledHint>
          <LoadingDots>
            <span></span>
            <span></span>
            <span></span>
          </LoadingDots>
          {UI_TEXT.GENERATING_RESPONSE}
        </DisabledHint>
      )}
    </Container>
  );
};

export default ChatInput;

// Styled Components
const Container = styled.div`
  width: 100%;
`;

const InputWrapper = styled.div<{ hasError?: boolean; disabled?: boolean }>`
  display: flex;
  align-items: flex-end;
  gap: 12px;
  padding: 14px 16px;
  background-color: #ffffff;
  border: 1px solid ${({ hasError }) => (hasError ? "#ef4444" : "#e5e5e5")};
  border-radius: 24px;
  transition: all 0.2s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  opacity: ${({ disabled }) => (disabled ? 0.7 : 1)};

  &:focus-within {
    border-color: ${({ hasError }) => (hasError ? "#ef4444" : "#d1d5db")};
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  }
`;

const TextArea = styled.textarea`
  flex: 1;
  padding: 2px 0;
  border: none;
  background: transparent;
  font-size: 15px;
  line-height: 1.5;
  resize: none;
  outline: none;
  font-family: inherit;
  min-height: 24px;
  color: #1a1a1a;
  max-height: 160px;
  overflow-y: auto;

  &::placeholder {
    color: #9ca3af;
  }

  &:disabled {
    cursor: not-allowed;
  }

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.1);
    border-radius: 4px;
  }
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
`;

const CharCount = styled.span<{ isOverLimit: boolean }>`
  font-size: 11px;
  color: ${({ isOverLimit }) => (isOverLimit ? "#ef4444" : "#9ca3af")};
  font-weight: ${({ isOverLimit }) => (isOverLimit ? "600" : "500")};
  white-space: nowrap;
`;

const SendButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border: none;
  border-radius: 50%;
  background-color: ${({ disabled }) => (disabled ? "#e5e5e5" : "#1a1a1a")};
  color: ${({ disabled }) => (disabled ? "#9ca3af" : "#ffffff")};
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  transition: all 0.2s ease;
  flex-shrink: 0;

  &:hover:not(:disabled) {
    background-color: #2d2d2d;
    transform: scale(1.05);
  }

  &:active:not(:disabled) {
    transform: scale(0.95);
  }
`;

const DisabledHint = styled.div`
  margin-top: 10px;
  font-size: 13px;
  color: #9ca3af;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;

const LoadingDots = styled.div`
  display: flex;
  gap: 4px;

  span {
    width: 4px;
    height: 4px;
    background-color: #9ca3af;
    border-radius: 50%;
    animation: bounce 1.4s infinite ease-in-out both;

    &:nth-of-type(1) {
      animation-delay: -0.32s;
    }
    &:nth-of-type(2) {
      animation-delay: -0.16s;
    }
    &:nth-of-type(3) {
      animation-delay: 0s;
    }
  }

  @keyframes bounce {
    0%, 80%, 100% {
      transform: scale(0);
    }
    40% {
      transform: scale(1);
    }
  }
`;
