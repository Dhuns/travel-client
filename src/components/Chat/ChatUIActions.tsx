import styled from '@emotion/styled';
import { FC, useState } from 'react';
import { UIAction, UIActionOption, ChatContext } from '@shared/types/chat';
import { Calendar, Users, Minus, Plus, Check } from 'lucide-react';

interface ChatUIActionsProps {
  uiAction: UIAction;
  onSelect: (value: string | string[] | ChatContext) => void;
  disabled?: boolean;
}

/**
 * 구조화된 대화 UI 액션 컴포넌트
 * Hello Vacanze 스타일의 버튼, 칩, 날짜 선택 등을 렌더링
 */
const ChatUIActions: FC<ChatUIActionsProps> = ({ uiAction, onSelect, disabled }) => {
  const { type, options, min, max, multiSelect, contextData, placeholder } = uiAction;

  const [selectedChips, setSelectedChips] = useState<string[]>([]);
  const [travelers, setTravelers] = useState({ adults: 2, children: 0, infants: 0 });
  const [dateRange, setDateRange] = useState({ startDate: '', endDate: '' });

  // 버튼 선택 (목적지 등)
  if (type === 'buttons' && options) {
    return (
      <ButtonGrid>
        {options.map((option) => (
          <ActionButton
            key={option.id}
            onClick={() => !disabled && onSelect(option.value)}
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
    const handleChipClick = (value: string) => {
      if (disabled) return;

      if (multiSelect) {
        const newSelected = selectedChips.includes(value)
          ? selectedChips.filter((v) => v !== value)
          : [...selectedChips, value];
        setSelectedChips(newSelected);
      } else {
        onSelect(value);
      }
    };

    const handleConfirm = () => {
      if (selectedChips.length > 0) {
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
    const handleDateConfirm = () => {
      if (dateRange.startDate && dateRange.endDate) {
        onSelect(`${dateRange.startDate} to ${dateRange.endDate}`);
      }
    };

    // 날짜 입력 클릭 핸들러 (모바일 호환성)
    const handleDateInputClick = (e: React.MouseEvent<HTMLInputElement>) => {
      const input = e.currentTarget as HTMLInputElement & { showPicker?: () => void };
      input.showPicker?.();
    };

    return (
      <DatePickerContainer>
        <DateInputGroup>
          <DateInputWrapper>
            <DateLabel>Arrival</DateLabel>
            <DateInput
              type="date"
              value={dateRange.startDate}
              onChange={(e) => setDateRange({ ...dateRange, startDate: e.target.value })}
              onClick={handleDateInputClick}
              min={new Date().toISOString().split('T')[0]}
              disabled={disabled}
              placeholder="Select date"
            />
          </DateInputWrapper>
          <DateSeparator>
            <Calendar size={20} />
          </DateSeparator>
          <DateInputWrapper>
            <DateLabel>Departure</DateLabel>
            <DateInput
              type="date"
              value={dateRange.endDate}
              onChange={(e) => setDateRange({ ...dateRange, endDate: e.target.value })}
              onClick={handleDateInputClick}
              min={dateRange.startDate || new Date().toISOString().split('T')[0]}
              disabled={disabled}
              placeholder="Select date"
            />
          </DateInputWrapper>
        </DateInputGroup>
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
          <SecondaryButton onClick={() => onSelect('edit')} disabled={disabled}>
            Edit Details
          </SecondaryButton>
          <PrimaryButton onClick={() => onSelect('confirm')} disabled={disabled}>
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
  max-width: 420px;
  position: relative;
  z-index: 100;
  background: white;
  padding: 16px;
  border: 1px solid #e5e5e5;
  border-radius: 12px;
`;

const DateInputGroup = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 12px;
`;

const DateInputWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 6px;
  min-width: 140px;
`;

const DateLabel = styled.span`
  font-size: 12px;
  color: #666;
`;

const DateInput = styled.input`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #e5e5e5;
  border-radius: 8px;
  font-size: 16px; /* 모바일에서 자동 확대 방지 */
  background: white;
  cursor: pointer;
  min-height: 48px;
  color: #333;

  /* 모바일/크로스 브라우저 호환성 */
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  pointer-events: auto;
  touch-action: manipulation;
  position: relative;
  z-index: 10;

  /* Date input 스타일링 */
  &::-webkit-calendar-picker-indicator {
    cursor: pointer;
    padding: 8px;
    margin-left: 4px;
    opacity: 1;
    background-color: transparent;
    position: absolute;
    right: 8px;
    top: 50%;
    transform: translateY(-50%);
    width: 24px;
    height: 24px;
  }

  &::-webkit-date-and-time-value {
    text-align: left;
  }

  /* iOS Safari 날짜 입력 수정 */
  &::-webkit-datetime-edit {
    padding: 0;
  }

  &::-webkit-datetime-edit-fields-wrapper {
    padding: 0;
  }

  &:focus {
    outline: none;
    border-color: var(--color-tumakr-maroon);
    box-shadow: 0 0 0 3px rgba(101, 29, 42, 0.1);
  }

  &:hover:not(:disabled) {
    border-color: var(--color-tumakr-maroon);
    background: #fafafa;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    background: #f5f5f5;
    pointer-events: none;
  }
`;

const DateSeparator = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: 12px;
  color: #999;
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
