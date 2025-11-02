# 實作計劃：工程用計算機

**分支**: `001-engineering-calculator` | **日期**: 2025-11-01 | **規格**: [spec.md](./spec.md)
**輸入**: 功能規格來自 `/specs/001-engineering-calculator/spec.md`

**備註**: 此文件由 `/speckit.plan` 命令填寫。

## 摘要

建立一個網頁版工程用計算機，支援基本四則運算（加減乘除）與工程函數（平方、開根號、sin、cos）。使用 JavaScript 作為主要語言，建立純前端 web 應用程式，優先實作 P1 基本四則運算作為 MVP，然後逐步添加 P2 平方/開根號和 P3 三角函數功能。

## 技術背景

**語言/版本**: JavaScript (ES6+), HTML5, CSS3
**主要相依套件**: 無（純 Vanilla JavaScript，避免過度設計）
**儲存**: N/A（無需後端儲存，純前端計算）
**測試**: Jest（單元測試）+ 瀏覽器手動測試（整合測試）
**目標平台**: 現代網頁瀏覽器（Chrome, Firefox, Safari, Edge 最新版本）
**專案類型**: web（純前端單頁應用）
**效能目標**:
  - 按鈕點擊回應時間 < 100ms
  - 計算結果顯示延遲 < 50ms
  - 頁面載入時間 < 1 秒
**限制**:
  - 必須可離線運作（無網路連線需求）
  - 瀏覽器相容性：支援 ES6+ 的現代瀏覽器
  - 無需 build 工具（直接可開啟 HTML 檔案執行）
**規模/範圍**:
  - 單一 HTML 頁面
  - 約 200-300 行 JavaScript 程式碼（MVP）
  - 約 100-150 行 CSS 樣式

## 憲法檢查

*關卡：必須在 Phase 0 研究前通過。在 Phase 1 設計後重新檢查。*

### 一、可測試性 ✅
- **狀態**: 通過
- **驗證**: 每個功能（四則運算、平方/開根號、三角函數）都可以用已知輸入/輸出獨立測試
- **測試方式**: 單元測試覆蓋所有計算函數，整合測試驗證 UI 互動

### 二、測試先行 ✅
- **狀態**: 通過
- **承諾**: 將遵循 TDD 流程
  1. 先撰寫測試案例（基於 spec.md 的驗收情境）
  2. 確認測試失敗
  3. 實作功能讓測試通過
  4. 重構

### 三、MVP 優先 ✅
- **狀態**: 通過
- **驗證**: 規格已按優先級分為 P1/P2/P3
- **交付策略**:
  - Phase 1: P1 基本四則運算（MVP）
  - Phase 2: P2 平方與開根號
  - Phase 3: P3 三角函數
- **每個階段都可獨立交付與驗證**

### 四、拒絕過度設計 ✅
- **狀態**: 通過
- **決策**:
  - ✅ 使用純 Vanilla JavaScript（無框架）
  - ✅ 無 build 工具（直接開啟 HTML）
  - ✅ 無後端/資料庫（純前端計算）
  - ✅ 單一 HTML 檔案結構
  - ✅ 無狀態管理庫（使用簡單的 DOM 操作）
- **複雜度控制**: 此專案無需任何額外抽象層或框架

### 五、正體中文優先 ✅
- **狀態**: 通過
- **驗證**:
  - ✅ 所有文件使用正體中文
  - ✅ UI 介面文字使用正體中文
  - ✅ 錯誤訊息使用正體中文
  - ✅ 程式碼註解使用正體中文
  - ⚠️ 變數命名使用英文（JavaScript 慣例），但附正體中文註解

**結論**: 所有憲法原則檢查通過，可以進入 Phase 0 研究階段。

## 專案結構

### 文件（本功能）

```text
specs/001-engineering-calculator/
├── plan.md              # 本檔案（/speckit.plan 命令輸出）
├── research.md          # Phase 0 輸出（/speckit.plan 命令）
├── data-model.md        # Phase 1 輸出（/speckit.plan 命令）
├── quickstart.md        # Phase 1 輸出（/speckit.plan 命令）
├── contracts/           # Phase 1 輸出（/speckit.plan 命令）
└── tasks.md             # Phase 2 輸出（/speckit.tasks 命令 - 不由 /speckit.plan 建立）
```

### 原始碼（儲存庫根目錄）

```text
calculator/                      # 專案根目錄
├── index.html                   # 主要 HTML 檔案（包含結構、樣式、腳本）
├── src/
│   ├── calculator.js           # 計算機核心邏輯
│   │   ├── BasicOperations     # 基本四則運算（P1）
│   │   ├── PowerOperations     # 平方與開根號（P2）
│   │   └── TrigOperations      # 三角函數（P3）
│   ├── ui.js                   # UI 互動邏輯
│   └── validator.js            # 輸入驗證與錯誤處理
├── styles/
│   └── calculator.css          # 計算機樣式（可選，如果從 HTML 分離）
└── tests/
    ├── unit/
    │   ├── basicOperations.test.js      # P1 單元測試
    │   ├── powerOperations.test.js      # P2 單元測試
    │   └── trigOperations.test.js       # P3 單元測試
    └── integration/
        └── calculator.integration.test.js  # 整合測試
```

**結構決策**: 採用**簡化的 web 應用結構**

理由：
1. **遵循 MVP 原則**: 單一 HTML 檔案可以快速開始開發
2. **避免過度設計**: 不需要複雜的前後端分離架構
3. **離線可用**: 所有資源在本地，無需伺服器
4. **逐步擴展**: 可以先從單一 HTML 開始，如果程式碼變大再分離成多個檔案

**初始 MVP 選項**（P1 階段）：
- 可以先在 `index.html` 中內嵌所有 JavaScript 和 CSS
- 完成 P1 後，如果程式碼超過 200 行，再分離到 `src/` 和 `styles/`

## 複雜度追蹤

> **僅在憲法檢查有違規需要說明時填寫**

本專案無憲法違規，此表格為空。
