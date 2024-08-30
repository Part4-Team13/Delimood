# DELIMOOD
![DELIMOOD (9)](https://github.com/user-attachments/assets/b8a5e86b-83c1-4734-ad3a-26a192a7a37c)

- 🚀배포사이트 : <a href="https://delimood.vercel.app/" target="_blank">DELIMOOD</a>
- 🎥시연영상 : <a href="https://youtu.be/CLEOaZEheOg" target="_blank">DELIMOOD 시연영상</a>

## 🗣 프로젝트 소개
DELIMOOD는 나의 감정을 기록하고 글귀를 공유함으로써 위로를 받을 수 있는 서비스입니다. <br>
오늘의 하루를 기록해보는건 어떨까요? <br>
오늘의 감정을 다른 사람들과 공유해보세요.
  
## ⌛ 개발 기간
프로젝트 기간 : 2024.07.25 ~ 2024.08.29 <p>

# 1. 개발자 소개 :technologist: 및 맡은 작업

| <img src="https://avatars.githubusercontent.com/u/115947715?v=4" width="150" height="150"> | <img src="https://avatars.githubusercontent.com/u/157233323?v=4"  width="150" height="150"> | <img src="https://avatars.githubusercontent.com/u/62880788?v=4"  width="150" height="150"> |
| :---------------------------------------------------------------: | :---------------------------------------------------------------: | :--------------------------------------------------------------: | 
|           [FE_6기 오채연](https://github.com/oh-chaeyeon)         |        [FE_6기 최소영](https://github.com/Soyeong0926)      |           [FE_6기 최수형](https://github.com/User850413)       |      

### [맡은 작업]
### 오채연
- 로그인,회원가입,유저정보API,Schema,Query
- 로그인/회원가입페이지
- 메인페이지
- 마이페이지
- 검색페이지
- 404페이지

### 최소영
- 프로젝트 팀장
- 해시태그,모달,페이지하단fixed버튼
- 에피그램API,Schema,Query
- 에피그램작성페이지
- 에피그램수정페이지

### 최수형
- tailwind기초세팅
- 헤더,에피그램카드,에피그램리스트,댓글리스트,감정리스트
- 에피그램상세페이지
- 에피그램피드페이지
- 랜딩페이지애니메이션
- 시연영상 제작


<br>

-------------------------------------------------------------------------------------
# 2.  기술 및 개발 환경 🛠️
#### [기술 스택]
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![React Query](https://img.shields.io/badge/TanStack%20Query-FF4154?style=for-the-badge&logo=react&logoColor=white) 

#### [기술 도구]
![NPM](https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white)
![Figma](https://img.shields.io/badge/figma-%23F24E1E.svg?style=for-the-badge&logo=figma&logoColor=white)
![Jira](https://img.shields.io/badge/jira-%230A0FFF.svg?style=for-the-badge&logo=jira&logoColor=white)
![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white)

#### [협력 도구]
![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)
![Notion](https://img.shields.io/badge/Notion-%23000000.svg?style=for-the-badge&logo=notion&logoColor=white)
![Discord](https://img.shields.io/badge/Discord-%235865F2.svg?style=for-the-badge&logo=discord&logoColor=white)

#### 라이브러리 정리
| 라이브러리              | 사용이유                                          |
| ------------------------| -------------------------------------------------|
| TanStack Query          | 서버 상태를 효율적으로 관리하여 데이터 페칭과 캐싱 최적화에 사용                  |
| Axios                   | API 호출을 간소화하고, 인스턴스를 활용하여 일관된 HTTP 요청 관리에 사용                     |
| React-Router-Dom        | 애플리케이션 내 라우팅을 구현하여 페이지 전환을 관리하는 데 사용                   |
| React-hook-form         | 폼 상태 관리와 유효성 검사를 간편하게 처리하는 데 사용          |
| Zod                     | 데이터 구조와 입력값의 타입 검증을 강화하는 데 사용                |
| Mantine UI               | 미리 정의된 컴포넌트를 활용하여 UI를 빠르고 일관되게 구현하는 데 사용                   |


#### [폴더구조]
```
📁Delimood
├─ .gitignore
├─ .husky
├─ .prettierrc.cjs
├─ 📄 global.css
├─ 📄 index.html
├─ src
│  ├─ 📄 App.tsx
│  ├─ 📄 index.css
│  ├─ 📄 main.tsx
│  ├─ 📁 apis
│  ├─ 📁 assets
│  ├─ 📁 components
│  ├─ 📁 constants
│  ├─ 📁 context
│  ├─ 📁 hooks
│  ├─ 📁 layout
│  ├─ 📁 pages
│  ├─ 📁 schema
│  ├─ 📁 types
│  └─ 📁 utils
├─ 📄 tailwind.config.js
├─ 📄 vercel.json
└─ 📄 vite.config.ts
```



#### [배포]
![Vercel](https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white)


-------------------------------------------------------------------------------------
# 3. 프로젝트 관리 👥
### 1️⃣ jira Project
백로그에 적어놓은 작업들을 이슈로 옮기면서 브랜치 생성하고 개발시작하는 순서로 진행했습니다. 
<img width="956" alt="image" src="https://github.com/user-attachments/assets/a34b1d5b-3c4d-4967-a412-efd4515b01f1">

### 2️⃣ Github 
Github에서 새브랜치 생성시 merge브랜치 생성해서 최신화 후 작업 진행해서 코드리뷰시 각자의 작업코드만 확인할수 있게 진행하고, </br>
Gitmoji와 PR 및 commit 양식을 사용해서 깔끔하고 알아보기 쉽게 규칙을 정해서 진행했습니다.

<img width="400" alt="image" src="https://github.com/user-attachments/assets/253fa6aa-93ee-4d88-b5c0-b75ee2465fdb">
<img width="400" alt="image" src="https://github.com/user-attachments/assets/e219dbac-f649-4858-bd2d-91b1cfcabe5e">


### 3️⃣ 프로젝트 GIT전략
기능 구현 : epic티켓 생성 → 하위 브랜치 feat생성 후 작업 → epic에 merge → 해당 epic에 관한 모든 작업 완료시 → main에 merge  </br>
오류 수정 및 리펙토링 : 해당 티켓 생성 -> main에 merge
 
-------------------------------------------------------------------------------------
# 4. 주요기능 💛
#### 자체 웹사이트 로그인/회원가입 기능 & 소셜로그인 기능
<img width="450" alt="image" src="https://github.com/user-attachments/assets/070958c3-37be-4897-92f1-5be7a6df4844">
<img width="450" alt="image" src="https://github.com/user-attachments/assets/4189aa5a-0189-4683-b86a-efa1889344a7">


#### 다른 사람들과 공유가능한 글귀 작성기능 및 수정, 삭제 기능
<img width="450" alt="image" src="https://github.com/user-attachments/assets/3bd12eab-c339-4e02-97b8-8278f7c454ae">
<img width="450" alt="image" src="https://github.com/user-attachments/assets/5d2fc5bb-9a2b-43a3-8828-61ee4ebf48b7">


#### 글귀에 댓글 달기
<img width="450" alt="image" src="https://github.com/user-attachments/assets/cff2fdba-3e70-409f-9461-f6935d3f21de">



#### 매일 나의 감정상태를 기록할수 있는 기능
<img width="450" alt="image" src="https://github.com/user-attachments/assets/9aa212d3-74d1-4bb3-ab6c-bb5254ccd340">
<img width="450" alt="image" src="https://github.com/user-attachments/assets/44bed31f-4175-47ba-b64f-fdd62abc2b90">



#### 한달간의 나의 감정상태를 달력과 차트로 확인가능 기능
<img width="450" alt="image" src="https://github.com/user-attachments/assets/fc75b19e-0ffa-4cc5-a663-2162cf6b9684">
<img width="450" alt="image" src="https://github.com/user-attachments/assets/c26cb10e-20f8-41e3-9d70-7d9a9aae7f18">



-------------------------------------------------------------------------------------
# 5. 데이터 관리 💻
zod 라이브러리를 사용해 schema를 작성(데이터 구조와 형식 정의) <br>
API를 작성해 서버에 요청후 서버가 Schema에 맞는 데이터를 클라이언트에 반환 <br>
useQueryhook을 사용해 React컴포넌트에서 API호출을 간편하게 수행 <br>

# 6. 페이지 최적화 💻
suspense와 lazy, ErrorBoundary를 사용해 로딩 상태 관리와 에러 처리 등 최적화 작업을 진행.





