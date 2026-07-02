# ikkeum.com 홈페이지 리뉴얼 구현 계획

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 커밍순 페이지를 제품 4종 + 용역(SI·AX 컨설팅)을 소개하는 다크 테크 테마 원페이지 회사 홈페이지로 전면 리뉴얼한다.

**Architecture:** 정적 단일 `index.html`(CSS/JS 인라인), GitHub Pages 배포. 기존 KO/EN 토글·테마 토글·SEO 인프라를 이식하고 콘텐츠·디자인을 전면 교체. 스펙: `docs/superpowers/specs/2026-07-03-homepage-renewal-design.md`

**Tech Stack:** HTML/CSS/Vanilla JS, Pretendard(jsdelivr CDN), GitHub Pages

## Global Constraints

- 빌드 도구·프레임워크·외부 JS 라이브러리 금지. 파일은 `index.html` 하나 (+ `sitemap.xml` 갱신)
- 모든 표시 텍스트는 KO/EN 완전 이중화 (`data-lang-content` 패턴)
- 다크 기본 + 라이트 토글. 색상 대비 WCAG AA 이상, `prefers-reduced-motion` 대응 필수
- "아이디얼" 브랜드명 표기 금지. 실적은 "팀 누적 경험" 프레임으로만 서술
- ThinkCode 링크는 `https://think-code.ai` (`.io` 아님), PlanAuto는 `https://planauto.kr`
- 문의는 `mailto:contact@ikkeum.com` + `tel:1877-0737`만. 폼 금지
- 외부 링크는 `target="_blank" rel="noopener"`
- 디자인 토큰: 배경 `#0A0C10`, 표면 `#11141B`, 보더 `rgba(255,255,255,0.08)`, 본문 `rgba(235,240,250,0.72)`, 헤딩 `#EBF0FA`, 포인트 `#4D8DFF` (라이트 모드: 배경 `#F7F8FA`, 헤딩 `#0E1320`, 포인트 `#2563EB`)
- 각 태스크 완료 시 로컬 검증 후 개별 커밋 (한글 커밋 메시지)

## 검증 공통 절차 (모든 태스크에서 "로컬 검증" 지칭 시)

```bash
cd /Users/chamchi/Projects/Inhouse/ikkeum.com && python3 -m http.server 8899
```
브라우저(또는 headless)로 `http://localhost:8899` 열어 해당 태스크의 Expected 항목 확인. HTML 유효성은 `npx html-validate index.html` 또는 육안으로 태그 짝 확인.

---

### Task 1: 뼈대 교체 — head 메타 갱신 + 디자인 토큰 + 헤더/푸터

**Files:**
- Modify: `index.html` (전면 재작성 시작 — 이 태스크에서 head, 토큰 CSS, 헤더, 푸터, 토글 JS까지)

**Interfaces:**
- Produces: CSS 변수 `--bg --surface --border --text --text-soft --accent`, 언어 패턴 `[data-lang-content="ko|en"]`, 테마 패턴 `html[data-theme]`, 앵커 id `#products #services #about #contact`

- [ ] **Step 1: head 교체.** 기존 index.html의 다음 블록은 **그대로 유지**: 테마 사전 초기화 스크립트(8-27행), favicon 링크, Pretendard 링크, GA 스크립트, canonical/hreflang. 다음은 **교체**:
  - `<title>`: KO `주식회사 이끔 — AI·데이터·소프트웨어로 미래를 이끕니다` / JS의 TITLES도 동일 갱신 (EN: `Ikkeum Co., Ltd. — Leading the future with AI, Data & Software`)
  - `meta description`: `주식회사 이끔 — ThinkCode, PlanAuto 등 자체 SaaS를 만들고, 시스템 구축·운영(SI)과 AX 컨설팅을 수행하는 기술 기반 회사입니다.`
  - OG/Twitter title·description 동일 취지로 갱신 ("곧 만나요/오픈 예정" 문구 전부 제거)
  - `theme-color` 초기값을 `#0A0C10`으로, JS `THEME_COLORS`를 `{ light: '#F7F8FA', dark: '#0A0C10' }`로
  - 기존 Organization/WebSite JSON-LD 유지 (제품 JSON-LD는 Task 6)
- [ ] **Step 2: 토큰·베이스 CSS 작성.** Global Constraints의 다크/라이트 토큰을 `:root`(다크 기본)와 `html[data-theme="light"]`에 정의. Pretendard, reset, `prefers-reduced-motion` 블록은 기존 패턴 이식. 배경에 미묘한 radial glow(포인트 컬러 6% 투명도) 1~2개.
- [ ] **Step 3: 헤더 작성.** sticky 헤더 — 좌: 로고(기존 `--logo-filter` 패턴, 다크에서 밝게), 중: 앵커 내비 4개 (KO: 제품/서비스/회사/문의, EN: Products/Services/About/Contact → `#products #services #about #contact`), 우: 테마 토글 + KO/EN 토글(기존 마크업·CSS 이식, `aria-pressed` 유지). 모바일(≤720px)에서 내비는 숨김(원페이지 스크롤로 충분, 햄버거 금지 — YAGNI).
- [ ] **Step 4: 푸터 이식.** 기존 `.legal` 블록(대표자 이동원·사업자번호 814-81-04063·주소·1877-0737·이메일) 마크업 그대로, 새 토큰으로 스타일만 조정. `© Ikkeum Co., Ltd.` + 연도 자동 갱신 JS 유지.
- [ ] **Step 5: 토글 JS 이식.** 기존 언어 전환(localStorage `ikkeum-lang`)·테마 전환(`ikkeum-theme`)·시스템 테마 추종 스크립트를 그대로 이식하되 TITLES만 갱신. 본문 `<main>`은 임시로 빈 섹션 4개(`#products #services #about #contact`)만 배치.
- [ ] **Step 6: 로컬 검증.** Expected: 다크 배경 렌더, KO/EN 토글 시 헤더·푸터 텍스트 전환, 테마 토글 동작, 콘솔 에러 0, 이전 분석 이슈 해소 확인(`nav`에 `aria-hidden` 없음).
- [ ] **Step 7: Commit.** `git add index.html && git commit -m "리뉴얼 1단계: 다크 테마 뼈대·헤더·푸터"`

### Task 2: Hero 섹션

**Files:**
- Modify: `index.html` (`<main>` 최상단)

**Interfaces:**
- Consumes: Task 1 토큰·언어 패턴

- [ ] **Step 1: 마크업 작성.** 확정 카피:
  - 키워드 pill 4개 (기존 `.keyword` 스타일 이식·토큰만 교체): `AX` `AI` `Data` `S/W`
  - 헤드라인 KO: `기술로 미래를\n이끕니다.` (줄바꿈 포함, "이끔" 브랜드 연결) / EN: `Leading the future\nwith technology.`
  - 서브카피 KO: `우리는 자체 SaaS를 직접 만들어 운영하고, 그 경험으로 고객의 시스템과 AI 전환을 설계합니다.` / EN: `We build and operate our own SaaS products — and bring that experience to our clients' systems and AI transformation.`
  - CTA 2개: `[제품 보기](#products)` (포인트 컬러 채움 버튼) / `[프로젝트 문의](#contact)` (아웃라인 버튼). EN: `View products` / `Start a project`
- [ ] **Step 2: 스타일.** 헤드라인 `clamp(44px, 8vw, 110px)`, weight 800, letter-spacing -0.04em. 기존 reveal-up 순차 애니메이션 패턴 이식. 뷰포트 높이의 80~90%를 차지하는 첫 화면.
- [ ] **Step 3: 로컬 검증.** Expected: KO/EN 전환 시 헤드라인·CTA 전환, CTA 클릭 시 앵커 스크롤, 375px 폭에서 줄바꿈 자연스러움.
- [ ] **Step 4: Commit.** `git commit -am "리뉴얼 2단계: Hero 섹션"`

### Task 3: Products 섹션 (카드 4장)

**Files:**
- Modify: `index.html` (`#products` 섹션)

- [ ] **Step 1: 마크업 작성.** 섹션 헤딩 KO `제품` / EN `Products` + 리드문 KO `직접 만들고, 직접 운영합니다.` / EN `Built by us. Operated by us.` 카드 4장 그리드(데스크톱 2×2 또는 4열, 모바일 1열). 카드 = 배지 + 제품명 + 설명 + (링크 있으면) 화살표 링크. 확정 콘텐츠:

| 제품명 | 배지 KO/EN | 설명 KO | 설명 EN | 링크 |
|---|---|---|---|---|
| ThinkCode | NEW | 1:1 라이브 코딩 튜터링 마켓플레이스. 강사가 학생 화면을 실시간으로 보고, 같은 에디터에서 바로 개입합니다. | A 1:1 live coding tutoring marketplace. Tutors watch the student's screen in real time and step into the same editor. | https://think-code.ai |
| PlanAuto | BETA | AI가 공고문을 분석해 사업계획서·R&D 연구개발계획서 초안을 자동 작성합니다. | AI analyzes RFPs and drafts business plans and R&D proposals automatically. | https://planauto.kr |
| Arcade Care | 준비 중 / Coming soon | 인형뽑기·오락실 A/S 매칭 플랫폼. 매장과 수리 기사를 연결합니다. | An A/S matching platform for claw machines and arcades, connecting venues with repair technicians. | 없음 |
| SpineLab | R&D · 특허 출원 / R&D · Patent pending | 관절 추적 기반 비접촉 척추측만증 AI 진단 솔루션. | A contactless AI screening solution for scoliosis based on joint tracking. | 없음 |

- [ ] **Step 2: 스타일.** 카드 `--surface` 배경 + `--border` 1px + radius 14px, hover 시 보더가 포인트 컬러 40% + translateY(-2px). 링크 카드는 카드 전체 `<a>`. 배지는 uppercase 11px pill — NEW/BETA는 포인트 컬러 톤, 준비 중/R&D는 중성 톤.
- [ ] **Step 3: 로컬 검증.** Expected: 카드 4장 렌더, ThinkCode/PlanAuto 새 탭 열림(`rel="noopener"`), KO/EN 전환, 모바일 1열.
- [ ] **Step 4: Commit.** `git commit -am "리뉴얼 3단계: 제품 섹션 (ThinkCode·PlanAuto·Arcade Care·SpineLab)"`

### Task 4: Services 섹션 + 실적 스트립

**Files:**
- Modify: `index.html` (`#services` 섹션)

- [ ] **Step 1: 마크업 작성.** 섹션 헤딩 KO `서비스` / EN `Services` + 리드문 KO `제품을 만들어 본 팀이 프로젝트를 수행합니다.` / EN `Projects delivered by a team that ships its own products.` 2열 카드:
  - **시스템 구축·운영 (SI)** / EN **System Integration & Operations**: KO `공공·민간 시스템을 기획부터 설계·개발·운영까지 한 팀이 일괄 수행합니다. 질병관리청 감염병 통합관리 플랫폼, NHN KCP 관리자 시스템 등 검증 기준이 까다로운 프로젝트를 수행한 경험이 있습니다.` / EN `One team handles the full cycle — planning, design, development, and operations — for public and private systems, with delivery experience including KDCA's infectious disease management platform and NHN KCP's admin systems.`
  - **AX 컨설팅** / EN **AX Consulting**: KO `AI 도입 전략 수립, LLM 활용 설계, 데이터 파이프라인 구축까지 — 자체 AI SaaS를 직접 만들어 운영하는 팀이 AI 전환(AX)을 설계합니다.` / EN `From AI adoption strategy and LLM architecture to data pipelines — your AI transformation designed by a team that builds and operates its own AI SaaS.`
- [ ] **Step 2: 실적 스트립.** 카드 아래 4칸 수치 스트립 (숫자 크게 + 라벨 작게):
  - `20+` — KO `팀 누적 프로젝트` / EN `Projects delivered (team)`
  - `6년+`/`6+ yrs` — KO `팀 경험` / EN `Team experience`
  - `4` — KO `운영·개발 중인 제품` / EN `Products in operation & development`
  - `공공·민간`/`Public & private` — KO `납품 검증` / EN `Proven delivery`
- [ ] **Step 3: 로컬 검증.** Expected: 2열 카드 + 4칸 스트립, 모바일 1열/2×2, KO/EN 전환, "아이디얼" 문자열 없음 (`grep -c 아이디얼 index.html` → 0).
- [ ] **Step 4: Commit.** `git commit -am "리뉴얼 4단계: 서비스(SI·AX 컨설팅) + 실적 스트립"`

### Task 5: About + Contact 섹션

**Files:**
- Modify: `index.html` (`#about`, `#contact` 섹션)

- [ ] **Step 1: About 마크업.** 헤딩 KO `회사` / EN `About`. 본문 KO: `이끔은 AI·데이터·소프트웨어 기술로 제품과 시스템을 만드는 회사입니다. 2026년 서울에서 설립했으며, 팀은 2019년부터 공공·민간 프로젝트와 자체 서비스를 만들어 왔습니다. 혁신적인 기술로 사람들의 삶을 바꾸고, 모두와 함께 성장하는 미래를 이끕니다.` / EN: `Ikkeum builds products and systems with AI, data, and software. Founded in Seoul in 2026, our team has been building public and private projects and our own services since 2019. We transform lives through innovative technology, leading a future where everyone grows together.` + 팩트 라인(기존 topbar 메타 스타일): `설립 2026 · 서울 · AI | Data | SaaS | R&D`
- [ ] **Step 2: Contact 마크업.** 헤딩 KO `프로젝트를 시작할 준비가 되셨나요?` / EN `Ready to start a project?` + 서브 KO `이메일 또는 전화로 문의해 주세요. 영업일 기준 24시간 이내에 답변합니다.` / EN `Reach out by email or phone. We respond within one business day.` + 대형 링크 2개: `contact@ikkeum.com`(mailto), `1877-0737`(tel). 기존 `.cta` 화살표 스타일 이식.
- [ ] **Step 3: 로컬 검증.** Expected: mailto/tel 링크 동작, KO/EN 전환, 섹션 간 시각 리듬(교차 배경 `--bg`/`--surface` 미묘 차이) 확인.
- [ ] **Step 4: Commit.** `git commit -am "리뉴얼 5단계: About·Contact 섹션"`

### Task 6: SEO 마무리 — 제품 JSON-LD + sitemap + OG 정합성

**Files:**
- Modify: `index.html` (head), `sitemap.xml`

- [ ] **Step 1: 제품 JSON-LD 추가.** head에 스크립트 1개 추가:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "SoftwareApplication", "name": "ThinkCode", "url": "https://think-code.ai",
      "applicationCategory": "EducationalApplication", "operatingSystem": "Web",
      "description": "1:1 라이브 코딩 튜터링 마켓플레이스",
      "publisher": { "@id": "https://ikkeum.com/#organization" } },
    { "@type": "SoftwareApplication", "name": "PlanAuto", "url": "https://planauto.kr",
      "applicationCategory": "BusinessApplication", "operatingSystem": "Web",
      "description": "AI 사업계획서·R&D 연구개발계획서 자동작성 플랫폼",
      "publisher": { "@id": "https://ikkeum.com/#organization" } }
  ]
}
</script>
```
(링크 없는 Arcade Care·SpineLab은 JSON-LD 제외 — URL 없는 항목은 스팸 시그널)
- [ ] **Step 2: sitemap.xml `lastmod`를 배포일로 갱신, `changefreq`를 `monthly`로.**
- [ ] **Step 3: 정합성 스캔.** `grep -nE '곧 만나요|오픈 예정|Coming [Ss]oon|Launching' index.html` → Arcade Care 배지의 "Coming soon" 외 결과 0. `grep -n 'think-code.io' index.html` → 0.
- [ ] **Step 4: Commit.** `git commit -am "리뉴얼 6단계: 제품 JSON-LD·sitemap·문구 정합성"`

### Task 7: 최종 검증 + 배포

**Files:**
- 없음 (검증·푸시만)

- [ ] **Step 1: 전체 QA.** 로컬 서빙 후 체크리스트: KO/EN 전체 섹션 전환 누락 0 / 다크·라이트 토글 및 새로고침 유지 / 375px·768px·1440px 레이아웃 / 키보드 탭 이동·focus-visible / reduced-motion 에뮬레이션 시 애니메이션 없음 / 콘솔 에러 0
- [ ] **Step 2: 접근성 대비 확인.** 본문 `rgba(235,240,250,0.72)` on `#0A0C10` ≥ 4.5:1, 포인트 `#4D8DFF` on `#0A0C10` ≥ 4.5:1 (필요 시 명도 상향)
- [ ] **Step 3: 사용자 최종 확인 후 push.** `git push` → 5분 내 https://ikkeum.com 라이브 확인, 카카오톡 공유 디버거로 OG 카드 확인
- [ ] **Step 4: (선택) og-card 이미지가 여전히 "곧 만나요" 문구라면 후속 작업으로 교체 필요함을 사용자에게 보고**

## Self-Review 결과

- 스펙 커버리지: 스펙 §3 구조(헤더~푸터) → Task 1~5, §5 유지·이관·수정(aria-hidden, theme-color, 문구 갱신, JSON-LD, sitemap) → Task 1·6, §7 검증 → Task 7. 로고 SVG 교체는 다크 배경에서 색 확인이 필요해 Task 1 Step 3에서 기존 PNG+filter 패턴 유지로 결정(스펙의 "가능하면" 항목).
- 플레이스홀더: 없음 — 전 섹션 카피 KO/EN 확정, 토큰 값 명시
- 네이밍 일관성: 앵커 id(`#products #services #about #contact`)와 localStorage 키(`ikkeum-lang`, `ikkeum-theme`) 전 태스크 동일
