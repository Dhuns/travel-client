import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { PATHS } from "@shared/path";
import { useAuthStore } from "@shared/store/authStore";
import {
  getMyEstimates,
  deleteEstimate,
  EstimateListItem,
} from "@shared/apis/estimate";
import * as S from "./styled";

const MyEstimatesContainer: React.FC = () => {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const [estimates, setEstimates] = useState<EstimateListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const countPerPage = 9;

  useEffect(() => {
    if (!isAuthenticated) {
      router.push(PATHS.LOGIN);
      return;
    }
    fetchEstimates();
  }, [page, isAuthenticated]);

  const fetchEstimates = async () => {
    try {
      setLoading(true);
      const [items, totalCount] = await getMyEstimates({ page, countPerPage });
      setEstimates(items);
      setTotal(totalCount);
    } catch (error) {
      console.error("Failed to fetch estimates:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEstimateClick = (estimate: EstimateListItem) => {
    if (estimate.hash) {
      router.push(`/quotation/${estimate.hash}`);
    } else {
      alert("견적서 해시 정보가 없습니다.");
    }
  };

  const handleDelete = async (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    if (!confirm("정말 이 견적서를 삭제하시겠습니까?")) {
      return;
    }

    try {
      await deleteEstimate(id);
      alert("견적서가 삭제되었습니다.");
      fetchEstimates();
    } catch (error) {
      console.error("Failed to delete estimate:", error);
      alert("견적서 삭제에 실패했습니다.");
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("ko-KR").format(price);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const totalPages = Math.ceil(total / countPerPage);

  return (
    <S.Container>
      <S.Header>
        <S.Logo onClick={() => router.push(PATHS.HOME)}>✈️ DIY Travel</S.Logo>
        <S.Nav>
          <S.NavButton onClick={() => router.push(PATHS.REQUEST_ESTIMATE)}>
            새 견적 요청
          </S.NavButton>
          <S.NavButton onClick={() => router.push(PATHS.HOME)}>
            홈으로
          </S.NavButton>
        </S.Nav>
      </S.Header>

      <S.Content>
        <S.PageTitle>내 견적서 목록</S.PageTitle>
        <S.PageDescription>
          요청하신 견적서 목록을 확인하고 관리하세요
        </S.PageDescription>

        {loading ? (
          <S.Loading>견적서를 불러오는 중...</S.Loading>
        ) : estimates.length > 0 ? (
          <>
            <S.EstimatesGrid>
              {estimates.map((estimate) => (
                <S.EstimateCard
                  key={estimate.id}
                  onClick={() => handleEstimateClick(estimate)}
                >
                  <S.EstimateHeader>
                    <S.EstimateTitle>{estimate.title}</S.EstimateTitle>
                    <S.StatusBadge status={estimate.status}>
                      {estimate.status}
                    </S.StatusBadge>
                  </S.EstimateHeader>

                  <S.EstimateDescription>
                    {estimate.description || "설명이 없습니다."}
                  </S.EstimateDescription>

                  <S.EstimateInfo>
                    <S.InfoRow>
                      <S.InfoLabel>생성일</S.InfoLabel>
                      <S.InfoValue>
                        {formatDate(estimate.createdAt)}
                      </S.InfoValue>
                    </S.InfoRow>
                    <S.InfoRow>
                      <S.InfoLabel>최종 수정</S.InfoLabel>
                      <S.InfoValue>
                        {formatDate(estimate.updatedAt)}
                      </S.InfoValue>
                    </S.InfoRow>
                    <S.InfoRow>
                      <S.InfoLabel>총 예상 금액</S.InfoLabel>
                      <S.Price>₩{formatPrice(estimate.totalPrice)}</S.Price>
                    </S.InfoRow>
                  </S.EstimateInfo>

                  <S.EstimateActions>
                    <S.ActionButton
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEstimateClick(estimate);
                      }}
                    >
                      상세보기
                    </S.ActionButton>
                    <S.ActionButton
                      variant="danger"
                      onClick={(e) => handleDelete(e, estimate.id)}
                    >
                      삭제
                    </S.ActionButton>
                  </S.EstimateActions>
                </S.EstimateCard>
              ))}
            </S.EstimatesGrid>

            {totalPages > 1 && (
              <S.Pagination>
                <S.PageButton
                  onClick={() => setPage(Math.max(1, page - 1))}
                  disabled={page === 1}
                >
                  이전
                </S.PageButton>
                {[...Array(totalPages)].map((_, i) => {
                  const pageNum = i + 1;
                  if (
                    pageNum === 1 ||
                    pageNum === totalPages ||
                    (pageNum >= page - 2 && pageNum <= page + 2)
                  ) {
                    return (
                      <S.PageButton
                        key={pageNum}
                        active={page === pageNum}
                        onClick={() => setPage(pageNum)}
                      >
                        {pageNum}
                      </S.PageButton>
                    );
                  } else if (pageNum === page - 3 || pageNum === page + 3) {
                    return <span key={pageNum} style={{ color: "white" }}>...</span>;
                  }
                  return null;
                })}
                <S.PageButton
                  onClick={() => setPage(Math.min(totalPages, page + 1))}
                  disabled={page === totalPages}
                >
                  다음
                </S.PageButton>
              </S.Pagination>
            )}
          </>
        ) : (
          <S.EmptyState>
            <S.EmptyIcon>📋</S.EmptyIcon>
            <S.EmptyText>아직 생성된 견적서가 없습니다.</S.EmptyText>
            <S.CreateButton onClick={() => router.push(PATHS.REQUEST_ESTIMATE)}>
              첫 견적서 만들기 →
            </S.CreateButton>
          </S.EmptyState>
        )}
      </S.Content>
    </S.Container>
  );
};

export default MyEstimatesContainer;
