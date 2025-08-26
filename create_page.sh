#!/bin/bash

# 사용자 입력 받기
read -p "path를 입력해주세요 : " path_name

# 입력값 검증
if [[ -z "$path_name" ]]; then
  echo "No input provided. Exiting script."
  exit 1
fi

# 프로젝트의 src/pages 경로로 이동
cd src/pages || { echo "src/pages 디렉토리로 이동할 수 없습니다."; exit 1; }

# 첫 글자 대문자로 변경
component_name="$(tr '[:lower:]' '[:upper:]' <<< ${path_name:0:1})${path_name:1}"

# 입력받은 폴더 이름으로 폴더 생성
mkdir "$path_name"

# 폴더 안에 입력받은 파일 이름으로 .tsx 파일 생성
cat <<EOF > "$path_name/index.tsx"
import React, { FC, useState, useEffect } from "react";

const ${component_name}: FC = () => {
  /**
   * States
   */

  /**
   * Queries
   */

  /**
   * Side-Effects
   */

  /**
   * Handlers
   */

  /**
   * Helpers
   */
  return <main></main>;
};

export default ${component_name};
EOF

# containers에도 같은 폴더 생성
cd ../containers || { echo "src/containers 디렉토리로 이동할 수 없습니다."; exit 1; }
mkdir "$path_name"

# 폴더 안에 container.tsx 파일 생성
cat <<EOF > "$path_name/${component_name}Container.tsx"
import React, { FC, useState, useEffect } from "react";
import * as S from "./styled";

const ${component_name}Container: FC = () => {
  /**
   * States
   */

  /**
   * Queries
   */

  /**
   * Side-Effects
   */

  /**
   * Handlers
   */

  /**
   * Helpers
   */
  return <div>Container</div>;
};

export default ${component_name}Container;
EOF

# 동일 폴더 안에 _styled.ts 파일 생성 및 styled-components 코드 작성
cat <<EOF > "$path_name/styled.ts"
import styled from "@emotion/styled";

export const ${component_name}ContainerMain = styled.div``;
EOF

echo "Folders created successfully in 'src/pages/$path_name' and 'src/containers/$path_name'."
