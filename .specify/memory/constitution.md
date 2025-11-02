<!--
Sync Impact Report:
Version: (none) → 1.0.0
Rationale: Initial constitution creation (MINOR version for new governance structure)

Modified Principles: N/A (初次建立)
Added Sections:
  - 核心原則 (5 principles)
  - 開發工作流程
  - 治理

Removed Sections: N/A

Templates Status:
  - ✅ plan-template.md: Constitution Check section confirmed compatible
  - ✅ spec-template.md: User story independence aligns with MVP principle
  - ✅ tasks-template.md: Test-first approach and task organization confirmed
  - ⚠ Commands may need review for Chinese language requirements

Follow-up TODOs: None
-->

# Calculator 專案憲法

## 核心原則

### 一、可測試性 (NON-NEGOTIABLE)

所有功能必須可被獨立測試。每個使用者故事、每個功能單元都必須能夠：

- 獨立執行測試而不依賴其他功能
- 具有明確的輸入與預期輸出
- 可透過自動化測試驗證正確性

**理由**: 可測試性是品質保證的基礎。無法測試的程式碼無法確保品質，也無法安全地進行重構或擴展。這是非協商的開發原則。

---

### 二、測試先行 (NON-NEGOTIABLE)

必須嚴格遵循 TDD (Test-Driven Development) 流程：

1. 先撰寫測試
2. 測試必須失敗（紅燈）
3. 實作功能讓測試通過（綠燈）
4. 重構

絕不允許先寫實作再補測試。所有測試都必須經過使用者確認後才開始實作。

**理由**: 測試先行確保我們真正理解需求，並且所有程式碼都有測試覆蓋。這是非協商的開發紀律，防止技術債累積。

---

### 三、MVP 優先

永遠從最小可行產品開始：

- 優先實作 P1 (Priority 1) 使用者故事
- 每個使用者故事都應該能獨立交付價值
- 完成一個故事後驗證、部署，再進行下一個
- 避免一次性實作所有功能

**理由**: MVP 策略讓我們能快速驗證假設、及早獲得回饋，並確保始終有可交付的成果。這減少了浪費並提高了專案成功率。

---

### 四、拒絕過度設計

保持簡單，遵循 YAGNI (You Aren't Gonna Need It) 原則：

- 不要為「未來可能需要」的功能預先設計
- 不要添加當前不需要的抽象層
- 優先使用最簡單的解決方案
- 只在真正需要時才重構為更複雜的架構

任何增加複雜度的決策都必須在 Implementation Plan 的 Complexity Tracking 表格中明確記錄與說明。

**理由**: 過度設計浪費時間、增加維護成本，並且常常預測錯誤的未來需求。簡單的程式碼更容易理解、測試和修改。

---

### 五、正體中文優先 (NON-NEGOTIABLE)

所有文件、註解、使用者介面文字一率使用正體中文：

- 規格文件：正體中文
- 程式碼註解：正體中文
- 提交訊息 (commit messages)：正體中文
- 使用者介面文字：正體中文
- 錯誤訊息：正體中文
- 變數與函數命名：允許使用英文（為了程式碼相容性），但必須有正體中文註解說明

唯一例外：與外部系統整合時必須使用的技術術語（如 HTTP status codes, API endpoints）。

**理由**: 正體中文是本專案的主要語言，使用母語能更精確地表達需求與設計意圖，降低溝通成本，提高團隊效率。

---

## 開發工作流程

### 需求階段

1. 使用 `/speckit.specify` 建立功能規格（spec.md）
2. 規格必須包含按優先級排序的使用者故事（P1, P2, P3...）
3. 每個使用者故事都必須可獨立測試與交付

### 設計階段

1. 使用 `/speckit.plan` 進行技術規劃
2. 必須通過 Constitution Check（驗證是否符合憲法原則）
3. 如有複雜度違規，必須在 Complexity Tracking 表格中說明理由

### 任務分解階段

1. 使用 `/speckit.tasks` 產生任務清單（tasks.md）
2. 任務必須按使用者故事分組
3. 每個故事都應該能獨立實作與測試

### 實作階段

1. 使用 `/speckit.implement` 執行實作
2. 嚴格遵循測試先行原則
3. 優先完成 P1 使用者故事，驗證後再進行 P2、P3

### 品質檢核

- 所有程式碼都必須有對應的測試
- 測試覆蓋率不是目標，而是測試的有效性與獨立性
- 每個使用者故事完成後必須可獨立驗證
- 定期檢視是否有過度設計的跡象

---

## 治理

### 憲法地位

本憲法優先於所有其他開發慣例。任何與憲法衝突的實作方式都必須修正。

### 修訂程序

1. 憲法修訂必須有明確的理由與文件記錄
2. 修訂必須更新版本號（遵循語意化版本控制）
3. 修訂後必須檢查並更新所有相依模板（plan-template.md, spec-template.md, tasks-template.md 等）

### 版本控制規則

- **MAJOR**: 向後不相容的治理變更或原則刪除/重新定義
- **MINOR**: 新增原則或大幅擴展現有原則
- **PATCH**: 文字澄清、錯字修正、非語意性改進

### 合規審查

- 所有 Pull Request 都必須驗證是否符合憲法原則
- 複雜度增加必須有充分理由
- Code Review 時應主動指出過度設計的問題
- 違反測試先行原則的提交將被拒絕

### 執行工具

- 使用 `/speckit.*` 系列命令確保開發流程符合憲法
- 使用 Constitution Check 作為進入實作階段前的關卡
- 定期執行 `/speckit.analyze` 檢查專案合規性

### 例外處理

如遇特殊情況需要違反憲法原則：

1. 必須在 Pull Request 中明確說明理由
2. 需要團隊討論與共識
3. 記錄在 Complexity Tracking 表格中
4. 設定技術債還債計劃

---

**版本**: 1.0.0 | **批准日期**: 2025-11-01 | **最後修訂**: 2025-11-01
