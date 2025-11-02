# 研究文件：工程用計算機

**功能**: 工程用計算機
**日期**: 2025-11-01
**目的**: 解決技術背景中的所有決策點，為 Phase 1 設計提供基礎

## 研究任務總覽

根據技術背景，本專案採用 Vanilla JavaScript 建立純前端計算機，無需研究複雜框架或後端技術。以下是關鍵決策點的研究結果。

---

## 決策 1：前端架構選擇

### 決定
使用 **Vanilla JavaScript（無框架）**

### 理由
1. **符合 MVP 原則**: 計算機功能簡單，不需要複雜的狀態管理
2. **避免過度設計**: React/Vue/Angular 會引入不必要的複雜度
3. **學習曲線**: 任何熟悉 JavaScript 的開發者都能立即上手
4. **效能**: 無框架開銷，頁面載入與執行速度最快
5. **可維護性**: 程式碼量小（200-300 行），無需框架抽象

### 考慮的替代方案
- **React**: 功能過於強大，對於簡單計算機是 overkill
- **Vue**: 雖然輕量，但仍增加不必要的依賴
- **jQuery**: 現代瀏覽器原生 DOM API 已足夠，無需額外庫

### 參考資料
- MDN Web Docs: Vanilla JavaScript Best Practices
- "You Might Not Need a Framework" 原則

---

## 決策 2：測試框架選擇

### 決定
使用 **Jest** 作為單元測試框架

### 理由
1. **零配置**: Jest 可快速設定，適合簡單專案
2. **內建斷言**: 不需要額外的 assertion 庫
3. **Mock 支援**: 可以輕鬆 mock DOM 元素
4. **廣泛使用**: 社群支援好，文件完整
5. **快照測試**: 可用於驗證 UI 輸出

### 考慮的替代方案
- **Mocha + Chai**: 需要額外配置，對於小專案過於複雜
- **Vitest**: 較新，但 Jest 更成熟且文件更完整
- **瀏覽器手動測試**: 不可靠且無法自動化

### 測試策略
```javascript
// 單元測試範例
describe('BasicOperations', () => {
  test('add function should return sum of two numbers', () => {
    expect(add(5, 3)).toBe(8);
  });

  test('divide by zero should throw error', () => {
    expect(() => divide(5, 0)).toThrow('無法除以零');
  });
});
```

---

## 決策 3：UI 設計模式

### 決定
使用 **傳統計算機網格佈局 + 顯示螢幕**

### 理由
1. **使用者熟悉**: 模仿實體計算機的佈局，降低學習曲線
2. **簡單實作**: 使用 CSS Grid 可輕鬆實現響應式佈局
3. **可訪問性**: 大按鈕易於點擊，支援鍵盤輸入

### UI 結構
```
┌─────────────────────────┐
│  顯示螢幕（結果顯示）      │
├─────────────────────────┤
│  C   √   x²  sin  cos   │  ← 工程函數列
├─────────────────────────┤
│  7   8   9   ÷          │
│  4   5   6   ×          │  ← 數字與運算鍵盤
│  1   2   3   -          │
│  0   .   =   +          │
└─────────────────────────┘
```

### 考慮的替代方案
- **輸入框模式**: 需要複雜的表達式解析，違反 MVP 原則
- **命令列介面**: 不適合網頁應用的使用者體驗

---

## 決策 4：數值精確度處理

### 決定
使用 **JavaScript 原生 Number 型別 + toFixed(6) 格式化**

### 理由
1. **符合需求**: spec.md 要求精確度至少小數點後 6 位
2. **簡單實作**: 無需引入 BigDecimal 或其他數學庫
3. **效能**: 原生數值運算最快
4. **已知限制**: JavaScript Number 使用 IEEE 754，可能有精確度問題，但對工程計算機足夠

### 精確度處理策略
```javascript
// 格式化結果顯示
function formatResult(value) {
  // 移除尾隨的零
  return parseFloat(value.toFixed(6));
}

// 處理浮點數誤差
function safeAdd(a, b) {
  return parseFloat((a + b).toFixed(10));
}
```

### 考慮的替代方案
- **decimal.js / big.js**: 功能過於強大，增加複雜度
- **Math.js**: 完整的數學庫，對簡單計算機是 overkill

---

## 決策 5：三角函數的度數/弧度轉換

### 決定
**預設使用度數制，內部轉換為弧度後呼叫 Math.sin/cos**

### 理由
1. **符合需求**: spec.md 明確指定使用度數制
2. **工程慣例**: 工程計算機通常預設為度數
3. **使用者友善**: 大多數使用者熟悉度數

### 實作策略
```javascript
// 度數轉弧度
function degreesToRadians(degrees) {
  return degrees * (Math.PI / 180);
}

// sin 函數（輸入為度數）
function sin(degrees) {
  return Math.sin(degreesToRadians(degrees));
}

// cos 函數（輸入為度數）
function cos(degrees) {
  return Math.cos(degreesToRadians(degrees));
}
```

### 未來擴展（非 MVP）
- 可添加度數/弧度切換按鈕（P4 優先級）

---

## 決策 6：錯誤處理策略

### 決定
**使用異常處理 + 清晰的正體中文錯誤訊息**

### 理由
1. **符合憲法**: 正體中文優先原則
2. **使用者體驗**: 立即顯示錯誤，1 秒內回應（符合 SC-006）
3. **可測試**: 錯誤情況可以透過單元測試驗證

### 錯誤類型與訊息
| 錯誤情況 | 錯誤訊息 |
|----------|----------|
| 除以零 | "錯誤：無法除以零" |
| 負數開根號 | "錯誤：無法對負數開根號" |
| 無效輸入 | "錯誤：請輸入有效的數字" |
| 數值溢位 | "錯誤：數值超出範圍" |

### 實作策略
```javascript
// 錯誤處理範例
function divide(a, b) {
  if (b === 0) {
    throw new Error('無法除以零');
  }
  return a / b;
}

function sqrt(x) {
  if (x < 0) {
    throw new Error('無法對負數開根號');
  }
  return Math.sqrt(x);
}

// UI 錯誤顯示
function displayError(errorMessage) {
  const display = document.getElementById('display');
  display.value = errorMessage;
  display.classList.add('error');
  setTimeout(() => {
    display.classList.remove('error');
  }, 2000);
}
```

---

## 決策 7：檔案結構（MVP vs 未來擴展）

### 決定
**Phase 1 (MVP): 單一 HTML 檔案內嵌所有內容**

### 理由
1. **最快啟動**: 直接開啟 index.html 即可執行
2. **無需建置**: 符合"無 build 工具"限制
3. **易於分享**: 單一檔案可直接傳送給使用者
4. **程式碼量小**: P1 階段預計 < 200 行，適合內嵌

### 未來擴展計劃
當程式碼超過 300 行（完成 P2/P3 後），考慮分離：
```
calculator/
├── index.html          # 主要結構
├── src/
│   └── calculator.js   # 邏輯分離
└── styles/
    └── calculator.css  # 樣式分離
```

---

## 決策 8：響應式設計

### 決定
**使用 CSS Grid + Flexbox 實現簡單的響應式佈局**

### 理由
1. **現代標準**: Grid 和 Flexbox 是現代瀏覽器標準
2. **簡單實作**: 無需額外的 CSS 框架
3. **適應不同裝置**: 支援桌面和平板（手機暫不考慮，按鈕太小）

### 響應式策略
```css
.calculator {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  max-width: 400px;
}

@media (max-width: 500px) {
  .calculator {
    max-width: 100%;
    padding: 10px;
  }
}
```

---

## Phase 0 研究總結

### 已解決的技術決策
✅ 前端架構：Vanilla JavaScript
✅ 測試框架：Jest
✅ UI 設計：傳統計算機佈局
✅ 數值精確度：原生 Number + toFixed(6)
✅ 三角函數：度數制（內部轉弧度）
✅ 錯誤處理：異常 + 正體中文訊息
✅ 檔案結構：MVP 單一檔案
✅ 響應式設計：CSS Grid/Flexbox

### 無需澄清的項目
技術背景中沒有 "NEEDS CLARIFICATION" 標記，所有決策都已明確。

### 準備進入 Phase 1
所有技術決策已完成，可以開始 Phase 1：資料模型與合約設計。

---

## 附錄：技術堆疊總覽

| 層級 | 技術 | 版本/規格 |
|------|------|----------|
| 語言 | JavaScript | ES6+ |
| 標記 | HTML | HTML5 |
| 樣式 | CSS | CSS3 (Grid/Flexbox) |
| 測試 | Jest | 最新穩定版 |
| 瀏覽器 | Chrome, Firefox, Safari, Edge | 最新版本 |
| 開發工具 | 無需 bundler | 直接執行 |
