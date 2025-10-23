import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { PATHS } from "@shared/path";
import { getPackageList, PackageItem } from "@shared/apis/package";
import * as S from "./styled";

const PackagesContainer: React.FC = () => {
  const router = useRouter();
  const [packages, setPackages] = useState<PackageItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState("");
  const [type, setType] = useState("");
  const countPerPage = 12;

  useEffect(() => {
    fetchPackages();
  }, [page, type]);

  const fetchPackages = async () => {
    try {
      setLoading(true);
      const params = {
        keyword: keyword || undefined,
        type: type || undefined,
        page,
        countPerPage,
      };
      const [items, totalCount] = await getPackageList(params);
      setPackages(items);
      setTotal(totalCount);
    } catch (error) {
      console.error("Failed to fetch packages:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    setPage(1);
    fetchPackages();
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handlePackageClick = (id: number) => {
    router.push(`/packages/${id}`);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("ko-KR").format(price);
  };

  const totalPages = Math.ceil(total / countPerPage);

  const getTypeEmoji = (type: string) => {
    switch (type) {
      case "숙소":
        return "🏨";
      case "여행지":
        return "🗺️";
      case "식당":
        return "🍽️";
      case "교통":
        return "🚗";
      default:
        return "📍";
    }
  };

  return (
    <S.Container>
      <S.Header>
        <S.Logo onClick={() => router.push(PATHS.HOME)}>✈️ DIY Travel</S.Logo>
        <S.Nav>
          <S.NavButton onClick={() => router.push(PATHS.HOME)}>
            홈으로
          </S.NavButton>
        </S.Nav>
      </S.Header>

      <S.Content>
        <S.PageTitle>여행 상품 둘러보기</S.PageTitle>
        <S.PageDescription>
          다양한 여행 상품을 찾아보고, 나만의 여행을 계획하세요
        </S.PageDescription>

        <S.FilterSection>
          <S.FilterRow>
            <S.SearchInput
              type="text"
              placeholder="상품명, 지역 등을 검색하세요"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <S.Select value={type} onChange={(e) => setType(e.target.value)}>
              <option value="">전체 카테고리</option>
              <option value="숙소">숙소</option>
              <option value="여행지">여행지</option>
              <option value="식당">식당</option>
              <option value="교통">교통</option>
            </S.Select>
            <S.SearchButton onClick={handleSearch}>검색</S.SearchButton>
          </S.FilterRow>
        </S.FilterSection>

        {loading ? (
          <S.Loading>상품을 불러오는 중...</S.Loading>
        ) : packages.length > 0 ? (
          <>
            <S.PackagesGrid>
              {packages.map((pkg) => (
                <S.PackageCard
                  key={pkg.id}
                  onClick={() => handlePackageClick(pkg.id)}
                >
                  <S.PackageImage imageUrl={pkg.imageUrl}>
                    {!pkg.imageUrl && getTypeEmoji(pkg.type)}
                  </S.PackageImage>
                  <S.PackageInfo>
                    <S.PackageType>{pkg.type}</S.PackageType>
                    <S.PackageName>{pkg.name}</S.PackageName>
                    <S.PackageAddress>
                      📍 {pkg.address || "주소 정보 없음"}
                    </S.PackageAddress>
                    <S.PackageDescription>
                      {pkg.description || "상세 설명이 없습니다."}
                    </S.PackageDescription>
                    <S.PackagePrice>₩{formatPrice(pkg.price)}</S.PackagePrice>
                  </S.PackageInfo>
                </S.PackageCard>
              ))}
            </S.PackagesGrid>

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
                    return <span key={pageNum}>...</span>;
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
            <S.EmptyIcon>🔍</S.EmptyIcon>
            <S.EmptyText>검색 결과가 없습니다.</S.EmptyText>
          </S.EmptyState>
        )}
      </S.Content>
    </S.Container>
  );
};

export default PackagesContainer;
