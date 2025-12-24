import styled from '@emotion/styled';
import { FC, useState } from 'react';
import { UIAction, UIActionOption, ChatContext } from '@shared/types/chat';
import { Calendar, Users, Minus, Plus, Check } from 'lucide-react';

interface ChatUIActionsProps {
  uiAction: UIAction;
  onSelect: (value: string | string[] | ChatContext) => void;
  disabled?: boolean;
  messageId?: string; // To track which UI action this belongs to
}

const UI_ACTION_STORAGE_KEY = 'ui_action_responses';

interface UIActionResponse {
  responded: boolean;
  value?: string;
  type?: string;
}

// Helper to get UI action response
const getUIActionResponse = (messageId: string | undefined): UIActionResponse | null => {
  if (!messageId || typeof window === 'undefined') return null;

  try {
    const stored = localStorage.getItem(UI_ACTION_STORAGE_KEY);
    if (stored) {
      const responses = JSON.parse(stored);
      return responses[messageId] || null;
    }
  } catch {
    // Ignore errors
  }
  return null;
};

// Helper to mark UI action as responded with value
const setUIActionResponse = (messageId: string | undefined, value: string, type: string): void => {
  if (!messageId || typeof window === 'undefined') return;

  try {
    const stored = localStorage.getItem(UI_ACTION_STORAGE_KEY);
    const responses = stored ? JSON.parse(stored) : {};
    responses[messageId] = {
      responded: true,
      value,
      type,
    };
    localStorage.setItem(UI_ACTION_STORAGE_KEY, JSON.stringify(responses));

    if (process.env.NODE_ENV === 'development') {
      console.log('[ChatUIActions] Saved to localStorage:', { messageId, value, type });
    }
  } catch (error) {
    console.error('[ChatUIActions] Failed to save to localStorage:', error);
  }
};

/**
 * 구조화된 대화 UI 액션 컴포넌트
 * Hello Vacanze 스타일의 버튼, 칩, 날짜 선택 등을 렌더링
 */
const ChatUIActions: FC<ChatUIActionsProps> = ({ uiAction, onSelect, disabled, messageId }) => {
  const { type, options, min, max, multiSelect, contextData, placeholder } = uiAction;

  // Check if this UI action has already been responded to
  const storedResponse = getUIActionResponse(messageId);
  const [selectedValue, setSelectedValue] = useState(storedResponse?.value || '');
  const [hasResponded, setHasResponded] = useState(!!storedResponse?.responded);

  // Debug logging
  if (process.env.NODE_ENV === 'development') {
    console.log('[ChatUIActions]', {
      messageId,
      type,
      storedResponse,
      hasResponded
    });
  }

  const [selectedChips, setSelectedChips] = useState<string[]>([]);
  const [travelers, setTravelers] = useState({ adults: 2, children: 0, infants: 0 });
  const [dateRange, setDateRange] = useState({ startDate: '', endDate: '' });

  // 버튼 선택 (목적지 등)
  if (type === 'buttons' && options) {
    if (hasResponded) {
      return null;
    }

    const handleButtonClick = (value: string, label: string) => {
      if (disabled) return;
      setUIActionResponse(messageId, label, type);
      setSelectedValue(label);
      setHasResponded(true);
      onSelect(value);
    };

    return (
      <ButtonGrid>
        {options.map((option) => (
          <ActionButton
            key={option.id}
            onClick={() => handleButtonClick(option.value, option.label)}
            disabled={disabled}
          >
            <ButtonContent>
              <ButtonLabel>{option.label}</ButtonLabel>
              {option.description && (
                <ButtonDescription>{option.description}</ButtonDescription>
              )}
            </ButtonContent>
          </ActionButton>
        ))}
      </ButtonGrid>
    );
  }

  // 칩 선택 (선호도 등 - 다중 선택 가능)
  if (type === 'chips' && options) {
    if (hasResponded) {
      return null;
    }

    const handleChipClick = (value: string) => {
      if (disabled) return;

      if (multiSelect) {
        const newSelected = selectedChips.includes(value)
          ? selectedChips.filter((v) => v !== value)
          : [...selectedChips, value];
        setSelectedChips(newSelected);
      } else {
        // Find the label for single select
        const option = options.find(opt => opt.value === value);
        const label = option?.label || value;
        setUIActionResponse(messageId, label, type);
        setSelectedValue(label);
        setHasResponded(true);
        onSelect(value);
      }
    };

    const handleConfirm = () => {
      if (selectedChips.length > 0) {
        // Get labels for selected chips
        const labels = selectedChips.map(val => {
          const option = options.find(opt => opt.value === val);
          return option?.label || val;
        }).join(', ');
        setUIActionResponse(messageId, labels, type);
        setSelectedValue(labels);
        setHasResponded(true);
        onSelect(selectedChips);
      }
    };

    return (
      <ChipsContainer>
        <ChipsGrid>
          {options.map((option) => (
            <Chip
              key={option.id}
              selected={selectedChips.includes(option.value)}
              onClick={() => handleChipClick(option.value)}
              disabled={disabled}
            >
              {option.label}
              {selectedChips.includes(option.value) && <Check size={14} />}
            </Chip>
          ))}
        </ChipsGrid>
        {multiSelect && selectedChips.length > 0 && (
          <ConfirmButton onClick={handleConfirm} disabled={disabled}>
            Continue with {selectedChips.length} selected
          </ConfirmButton>
        )}
      </ChipsContainer>
    );
  }

  // 날짜 선택
  if (type === 'date_picker') {
    if (hasResponded) {
      return null;
    }

    const handleDateConfirm = () => {
      if (dateRange.startDate && dateRange.endDate) {
        const dateString = `${dateRange.startDate} to ${dateRange.endDate}`;
        setUIActionResponse(messageId, dateString, type);
        setSelectedValue(dateString);
        setHasResponded(true);
        onSelect(dateString);
      }
    };

    // 날짜 입력 클릭 핸들러 (모바일 호환성)
    const handleDateInputClick = (e: React.MouseEvent<HTMLInputElement>) => {
      const input = e.currentTarget as HTMLInputElement & { showPicker?: () => void };
      input.showPicker?.();
    };

    // 날짜 포맷팅 함수
    const formatDateDisplay = (dateStr: string) => {
      if (!dateStr) return null;
      const date = new Date(dateStr);
      const month = date.toLocaleDateString('en-US', { month: 'short' });
      const day = date.getDate();
      const weekday = date.toLocaleDateString('en-US', { weekday: 'short' });
      return { month, day, weekday };
    };

    const startDateInfo = formatDateDisplay(dateRange.startDate);
    const endDateInfo = formatDateDisplay(dateRange.endDate);

    // 일수 계산
    const getDayCount = () => {
      if (!dateRange.startDate || !dateRange.endDate) return null;
      const start = new Date(dateRange.startDate);
      const end = new Date(dateRange.endDate);
      const diff = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
      return diff;
    };

    const dayCount = getDayCount();

    return (
      <DatePickerContainer>
        <DatePickerHeader>
          <Calendar size={18} />
          <span>Select your travel dates</span>
        </DatePickerHeader>
        <DateCardsWrapper>
          <DateCard hasValue={!!dateRange.startDate}>
            <DateCardLabel>Check-in</DateCardLabel>
            {startDateInfo ? (
              <DateCardContent>
                <DateCardDay>{startDateInfo.day}</DateCardDay>
                <DateCardDetails>
                  <DateCardMonth>{startDateInfo.month}</DateCardMonth>
                  <DateCardWeekday>{startDateInfo.weekday}</DateCardWeekday>
                </DateCardDetails>
              </DateCardContent>
            ) : (
              <DateCardPlaceholder>Select date</DateCardPlaceholder>
            )}
            <HiddenDateInput
              type="date"
              value={dateRange.startDate}
              onChange={(e) => setDateRange({ ...dateRange, startDate: e.target.value })}
              onClick={handleDateInputClick}
              min={new Date().toISOString().split('T')[0]}
              disabled={disabled}
            />
          </DateCard>

          <DateArrow>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
            {dayCount && <DateDuration>{dayCount} days</DateDuration>}
          </DateArrow>

          <DateCard hasValue={!!dateRange.endDate}>
            <DateCardLabel>Check-out</DateCardLabel>
            {endDateInfo ? (
              <DateCardContent>
                <DateCardDay>{endDateInfo.day}</DateCardDay>
                <DateCardDetails>
                  <DateCardMonth>{endDateInfo.month}</DateCardMonth>
                  <DateCardWeekday>{endDateInfo.weekday}</DateCardWeekday>
                </DateCardDetails>
              </DateCardContent>
            ) : (
              <DateCardPlaceholder>Select date</DateCardPlaceholder>
            )}
            <HiddenDateInput
              type="date"
              value={dateRange.endDate}
              onChange={(e) => setDateRange({ ...dateRange, endDate: e.target.value })}
              onClick={handleDateInputClick}
              min={dateRange.startDate || new Date().toISOString().split('T')[0]}
              disabled={disabled}
            />
          </DateCard>
        </DateCardsWrapper>
        {dateRange.startDate && dateRange.endDate && (
          <ConfirmButton onClick={handleDateConfirm} disabled={disabled}>
            Confirm Dates
          </ConfirmButton>
        )}
      </DatePickerContainer>
    );
  }

  // 인원 수 입력
  if (type === 'number_input') {
    if (hasResponded) {
      return null;
    }

    const updateCount = (type: 'adults' | 'children' | 'infants', delta: number) => {
      if (disabled) return;
      setTravelers((prev) => ({
        ...prev,
        [type]: Math.max(type === 'adults' ? 1 : 0, Math.min(10, prev[type] + delta)),
      }));
    };

    const handleTravelersConfirm = () => {
      const totalText = `${travelers.adults} adult${travelers.adults > 1 ? 's' : ''}${
        travelers.children > 0 ? `, ${travelers.children} child${travelers.children > 1 ? 'ren' : ''}` : ''
      }${travelers.infants > 0 ? `, ${travelers.infants} infant${travelers.infants > 1 ? 's' : ''}` : ''}`;
      setUIActionResponse(messageId, totalText, type);
      setSelectedValue(totalText);
      setHasResponded(true);
      onSelect(totalText);
    };

    return (
      <TravelersContainer>
        <TravelerRow>
          <TravelerInfo>
            <Users size={18} />
            <TravelerLabel>Adults</TravelerLabel>
            <TravelerAge>Age 12+</TravelerAge>
          </TravelerInfo>
          <CounterControls>
            <CounterButton onClick={() => updateCount('adults', -1)} disabled={disabled || travelers.adults <= 1}>
              <Minus size={16} />
            </CounterButton>
            <CounterValue>{travelers.adults}</CounterValue>
            <CounterButton onClick={() => updateCount('adults', 1)} disabled={disabled || travelers.adults >= 10}>
              <Plus size={16} />
            </CounterButton>
          </CounterControls>
        </TravelerRow>

        <TravelerRow>
          <TravelerInfo>
            <Users size={18} />
            <TravelerLabel>Children</TravelerLabel>
            <TravelerAge>Age 2-11</TravelerAge>
          </TravelerInfo>
          <CounterControls>
            <CounterButton onClick={() => updateCount('children', -1)} disabled={disabled || travelers.children <= 0}>
              <Minus size={16} />
            </CounterButton>
            <CounterValue>{travelers.children}</CounterValue>
            <CounterButton onClick={() => updateCount('children', 1)} disabled={disabled || travelers.children >= 10}>
              <Plus size={16} />
            </CounterButton>
          </CounterControls>
        </TravelerRow>

        <TravelerRow>
          <TravelerInfo>
            <Users size={18} />
            <TravelerLabel>Infants</TravelerLabel>
            <TravelerAge>Under 2</TravelerAge>
          </TravelerInfo>
          <CounterControls>
            <CounterButton onClick={() => updateCount('infants', -1)} disabled={disabled || travelers.infants <= 0}>
              <Minus size={16} />
            </CounterButton>
            <CounterValue>{travelers.infants}</CounterValue>
            <CounterButton onClick={() => updateCount('infants', 1)} disabled={disabled || travelers.infants >= 10}>
              <Plus size={16} />
            </CounterButton>
          </CounterControls>
        </TravelerRow>

        <ConfirmButton onClick={handleTravelersConfirm} disabled={disabled}>
          Continue with {travelers.adults + travelers.children + travelers.infants} traveler
          {travelers.adults + travelers.children + travelers.infants > 1 ? 's' : ''}
        </ConfirmButton>
      </TravelersContainer>
    );
  }

  // 확인 카드 (최종 정보 확인)
  if (type === 'confirm_card' && contextData) {
    const { destination, startDate, endDate, adults, children, infants, preferences } = contextData;

    if (hasResponded) {
      return null;
    }

    const handleConfirmAction = (action: string) => {
      if (disabled) return;
      const actionLabel = action === 'confirm' ? 'Generate Itinerary' : 'Edit Details';
      setUIActionResponse(messageId, actionLabel, type);
      setSelectedValue(actionLabel);
      setHasResponded(true);
      onSelect(action);
    };

    return (
      <ConfirmCard>
        <ConfirmCardTitle>Trip Summary</ConfirmCardTitle>
        <ConfirmCardContent>
          {destination && (
            <ConfirmItem>
              <ConfirmLabel>Destination</ConfirmLabel>
              <ConfirmValue>{destination}</ConfirmValue>
            </ConfirmItem>
          )}
          {startDate && endDate && (
            <ConfirmItem>
              <ConfirmLabel>Travel Dates</ConfirmLabel>
              <ConfirmValue>{startDate} ~ {endDate}</ConfirmValue>
            </ConfirmItem>
          )}
          {adults && (
            <ConfirmItem>
              <ConfirmLabel>Travelers</ConfirmLabel>
              <ConfirmValue>
                {adults} adult{adults > 1 ? 's' : ''}
                {children ? `, ${children} child${children > 1 ? 'ren' : ''}` : ''}
                {infants ? `, ${infants} infant${infants > 1 ? 's' : ''}` : ''}
              </ConfirmValue>
            </ConfirmItem>
          )}
          {preferences && preferences.length > 0 && (
            <ConfirmItem>
              <ConfirmLabel>Interests</ConfirmLabel>
              <ConfirmValue>{preferences.join(', ')}</ConfirmValue>
            </ConfirmItem>
          )}
        </ConfirmCardContent>
        <ConfirmCardActions>
          <SecondaryButton onClick={() => handleConfirmAction('edit')} disabled={disabled}>
            Edit Details
          </SecondaryButton>
          <PrimaryButton onClick={() => handleConfirmAction('confirm')} disabled={disabled}>
            Generate Itinerary
          </PrimaryButton>
        </ConfirmCardActions>
      </ConfirmCard>
    );
  }

  return null;
};

export default ChatUIActions;

// Styled Components
const ButtonGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
  margin-top: 12px;
  max-width: 400px;
`;

const ActionButton = styled.button<{ disabled?: boolean }>`
  padding: 12px 16px;
  background: white;
  border: 1px solid #e5e5e5;
  border-radius: 12px;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  transition: all 0.15s ease;
  text-align: left;

  &:hover:not(:disabled) {
    border-color: var(--color-tumakr-maroon);
    background: rgba(101, 29, 42, 0.03);
  }
`;

const ButtonContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const ButtonLabel = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: #1a1a1a;
`;

const ButtonDescription = styled.span`
  font-size: 12px;
  color: #666;
`;

const ChipsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 12px;
`;

const ChipsGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const Chip = styled.button<{ selected?: boolean; disabled?: boolean }>`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  background: ${({ selected }) => (selected ? 'var(--color-tumakr-maroon)' : 'white')};
  color: ${({ selected }) => (selected ? 'white' : '#333')};
  border: 1px solid ${({ selected }) => (selected ? 'var(--color-tumakr-maroon)' : '#e5e5e5')};
  border-radius: 20px;
  font-size: 13px;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  transition: all 0.15s ease;

  &:hover:not(:disabled) {
    border-color: var(--color-tumakr-maroon);
    background: ${({ selected }) => (selected ? 'var(--color-tumakr-maroon)' : 'rgba(101, 29, 42, 0.05)')};
  }
`;

const ConfirmButton = styled.button<{ disabled?: boolean }>`
  padding: 12px 24px;
  background: var(--color-tumakr-maroon);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  transition: all 0.15s ease;

  &:hover:not(:disabled) {
    background: #4a1520;
  }
`;

const DatePickerContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 12px;
  width: 100%;
  max-width: 400px;
  position: relative;
  z-index: 100;
  background: white;
  padding: 20px;
  border: 1px solid #e8e8e8;
  border-radius: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
`;

const DatePickerHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 600;
  color: #333;
  margin-bottom: 4px;

  svg {
    color: var(--color-tumakr-maroon);
  }
`;

const DateCardsWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const DateCard = styled.label<{ hasValue?: boolean }>`
  flex: 1;
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 14px 16px;
  background: ${({ hasValue }) => hasValue ? 'rgba(101, 29, 42, 0.04)' : '#fafafa'};
  border: 2px solid ${({ hasValue }) => hasValue ? 'var(--color-tumakr-maroon)' : '#e8e8e8'};
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  min-height: 80px;

  &:hover {
    border-color: var(--color-tumakr-maroon);
    background: rgba(101, 29, 42, 0.02);
  }
`;

const DateCardLabel = styled.span`
  font-size: 11px;
  font-weight: 600;
  color: #888;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 6px;
`;

const DateCardContent = styled.div`
  display: flex;
  align-items: baseline;
  gap: 8px;
`;

const DateCardDay = styled.span`
  font-size: 28px;
  font-weight: 700;
  color: var(--color-tumakr-maroon);
  line-height: 1;
`;

const DateCardDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

const DateCardMonth = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: #333;
`;

const DateCardWeekday = styled.span`
  font-size: 12px;
  color: #888;
`;

const DateCardPlaceholder = styled.span`
  font-size: 14px;
  color: #aaa;
  margin-top: 8px;
`;

const HiddenDateInput = styled.input`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
  z-index: 10;

  &::-webkit-calendar-picker-indicator {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    cursor: pointer;
  }
`;

const DateArrow = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  color: #ccc;
  flex-shrink: 0;
`;

const DateDuration = styled.span`
  font-size: 11px;
  font-weight: 600;
  color: var(--color-tumakr-maroon);
  white-space: nowrap;
`;

const TravelersContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 12px;
  max-width: 350px;
  background: white;
  border: 1px solid #e5e5e5;
  border-radius: 12px;
  padding: 16px;
`;

const TravelerRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid #f0f0f0;

  &:last-of-type {
    border-bottom: none;
  }
`;

const TravelerInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: #333;
`;

const TravelerLabel = styled.span`
  font-size: 14px;
  font-weight: 500;
`;

const TravelerAge = styled.span`
  font-size: 12px;
  color: #999;
`;

const CounterControls = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const CounterButton = styled.button<{ disabled?: boolean }>`
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #e5e5e5;
  border-radius: 50%;
  background: white;
  color: ${({ disabled }) => (disabled ? '#ccc' : '#333')};
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  transition: all 0.15s ease;

  &:hover:not(:disabled) {
    border-color: var(--color-tumakr-maroon);
    color: var(--color-tumakr-maroon);
  }
`;

const CounterValue = styled.span`
  font-size: 16px;
  font-weight: 500;
  min-width: 24px;
  text-align: center;
  color: #1a1a1a;
  display: inline-block;
`;

const ConfirmCard = styled.div`
  margin-top: 12px;
  background: white;
  border: 1px solid #e5e5e5;
  border-radius: 12px;
  overflow: hidden;
  max-width: 400px;
`;

const ConfirmCardTitle = styled.div`
  padding: 16px;
  background: #fafafa;
  border-bottom: 1px solid #e5e5e5;
  font-size: 14px;
  font-weight: 600;
  color: #333;
`;

const ConfirmCardContent = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const ConfirmItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const ConfirmLabel = styled.span`
  font-size: 13px;
  color: #666;
`;

const ConfirmValue = styled.span`
  font-size: 14px;
  color: #1a1a1a;
  font-weight: 500;
  text-align: right;
`;

const ConfirmCardActions = styled.div`
  display: flex;
  gap: 8px;
  padding: 16px;
  border-top: 1px solid #e5e5e5;
`;

const SecondaryButton = styled.button<{ disabled?: boolean }>`
  flex: 1;
  padding: 12px 16px;
  background: white;
  color: #666;
  border: 1px solid #e5e5e5;
  border-radius: 8px;
  font-size: 14px;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  transition: all 0.15s ease;

  &:hover:not(:disabled) {
    background: #f5f5f5;
  }
`;

const PrimaryButton = styled.button<{ disabled?: boolean }>`
  flex: 1;
  padding: 12px 16px;
  background: var(--color-tumakr-maroon);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  transition: all 0.15s ease;

  &:hover:not(:disabled) {
    background: #4a1520;
  }
`;
