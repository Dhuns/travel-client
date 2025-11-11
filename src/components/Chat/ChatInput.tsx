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
      textarea.style.height = `${Math.min(textarea.scrollHeight, 120)}px`;
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
      <InputWrapper hasError={isOverLimit}>
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
        <ButtonGroup>
          {isNearLimit && (
            <CharCount isOverLimit={isOverLimit}>
              {charCount}/{MAX_MESSAGE_LENGTH}
            </CharCount>
          )}
          <SendButton onClick={handleSend} disabled={!input.trim() || disabled || isOverLimit}>
            <SendIcon>→</SendIcon>
          </SendButton>
        </ButtonGroup>
      </InputWrapper>
      {disabled && (
        <DisabledHint>{UI_TEXT.GENERATING_RESPONSE}</DisabledHint>
      )}
    </Container>
  );
};

export default ChatInput;

// Styled Components
const Container = styled.div`
  width: 100%;
`;

const InputWrapper = styled.div<{ hasError?: boolean }>`
  display: flex;
  align-items: flex-end;
  gap: 12px;
  padding: 12px 16px;
  background-color: #f5f5f5;
  border: 1px solid ${({ hasError }) => (hasError ? "#ff3b30" : "#d9d9d9")};
  border-radius: 12px;
  transition: all 0.2s;

  &:focus-within {
    border-color: ${({ hasError }) => (hasError ? "#ff3b30" : "#651d2a")};
    box-shadow: 0 0 0 3px ${({ hasError }) =>
      hasError ? "rgba(255, 59, 48, 0.1)" : "rgba(101, 29, 42, 0.1)"};
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
  overflow-y: auto;

  &::placeholder {
    color: #aaa;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
`;

const CharCount = styled.span<{ isOverLimit: boolean }>`
  font-size: 12px;
  color: ${({ isOverLimit }) => (isOverLimit ? "#ff3b30" : "#888")};
  font-weight: ${({ isOverLimit }) => (isOverLimit ? "600" : "normal")};
  white-space: nowrap;
`;

const SendButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: none;
  border-radius: 6px;
  background-color: ${({ disabled }) => (disabled ? "#e0e0e0" : "#651d2a")};
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  transition: all 0.15s;
  flex-shrink: 0;

  &:hover:not(:disabled) {
    background-color: #4a1520;
    transform: scale(1.05);
  }

  &:active:not(:disabled) {
    transform: scale(0.95);
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

const DisabledHint = styled.div`
  margin-top: 8px;
  font-size: 13px;
  color: #888;
  text-align: center;
  font-style: italic;
`;
