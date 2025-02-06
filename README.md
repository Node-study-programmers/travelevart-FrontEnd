<div>

<h1>Travelevart 🚃</h1>

![화이트 오렌지 깔끔한 온라인 포트폴리오](/Users/tngur0716/Downloads/화이트 오렌지 깔끔한 온라인 포트폴리오.png)

<h3> 나만의 여행 계획 작성 서비스 </h3>

<br />



</br>

[✨ Travelevart URL] (https://travelevart.com/)



> 테스트 계정

id : test@naver.com

pw : qweqwe

</div>

<br />


# 프로젝트 제목: Travelevart

## 목차  

### 1. 프로젝트 소개  
- [Travelevart를 만들게 된 계기](#travelevart를-만들게-된-계기)  
- [주요 기능 설명](#주요-기능-설명)  
- [프로젝트 실행 방법](#프로젝트-실행-방법)  

### 2. 기술 스택  

### 3. 기술적 경험 & 트러블 슈팅  
- [Frontend](#frontend)  
- [Backend](#backend)  

### 4. 주요 기능 설명  
- [AI 기반 여행지 추천 서비스](#ai-기반-여행지-추천-서비스)  
- [여행지 검색](#여행지-검색)  
- [여행지 리뷰, 찜하기](#여행지-리뷰-찜하기)  
- [여행지 공유 및 QnA 커뮤니티](#여행지-공유-및-qna-커뮤니티)  
- [나만의 여행 일정 만들기](#나만의-여행일정-만들기)  
- [여행 일정 수정, 공유 및 저장](#여행-일정-수정-공유-및-저장)  

### 5. 팀원 소개  


# ⭐️ 프로젝트 소개

## < Travelevart >를 만들게 된 계기

여행 갈때 목표 금액에 맞춰 계획 짜기 귀찮고 시간이 드는데 지역과 목표 금액을 설정하면 자동으로 여행지, 숙소,맛집, 교통을 추천해주는 서비스가 있으면 편하겠다 라는 생각에서 시작하게 되었습니다!

=> 유저들이 여행 계획을 빠르고 편하게 짤 수 있고 효율적인 여행을 다녀올 수 있을것 

<br />

## 사용한 API

![Screenshot 2025-02-06 at 2.53.04 PM](/Users/tngur0716/Library/Application Support/typora-user-images/Screenshot 2025-02-06 at 2.53.04 PM.png)

## 프로젝트 수행 절차 및 방법

![Screenshot 2025-02-06 at 2.54.01 PM](/Users/tngur0716/Library/Application Support/typora-user-images/Screenshot 2025-02-06 at 2.54.01 PM.png)



## 프로젝트 실행 방법

### Front-end

```bash
npm run dev
```

### Back-end

```bash
node app.js
```

<br />

# ⚒️ 기술 스택

## 인프라 아키텍쳐

![Screenshot 2025-02-06 at 2.39.32 PM](/Users/tngur0716/Library/Application Support/typora-user-images/Screenshot 2025-02-06 at 2.39.32 PM.png)

### Frontend

<div>
  <img src="https://img.shields.io/badge/Next.js-14.2.4-000000?logo=next.js">  
<img src="https://img.shields.io/badge/Typescript-5.0-3178C6?logo=typescript">  
<img src="https://img.shields.io/badge/Axios-1.7.2-5A29E4?logo=axios">  
<img src="https://img.shields.io/badge/NextAuth-4.24.7-34E27A?logo=auth0">  
<img src="https://img.shields.io/badge/Redux-5.0.1-764ABC?logo=redux">  
<img src="https://img.shields.io/badge/TanStack%20Query-5.51.1-FF4154?logo=react-query">  
  <img src="https://img.shields.io/badge/TailwindCSS-3.4.4-06B6D4?logo=tailwindcss">  
<img src="https://img.shields.io/badge/NextUI-2.1.6-005FCC?logo=next.js">  
<img src="https://img.shields.io/badge/Netlify-00C7B7?logo=netlify">  
</div>


### Backend

<div>
  <img src="https://img.shields.io/badge/NestJS--E0234E?logo=nestjs">  
<img src="https://img.shields.io/badge/Typescript-5.0-3178C6?logo=typescript">  
<img src="https://img.shields.io/badge/TypeORM--FF5733?logo=typeorm">  
<img src="https://img.shields.io/badge/OpenAI--412991?logo=openai">  


</div>


### Database & Cloud & DevOps

<div>
  <img src="https://img.shields.io/badge/Jenkins--D24939?logo=jenkins">  
<img src="https://img.shields.io/badge/Nginx--009639?logo=nginx">  
<img src="https://img.shields.io/badge/Docker--2496ED?logo=docker">  
<img src="https://img.shields.io/badge/AWS%20RDS--527FFF?logo=amazon-aws">  
<img src="https://img.shields.io/badge/AWS%20EC2--

</div><br>

<br>

# 💪🏻 기술적 경험 & 트러블 슈팅

## FE

<br />

### 1. **Next-Auth 이용한 로컬, 소셜로그인** 

- Next auth 를 통한 kakao , 소셜 로그인을 구현함

- refresh token, accesstoken을 사용해서 localstorage에 저장
  후에 백엔드 서버와 통신해서 자동으로 로그인을 유지 , 갱신할 수
  있도록 구현 함.

  <br />

### 2. tanstack-query 

- 데이터들이 캐싱되어서 다시 데이터를 가져오지 않고캐싱해서 가져오도록 구현해 최적화를 시킴

- tanstack-query의 useinfinityquery 와 IntersectionObserver를 통한 무한스크롤 구현으로 많은 데이터들을 한번에 가져오지 않고 IntersectionObserver 의 targetRef가 보일 때 새로운 데이터를 가져오는 식으로 최적화 함

  <br />

### 3. 대부분의 UI 직접구현

- Carousel UI, button, Dropdown, select UI, Tab UI 등등 대부분의 UI 들을 라이브러리 없이 직접 구현

- 반면 , 드래그 앤 드롭 같은 기능들은 react-beautiful-dnd 같은 UI 를 사용해서 더욱 부드러운 애니메이션을 제공해 사용자 경험을 향상 시킬 수 있도록 노력함

  <br />



### 4. next optimizing 

- next image, sizes props  등을 이용해서 불필요하게 큰 이미지를 로딩하는 것을 방지
- next/font 를 로컬 폰트로 다운 받아 사용 및 .woff 확장자를 사용해 폰트 파일을 줄이고 확장성을 높이기 위해 노력함

​	<br/>

### 5. SEO

![Screenshot 2025-02-06 at 3.32.26 PM](/Users/tngur0716/Library/Application Support/typora-user-images/Screenshot 2025-02-06 at 3.32.26 PM.png)

- SEO component를 만들어서 각 페이지마다 제목과 설명을 보여줌

- Google console 을 등록해서 검색시 많은 노출이 될 수 있도록 노력함

  <br />

### 6. Axios Interceptor 활용

https://github.com/Node-study-programmers/travelevart-FrontEnd/blob/1db67895ce55a3c9d4b95314259d5ec234767e6f/src/lib/api.ts#L10-L101

- Axios interceptor 를 활용해서 일관적인 api 요청을 처리하도록 함

​	<br/>

![Screenshot 2025-02-06 at 3.42.51 PM](/Users/tngur0716/Library/Application Support/typora-user-images/Screenshot 2025-02-06 at 3.42.51 PM.png)

<b>performance 부분에서 처음 약 60점 -> 약 90점 으로 향상시킬 수 있었다.</b>



<br/> 



![Screenshot 2025-02-06 at 3.34.23 PM](/Users/tngur0716/Library/Application Support/typora-user-images/Screenshot 2025-02-06 at 3.34.23 PM.png)



<br />









## BE

![Screenshot 2025-02-06 at 2.48.06 PM](/Users/tngur0716/Library/Application Support/typora-user-images/Screenshot 2025-02-06 at 2.48.06 PM.png)



![Screenshot 2025-02-06 at 2.47.08 PM](/Users/tngur0716/Library/Application Support/typora-user-images/Screenshot 2025-02-06 at 2.47.08 PM.png)



- AI응답속도180%개선(34s=>12s) 개선 [링크](https://nyh98.tistory.com/104)

- Nginx를 사용하여 로드밸런싱 및 무중단배포의 프로세스를 이해할수 있었음

<br />





## 주요 기능 설명

### [ AI 기반 여행지 추천 서비스 ]

![Screenshot 2025-02-06 at 2.55.37 PM](/Users/tngur0716/Library/Application Support/typora-user-images/Screenshot 2025-02-06 at 2.55.37 PM.png)

- 지역과 기간, 이동수단, 연령대 등을 선택해서 AI 에게 여행지 일정을 지도와 함께 추천받을 수 있습니다.

<br/>

### [ 여행지 검색 ]

![Screenshot 2025-02-06 at 2.59.58 PM](/Users/tngur0716/Library/Application Support/typora-user-images/Screenshot 2025-02-06 at 2.59.58 PM.png)

- Tour API 를 사용해 대한민국의 다양한 여행지들을 검색 할 수 있습니다.
- 지역을 골라 필터링해 특정 지역에 대한 관광지만을 볼 수 있습니다.

### [ 여행지 리뷰, 찜하기 ]

![Screenshot 2025-02-06 at 3.03.44 PM](/Users/tngur0716/Library/Application Support/typora-user-images/Screenshot 2025-02-06 at 3.03.44 PM.png)

![Screenshot 2025-02-06 at 3.04.15 PM](/Users/tngur0716/Library/Application Support/typora-user-images/Screenshot 2025-02-06 at 3.04.15 PM.png)

- 여행지 상세보기에서 여행지 찜하기 버튼을 눌러 마이페이지에 등록할 수 있습니다.
- 네이버 지도 API 를 통해 관광지의 상세 위치를 볼 수 있습니다.
- 리뷰와 평점을 여행지에 등록 및 조회 할 수 있습니다.

### [ 여행지 공유 및 QnA 커뮤니티 ]

![Screenshot 2025-02-06 at 3.07.42 PM](/Users/tngur0716/Library/Application Support/typora-user-images/Screenshot 2025-02-06 at 3.07.42 PM.png)

![Screenshot 2025-02-06 at 3.09.54 PM](/Users/tngur0716/Library/Application Support/typora-user-images/Screenshot 2025-02-06 at 3.09.54 PM.png)



- 유저간 자신의 여행을 공유하고 여행 관련 질문 답변을 주고 받을 수 있는 커뮤니티 기능입니다.
- 유저의 게시물에 댓글 및 좋아요를 남길 수 있습니다.
- 여행이 마음에 든다면 fork 버튼을 눌러서 해당 유저가 공유한 여행을 마이페이지에 담을 수 있습니다.

### [ 나만의 여행일정 만들기 ]

![Screenshot 2025-02-06 at 3.13.06 PM](/Users/tngur0716/Library/Application Support/typora-user-images/Screenshot 2025-02-06 at 3.13.06 PM.png)

- 나만의 여행을 기간, 이름과 함께 만들 수 있습니다
- 여행지를 우측에서 검색 해서 각 날짜에 담아 Drag and Drop 기능을 활용해서 쉽게 커스텀할 수 있습니다.

### [ 여행일정 수정,공유 및 저장 ]

![Screenshot 2025-02-06 at 3.15.12 PM](/Users/tngur0716/Library/Application Support/typora-user-images/Screenshot 2025-02-06 at 3.15.12 PM.png)

![Screenshot 2025-02-06 at 3.16.22 PM](/Users/tngur0716/Library/Application Support/typora-user-images/Screenshot 2025-02-06 at 3.16.22 PM.png)

- 내가 만든 여행 혹은 커뮤니티에서 가져온 다른 유저의 여행을 수정, 공유 및 저장을 할 수 있습니다.

- 여행을 pdf 로 저장해서 여행시에도 상시로 파일로 볼 수 있도록 제공했습니다.

<br />



# 🏃‍♂️ 팀원 소개

<table >
  <tr height="130px">
    <td align="center" width="130px">
      <a href="https://github.com/kwonsuhyuk"><img src="https://avatars.githubusercontent.com/u/101502480?s=96&v=4" style="border-radius:50%"/></a>
    </td>
    <td align="center" width="130px">
      <a href="https://github.com/nyh98"><img src="https://avatars.githubusercontent.com/u/148475712?v=4" style="border-radius:50%" /></a>
    </td>
    <td align="center" width="130px">
      <a href="https://github.com/chansik0504"><img src="https://avatars.githubusercontent.com/u/52341609?v=4" style="border-radius:50%"/></a>
    </td>
<td align="center" width="130px">
      <a href="https://github.com/jacknafa"><img src="https://avatars.githubusercontent.com/u/95523110?v=4" style="border-radius:50%"/></a>
    </td>
     </td>
<td align="center" width="130px">
      <a href="https://github.com/jacknafa"><img src="https://avatars.githubusercontent.com/u/95523110?v=4" style="border-radius:50%"/></a>
    </td>
  </tr>
  <tr height="50px">
    <td align="center" width="130px">
      <a href="https://github.com/kwonsuhyuk">권수혁</a>
    </td>
    <td align="center" width="130px">
      <a href="https://github.com/nyh98">남용환</a>
    </td>
    <td align="center" width="130px">
      <a href="https://github.com/chansik0504">박성률</a>
    </td>
    <td align="center" width="130px">
      <a href="https://github.com/jacknafa">김준서</a>
    </td>
    <td align="center" width="130px">
      <a href="https://github.com/jacknafa">이충녕</a>
    </td>
  </tr>
</table>


<br />

## 🐙 권수혁 (FE)

- 블로그: https://velog.io/@tngur0716/posts
- 깃허브: https://github.com/kwonsuhyuk

## 😊 이충녕 (FE)

- 깃허브 : https://github.com/choongnyeong6215

## 🐧 남용환 (BE)

- 블로그: https://nyh98.tistory.com/
- 깃허브: https://github.com/nyh98

## 👾 박성률 (BE)

- 블로그: https://buyhomeinseoul.tistory.com
- 깃허브: https://github.com/chansik0504

## ⚽️ 김준서 (BE)

- 블로그: https://velog.io/@nafa21/posts
- 깃허브: https://github.com/jacknafa



<br />
