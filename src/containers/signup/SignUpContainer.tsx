import React, { useState } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { signUp, validateUsername, SignUpPayload } from "@shared/apis/user";
import { PATHS } from "@shared/path";
import * as S from "./styled";
import { signIn } from "next-auth/react";

interface SignUpFormData {
  username: string;
  password: string;
  passwordConfirm: string;
  name: string;
}

const SignUpContainer: React.FC = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isUsernameChecked, setIsUsernameChecked] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setError,
  } = useForm<SignUpFormData>();

  const password = watch("password");
  const username = watch("username");

  // 아이디 중복 체크
  const handleCheckUsername = async () => {
    if (!username || username.length < 5) {
      setError("username", {
        type: "manual",
        message: "아이디는 최소 5자 이상이어야 합니다.",
      });
      return;
    }

    try {
      await validateUsername({ username });
      setIsUsernameChecked(true);
      alert("사용 가능한 아이디입니다.");
    } catch (error: any) {
      setIsUsernameChecked(false);
      setError("username", {
        type: "manual",
        message: error?.response?.data?.message || "이미 존재하는 아이디입니다.",
      });
    }
  };

  // 회원가입 제출
  const onSubmit = async (data: SignUpFormData) => {
    if (!isUsernameChecked) {
      setError("username", {
        type: "manual",
        message: "아이디 중복 체크를 해주세요.",
      });
      return;
    }

    setIsLoading(true);
    setErrorMessage("");

    try {
      const payload: SignUpPayload = {
        username: data.username,
        password: data.password,
        name: data.name,
      };

      await signUp(payload);
      alert("회원가입이 완료되었습니다!");
      router.push(PATHS.LOGIN);
    } catch (error: any) {
      setErrorMessage(
        error?.response?.data?.message || "회원가입에 실패했습니다."
      );
    } finally {
      setIsLoading(false);
    }
  };

  // OAuth 로그인
  const handleGoogleSignIn = () => {
    signIn("google", { callbackUrl: PATHS.HOME });
  };

  const handleAppleSignIn = () => {
    signIn("apple", { callbackUrl: PATHS.HOME });
  };

  return (
    <S.Container>
      <S.FormWrapper>
        <S.Title>회원가입</S.Title>

        <S.Form onSubmit={handleSubmit(onSubmit)}>
          {/* 이름 */}
          <S.FormGroup>
            <S.Label>이름</S.Label>
            <S.Input
              type="text"
              placeholder="이름을 입력하세요"
              {...register("name", {
                required: "이름은 필수 입력값입니다.",
              })}
            />
            {errors.name && <S.ErrorText>{errors.name.message}</S.ErrorText>}
          </S.FormGroup>

          {/* 아이디 (이메일) */}
          <S.FormGroup>
            <S.Label>아이디 (이메일)</S.Label>
            <S.InputGroup>
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
                onChange={() => setIsUsernameChecked(false)}
              />
              <S.CheckButton type="button" onClick={handleCheckUsername}>
                중복확인
              </S.CheckButton>
            </S.InputGroup>
            {errors.username && (
              <S.ErrorText>{errors.username.message}</S.ErrorText>
            )}
            {isUsernameChecked && (
              <S.SuccessText>사용 가능한 아이디입니다.</S.SuccessText>
            )}
          </S.FormGroup>

          {/* 비밀번호 */}
          <S.FormGroup>
            <S.Label>비밀번호</S.Label>
            <S.Input
              type="password"
              placeholder="비밀번호 (최소 6자)"
              {...register("password", {
                required: "비밀번호는 필수 입력값입니다.",
                minLength: {
                  value: 6,
                  message: "비밀번호는 최소 6자 이상이어야 합니다.",
                },
              })}
            />
            {errors.password && (
              <S.ErrorText>{errors.password.message}</S.ErrorText>
            )}
          </S.FormGroup>

          {/* 비밀번호 확인 */}
          <S.FormGroup>
            <S.Label>비밀번호 확인</S.Label>
            <S.Input
              type="password"
              placeholder="비밀번호 확인"
              {...register("passwordConfirm", {
                required: "비밀번호 확인은 필수 입력값입니다.",
                validate: (value) =>
                  value === password || "비밀번호가 일치하지 않습니다.",
              })}
            />
            {errors.passwordConfirm && (
              <S.ErrorText>{errors.passwordConfirm.message}</S.ErrorText>
            )}
          </S.FormGroup>

          {/* 에러 메시지 */}
          {errorMessage && <S.ErrorText>{errorMessage}</S.ErrorText>}

          {/* 회원가입 버튼 */}
          <S.SubmitButton type="submit" disabled={isLoading}>
            {isLoading ? "처리 중..." : "회원가입"}
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

        {/* 로그인 링크 */}
        <S.LinkText>
          이미 계정이 있으신가요?{" "}
          <S.Link onClick={() => router.push(PATHS.LOGIN)}>로그인</S.Link>
        </S.LinkText>
      </S.FormWrapper>
    </S.Container>
  );
};

export default SignUpContainer;
