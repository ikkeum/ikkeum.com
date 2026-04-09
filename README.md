# ikkeum.com

> 주식회사 이끔(Ikkeum Inc.) 공식 웹사이트

본 사이트 오픈 전까지 임시로 노출되는 **커밍순(Coming Soon) 랜딩 페이지**입니다. 단일 HTML 파일로 구성되어 정적 호스팅 어디에서도 즉시 배포할 수 있습니다.

**회사 미션**
> 우리는 혁신적인 기술로 사람들의 삶을 바꾸고, 모두와 함께 성장하는 미래를 이끕니다.

---

## 파일 구조

```
ikkeum.com/
├── index.html                  # 페이지 본체 (인라인 CSS/JS)
├── robots.txt                  # 전체 색인 허용 + 사이트맵 위치
├── sitemap.xml                 # hreflang ko/en/x-default 포함
├── static/
│   ├── favicon-32.png          # 브라우저 탭 파비콘
│   ├── favicon-180.png         # iOS apple-touch-icon
│   ├── favicon-192.png         # Android home screen
│   ├── favicon-512.png         # PWA·고해상도
│   ├── ikkeum_logo_kr.png      # KR 워드마크 (OG 이미지)
│   ├── ikkeum_logo_en.png      # EN 워드마크 (Twitter 이미지)
│   ├── ikkeum_logo_kr_trimmed.png  # 헤더용 KR 로고 (여백 제거)
│   ├── ikkeum_logo_en_trimmed.png  # 헤더용 EN 로고 (여백 제거)
│   ├── ikkeum_symbol_kr.png    # IK 심볼 원본 (파비콘 소스)
│   ├── ikkeum_symbol_kr.svg    # IK 심볼 원본 SVG
│   ├── ikkeum_symbol_en_dark.png   # 다크 배경용 심볼 (여분)
│   └── ikkeum_symbol_en_dark.svg   # 다크 배경용 심볼 SVG
├── .gitignore
└── README.md
```

---

## 로컬에서 실행하기

외부 의존성은 CDN으로 불러오는 Pretendard Variable 폰트 한 개뿐입니다. 정적 서버만 있으면 바로 확인할 수 있습니다.

```bash
# Python 3 (macOS/Linux 기본 포함)
python3 -m http.server 8000

# 또는 Node
npx serve .

# 브라우저에서 열기
open http://localhost:8000
```

`file://` 프로토콜로도 동작하지만, OG 태그·파비콘·상대 경로 자산 검증은 HTTP 서버로 실행하는 것을 권장합니다.

---

## 디자인 사양

### 컨셉 — Editorial Asymmetric

잡지 펼침면을 참고한 좌측 정렬 비대칭 레이아웃. 상·하단 풀폭 디바이더 라인이 프레임을 만들고, 거대한 디스플레이 헤드라인이 시선의 앵커 역할을 합니다. 중앙 정렬과 카드 그리드를 피하고 editorial 타이포그래피로 브랜드 무게감을 표현합니다.

### 타이포그래피

- **Pretendard Variable** 단일 패밀리 (한글·영문 모두 처리)
- 헤드라인: `clamp(54px, 9vw, 140px)`, weight 800, letter-spacing −0.05em
- 메타 라인: `clamp(10px, 0.78vw, 11.5px)`, uppercase, tracking 0.22em
- 본문: `clamp(15px, 1.05vw, 17px)`, line-height 1.7
- `font-feature-settings: "ss01" "ss02" "kern" "tnum"` 활성화

### 컬러

| 토큰 | 값 | 용도 |
|---|---|---|
| `--paper` | `#F4F1EA` | 배경 (따뜻한 종이 톤) |
| `--ink` | `#1A1F2C` | 메인 텍스트·로고 |
| `--ink-soft` | `rgba(26, 31, 44, 0.66)` | 본문 |
| `--ink-mute` | `rgba(26, 31, 44, 0.42)` | 메타 정보 |
| `--ink-faint` | `rgba(26, 31, 44, 0.22)` | 구분자·디바이더 도트 |
| `--rule` | `rgba(26, 31, 44, 0.18)` | 프레임 라인 |

### 모션

한 번의 정제된 페이지 리빌 — 상·하단 디바이더가 `scaleX`로 좌→우 / 우→좌로 그려지고, 각 요소가 80~1080ms 사이 stagger 페이드 업으로 등장합니다. `ease-out-quint` / `ease-out-expo` 이징 사용. `prefers-reduced-motion: reduce` 감지 시 모든 애니메이션 비활성화됩니다.

---

## 다국어 지원 (KO / EN)

- 우측 상단 KO/EN 토글 버튼으로 전환
- 동일 HTML에 `data-lang-content="ko"` / `"en"` span 공존, CSS로 표시 전환
- 첫 방문 시 `navigator.language`로 자동 감지 (한국어 접두사 → KO, 그 외 → EN)
- 이후 선택은 `localStorage`에 기억
- `<html lang>`, `<title>` 전환 시 동기적으로 갱신

---

## SEO

### 페이지 메타

- `description`, `keywords`, `author`, `robots`, `theme-color`, `canonical`
- `hreflang`: `ko`, `en`, `x-default`
- Open Graph 풀세트 (`og:type`, `og:title`, `og:description`, `og:image`, `og:locale` 등)
- Twitter Card (`summary_large_image`)
- Apple touch icon, mask-icon, 다중 해상도 파비콘

### 구조화 데이터 (JSON-LD)

- **`Organization`** — 회사명·이메일·로고·주소·연락처
- **`WebSite`** — 사이트명·설명·언어·publisher 연결

### 크롤러 지원

- `robots.txt` — 전체 허용 + 사이트맵 위치
- `sitemap.xml` — 루트 URL + xhtml hreflang 대체 링크

---

## 접근성

- 시맨틱 태그 (`<header>`, `<main>`, `<footer>`, `<nav>`)
- 언어 전환 버튼에 `role="group"`, `aria-label`, `aria-pressed`
- 이메일 CTA에 `aria-label`
- 키보드 포커스 스타일 (`:focus-visible`)
- `prefers-reduced-motion` 감지
- 다중 해상도 파비콘으로 모든 플랫폼 지원

---

## 배포 가이드

단일 정적 파일이라 어떤 정적 호스팅 서비스에서도 즉시 배포 가능합니다.

**공통 체크리스트**
- [ ] `https://ikkeum.com` 도메인 연결
- [ ] HTTPS 강제 리디렉트
- [ ] `index.html`이 루트 엔트리포인트로 설정
- [ ] `static/` 디렉토리 자산 공개 접근 확인
- [ ] 배포 후 Google Search Console / 네이버 서치어드바이저에 `sitemap.xml` 등록

**추천 호스팅**
- [Vercel](https://vercel.com) — 프로젝트 루트 지정 후 zero-config
- [Netlify](https://netlify.com) — drag-and-drop 또는 CLI
- [GitHub Pages](https://pages.github.com) — 저장소 설정에서 Pages 활성화
- [AWS S3 + CloudFront](https://aws.amazon.com/s3) — 커스텀 캐시 정책 필요시
- [Cloudflare Pages](https://pages.cloudflare.com) — 엣지 배포

---

## 라이선스

© 2026 주식회사 이끔(Ikkeum Inc.). All rights reserved.

본 저장소의 코드와 디자인은 주식회사 이끔의 자산이며, 무단 복제·배포·사용을 금지합니다.
