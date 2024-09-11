
<h1><img src ="https://github.com/user-attachments/assets/1afaae47-58bb-48c2-8323-13c0c4d5ed3f" width="40" /> 영상 링크 기반 플레이리스트 공유 플렛폼</h1>

<p>
  <img src ="https://github.com/user-attachments/assets/0e5030f1-1a7a-4617-ae32-6e48e0f09b1f" />
</p>

## 1. 프로젝트 소개

플리(PLY)는 유튜브 영상링크 기반으로한 플레이 리스트를 생성 및 공유하고 탐색할 수 있는 SNS 서비스 입니다.

<br>

## 2. 팀원 소개

<div align="center">

|                                                             **김수민**                                                             |                                                                  **손성오**                                                                   |                                                                 **김도형**                                                                 |                                                              **김동영(⭐️팀장)**                                                              |                                                               **배하은**                                                               |
| :--------------------------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------------------------------------: |
| [<img src="https://avatars.githubusercontent.com/u/169154369?v=4" height=150 width=150> <br/> @ssumanlife](https://github.com/ssumanlife) | [<img src="https://avatars.githubusercontent.com/u/131119152?v=4" height=150 width=150> <br/> @Sonseongoh](https://github.com/Sonseongoh) | [<img src="https://avatars.githubusercontent.com/u/143858798?v=4" height=150 width=150> <br/> @dhkim511](https://github.com/dhkim511) | [<img src="https://avatars.githubusercontent.com/u/147500032?v=4" height=150 width=150> <br/> @love1ace](https://github.com/love1ace) | [<img src="https://avatars.githubusercontent.com/u/110523397?v=4" height=150 width=150> <br/> @haruyam15](https://github.com/haruyam15) |

</div>

<br>

## 3. 프로젝트 기간

### 📅 전체 개발 기간(3주)

- 설계 및 디자인, 프로젝트 세팅 : 2024. 08. 19. ~ 2024. 08. 25.
- 공통 컴포넌트 구현 및 화면 퍼블리싱 : 2024. 08. 26. ~ 2024. 08. 29.
- 기능 구현 : 2024. 08. 30. ~ 2024. 09. 08.
- 프로젝트 발표 : 2024.09. 09.

<br>

## 4. 기술 스택 및 개발환경

| 기술 스택                                                                                                                  | 도입 이유                                                                                           |
| -------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)              | 컴포넌트 기반 개발로 코드 재사용성 증가, 생태계가 커서 다양한 라이브러리 사용 가능 |
| ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)   | 정적 타입 체크로 코드 안정성 향상, 개발 중 오류 사전 예방 가능 |
| ![Zustand](https://img.shields.io/badge/zustand-2759C6.svg?style=for-the-badge&logo=zustand&logoColor=white)               | 간단하고 직관적인 API를 제공(사용하기 쉬움) => 코드의 가독성을 높여 유지보수가 용이                       |
| ![TanStack Query](https://img.shields.io/badge/tanstack--query-FF4154?style=for-the-badge&logo=reactquery&logoColor=white) | 데이터를 캐싱하여 효율적으로 네트워크 요청가능. 다양한 상태관리 기능을 사용할 수 있어서 상태관리의 복잡성을 줄임.     |
| ![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)                     | 빠른 개발 서버 시작 및 빌드 시간 제공 가능                                                          |
| ![MongoDB](https://img.shields.io/badge/-MongoDB-4DB33D?style=for-the-badge&logo=mongodb&logoColor=FFFFFF)                 | NoSQL DB라서 코드 작성이 쉽고, 데이터 구조 변경에 유연함                                                      |
| ![Emotion](https://img.shields.io/badge/emotion-%23FF69B4.svg?style=for-the-badge&logo=emotion&logoColor=white)            | CSS-in-JS 라이브러리로, 컴포넌트와 스타일을 함께 관리할 수 있어 코드 일관성을 유지하고, 동적 스타일링을 쉽게 구현 가능           |

<br>

## 5. 역할 분담

### 👤 김수민

- 서버 & DB
  - 서버 셋팅
  - 데이터 요청 API 개발
  - MongoDB 연동
  - ERD
- UI 및 기능구현
  - 로그인 & 회원가입
  - 플레이리스트 추가페이지 & 수정
- 테스트코드
  - 로그인 & 회원가입 테스트코드 작성   

### 👤 손성오

- 프로젝트 기초 셋팅
  - GitHub, 린트, 프리티어 셋팅
- 디자인
  - 전체 UI 디자인 
- UI 및 기능구현
  - 메인페이지
  - 좋아요페이지
  - 플레이리스트페이지
  - 타임라인페이지
  - 무한스크롤 & 스켈레톤 기능 구현
  

### 👤 김도형

- 서버
  - 데이터 요청 API 개발
- 디자인
  - 전체 UI 디자인 
- UI 및 기능구현
  - 프로필 페이지 & 프로필 수정기능
  - 팔로워, 팔로잉 페이지
  - 검색 페이지
  - 404 페이지

### 👤 김동영

- 디자인
  - 전체 UI 디자인 
- 공통 컴포넌트
  - Confirm 
- 그 외
  - UI 디자인

### 👤 배하은

- 공통 컴포넌트
  - 라웃팅, 레이아웃(헤더, 네비) 
- 디자인
  - 플레이리스트 추가 페이지 
- UI 및 기능구현
  - 영상 플레이 페이지

<br>

## 6. 데이터베이스 구조

<img width="1262" alt="image" src="https://github.com/user-attachments/assets/f4dca8dd-accf-4d37-8685-c1fa86b8f14c">


<br>

## 7. 설치 및 실행

```
npm install
```

### 클라이언트 & 서버 실행

```
npm run dev
npm run server
```

<br>

## 8. PLY 미리보기

| 홈                                                                                                   |
| --------------------------------------------------------------------------------------------------------------- |
| <img src ="https://github.com/user-attachments/assets/0e5030f1-1a7a-4617-ae32-6e48e0f09b1f" />|


| 회원가입                                                                                                   | 로그인                                                                                                     |
| --------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| <img width="523" alt="image" src="https://github.com/user-attachments/assets/acb63156-43b1-4e72-9e19-d5613a579827"> | <img width="511" alt="image" src="https://github.com/user-attachments/assets/e0a403bb-fa42-4059-9dd1-555340da275c">



| 마이페이지                                                                                                   | 프로필 수정 |
| --------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------|
| <img width="1908" alt="image" src="https://github.com/user-attachments/assets/b7f960f3-8053-40c3-8e61-1c17a3eb6ef1">|<img width="510" alt="image" src="https://github.com/user-attachments/assets/b117f2d7-e43a-4bd2-99f9-ae1c758ce2ee">|



| 팔로워 & 팔로잉 페이지                                                                                                |
| --------------------------------------------------------------------------------------------------------------- |
| <img width="1892" alt="image" src="https://github.com/user-attachments/assets/7b414e9b-82b0-45ec-b37a-9635aa0e3968"> |

| 영상 플레이 페이지                                                                                                |
| --------------------------------------------------------------------------------------------------------------- |
| <img width="1886" alt="image" src="https://github.com/user-attachments/assets/9b3a4a00-fbe1-4c25-a100-9a2586a180c0"> |



| 플레이리스트 페이지                                                                                                  | 플레이리스트 추가 페이지 |
| --------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------|
| <img width="1913" alt="image" src="https://github.com/user-attachments/assets/37ee34e1-e146-472c-ae6b-7b7d9d8e4a13"> |<img width="1892" alt="image" src="https://github.com/user-attachments/assets/fd4baee9-9895-41c0-90df-9202c8db178b">|


| 타임라인 페이지                                                                                                  | 좋아요 페이지 |
| --------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------|
| <img width="1889" alt="image" src="https://github.com/user-attachments/assets/f87ead9b-9c1e-4e82-a6f7-1eed47603078"> |<img width="1906" alt="image" src="https://github.com/user-attachments/assets/83fdf6c1-9ece-4929-aae2-44857c45f8cf">|


| 검색 페이지                                                                                                   |
| --------------------------------------------------------------------------------------------------------------- |
| <img width="1888" alt="image" src="https://github.com/user-attachments/assets/c93df74b-12a5-4387-856f-2dad738d9a60"> |

