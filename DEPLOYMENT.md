# GitHub Actions 배포 가이드

## 개요
이 프로젝트는 GitHub Actions를 사용하여 자동으로 GitHub Pages에 배포됩니다.

## 배포 설정

### 1. GitHub Repository 설정
1. GitHub Repository의 Settings 탭으로 이동
2. Pages 섹션에서 Source를 "GitHub Actions"로 설정
3. Actions 탭에서 Actions permissions을 "Allow all actions and reusable workflows"로 설정

### 2. 자동 배포
- `main` 브랜치에 코드가 push되면 자동으로 배포가 시작됩니다
- Pull Request가 생성되면 빌드 테스트가 실행됩니다

### 3. 배포 URL
배포가 완료되면 다음 URL에서 확인할 수 있습니다:
`https://[username].github.io/persona-chronicle-hub/`

## 로컬 테스트

### 빌드 테스트
```bash
npm run build
```

### 미리보기
```bash
npm run preview
```

### 린트 검사
```bash
npm run lint
```

## 배포 프로세스
1. 코드 변경 후 `main` 브랜치에 push
2. GitHub Actions가 자동으로 트리거됨
3. 의존성 설치 및 린트 검사
4. 프로덕션 빌드 실행
5. GitHub Pages에 자동 배포

## 문제 해결
- 배포가 실패하는 경우 Actions 탭에서 로그를 확인
- 빌드 오류는 로컬에서 `npm run build`로 미리 테스트
- 린트 오류는 `npm run lint`로 확인

## 환경 변수
현재 환경 변수 설정은 없습니다. 필요시 `.env` 파일을 생성하고 GitHub Secrets에 등록하여 사용하세요.
