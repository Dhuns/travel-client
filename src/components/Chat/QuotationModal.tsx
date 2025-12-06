"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import styled from "@emotion/styled";
import {
  getQuotationByHash,
  getQuotationByBatchId,
  type QuotationResponse,
} from "@/src/shared/apis/estimate";
import { FinalQuotation, DraftQuotation } from "@/app/quotation/components";
import { X } from "lucide-react";

interface Props {
  hash?: string;
  batchId?: number;
  isOpen: boolean;
  onClose: () => void;
}

const QuotationModal: React.FC<Props> = ({ hash, batchId, isOpen, onClose }) => {
  const [quotation, setQuotation] = useState<QuotationResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  useEffect(() => {
    const fetchQuotation = async () => {
      if (!isOpen || (!hash && !batchId)) return;

      try {
        setIsLoading(true);
        setError(null);
        const data = batchId
          ? await getQuotationByBatchId(batchId)
          : await getQuotationByHash(hash!);
        setQuotation(data);
      } catch (err) {
        const axiosError = err as { response?: { data?: { message?: string } } };
        setError(
          axiosError?.response?.data?.message ||
            "Failed to load quotation. The link may be invalid or expired."
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuotation();
  }, [hash, batchId, isOpen]);

  if (!isOpen || !mounted) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const modalContent = (
    <ModalOverlay onClick={handleBackdropClick}>
      <ModalContainer>
        <CloseButton onClick={onClose}>
          <X size={24} />
        </CloseButton>

        <ModalContent>
          {isLoading && (
            <LoadingContainer>
              <LoadingMessage>Loading your quotation...</LoadingMessage>
            </LoadingContainer>
          )}

          {error && !isLoading && (
            <ErrorContainer>
              <ErrorMessageStyled>
                <h2>Unable to Load Quotation</h2>
                <p>{error}</p>
              </ErrorMessageStyled>
            </ErrorContainer>
          )}

          {!isLoading && !error && quotation && (
            <>
              {quotation.batchInfo.source === "manual" ? (
                <FinalQuotation quotation={quotation} />
              ) : (
                <DraftQuotation quotation={quotation} />
              )}
            </>
          )}
        </ModalContent>
      </ModalContainer>
    </ModalOverlay>
  );

  return createPortal(modalContent, document.body);
};

export default QuotationModal;

// Styled Components
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 99999;
  padding: 20px;
`;

const ModalContainer = styled.div`
  position: relative;
  background: white;
  border-radius: 12px;
  width: 100%;
  max-width: 1200px;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
`;

const CloseButton = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  background: white;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.2s;

  &:hover {
    background: #f3f4f6;
    transform: scale(1.1);
  }

  svg {
    color: #6b7280;
  }
`;

const ModalContent = styled.div`
  overflow-y: auto;
  flex: 1;
  padding: 20px;

  /* Custom scrollbar */
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;

const LoadingContainer = styled.div`
  min-height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoadingMessage = styled.div`
  font-size: 18px;
  color: #6b7280;
`;

const ErrorContainer = styled.div`
  min-height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ErrorMessageStyled = styled.div`
  text-align: center;
  padding: 40px;

  h2 {
    font-size: 24px;
    font-weight: 600;
    color: #ef4444;
    margin: 0 0 12px 0;
  }

  p {
    font-size: 16px;
    color: #6b7280;
    margin: 0;
  }
`;
