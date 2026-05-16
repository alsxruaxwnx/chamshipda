# 기호 인식 시스템 (Chamshipda Symbol Recognition)

손그림을 입력받아 기호를 인식하고 코드로 변환하는 Next.js 기반 웹 애플리케이션입니다.

## 🚀 시작하기

### 설치

```bash
npm install
```

### 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어보세요.

## 📁 프로젝트 구조

```
chamshipda/
├── app/
│   ├── api/
│   │   ├── analyze-drawing/    # 그림 분석 API
│   │   └── analyze-symbol/     # 기호 분석 API
│   ├── layout.tsx              # 레이아웃
│   ├── page.tsx                # 메인 페이지
│   └── globals.css             # 글로벌 스타일
├── components/                 # React 컴포넌트
├── public/                     # 정적 파일
├── package.json
├── tsconfig.json
└── tailwind.config.ts
```

## 🔧 기술 스택

- **Framework**: Next.js 14.2.35
- **UI Library**: React 18.3.1
- **Styling**: Tailwind CSS 3.4.19
- **Language**: TypeScript 5
- **CSS Framework**: @tailwindcss/postcss 4

## 📝 기능

- ✏️ 캔버스에 자유롭게 그리기
- 🔍 손그림으로부터 기호 인식
- 💻 인식된 기호를 코드로 자동 변환
- 📊 실시간 기호 분석 및 표시

## 🌿 브랜치

- **main**: 메인 브랜치
- **기호-인식**: 기호 인식 기능 개발 브랜치

## 🤝 API 엔드포인트

### POST /api/analyze-drawing

그리기 이미지를 분석하여 기호 목록을 반환합니다.

**Request**:
```json
{
  "imageData": "data:image/png;base64,..."
}
```

**Response**:
```json
{
  "symbols": [
    {
      "name": "정사각형",
      "description": "4개의 직각을 가진 도형",
      "code": "const square = new Shape(\"square\");"
    }
  ]
}
```

### POST /api/analyze-symbol

특정 기호를 분석하여 코드를 생성합니다.

**Request**:
```json
{
  "symbolData": {
    "type": "square"
  }
}
```

**Response**:
```json
{
  "code": "const shape = new Square();",
  "symbol": { "type": "square" }
}
```

## 📦 배포

### Vercel에 배포

```bash
npm run build
npm run start
```

또는 Vercel 플랫폼에서 직접 배포할 수 있습니다.

## 📄 라이선스

MIT
