# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/f982bf8e-7c9e-4d6d-a41a-845e49912497

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/f982bf8e-7c9e-4d6d-a41a-845e49912497) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## 🚀 배포 방법

이 프로젝트는 GitHub Actions를 통해 자동으로 배포됩니다. 자세한 배포 가이드는 [DEPLOYMENT.md](./DEPLOYMENT.md)를 참고하세요.

### GitHub Pages 배포 (추천)

1. **GitHub Repository 설정**
   - GitHub 저장소 Settings → Pages에서 "GitHub Actions"를 소스로 설정
   - Actions 탭에서 Actions permissions을 "Allow all actions and reusable workflows"로 설정

2. **자동 배포**
   - `main` 브랜치에 코드를 push하면 자동으로 배포가 시작됩니다
   - Pull Request가 생성되면 빌드 테스트가 실행됩니다

3. **배포 URL**
   - `https://[username].github.io/persona-chronicle-hub/`

### 로컬 개발

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 빌드 테스트
npm run build

# 배포 테스트
npm run deploy
```

## 📁 프로젝트 구조

```
src/
├── components/          # React 컴포넌트
│   ├── sections/       # 페이지 섹션 컴포넌트
│   ├── ui/            # shadcn/ui 컴포넌트
│   └── admin/         # 관리자 패널
├── data/              # JSON 데이터 파일
├── hooks/             # 커스텀 훅
├── lib/               # 유틸리티 함수
└── pages/             # 페이지 컴포넌트
```

## 🔧 주요 기능

- ✅ 반응형 디자인
- ✅ 다크/라이트 모드 지원
- ✅ SEO 최적화
- ✅ 접근성 (a11y) 준수
- ✅ 자동 배포
- ✅ 코드 품질 검사
