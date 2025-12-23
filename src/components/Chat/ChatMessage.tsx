import React, { FC, useEffect, useState } from "react";

import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import { CustomerResponseType, submitCustomerQuoteResponse } from "@shared/apis/estimate";
import useChatStore from "@shared/store/chatStore";
import { ChatContext, ChatMessage as ChatMessageType, ChatSession } from "@shared/types/chat";
import { aesEncrypt } from "@shared/utils/crypto";
import dayjs from "dayjs";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import ChatUIActions from "./ChatUIActions";

interface SystemMessageContent {
  type:
    | "quote_sent"
    | "customer_approved"
    | "customer_rejected"
    | "revision_requested"
    | "sent_to_expert";
  title: string;
  message: string;
  shareUrl?: string;
  batchId?: number;
  customerMessage?: string;
}

// Export for use in ChatMessageList
export interface QuoteResponseInfo {
  responseType: "approve" | "reject" | "request_changes";
  message?: string;
}

interface Props {
  message: ChatMessageType;
  onViewQuote?: (hash: string) => void;
  onResponseSubmitted?: () => void;
  onUIActionSelect?: (value: string | string[] | ChatContext) => void;
  isLastMessage?: boolean;
  // undefined = not checked, null = checked but no response, object = has response
  quoteResponseInfo?: QuoteResponseInfo | null;
}

// Shared card configuration for system messages
const getSystemCardConfig = (type: SystemMessageContent["type"] | undefined) => {
  switch (type) {
    case "quote_sent":
      return {
        gradient:
          "linear-gradient(135deg, var(--color-tumakr-dark-blue) 0%, #0f2b58 100%)",
        icon: (
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M22 2L11 13" />
            <path d="M22 2L15 22L11 13L2 9L22 2Z" />
          </svg>
        ),
        iconBg: "rgba(255,255,255,0.2)",
      };
    case "customer_approved":
      return {
        gradient: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
        icon: (
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
        ),
        iconBg: "rgba(255,255,255,0.2)",
      };
    case "customer_rejected":
      return {
        gradient: "linear-gradient(135deg, #6b7280 0%, #4b5563 100%)",
        icon: (
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="15" y1="9" x2="9" y2="15" />
            <line x1="9" y1="9" x2="15" y2="15" />
          </svg>
        ),
        iconBg: "rgba(255,255,255,0.2)",
      };
    case "revision_requested":
      return {
        gradient: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
        icon: (
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
          </svg>
        ),
        iconBg: "rgba(255,255,255,0.2)",
      };
    case "sent_to_expert":
      return {
        gradient: "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)",
        icon: (
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
        ),
        iconBg: "rgba(255,255,255,0.2)",
      };
    default:
      return {
        gradient: "linear-gradient(135deg, #6b7280 0%, #4b5563 100%)",
        icon: (
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="16" x2="12" y2="12" />
            <line x1="12" y1="8" x2="12.01" y2="8" />
          </svg>
        ),
        iconBg: "rgba(255,255,255,0.2)",
      };
  }
};

// Parse system message JSON from content
const parseSystemContent = (content: string | undefined): SystemMessageContent | null => {
  if (!content) return null;
  const trimmedContent = content.trim();
  const looksLikeSystemJson =
    trimmedContent.includes("quote_sent") ||
    trimmedContent.includes("customer_approved") ||
    trimmedContent.includes("customer_rejected") ||
    trimmedContent.includes("revision_requested");

  if (!looksLikeSystemJson) return null;

  try {
    const jsonMatch = trimmedContent.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const parsed = JSON.parse(jsonMatch[0]);
      if (parsed.type && parsed.title && parsed.message) {
        return parsed as SystemMessageContent;
      }
    }
  } catch {
    // Invalid JSON, return null
  }
  return null;
};

// Helper to check if quote response was already submitted (persisted in localStorage)
const QUOTE_RESPONSE_KEY = "quote_responses";
const getQuoteResponseStatus = (batchId: number | undefined): boolean => {
  if (!batchId || typeof window === "undefined") return false;
  try {
    const stored = localStorage.getItem(QUOTE_RESPONSE_KEY);
    if (stored) {
      const responses = JSON.parse(stored);
      return responses[batchId] === true;
    }
  } catch {
    // Ignore localStorage errors
  }
  return false;
};

const setQuoteResponseStatus = (batchId: number | undefined): void => {
  if (!batchId || typeof window === "undefined") return;
  try {
    const stored = localStorage.getItem(QUOTE_RESPONSE_KEY);
    const responses = stored ? JSON.parse(stored) : {};
    responses[batchId] = true;
    localStorage.setItem(QUOTE_RESPONSE_KEY, JSON.stringify(responses));
  } catch {
    // Ignore localStorage errors
  }
};

const ChatMessage: FC<Props> = ({
  message,
  onViewQuote,
  onResponseSubmitted,
  onUIActionSelect,
  isLastMessage,
  quoteResponseInfo,
}) => {
  const { role, content, timestamp, type, metadata } = message;
  const { getCurrentSession } = useChatStore.getState();
  const currentSession = getCurrentSession();
  const sessionId = currentSession?.sessionId;

  // Parse system content to get batchId for checking response status
  const systemContentForInit = parseSystemContent(content);
  // quoteResponseInfo: undefined = not checked, null = checked but no response, object = has response
  // Only fall back to localStorage if quoteResponseInfo is undefined (not checked by parent)
  const parentCheckedResponse = quoteResponseInfo !== undefined;
  const hasServerResponse = !!quoteResponseInfo && quoteResponseInfo !== null;

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [responseSubmitted, setResponseSubmitted] = useState(false);
  const [showRevisionInput, setShowRevisionInput] = useState(false);
  const [revisionMessage, setRevisionMessage] = useState("");
  const [selectedResponse, setSelectedResponse] = useState<string | null>(null);
  const isUser = role === "user";

  // Sync responseSubmitted state with quoteResponseInfo from parent
  // This ensures the state updates when messages are loaded/refreshed
  useEffect(() => {
    if (parentCheckedResponse) {
      // Parent checked - use server response
      setResponseSubmitted(hasServerResponse);
    } else {
      // Parent didn't check - fall back to localStorage
      setResponseSubmitted(getQuoteResponseStatus(systemContentForInit?.batchId));
    }
  }, [parentCheckedResponse, hasServerResponse, systemContentForInit?.batchId]);

  // Note: quote_sent type messages are handled below with full action buttons
  // This early return is only for simple system messages without actions

  // Handle estimate-type messages
  if (type === "estimate" && metadata?.batchId) {
    const hash = aesEncrypt(String(metadata.batchId));

    const handleViewClick = (e: React.MouseEvent) => {
      e.preventDefault();
      if (onViewQuote) {
        onViewQuote(hash);
      }
    };

    const isFirstEstimate = metadata.isFirstEstimate || !metadata.totalAmount;

    return (
      <MessageContainer isUser={false}>
        <AvatarWrapper>
          <AssistantAvatar>
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>
          </AssistantAvatar>
        </AvatarWrapper>
        <MessageContent>
          <EstimateCard>
            <EstimateHeader>
              <EstimateIconWrapper>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                </svg>
              </EstimateIconWrapper>
              <EstimateHeaderText>
                <EstimateTitle>Your Itinerary is Ready</EstimateTitle>
                <EstimateSubtitle>AI-generated draft for your review</EstimateSubtitle>
              </EstimateHeaderText>
            </EstimateHeader>
            <EstimateBody>
              <EstimateStats>
                <StatItem>
                  <StatIcon>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  </StatIcon>
                  <StatContent>
                    <StatValue>{metadata.itemCount || 0}</StatValue>
                    <StatLabel>Places</StatLabel>
                  </StatContent>
                </StatItem>
                {!isFirstEstimate && metadata.totalAmount && (
                  <StatItem>
                    <StatIcon>
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <line x1="12" y1="1" x2="12" y2="23" />
                        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                      </svg>
                    </StatIcon>
                    <StatContent>
                      <StatValue>${metadata.totalAmount?.toLocaleString()}</StatValue>
                      <StatLabel>Estimated</StatLabel>
                    </StatContent>
                  </StatItem>
                )}
              </EstimateStats>
              {content && <EstimateMessage>{content}</EstimateMessage>}
            </EstimateBody>
            <EstimateActions>
              <ViewQuotationButton onClick={handleViewClick}>
                View Full Itinerary
              </ViewQuotationButton>
            </EstimateActions>
          </EstimateCard>
          {isLastMessage && metadata?.uiAction && onUIActionSelect && (
            <ChatUIActions
              uiAction={metadata.uiAction}
              onSelect={onUIActionSelect}
              messageId={sessionId ? `${sessionId}-${metadata.uiAction.type}` : message.messageId || message.id}
            />
          )}
          <MessageTime>{dayjs(timestamp).format("HH:mm")}</MessageTime>
        </MessageContent>
      </MessageContainer>
    );
  }

  // Handle system messages (quote_sent, customer responses, etc.)
  // Check for system JSON content regardless of role
  const systemContent = parseSystemContent(content);

  if (systemContent) {
    const { getCurrentSession, updateSessionStatus } = useChatStore.getState();

    const handleResponse = async (responseType: CustomerResponseType, msg?: string) => {
      if (!systemContent?.batchId || isSubmitting || responseSubmitted) return;

      setIsSubmitting(true);
      setSelectedResponse(responseType);
      try {
        await submitCustomerQuoteResponse({
          batchId: systemContent.batchId,
          responseType,
          message: msg,
        });

        // Update session status based on response type
        const currentSession = getCurrentSession();
        if (currentSession) {
          let newStatus: ChatSession['status'] = 'completed';
          if (responseType === 'reject') {
            newStatus = 'declined';
          } else if (responseType === 'approve') {
            newStatus = 'completed';
          } else if (responseType === 'request_changes') {
            newStatus = 'pending_review';
          }
          updateSessionStatus(currentSession.sessionId, newStatus);
        }

        // Persist response status to localStorage
        setQuoteResponseStatus(systemContent.batchId);
        setResponseSubmitted(true);
        setShowRevisionInput(false);
        onResponseSubmitted?.();
      } catch (error) {
        console.error("Failed to submit response:", error);
        alert("Failed to submit response. Please try again.");
        setSelectedResponse(null);
      } finally {
        setIsSubmitting(false);
      }
    };

    const handleViewQuoteClick = (e: React.MouseEvent) => {
      e.preventDefault();
      if (systemContent?.shareUrl && onViewQuote) {
        const urlParts = systemContent.shareUrl.split("/quotation/");
        if (urlParts[1]) {
          onViewQuote(decodeURIComponent(urlParts[1]));
        }
      }
    };

    const config = getSystemCardConfig(systemContent?.type);

    // Hide quote_sent card after response is submitted
    if (systemContent.type === "quote_sent" && responseSubmitted) {
      return null;
    }

    return (
      <MessageContainer isUser={false}>
        <AvatarWrapper>
          <AssistantAvatar>
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>
          </AssistantAvatar>
        </AvatarWrapper>
        <MessageContent>
          <SystemCard>
            <SystemCardHeader style={{ background: config.gradient }}>
              <SystemIconWrapper style={{ background: config.iconBg }}>
                {config.icon}
              </SystemIconWrapper>
              <SystemCardTitle>{systemContent.title}</SystemCardTitle>
            </SystemCardHeader>
            <SystemCardBody>
              <SystemCardMessage>{systemContent.message}</SystemCardMessage>
              {systemContent.customerMessage && (
                <CustomerFeedbackBox>
                  <CustomerFeedbackHeader>
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                    </svg>
                    Your Feedback
                  </CustomerFeedbackHeader>
                  <CustomerFeedbackText>
                    {systemContent.customerMessage}
                  </CustomerFeedbackText>
                </CustomerFeedbackBox>
              )}
            </SystemCardBody>

            {/* Action buttons for quote_sent */}
            {systemContent.type === "quote_sent" && !responseSubmitted && (
              <SystemCardActions>
                {systemContent.shareUrl && (
                  <PrimaryActionButton onClick={handleViewQuoteClick}>
                    View Quotation Details
                  </PrimaryActionButton>
                )}

                <ResponseSection>
                  <ResponseLabel>How would you like to proceed?</ResponseLabel>
                  <ResponseButtonGrid>
                    <ResponseButton
                      variant="approve"
                      onClick={() => handleResponse("approve")}
                      disabled={isSubmitting}
                      $isSelected={selectedResponse === "approve"}
                    >
                      {isSubmitting && selectedResponse === "approve" ? (
                        <LoadingSpinner />
                      ) : (
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      )}
                      <ResponseButtonText>
                        <span>Approve</span>
                        <small>Proceed to booking</small>
                      </ResponseButtonText>
                    </ResponseButton>

                    <ResponseButton
                      variant="changes"
                      onClick={() => setShowRevisionInput(true)}
                      disabled={isSubmitting}
                      $isSelected={showRevisionInput}
                    >
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                      </svg>
                      <ResponseButtonText>
                        <span>Request Changes</span>
                        <small>Modify itinerary</small>
                      </ResponseButtonText>
                    </ResponseButton>

                    <ResponseButton
                      variant="decline"
                      onClick={() => handleResponse("reject")}
                      disabled={isSubmitting}
                      $isSelected={selectedResponse === "reject"}
                    >
                      {isSubmitting && selectedResponse === "reject" ? (
                        <LoadingSpinner />
                      ) : (
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <line x1="18" y1="6" x2="6" y2="18" />
                          <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                      )}
                      <ResponseButtonText>
                        <span>Decline</span>
                        <small>Not interested</small>
                      </ResponseButtonText>
                    </ResponseButton>
                  </ResponseButtonGrid>
                </ResponseSection>

                {showRevisionInput && (
                  <RevisionInputSection>
                    <RevisionTextarea
                      placeholder="Please describe what you'd like to change (e.g., different destinations, more activities, budget adjustments...)"
                      value={revisionMessage}
                      onChange={(e) => setRevisionMessage(e.target.value)}
                      rows={4}
                    />
                    <RevisionActions>
                      <SubmitRevisionButton
                        onClick={() => handleResponse("request_changes", revisionMessage)}
                        disabled={isSubmitting || !revisionMessage.trim()}
                      >
                        {isSubmitting && selectedResponse === "request_changes" ? (
                          <>
                            <LoadingSpinner />
                            Submitting...
                          </>
                        ) : (
                          <>
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                            >
                              <line x1="22" y1="2" x2="11" y2="13" />
                              <polygon points="22 2 15 22 11 13 2 9 22 2" />
                            </svg>
                            Submit Request
                          </>
                        )}
                      </SubmitRevisionButton>
                      <CancelButton onClick={() => setShowRevisionInput(false)}>
                        Cancel
                      </CancelButton>
                    </RevisionActions>
                  </RevisionInputSection>
                )}
              </SystemCardActions>
            )}

            {responseSubmitted && (
              <ResponseSubmittedSection>
                {quoteResponseInfo && (
                  // Show detailed response info from server
                  <ResponseDetailBox responseType={quoteResponseInfo.responseType}>
                    <ResponseDetailHeader>
                      {quoteResponseInfo.responseType === "approve" && (
                        <>
                          <svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="var(--color-tumakr-green)"
                            strokeWidth="2"
                          >
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                            <polyline points="22 4 12 14.01 9 11.01" />
                          </svg>
                          <span className="text-tumakr-green">Approved</span>
                        </>
                      )}
                      {quoteResponseInfo.responseType === "reject" && (
                        <>
                          <svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="var(--color-tumakr-maroon)"
                            strokeWidth="2"
                          >
                            <circle cx="12" cy="12" r="10" />
                            <line x1="15" y1="9" x2="9" y2="15" />
                            <line x1="9" y1="9" x2="15" y2="15" />
                          </svg>
                          <span className="text-tumakr-maroon">Declined</span>
                        </>
                      )}
                      {quoteResponseInfo.responseType === "request_changes" && (
                        <>
                          <svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="var(--color-tumakr-mustard)"
                            strokeWidth="2"
                          >
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                          </svg>
                          <span className="text-tumakr-mustard">Revision Requested</span>
                        </>
                      )}
                    </ResponseDetailHeader>
                    {quoteResponseInfo.responseType === "request_changes" &&
                      quoteResponseInfo.message && (
                        <ResponseDetailMessage>
                          <strong>Your request:</strong>
                          <p>{quoteResponseInfo.message}</p>
                        </ResponseDetailMessage>
                      )}
                  </ResponseDetailBox>
                )}
              </ResponseSubmittedSection>
            )}
          </SystemCard>
          <MessageTime>{dayjs(timestamp).format("HH:mm")}</MessageTime>
        </MessageContent>
      </MessageContainer>
    );
  }

  // UI action handler
  const handleUIActionSelect = (value: string | string[] | ChatContext) => {
    if (onUIActionSelect) {
      onUIActionSelect(value);
    }
  };

  // Retry handler for error messages
  const sendUserMessage = useChatStore((state) => state.sendUserMessage);
  const [isRetrying, setIsRetrying] = useState(false);

  const handleRetry = async () => {
    if (!metadata?.lastUserMessage || isRetrying) return;
    setIsRetrying(true);
    try {
      await sendUserMessage(metadata.lastUserMessage);
    } finally {
      setIsRetrying(false);
    }
  };

  // Check if this is an error message
  const isErrorMessage = metadata?.isError === true;

  // Render error message with retry button
  if (isErrorMessage) {
    return (
      <MessageContainer isUser={false}>
        <AvatarWrapper>
          <AssistantAvatar
            style={{ background: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)" }}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          </AssistantAvatar>
        </AvatarWrapper>
        <MessageContent>
          <ErrorCard>
            <ErrorHeader>
              <ErrorIcon>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                  <line x1="12" y1="9" x2="12" y2="13" />
                  <line x1="12" y1="17" x2="12.01" y2="17" />
                </svg>
              </ErrorIcon>
              <ErrorTitle>Something went wrong</ErrorTitle>
            </ErrorHeader>
            <ErrorBody>
              <ErrorMessage>{content}</ErrorMessage>
            </ErrorBody>
            {metadata?.isRetryable && metadata?.lastUserMessage && (
              <ErrorActions>
                <RetryButton onClick={handleRetry} disabled={isRetrying}>
                  {isRetrying ? (
                    <>
                      <LoadingSpinner />
                      Retrying...
                    </>
                  ) : (
                    <>
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M23 4v6h-6" />
                        <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
                      </svg>
                      Retry Message
                    </>
                  )}
                </RetryButton>
                {metadata?.retryAfter && metadata.retryAfter > 10 && (
                  <RetryHint>Recommended wait: {metadata.retryAfter}s</RetryHint>
                )}
              </ErrorActions>
            )}
          </ErrorCard>
          <MessageTime>{dayjs(timestamp).format("HH:mm")}</MessageTime>
        </MessageContent>
      </MessageContainer>
    );
  }

  // Format timestamp - always show full date and time
  const formatTimestamp = (ts: Date) => {
    const messageTime = dayjs(ts);
    return messageTime.format("MMM D, HH:mm");
  };

  return (
    <MessageContainer isUser={isUser}>
      {!isUser && (
        <AvatarWrapper>
          <AssistantAvatar>
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>
          </AssistantAvatar>
        </AvatarWrapper>
      )}
      <MessageContent>
        <MessageBubble isUser={isUser}>
          {isUser ? (
            content
          ) : (
            <MarkdownContent>
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
            </MarkdownContent>
          )}
        </MessageBubble>
        {!isUser && isLastMessage && metadata?.uiAction && (
          <ChatUIActions
            uiAction={metadata.uiAction}
            onSelect={handleUIActionSelect}
            messageId={sessionId ? `${sessionId}-${metadata.uiAction.type}` : message.messageId || message.id}
          />
        )}
        <MessageTime isUser={isUser}>{formatTimestamp(timestamp)}</MessageTime>
      </MessageContent>
    </MessageContainer>
  );
};

export default React.memo(ChatMessage);

// Animations
const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
`;

// Styled Components
const MessageContainer = styled.div<{ isUser: boolean }>`
  display: flex;
  justify-content: ${({ isUser }) => (isUser ? "flex-end" : "flex-start")};
  gap: 12px;
  padding: 16px 24px;
  max-width: 800px;
  margin: 0 auto;
  width: 100%;
  animation: ${fadeIn} 0.3s ease-out;

  @media (max-width: 768px) {
    padding: 12px 16px;
  }
`;

const AvatarWrapper = styled.div`
  flex-shrink: 0;
  padding-top: 4px;
`;

const AssistantAvatar = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--color-tumakr-maroon) 0%, #8b1a2d 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  box-shadow: 0 2px 8px rgba(101, 29, 42, 0.3);
`;

const MessageContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  max-width: 85%;
  min-width: 0;
`;

const MessageBubble = styled.div<{ isUser: boolean }>`
  padding: ${({ isUser }) => (isUser ? "12px 16px" : "0")};
  background-color: ${({ isUser }) => (isUser ? "#f3f4f6" : "transparent")};
  border-radius: ${({ isUser }) => (isUser ? "20px 4px 20px 20px" : "0")};
  font-size: 15px;
  line-height: 1.65;
  white-space: ${({ isUser }) => (isUser ? "pre-wrap" : "normal")};
  color: #1a1a1a;
  word-break: break-word;
`;

const MarkdownContent = styled.div`
  p {
    margin: 0 0 12px 0;
    &:last-child {
      margin-bottom: 0;
    }
  }
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 20px 0 10px 0;
    font-weight: 600;
    line-height: 1.4;
    color: #111827;
    &:first-of-type {
      margin-top: 0;
    }
  }
  h1 {
    font-size: 24px;
  }
  h2 {
    font-size: 20px;
  }
  h3 {
    font-size: 18px;
  }
  ul,
  ol {
    margin: 10px 0;
    padding-left: 24px;
  }
  li {
    margin: 6px 0;
  }
  code {
    background-color: #f3f4f6;
    padding: 2px 6px;
    border-radius: 4px;
    font-family: monospace;
    font-size: 13px;
  }
  pre {
    background-color: #1f2937;
    color: #e5e7eb;
    padding: 16px;
    border-radius: 8px;
    overflow-x: auto;
    code {
      background-color: transparent;
      padding: 0;
      color: inherit;
    }
  }
  blockquote {
    border-left: 3px solid var(--color-tumakr-maroon);
    padding-left: 16px;
    margin: 16px 0;
    color: #4b5563;
  }
  a {
    color: var(--color-tumakr-maroon);
    text-decoration: none;
    font-weight: 500;
    &:hover {
      text-decoration: underline;
    }
  }
  strong {
    font-weight: 600;
  }
`;

const MessageTime = styled.span<{ isUser?: boolean }>`
  font-size: 11px;
  color: #9ca3af;
  margin-left: ${({ isUser }) => (isUser ? "0" : "4px")};
  text-align: ${({ isUser }) => (isUser ? "right" : "left")};
`;

// Estimate Card Styles
const EstimateCard = styled.div`
  background: #ffffff;
  border-radius: 16px;
  overflow: hidden;
  max-width: 400px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(0, 0, 0, 0.06);
`;

const EstimateHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 18px 20px;
  background: linear-gradient(135deg, var(--color-tumakr-maroon) 0%, #8b1a2d 100%);
`;

const EstimateIconWrapper = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
`;

const EstimateHeaderText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const EstimateTitle = styled.h3`
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: white;
`;

const EstimateSubtitle = styled.span`
  font-size: 12px;
  color: rgba(255, 255, 255, 0.8);
`;

const EstimateBody = styled.div`
  padding: 20px;
`;

const EstimateStats = styled.div`
  display: flex;
  gap: 24px;
`;

const StatItem = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const StatIcon = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background: #f3f4f6;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6b7280;
`;

const StatContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const StatValue = styled.span`
  font-size: 18px;
  font-weight: 700;
  color: #111827;
`;

const StatLabel = styled.span`
  font-size: 11px;
  color: #9ca3af;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const EstimateMessage = styled.p`
  margin: 16px 0 0 0;
  padding-top: 16px;
  border-top: 1px solid #f3f4f6;
  color: #4b5563;
  font-size: 14px;
  line-height: 1.6;
`;

const EstimateActions = styled.div`
  padding: 16px 20px;
  background: #fafafa;
  border-top: 1px solid #f3f4f6;
`;

const ViewQuotationButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
  padding: 14px 20px;
  background: var(--color-tumakr-maroon);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: var(--color-tumakr-maroon);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }

  &:active {
    transform: translateY(0);
  }
`;

// System Message Card Styles
const SystemCard = styled.div`
  background: #ffffff;
  border-radius: 16px;
  overflow: hidden;
  max-width: 480px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(0, 0, 0, 0.06);
`;

const SystemCardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 18px 20px;
`;

const SystemIconWrapper = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
`;

const SystemCardTitle = styled.h3`
  margin: 0;
  font-size: 17px;
  font-weight: 600;
  color: white;
`;

const SystemCardBody = styled.div`
  padding: 20px;
`;

const SystemCardMessage = styled.p`
  margin: 0;
  font-size: 14px;
  line-height: 1.7;
  color: #4b5563;
`;

const CustomerFeedbackBox = styled.div`
  margin-top: 16px;
  padding: 14px;
  background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
  border-radius: 10px;
`;

const CustomerFeedbackHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  font-weight: 600;
  color: #92400e;
  margin-bottom: 8px;
`;

const CustomerFeedbackText = styled.div`
  font-size: 14px;
  color: #78350f;
  line-height: 1.5;
  white-space: pre-wrap;
`;

const SystemCardActions = styled.div`
  padding: 20px;
  background: #fafafa;
  border-top: 1px solid #f3f4f6;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const PrimaryActionButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
  padding: 14px 20px;
  background: linear-gradient(135deg, var(--color-tumakr-dark-blue) 0%, #0f2b58 100%);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(59, 130, 246, 0.4);
  }
`;

const ResponseSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const ResponseLabel = styled.span`
  font-size: 13px;
  font-weight: 500;
  color: #6b7280;
`;

const ResponseButtonGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const ResponseButton = styled.button<{
  variant: "approve" | "changes" | "decline";
  $isSelected?: boolean;
}>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 16px 12px;
  border-radius: 12px;
  border: 2px solid transparent;
  cursor: pointer;
  transition: all 0.2s ease;
  background: white;

  ${({ variant, $isSelected }) => {
    const configs = {
      approve: {
        color: "var(--color-tumakr-green)",
        bg: "#ecfdf5",
        border: "var(--color-tumakr-green)",
      },
      changes: {
        color: "var(--color-tumakr-mustard)",
        bg: "#fffbeb",
        border: "var(--color-tumakr-mustard)",
      },
      decline: {
        color: "var(--color-tumakr-maroon)",
        bg: "#f5e3e3",
        border: "var(--color-tumakr-maroon)",
      },
    };
    const c = configs[variant];
    return `
      color: ${c.color};
      border-color: ${$isSelected ? c.border : "#e5e7eb"};
      background: ${$isSelected ? c.bg : "white"};

      &:hover:not(:disabled) {
        border-color: ${c.border};
        background: ${c.bg};
      }
    `;
  }}

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  svg {
    flex-shrink: 0;
  }
`;

const ResponseButtonText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;

  span {
    font-size: 13px;
    font-weight: 600;
  }

  small {
    font-size: 11px;
    opacity: 0.7;
  }
`;

const LoadingSpinner = styled.div`
  width: 18px;
  height: 18px;
  border: 2px solid currentColor;
  border-top-color: transparent;
  border-radius: 50%;
  animation: ${spin} 0.8s linear infinite;
`;

const RevisionInputSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  animation: ${fadeIn} 0.2s ease-out;
`;

const RevisionTextarea = styled.textarea`
  width: 100%;
  padding: 14px;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  font-size: 14px;
  font-family: inherit;
  resize: none;
  transition: border-color 0.2s ease;
  color: #1f2937;
  background-color: #ffffff;

  &:focus {
    outline: none;
    border-color: #f59e0b;
  }

  &::placeholder {
    color: #9ca3af;
  }
`;

const RevisionActions = styled.div`
  display: flex;
  gap: 10px;
`;

const SubmitRevisionButton = styled.button`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px 20px;
  background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(245, 158, 11, 0.4);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const CancelButton = styled.button`
  padding: 12px 20px;
  background: white;
  color: #6b7280;
  border: 2px solid #e5e7eb;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #f9fafb;
    border-color: #d1d5db;
  }
`;

const SuccessMessage = styled.div`
  display: flex;
  align-items: left;
  justify-content: left;
  gap: 10px;
  padding: 16px 20px;
  background: white;
  font-weight: 500;
  font-size: 14px;
`;

const ResponseSubmittedSection = styled.div`
  border-top: 1px solid #f3f4f6;
`;

const ResponseDetailBox = styled.div<{
  responseType: "approve" | "reject" | "request_changes";
}>`
  padding: 16px 20px;
  background: white;
`;

const ResponseDetailHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
  font-size: 14px;
  color: #374151;

  svg {
    flex-shrink: 0;
  }
`;

const ResponseDetailMessage = styled.div`
  margin-top: 12px;
  padding: 12px;
  background: rgba(255, 255, 255, 0.6);
  border-radius: 8px;
  font-size: 13px;
  line-height: 1.5;

  strong {
    display: block;
    font-size: 12px;
    color: #92400e;
    margin-bottom: 6px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  p {
    margin: 0;
    color: #78350f;
    white-space: pre-wrap;
  }
`;

// Error Card Styles
const ErrorCard = styled.div`
  background: #ffffff;
  border-radius: 16px;
  overflow: hidden;
  max-width: 400px;
  box-shadow: 0 4px 20px rgba(239, 68, 68, 0.15);
  border: 1px solid rgba(239, 68, 68, 0.2);
`;

const ErrorHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 20px;
  background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%);
  border-bottom: 1px solid rgba(239, 68, 68, 0.1);
`;

const ErrorIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: #fee2e2;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #dc2626;
`;

const ErrorTitle = styled.h4`
  margin: 0;
  font-size: 15px;
  font-weight: 600;
  color: #991b1b;
`;

const ErrorBody = styled.div`
  padding: 16px 20px;
`;

const ErrorMessage = styled.p`
  margin: 0;
  font-size: 14px;
  line-height: 1.7;
  color: #4b5563;
  white-space: pre-wrap;
`;

const ErrorActions = styled.div`
  padding: 16px 20px;
  background: #fafafa;
  border-top: 1px solid #f3f4f6;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const RetryButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  padding: 12px 20px;
  background: linear-gradient(135deg, var(--color-tumakr-dark-blue) 0%, #0f2b58 100%);
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const RetryHint = styled.span`
  font-size: 12px;
  color: #9ca3af;
  text-align: center;
`;
