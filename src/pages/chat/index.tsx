import Container from '@containers/chat/Container';
import React, { FC } from 'react';
import Head from 'next/head';

const Chat: FC = () => {
  return (
    <>
      <Head>
        <title>AI 여행 플래너 - 원데이코리아</title>
        <meta name="description" content="AI와 채팅하며 맞춤 여행 견적을 받아보세요" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      </Head>
      <Container />
    </>
  );
};

export default Chat;
