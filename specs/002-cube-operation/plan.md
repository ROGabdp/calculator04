# Implementation Plan: 三次方運算功能

**Branch**: `002-cube-operation` | **Date**: 2025-11-02 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/002-cube-operation/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

為工程用計算機新增三次方（x³）運算功能，允許使用者對任意數字（正數、負數、小數）進行立方運算，並以小數點後 6 位精確度顯示結果。此功能將作為單運算元運算子（unary operator）實作，與現有的平方（x²）和開根號（√）功能保持一致的使用者體驗。

## Technical Context

**Language/Version**: JavaScript (ES6+)，HTML5，CSS3（瀏覽器環境，無需編譯）
**Primary Dependencies**: 無（Vanilla JavaScript 專案）
**Storage**: N/A（無資料持久化需求）
**Testing**: Jest 29.7.0（jsdom 測試環境）
**Target Platform**: 現代瀏覽器（Chrome, Firefox, Safari, Edge）
**Project Type**: 單一 HTML 檔案（Single-file application）
**Performance Goals**: 運算響應時間 < 1 秒（實際預期 < 100ms）
**Constraints**:
  - 必須與現有 index.html 單檔案架構相容
  - 不引入外部依賴
  - 精確度限制為小數點後 6 位
  - 遵循現有的程式碼風格與命名慣例
**Scale/Scope**:
  - 單一檔案專案（index.html 約 556 行）
  - 新增 1 個核心函數（cube）
  - 新增 1 個 UI 按鈕
  - 新增約 15-20 個測試案例

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

### ✅ 一、可測試性 (NON-NEGOTIABLE)

**Status**: **PASS**

- ✅ 三次方函數（cube）可獨立測試，具有明確的輸入（數字）與輸出（數字³）
- ✅ 每個使用者故事都包含明確的 Given-When-Then 驗收場景
- ✅ P1、P2、P3 使用者故事可各自獨立測試
- ✅ 測試不依賴其他運算功能（四則運算、平方、開根號、三角函數）

### ✅ 二、測試先行 (NON-NEGOTIABLE)

**Status**: **PASS**

- ✅ 規格已定義完整的驗收場景（正數、負數、小數、邊界情況）
- ✅ 測試將先於實作撰寫，遵循 TDD 紅-綠-重構循環
- ✅ 測試架構已存在（tests/unit/ 和 tests/integration/）
- ✅ 所有測試必須經使用者確認後才開始實作

**實施計劃**:
1. 撰寫 cube() 函數的單元測試（tests/unit/cubeOperations.test.js）
2. 執行測試確認失敗（紅燈）
3. 實作 cube() 函數於 index.html
4. 執行測試確認通過（綠燈）
5. 重構並同步更新測試檔案中的函數副本

### ✅ 三、MVP 優先

**Status**: **PASS**

- ✅ 使用者故事已按優先級排序（P1: 基本計算 > P2: 負數 > P3: 小數）
- ✅ P1 故事可獨立交付價值（基本三次方運算即可使用）
- ✅ 每個故事完成後可驗證並部署
- ✅ 不一次性實作所有功能，遵循漸進式開發

**交付順序**:
1. P1: 基本三次方計算（正整數）
2. P2: 負數三次方計算
3. P3: 小數三次方計算

### ✅ 四、拒絕過度設計

**Status**: **PASS**

- ✅ 使用最簡單的實作：直接使用 JavaScript 內建的 `Math.pow(x, 3)` 或 `x ** 3`
- ✅ 不引入額外的抽象層或框架
- ✅ 複用現有的 formatResult()、validateInput()、displayError() 函數
- ✅ 不為未來的通用次方運算（xⁿ）預先設計

**簡單性驗證**:
- 無新增依賴
- 無新增設計模式
- 無新增抽象層
- 直接複用現有工具函數

### ✅ 五、正體中文優先 (NON-NEGOTIABLE)

**Status**: **PASS**

- ✅ 按鈕文字使用正體中文：「x³」
- ✅ 程式碼註解使用正體中文
- ✅ 錯誤訊息使用正體中文
- ✅ 測試描述使用正體中文
- ✅ 函數名稱使用英文（cube），但附正體中文註解

---

### Constitution Check 總結

**✅ 所有憲法檢查通過，無需填寫 Complexity Tracking 表格。**

此功能完全符合專案憲法的五大核心原則，無任何違規或需要特殊豁免的複雜度。

## Project Structure

### Documentation (this feature)

```text
specs/002-cube-operation/
├── plan.md              # 本檔案 (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
│   └── calculator-api.md  # 計算機函數 API 規範
├── checklists/
│   └── requirements.md  # 規格品質檢查清單
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)

```text
# 單一 HTML 檔案專案（現有結構）
index.html              # 主應用程式（包含 HTML、CSS、JavaScript）
                        # 新增內容：
                        # - cube(x) 函數（約第 330 行，與 square/sqrt 相鄰）
                        # - x³ 按鈕 HTML（約第 150 行，工程函數區）
                        # - x³ 按鈕樣式（約第 100 行，CSS 區塊）
                        # - x³ 事件監聽器（約第 540 行，初始化區塊）

tests/
├── unit/                      # 單元測試
│   ├── basicOperations.test.js    # 現有：基本運算測試
│   ├── powerOperations.test.js    # 現有：平方/開根號測試
│   ├── trigOperations.test.js     # 現有：三角函數測試
│   └── cubeOperations.test.js     # 新增：三次方測試（約 20 個測試）
└── integration/               # 整合測試
    └── calculator.integration.test.js  # 更新：新增三次方整合測試場景（約 5 個測試）

package.json            # 現有：NPM 設定
README.md               # 更新：文件中新增三次方功能說明
CLAUDE.md               # 可能更新：新增三次方相關開發指引
```

**Structure Decision**:

本專案採用**單一 HTML 檔案架構**（Single-file application），這是刻意的設計選擇，遵循「拒絕過度設計」原則。所有 HTML、CSS、JavaScript 程式碼都集中在 `index.html` 中，無需建置流程或模組化系統。

**新增內容組織**:
1. **cube() 函數**: 插入在現有的 square() 和 sqrt() 函數附近（核心計算函數區塊）
2. **x³ 按鈕**: 插入在現有的 x² 按鈕旁邊（工程函數按鈕組）
3. **測試檔案**: 新增 cubeOperations.test.js，遵循現有測試檔案的命名與結構慣例
4. **測試函數同步**: 由於測試環境無法直接載入 HTML 中的函數，cube() 函數的副本也需要複製到測試檔案中

## Complexity Tracking

> **填寫條件**: Constitution Check 有違規且必須說明理由時才填寫

**本功能無需填寫此表格** - 所有 Constitution Check 均通過，無複雜度違規。
