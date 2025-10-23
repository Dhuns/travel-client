import React, { useState } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { signIn, SignInPayload, getUserMe } from "@shared/apis/user";
import { PATHS } from "@shared/path";
import { setCookie, COOKIE_KEYS } from "@shared/utils/cookie";
import { useAuthStore } from "@shared/store/authStore";
import * as S from "./styled";
import { signIn as oauthSignIn } from "next-auth/react";

interface LoginFormData {
  username: string;
  password: string;
}

const LoginContainer: React.FC = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const setUser = useAuthStore((state) => state.setUser);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  // 일반 로그인
  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      const response = await signIn({
        username: data.username,
        password: data.password,
      });

      // 토큰 저장
      setCookie(COOKIE_KEYS.ACCESS_TOKEN, response.accessToken, {
        maxAge: response.accessTokenExpiresIn,
      });
      setCookie(COOKIE_KEYS.REFRESH_TOKEN, response.refreshToken, {
        maxAge: response.refreshTokenExpiresIn,
      });

      // 홈으로 리다이렉트 (홈에서 getUserMe 호출하여 사용자 정보 로드)
      router.push(PATHS.HOME);
    } catch (error: any) {
      setErrorMessage(
        error?.response?.data?.message || "로그인에 실패했습니다."
      );
    } finally {
      setIsLoading(false);
    }
  };

  // OAuth 로그인
  const handleGoogleSignIn = () => {
    oauthSignIn("google", { callbackUrl: PATHS.HOME });
  };

  const handleAppleSignIn = () => {
    oauthSignIn("apple", { callbackUrl: PATHS.HOME });
  };

  return (
    <S.Container>
      <S.FormWrapper>
        <S.Title>로그인</S.Title>
        <S.Subtitle>AI 견적서 자동 생성 서비스</S.Subtitle>

        <S.Form onSubmit={handleSubmit(onSubmit)}>
          {/* 아이디 */}
          <S.FormGroup>
            <S.Label>아이디 (이메일)</S.Label>
            <S.Input
              type="text"
              placeholder="example@email.com"
              {...register("username", {
                required: "아이디는 필수 입력값입니다.",
                minLength: {
                  value: 5,
                  message: "아이디는 최소 5자 이상이어야 합니다.",
                },
              })}
            />
            {errors.username && (
              <S.ErrorText>{errors.username.message}</S.ErrorText>
            )}
          </S.FormGroup>

          {/* 비밀번호 */}
          <S.FormGroup>
            <S.Label>비밀번호</S.Label>
            <S.Input
              type="password"
              placeholder="비밀번호"
              {...register("password", {
                required: "비밀번호는 필수 입력값입니다.",
              })}
            />
            {errors.password && (
              <S.ErrorText>{errors.password.message}</S.ErrorText>
            )}
          </S.FormGroup>

          {/* 에러 메시지 */}
          {errorMessage && <S.ErrorText>{errorMessage}</S.ErrorText>}

          {/* 로그인 버튼 */}
          <S.SubmitButton type="submit" disabled={isLoading}>
            {isLoading ? "로그인 중..." : "로그인"}
          </S.SubmitButton>
        </S.Form>

        {/* 구분선 */}
        <S.Divider>
          <span>또는</span>
        </S.Divider>

        {/* OAuth 버튼들 */}
        <S.OAuthButtons>
          <S.GoogleButton type="button" onClick={handleGoogleSignIn}>
            <S.OAuthIcon>G</S.OAuthIcon>
            Google로 계속하기
          </S.GoogleButton>

          <S.AppleButton type="button" onClick={handleAppleSignIn}>
            <S.OAuthIcon></S.OAuthIcon>
            Apple로 계속하기
          </S.AppleButton>
        </S.OAuthButtons>

        {/* 회원가입 링크 */}
        <S.LinkText>
          아직 계정이 없으신가요?{" "}
          <S.Link onClick={() => router.push(PATHS.SIGNUP)}>회원가입</S.Link>
        </S.LinkText>
      </S.FormWrapper>
    </S.Container>
  );
};

export default LoginContainer;
