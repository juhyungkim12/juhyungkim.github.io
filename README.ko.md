# Juhyung Kim — 학술 연구 웹사이트

Astro + TypeScript + 정적 CSS로 제작한 GitHub Pages용 사이트입니다. 콘텐츠는 `src/data/*.json`, 디자인은 `src/components`와 `src/styles/global.css`로 분리되어 있습니다. 유료 서비스나 백엔드는 필요 없습니다.

## 1. 로컬에서 보기

Node.js 24 LTS를 설치한 뒤 프로젝트 폴더에서 실행하세요.

```powershell
npm install
npm run dev
```

표시되는 로컬 주소를 브라우저에서 여세요. 배포 전에 아래 명령을 실행합니다.

```powershell
npm run build
npm run validate
npm run preview
```

이 작업 환경에는 npm이 기본 제공되지 않아 `.tools`에 임시로 설치했습니다. 일반 PC에서는 위 표준 명령을 사용하면 됩니다. `.tools`는 GitHub에 업로드하지 않습니다.

## 2. GitHub Pages 최초 배포

이 프로젝트는 아직 GitHub에 업로드되지 않았습니다. 계정 설정도 변경하지 않았습니다.

1. GitHub에서 `juhyungkim` 계정으로 로그인합니다.
2. 이름이 정확히 `juhyungkim.github.io`인 공개 저장소를 생성합니다. 같은 이름의 기존 저장소가 있다면 삭제하거나 덮어쓰지 말고 먼저 내용을 확인하세요.
3. GitHub Desktop에서 이 프로젝트 폴더를 로컬 저장소로 추가하고, 파일을 커밋한 뒤 해당 저장소의 `main` 브랜치에 게시합니다. `.github`, `.pages.yml`, `package-lock.json`을 포함하고, `node_modules`, `.tools`, `dist`는 제외합니다. 숨김 파일 누락을 막기 위해 GitHub Desktop을 권장합니다.
4. 저장소의 **Settings → Pages → Build and deployment → Source**에서 **GitHub Actions**를 선택합니다.
5. **Actions → Deploy academic website**에서 성공 여부를 확인합니다. 최초 푸시 시 설정이 완료되지 않았다면 **Run workflow**로 다시 실행하세요.
6. 완료 후 https://juhyungkim.github.io 에서 확인합니다.

이후 `main` 브랜치 변경마다 자동으로 빌드·검증·배포됩니다. 이 주소는 사용자 루트 사이트이므로 별도 repository base 경로를 설정하지 않습니다. 빌드 실패 시 이전 배포는 유지됩니다.

## 3. Pages CMS 연결

1. https://app.pagescms.org 에서 GitHub로 로그인합니다.
2. Pages CMS GitHub 앱의 저장소 접근 권한을 위 저장소에 허용합니다. 이 단계는 본인이 진행해야 합니다.
3. 저장소와 **main** 브랜치를 선택합니다. 저장소 루트의 `.pages.yml`을 자동으로 읽습니다.
4. 왼쪽 메뉴에서 Home / Profile, About Me, Education, Honors & Awards, Research Experience, Publications, Skills, Contact Information, CV PDF를 편집합니다.
5. 저장하면 GitHub 커밋이 생성됩니다. `main`에 반영되면 Actions가 자동으로 배포합니다. 브랜치 보호 규칙이 있다면 PR 병합이 필요할 수 있습니다.

## 4. 콘텐츠 수정 방법

- **Home / Profile**: 이름, 소속, 소개, 연구 관심사 목록, 프로필 사진, MP4 영상과 포스터, 캡션을 관리합니다. 영상이 없으면 명확한 자리표시자가 나타납니다.
- **About Me**: 학력과 연구 방향을 포함한 실제 소개문으로 교체하세요. 줄바꿈이 유지됩니다.
- **Education / Honors & Awards**: Entries에 항목을 추가하거나 삭제하고 목록 순서를 바꾸세요. 학력 다음 수상 내역이 세로로 표시됩니다.
- **Research Experience**: 항목별 `Unique ID`는 `microfabrication`처럼 영문 소문자·숫자·하이픈으로 입력하고 중복하지 마세요. Display order가 작을수록 위에 나옵니다. 실제 자료 입력 후 Example placeholder를 끄세요. 개별 상세 페이지는 생성되지 않습니다.
- **Publications**: 정확한 제목, 저자, 유형, 연도, 학술지, 상태를 입력하세요. DOI는 `10.xxxx/...` 또는 `https://doi.org/...` 형식입니다. 저자 목록의 `Juhyung Kim`은 자동으로 굵게 표시됩니다. Featured를 켠 논문 중 최대 3개가 홈에 표시됩니다. 유형별 연도 내림차순이며 같은 연도에서는 Display order로 정렬합니다. 관련 연구에는 해당 논문의 Unique ID를 입력합니다.
- **Skills**: 실제로 경험한 기술만 추가하세요. 카테고리, 설명과 미디어를 등록하고 Example placeholder를 끄세요. Display order로 순서를 조절합니다.
- **Contact Information**: 실제 이메일, Google Scholar 전체 URL, 선택적 ORCID 전체 URL을 입력하세요. 비어 있는 외부 프로필 링크는 표시하지 않습니다.
- **CV PDF**: PDF를 선택하면 홈과 연락처의 다운로드 링크가 함께 바뀝니다. 파일이 없을 때는 다운로드 버튼을 가장하지 않습니다.
- **Media**: 모든 파일은 `public/media`에 저장되며 사이트에서는 `/media/파일명` 주소를 사용합니다. 사용 중인 파일을 삭제하면 검증에서 실패하므로 먼저 해당 항목에서 연결을 제거하세요.

이미지에는 의미 있는 대체 텍스트를 작성하세요. 사진은 WebP/JPEG/PNG를 권장하며 긴 변 1600px 내외로 미리 줄이면 좋습니다. CMS 업로드는 자동 이미지 압축을 하지 않습니다. 연구 이미지는 원본 비율을 유지합니다.

영상은 H.264 MP4, 720p 또는 1080p의 짧은 무음 클립으로 준비하세요. 권장 크기는 10–20MB 이하입니다. 홈 영상에는 포스터 이미지도 등록하세요. 일반 환경에서는 자동 반복 재생을 시도하며, 브라우저 자동 재생 제한 또는 동작 줄이기 설정에서는 수동 재생 버튼을 사용합니다. 재생 중 일시정지할 수 있습니다. 추가 연구 영상에는 기본 재생 컨트롤을 제공합니다.

CMS가 특정 영상 업로드를 거절하면 GitHub Desktop으로 작은 MP4를 `public/media`에 추가한 후 CMS의 파일 선택기에서 선택하세요. 대용량 영상은 저장소에 넣기 전에 압축하는 것이 가장 간단합니다. Pages CMS는 영상 인코딩 서비스를 제공하지 않습니다.

## 5. 현재 자리표시자

확인된 정보는 이름과 KAIST Mechanical Engineering 소속뿐입니다. 학위, 날짜, 수상, 논문, 이메일, 숙련도와 연구 성과는 만들지 않았습니다. 실제 사진·영상·CV도 제공되지 않아 추가가 필요합니다. 연구 및 기술 항목은 명시적으로 예시이며 수정 또는 삭제할 수 있습니다. 논문에는 레이아웃 확인용 데모 1개가 있으며 홈에도 Featured로 표시됩니다. 실제 연구 실적이 아닙니다.

## 6. 구조

- `src/pages`: 다섯 개 주요 페이지와 404
- `src/components`: 공통 레이아웃 요소, 연구·논문·기술·학력·수상 컴포넌트
- `src/data`: CMS 편집용 JSON
- `src/lib/content.ts`: 공통 타입 및 정렬
- `.pages.yml`: CMS 필드 정의
- `.github/workflows/deploy.yml`: main 자동 배포
- `scripts/validate.mjs`: CMS 데이터 구조, 내부 링크, 파일 존재, ID 검증

기본 글꼴 Inter는 사이트와 함께 호스팅되어 방문자의 브라우저가 Google Fonts에 연결할 필요가 없습니다.

공식 참고 문서:
- https://docs.astro.build/en/guides/deploy/github/
- https://pagescms.org/docs/configuration/
- https://pagescms.org/docs/configuration/fields/file/

## 데모 논문 교체

Pages CMS → Publications에서 데모 항목의 제목·저자·학술지·연도·이미지를 실제 정보로 바꾸세요. DOI와 선택적 PDF를 등록한 뒤 Demo / placeholder entry를 끄면 데모 표시가 사라집니다. 홈에 표시하지 않으려면 Featured on Home을 끄세요. 항목을 삭제해도 됩니다. 데모의 DOI 링크는 허위 논문으로 연결하지 않고, 같은 항목의 안내문으로 이동합니다.

## 홈 소개 섹션 변경

About Me 섹션과 해당 CMS 메뉴는 제거되었습니다. 홈 프로필 다음에 Education이 표시됩니다. 기존 소개 데이터는 src/data/about.json에 보관되어 있지만 화면에 표시되지 않습니다.

## GitHub 사용자명 변경 후 확인

- 계정: juhyungkim
- 저장소: juhyungkim.github.io
- 저장소 주소: https://github.com/juhyungkim/juhyungkim.github.io
- 사이트 주소: https://juhyungkim.github.io

기존 저장소를 사용한다면 GitHub의 저장소 Settings에서 이름을 juhyungkim.github.io로 변경하세요. Settings → Pages의 Source는 GitHub Actions로 설정합니다. Pages CMS에서도 새 계정의 저장소와 main 브랜치를 선택하고 필요한 접근 권한을 확인하세요. 사용자 루트 사이트이므로 Astro base에 저장소 이름을 추가하지 않습니다. canonical 및 Open Graph URL은 astro.config.mjs의 site 설정을 자동으로 사용합니다.

현재 전달 프로젝트는 로컬 Git 저장소가 아니어서 원격 주소는 설정되어 있지 않습니다. 이미 Git 저장소로 관리하는 별도 사본이 있다면 해당 폴더에서 원격 주소를 확인하고 새 저장소 주소로 변경하세요.
