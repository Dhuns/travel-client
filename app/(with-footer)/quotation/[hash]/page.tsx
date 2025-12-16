'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import styled from '@emotion/styled';
import { getQuotationByHash, type QuotationResponse } from '@/src/shared/apis/estimate';
import { FinalQuotation, DraftQuotation } from '../components';

const QuotationPage = () => {
  const params = useParams();
  const hash = params.hash as string;

  const [quotation, setQuotation] = useState<QuotationResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchQuotation = async () => {
      try {
        setIsLoading(true);
        const data = await getQuotationByHash(hash);
        setQuotation(data);
      } catch (err) {
        const axiosError = err as { response?: { data?: { message?: string } } };
        setError(axiosError?.response?.data?.message || 'Failed to load quotation. The link may be invalid or expired.');
      } finally {
        setIsLoading(false);
      }
    };

    if (hash) {
      fetchQuotation();
    }
  }, [hash]);

  if (isLoading) {
    return (
      <LoadingContainer>
        <LoadingMessage>Loading your quotation...</LoadingMessage>
      </LoadingContainer>
    );
  }

  if (error || !quotation) {
    return (
      <ErrorContainer>
        <ErrorMessage>
          <h2>Unable to Load Quotation</h2>
          <p>{error || 'The quotation link is invalid or has expired.'}</p>
        </ErrorMessage>
      </ErrorContainer>
    );
  }

  const { batchInfo } = quotation;
  const isFinalQuotation = batchInfo.source === 'manual';

  // Render Final Quotation (Manual) or Draft Quotation (AI)
  return isFinalQuotation ? (
    <FinalQuotation quotation={quotation} />
  ) : (
    <DraftQuotation quotation={quotation} />
  );
};

export default QuotationPage;

// Loading & Error Styles
const LoadingContainer = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f9fafb;
`;

const LoadingMessage = styled.div`
  font-size: 18px;
  color: #6b7280;
`;

const ErrorContainer = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f9fafb;
`;

const ErrorMessage = styled.div`
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
