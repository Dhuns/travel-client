import React, { FC, useState } from 'react';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';

interface ExpertRequestFormData {
  budgetPerPerson: string;
  budgetCurrency: 'USD' | 'KRW';
  accommodationPreference: string;
  specialRequests: string;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ExpertRequestFormData) => Promise<void>;
  context?: {
    destination?: string;
    startDate?: string;
    endDate?: string;
    adults?: number;
    children?: number;
  };
}

const ExpertRequestModal: FC<Props> = ({ isOpen, onClose, onSubmit, context }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<ExpertRequestFormData>({
    budgetPerPerson: '',
    budgetCurrency: 'USD',
    accommodationPreference: '',
    specialRequests: '',
  });

  if (!isOpen) return null;

  const handleChange = (field: keyof ExpertRequestFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await onSubmit(formData);
      onClose();
    } catch (error) {
      console.error('Failed to submit:', error);
      alert('Failed to send request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget && !isSubmitting) {
      onClose();
    }
  };

  return (
    <Overlay onClick={handleOverlayClick}>
      <ModalContainer>
        <ModalHeader>
          <HeaderIcon>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </HeaderIcon>
          <HeaderText>
            <ModalTitle>Send to Travel Expert</ModalTitle>
            <ModalSubtitle>Provide additional details for a customized quote</ModalSubtitle>
          </HeaderText>
          <CloseButton onClick={onClose} disabled={isSubmitting}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </CloseButton>
        </ModalHeader>

        {context && (
          <TripSummary>
            <SummaryItem>
              <SummaryIcon>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </SummaryIcon>
              <span>{context.destination || 'Destination'}</span>
            </SummaryItem>
            <SummaryItem>
              <SummaryIcon>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
              </SummaryIcon>
              <span>{context.startDate} - {context.endDate}</span>
            </SummaryItem>
            <SummaryItem>
              <SummaryIcon>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </SummaryIcon>
              <span>{context.adults || 0} Adults{context.children ? `, ${context.children} Children` : ''}</span>
            </SummaryItem>
          </TripSummary>
        )}

        <Form onSubmit={handleSubmit}>
          <FormSection>
            <SectionTitle>Budget Information</SectionTitle>
            <FormRow>
              <FormGroup style={{ flex: 2 }}>
                <Label>Budget per Person</Label>
                <Input
                  type="text"
                  placeholder="e.g., 1500"
                  value={formData.budgetPerPerson}
                  onChange={(e) => handleChange('budgetPerPerson', e.target.value)}
                />
              </FormGroup>
              <FormGroup style={{ flex: 1 }}>
                <Label>Currency</Label>
                <Select
                  value={formData.budgetCurrency}
                  onChange={(e) => handleChange('budgetCurrency', e.target.value)}
                >
                  <option value="USD">USD ($)</option>
                  <option value="KRW">KRW (&#8361;)</option>
                </Select>
              </FormGroup>
            </FormRow>
          </FormSection>

          <FormSection>
            <SectionTitle>Accommodation Preference</SectionTitle>
            <FormGroup>
              <RadioGroup>
                {[
                  { value: 'budget', label: 'Budget-friendly', desc: 'Hostels, guesthouses' },
                  { value: 'mid', label: 'Mid-range', desc: '3-4 star hotels' },
                  { value: 'luxury', label: 'Luxury', desc: '5 star hotels, resorts' },
                  { value: 'flexible', label: 'Flexible', desc: 'Open to suggestions' },
                ].map(option => (
                  <RadioOption
                    key={option.value}
                    $isSelected={formData.accommodationPreference === option.value}
                    onClick={() => handleChange('accommodationPreference', option.value)}
                  >
                    <RadioDot $isSelected={formData.accommodationPreference === option.value} />
                    <RadioContent>
                      <RadioLabel>{option.label}</RadioLabel>
                      <RadioDesc>{option.desc}</RadioDesc>
                    </RadioContent>
                  </RadioOption>
                ))}
              </RadioGroup>
            </FormGroup>
          </FormSection>

          <FormSection>
            <SectionTitle>Special Requests or Notes</SectionTitle>
            <FormGroup>
              <Textarea
                placeholder="Any special requirements? (e.g., dietary restrictions, accessibility needs, must-visit places, activities you want to avoid...)"
                value={formData.specialRequests}
                onChange={(e) => handleChange('specialRequests', e.target.value)}
                rows={4}
              />
            </FormGroup>
          </FormSection>

          <SubmitSection>
            <SubmitButton type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <LoadingSpinner />
                  Sending...
                </>
              ) : (
                <>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="22" y1="2" x2="11" y2="13" />
                    <polygon points="22 2 15 22 11 13 2 9 22 2" />
                  </svg>
                  Send to Expert
                </>
              )}
            </SubmitButton>
            <SubmitNote>
              Our travel expert will review your request and send you a detailed quote within 24-48 hours.
            </SubmitNote>
          </SubmitSection>
        </Form>
      </ModalContainer>
    </Overlay>
  );
};

export default ExpertRequestModal;

// Animations
const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const slideUp = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

// Styled Components
const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
  animation: ${fadeIn} 0.2s ease;
`;

const ModalContainer = styled.div`
  background: white;
  border-radius: 20px;
  width: 100%;
  max-width: 560px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
  animation: ${slideUp} 0.3s ease;

  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.1);
    border-radius: 3px;
  }
`;

const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 24px;
  border-bottom: 1px solid #f3f4f6;
  position: sticky;
  top: 0;
  background: white;
  z-index: 10;
`;

const HeaderIcon = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 14px;
  background: linear-gradient(135deg, var(--color-tumakr-maroon, #651d2a) 0%, #8b1a2d 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  flex-shrink: 0;
`;

const HeaderText = styled.div`
  flex: 1;
`;

const ModalTitle = styled.h2`
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: #111827;
`;

const ModalSubtitle = styled.p`
  margin: 4px 0 0;
  font-size: 13px;
  color: #6b7280;
`;

const CloseButton = styled.button`
  width: 36px;
  height: 36px;
  border-radius: 10px;
  border: none;
  background: #f3f4f6;
  color: #6b7280;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;

  &:hover:not(:disabled) {
    background: #e5e7eb;
    color: #374151;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const TripSummary = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  padding: 16px 24px;
  background: #f9fafb;
  border-bottom: 1px solid #f3f4f6;
`;

const SummaryItem = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: #374151;
  background: white;
  padding: 8px 12px;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
`;

const SummaryIcon = styled.span`
  color: var(--color-tumakr-maroon, #651d2a);
  display: flex;
`;

const Form = styled.form`
  padding: 24px;
`;

const FormSection = styled.div`
  margin-bottom: 24px;

  &:last-of-type {
    margin-bottom: 0;
  }
`;

const SectionTitle = styled.h3`
  font-size: 14px;
  font-weight: 600;
  color: #374151;
  margin: 0 0 12px;
`;

const FormRow = styled.div`
  display: flex;
  gap: 12px;
`;

const FormGroup = styled.div`
  flex: 1;
`;

const Label = styled.label`
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: #6b7280;
  margin-bottom: 6px;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 14px;
  border: 2px solid #e5e7eb;
  border-radius: 10px;
  font-size: 14px;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: var(--color-tumakr-maroon, #651d2a);
  }

  &::placeholder {
    color: #9ca3af;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 12px 14px;
  border: 2px solid #e5e7eb;
  border-radius: 10px;
  font-size: 14px;
  background: white;
  cursor: pointer;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: var(--color-tumakr-maroon, #651d2a);
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 12px 14px;
  border: 2px solid #e5e7eb;
  border-radius: 10px;
  font-size: 14px;
  font-family: inherit;
  resize: vertical;
  min-height: 100px;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: var(--color-tumakr-maroon, #651d2a);
  }

  &::placeholder {
    color: #9ca3af;
  }
`;

const RadioGroup = styled.div<{ $horizontal?: boolean }>`
  display: flex;
  flex-direction: ${({ $horizontal }) => $horizontal ? 'row' : 'column'};
  gap: 10px;
  flex-wrap: wrap;
`;

const RadioOption = styled.div<{ $isSelected: boolean }>`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 14px;
  border: 2px solid ${({ $isSelected }) => $isSelected ? 'var(--color-tumakr-maroon, #651d2a)' : '#e5e7eb'};
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s;
  background: ${({ $isSelected }) => $isSelected ? 'rgba(101, 29, 42, 0.05)' : 'white'};

  &:hover {
    border-color: var(--color-tumakr-maroon, #651d2a);
  }
`;

const RadioDot = styled.div<{ $isSelected: boolean }>`
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 2px solid ${({ $isSelected }) => $isSelected ? 'var(--color-tumakr-maroon, #651d2a)' : '#d1d5db'};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  &::after {
    content: '';
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: var(--color-tumakr-maroon, #651d2a);
    opacity: ${({ $isSelected }) => $isSelected ? 1 : 0};
    transition: opacity 0.2s;
  }
`;

const RadioContent = styled.div``;

const RadioLabel = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: #111827;
`;

const RadioDesc = styled.div`
  font-size: 12px;
  color: #6b7280;
  margin-top: 2px;
`;

const SubmitSection = styled.div`
  margin-top: 28px;
  padding-top: 24px;
  border-top: 1px solid #f3f4f6;
`;

const SubmitButton = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 16px;
  background: linear-gradient(135deg, var(--color-tumakr-maroon, #651d2a) 0%, #8b1a2d 100%);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(101, 29, 42, 0.3);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: none;
  }
`;

const LoadingSpinner = styled.div`
  width: 20px;
  height: 20px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: ${spin} 0.8s linear infinite;
`;

const SubmitNote = styled.p`
  text-align: center;
  font-size: 12px;
  color: #9ca3af;
  margin: 12px 0 0;
`;
