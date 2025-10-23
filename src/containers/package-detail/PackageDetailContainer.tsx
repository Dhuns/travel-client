import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { PATHS } from "@shared/path";
import { getPackageDetail, PackageItem } from "@shared/apis/package";
import * as S from "./styled";

const PackageDetailContainer: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [packageData, setPackageData] = useState<PackageItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      fetchPackageDetail();
    }
  }, [id]);

  const fetchPackageDetail = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getPackageDetail(Number(id));
      setPackageData(data);
    } catch (err) {
      console.error("Failed to fetch package detail:", err);
      setError("상품 정보를 불러올 수 없습니다.");
    } finally {
      setLoading(false);
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

  const handleRequestQuote = () => {
    router.push(PATHS.REQUEST_ESTIMATE);
  };

  const handleAddToCart = () => {
    // TODO: 장바구니 기능 구현
    alert("장바구니 기능은 곧 추가될 예정입니다.");
  };

  if (loading) {
    return (
      <S.Container>
        <S.Header>
          <S.Logo onClick={() => router.push(PATHS.HOME)}>
            ✈️ DIY Travel
          </S.Logo>
          <S.Nav>
            <S.NavButton onClick={() => router.push("/packages")}>
              목록으로
            </S.NavButton>
          </S.Nav>
        </S.Header>
        <S.Content>
          <S.Loading>상품 정보를 불러오는 중...</S.Loading>
        </S.Content>
      </S.Container>
    );
  }

  if (error || !packageData) {
    return (
      <S.Container>
        <S.Header>
          <S.Logo onClick={() => router.push(PATHS.HOME)}>
            ✈️ DIY Travel
          </S.Logo>
          <S.Nav>
            <S.NavButton onClick={() => router.push("/packages")}>
              목록으로
            </S.NavButton>
          </S.Nav>
        </S.Header>
        <S.Content>
          <S.Error>
            <S.ErrorIcon>❌</S.ErrorIcon>
            <S.ErrorText>{error || "상품을 찾을 수 없습니다."}</S.ErrorText>
            <S.NavButton onClick={() => router.push("/packages")}>
              목록으로 돌아가기
            </S.NavButton>
          </S.Error>
        </S.Content>
      </S.Container>
    );
  }

  return (
    <S.Container>
      <S.Header>
        <S.Logo onClick={() => router.push(PATHS.HOME)}>✈️ DIY Travel</S.Logo>
        <S.Nav>
          <S.NavButton onClick={() => router.push("/packages")}>
            목록으로
          </S.NavButton>
          <S.NavButton onClick={() => router.push(PATHS.HOME)}>
            홈으로
          </S.NavButton>
        </S.Nav>
      </S.Header>

      <S.Content>
        <S.BackButton onClick={() => router.back()}>
          ← 뒤로 가기
        </S.BackButton>

        <S.DetailCard>
          <S.ImageSection imageUrl={packageData.imageUrl}>
            {!packageData.imageUrl && getTypeEmoji(packageData.type)}
          </S.ImageSection>

          <S.InfoSection>
            <S.TopRow>
              <S.LeftColumn>
                <S.TypeBadge>{packageData.type}</S.TypeBadge>
                <S.Title>{packageData.name}</S.Title>
                <S.Address>
                  📍 {packageData.address || "주소 정보 없음"}
                </S.Address>
              </S.LeftColumn>

              <S.PriceCard>
                <S.PriceLabel>상품 가격</S.PriceLabel>
                <S.Price>
                  ₩{formatPrice(packageData.price)}
                  <S.PriceUnit>/인</S.PriceUnit>
                </S.Price>
              </S.PriceCard>
            </S.TopRow>

            <S.Description>
              {packageData.description || "상세 설명이 없습니다."}
            </S.Description>

            <S.InfoGrid>
              <S.InfoItem>
                <S.InfoLabel>카테고리</S.InfoLabel>
                <S.InfoValue>{packageData.type}</S.InfoValue>
              </S.InfoItem>
              <S.InfoItem>
                <S.InfoLabel>등록일</S.InfoLabel>
                <S.InfoValue>{formatDate(packageData.createdAt)}</S.InfoValue>
              </S.InfoItem>
              <S.InfoItem>
                <S.InfoLabel>최종 수정일</S.InfoLabel>
                <S.InfoValue>{formatDate(packageData.updatedAt)}</S.InfoValue>
              </S.InfoItem>
            </S.InfoGrid>

            {packageData.latitude && packageData.longitude && (
              <S.MapSection>
                <S.SectionTitle>위치 정보</S.SectionTitle>
                <S.MapContainer>
                  🗺️
                  <div style={{ fontSize: "1rem", marginLeft: "1rem" }}>
                    위도: {packageData.latitude.toFixed(6)}, 경도:{" "}
                    {packageData.longitude.toFixed(6)}
                  </div>
                </S.MapContainer>
              </S.MapSection>
            )}

            <S.ActionButtons>
              <S.PrimaryButton onClick={handleRequestQuote}>
                이 상품으로 견적 요청하기
              </S.PrimaryButton>
              <S.SecondaryButton onClick={handleAddToCart}>
                장바구니에 담기
              </S.SecondaryButton>
            </S.ActionButtons>
          </S.InfoSection>
        </S.DetailCard>
      </S.Content>
    </S.Container>
  );
};

export default PackageDetailContainer;
