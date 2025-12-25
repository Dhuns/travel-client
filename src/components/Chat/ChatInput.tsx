import { css, keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import {
  MAX_MESSAGE_LENGTH,
  MESSAGE_LENGTH_WARNING_THRESHOLD,
  MESSAGES,
  UI_TEXT,
} from "@shared/constants/chat";
import { ArrowUp, Sparkles } from "lucide-react";
import React, { FC, KeyboardEvent, useEffect, useRef, useState } from "react";

interface Props {
  onSend: (message: string) => void;
  disabled?: boolean;
  placeholder?: string;
  showHint?: boolean;
  sessionId?: string; // For draft auto-save
}

const DRAFT_STORAGE_KEY = "chat_draft";
const DRAFT_DEBOUNCE_MS = 500;

const ChatInput: FC<Props> = ({
  onSend,
  disabled = false,
  placeholder = UI_TEXT.TYPE_MESSAGE,
  showHint = false,
  sessionId,
}) => {
  const [input, setInput] = useState("");
  const [isComposing, setIsComposing] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Load draft from localStorage on mount or session change
  useEffect(() => {
    if (!sessionId || typeof window === "undefined") return;

    try {
      const drafts = localStorage.getItem(DRAFT_STORAGE_KEY);
      if (drafts) {
        const parsed = JSON.parse(drafts);
        if (parsed[sessionId]) {
          setInput(parsed[sessionId]);
        }
      }
    } catch {
      // Ignore localStorage errors
    }
  }, [sessionId]);

  // Save draft to localStorage with debounce
  const saveDraft = (value: string) => {
    if (!sessionId || typeof window === "undefined") return;

    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    saveTimeoutRef.current = setTimeout(() => {
      try {
        const drafts = localStorage.getItem(DRAFT_STORAGE_KEY);
        const parsed = drafts ? JSON.parse(drafts) : {};

        if (value.trim()) {
          parsed[sessionId] = value;
        } else {
          delete parsed[sessionId];
        }

        localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(parsed));
      } catch {
        // Ignore localStorage errors
      }
    }, DRAFT_DEBOUNCE_MS);
  };

  // Clear draft for current session
  const clearDraft = () => {
    if (!sessionId || typeof window === "undefined") return;

    try {
      const drafts = localStorage.getItem(DRAFT_STORAGE_KEY);
      if (drafts) {
        const parsed = JSON.parse(drafts);
        delete parsed[sessionId];
        localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(parsed));
      }
    } catch {
      // Ignore localStorage errors
    }
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, []);

  // Auto-resize textarea
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
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
    clearDraft(); // Clear draft after sending
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
      saveDraft(value); // Auto-save draft
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
    const pastedText = e.clipboardData.getData("text");
    const currentInput = input;

    // Get cursor position
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;

    // Calculate new text
    const newText =
      currentInput.substring(0, start) + pastedText + currentInput.substring(end);

    // If pasted text would exceed limit, truncate it
    if (newText.length > MAX_MESSAGE_LENGTH) {
      e.preventDefault();
      const allowedLength = MAX_MESSAGE_LENGTH - (currentInput.length - (end - start));
      const truncatedText = pastedText.substring(0, allowedLength);
      const finalText =
        currentInput.substring(0, start) + truncatedText + currentInput.substring(end);
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

  const canSend = !!(input.trim() && !disabled && !isOverLimit);

  return (
    <Container>
      <InputWrapper hasError={isOverLimit} disabled={disabled} isFocused={isFocused}>
        {disabled && (
          <AIThinkingIndicator>
            <Sparkles className="w-4 h-4" />
          </AIThinkingIndicator>
        )}
        <TextArea
          ref={textareaRef}
          value={input}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
          onPaste={handlePaste}
          onCompositionStart={() => setIsComposing(true)}
          onCompositionEnd={() => setIsComposing(false)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
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
          <SendButton
            onClick={handleSend}
            disabled={!canSend}
            canSend={canSend}
            type="button"
            aria-label="Send message"
          >
            <ArrowUp className="w-5 h-5" strokeWidth={2.5} />
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
      {showHint && !disabled && !input && (
        <KeyboardHint>
          Press <kbd>Enter</kbd> to send, <kbd>Shift + Enter</kbd> for new line
        </KeyboardHint>
      )}
    </Container>
  );
};

export default ChatInput;

// Animations
const shimmer = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

const bounce = keyframes`
  0%, 80%, 100% { transform: scale(0); }
  40% { transform: scale(1); }
`;

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
`;

const sparkle = keyframes`
  0%, 100% { transform: scale(1) rotate(0deg); opacity: 1; }
  50% { transform: scale(1.1) rotate(180deg); opacity: 0.7; }
`;

// Styled Components
const Container = styled.div`
  width: 100%;
`;

const InputWrapper = styled.div<{
  hasError?: boolean;
  disabled?: boolean;
  isFocused?: boolean;
}>`
  display: flex;
  align-items: flex-end;
  gap: 12px;
  padding: 12px 12px 12px 16px;
  background-color: ${({ disabled }) => (disabled ? "#fafafa" : "#ffffff")};
  border: 1.5px solid
    ${({ hasError, isFocused }) =>
      hasError
        ? "#ef4444"
        : isFocused
        ? "var(--color-tumakr-maroon, #651d2a)"
        : "#e5e5e5"};
  border-radius: 28px;
  transition: all 0.2s ease;
  box-shadow: ${({ isFocused }) =>
    isFocused
      ? "0 0 0 3px rgba(101, 29, 42, 0.1), 0 4px 12px rgba(0, 0, 0, 0.06)"
      : "0 2px 8px rgba(0, 0, 0, 0.04)"};
  position: relative;

  ${({ disabled }) =>
    disabled &&
    css`
      &::before {
        content: "";
        position: absolute;
        inset: 0;
        border-radius: 28px;
        background: linear-gradient(
          90deg,
          transparent 0%,
          rgba(101, 29, 42, 0.05) 50%,
          transparent 100%
        );
        background-size: 200% 100%;
        animation: ${shimmer} 2s infinite;
      }
    `}
`;

const AIThinkingIndicator = styled.div`
  display: flex;
  height: 36px;
  align-items: center;
  justify-content: center;
  color: var(--color-tumakr-maroon, #651d2a);
  animation: ${sparkle} 2s ease-in-out infinite;
  flex-shrink: 0;
`;

const TextArea = styled.textarea`
  flex: 1;
  padding: 6px 0;
  border: none;
  background: transparent;
  font-size: 15px;
  line-height: 1.5;
  resize: none;
  outline: none;
  font-family: inherit;
  min-height: 28px;
  color: #1a1a1a;
  max-height: 160px;
  overflow-y: auto;

  &::placeholder {
    color: #9ca3af;
  }

  &:disabled {
    cursor: not-allowed;
    color: #666;
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
  padding-bottom: 2px;
`;

const CharCount = styled.span<{ isOverLimit: boolean }>`
  font-size: 11px;
  color: ${({ isOverLimit }) => (isOverLimit ? "#ef4444" : "#9ca3af")};
  font-weight: ${({ isOverLimit }) => (isOverLimit ? "600" : "500")};
  white-space: nowrap;
  ${({ isOverLimit }) =>
    isOverLimit &&
    css`
      animation: ${pulse} 1s infinite;
    `}
`;

const SendButton = styled.button<{ canSend?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border: none;
  border-radius: 50%;
  background-color: ${({ canSend }) =>
    canSend ? "var(--color-tumakr-maroon, #651d2a)" : "#e5e5e5"};
  color: ${({ canSend }) => (canSend ? "#ffffff" : "#9ca3af")};
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  transition: all 0.2s ease;
  flex-shrink: 0;

  &:hover:not(:disabled) {
    background-color: ${({ canSend }) => (canSend ? "#4a1520" : "#e5e5e5")};
    transform: ${({ canSend }) => (canSend ? "scale(1.05)" : "none")};
  }

  &:active:not(:disabled) {
    transform: ${({ canSend }) => (canSend ? "scale(0.95)" : "none")};
  }
`;

const DisabledHint = styled.div`
  margin-top: 12px;
  font-size: 13px;
  color: var(--color-tumakr-maroon, #651d2a);
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-weight: 500;
`;

const LoadingDots = styled.div`
  display: flex;
  gap: 4px;

  span {
    width: 5px;
    height: 5px;
    background-color: var(--color-tumakr-maroon, #651d2a);
    border-radius: 50%;
    animation: ${bounce} 1.4s infinite ease-in-out both;

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
`;

const KeyboardHint = styled.div`
  margin-top: 10px;
  font-size: 12px;
  color: #9ca3af;
  text-align: center;

  kbd {
    display: inline-block;
    padding: 2px 6px;
    font-size: 11px;
    font-family: inherit;
    background-color: #f3f4f6;
    border: 1px solid #e5e5e5;
    border-radius: 4px;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  }
`;
