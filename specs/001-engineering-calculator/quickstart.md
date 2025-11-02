# 快速開始指南：工程用計算機

**功能**: 工程用計算機
**日期**: 2025-11-01
**目標讀者**: 開發人員

## 📋 概述

本指南將協助您在 5 分鐘內設定並開始開發工程用計算機。

---

## 🎯 開發目標

建立一個網頁版工程用計算機，支援：
- **P1 (MVP)**: 基本四則運算（+, -, ×, ÷）
- **P2**: 平方與開根號（x², √）
- **P3**: 三角函數（sin, cos，度數制）

---

## 🛠️ 環境需求

### 必要工具
- **網頁瀏覽器**: Chrome / Firefox / Safari / Edge（最新版本）
- **文字編輯器**: VS Code / Sublime Text / Notepad++（任何文字編輯器）

### 可選工具
- **Node.js**: v18+ （僅用於執行 Jest 測試，開發階段非必需）
- **Jest**: 測試框架（`npm install --save-dev jest`）

### 無需以下工具
- ❌ 無需 Webpack / Vite / Parcel（無 build 工具）
- ❌ 無需 React / Vue / Angular（純 Vanilla JS）
- ❌ 無需後端伺服器（純前端應用）
- ❌ 無需資料庫（無需儲存）

---

## 🚀 快速開始（3 步驟）

### 步驟 1: 建立專案目錄

```bash
# 切換到專案根目錄（假設已在 calculator/ 目錄）
cd calculator

# 確認當前分支
git branch --show-current
# 應顯示: 001-engineering-calculator
```

### 步驟 2: 建立基本檔案結構

```bash
# 建立 src 目錄
mkdir -p src

# 建立測試目錄
mkdir -p tests/unit tests/integration

# 建立主要 HTML 檔案
touch index.html
```

### 步驟 3: 開始 MVP 開發（P1）

開啟 `index.html`，貼上以下基本結構：

```html
<!DOCTYPE html>
<html lang="zh-TW">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>工程用計算機</title>
    <style>
        /* CSS 樣式將在後續添加 */
    </style>
</head>
<body>
    <div class="calculator">
        <input type="text" id="display" readonly value="0">
        <!-- 按鈕將在後續添加 -->
    </div>

    <script>
        // JavaScript 程式碼將在後續添加
    </script>
</body>
</html>
```

用瀏覽器開啟 `index.html` → ✅ 看到空白計算機介面

---

## 📁 專案結構

### MVP 階段（P1）
```
calculator/
├── index.html          ← 從這裡開始！所有程式碼都在這裡
└── specs/
    └── 001-engineering-calculator/
        ├── spec.md
        ├── plan.md
        ├── research.md
        ├── data-model.md
        ├── quickstart.md (本檔案)
        └── contracts/
```

### 完整階段（P1+P2+P3 後）
```
calculator/
├── index.html
├── src/                ← 當程式碼 > 300 行時分離
│   ├── calculator.js
│   ├── ui.js
│   └── validator.js
├── styles/
│   └── calculator.css
└── tests/
    ├── unit/
    │   ├── basicOperations.test.js
    │   ├── powerOperations.test.js
    │   └── trigOperations.test.js
    └── integration/
        └── calculator.integration.test.js
```

---

## 🧪 測試設定（可選）

如果要執行單元測試（建議但非必需）：

### 1. 初始化 npm 專案

```bash
# 如果還沒有 package.json
npm init -y
```

### 2. 安裝 Jest

```bash
npm install --save-dev jest
```

### 3. 設定 Jest

在 `package.json` 添加測試腳本：

```json
{
  "scripts": {
    "test": "jest"
  },
  "jest": {
    "testEnvironment": "jsdom"
  }
}
```

### 4. 建立第一個測試

建立 `tests/unit/basicOperations.test.js`:

```javascript
// 測試基本運算函數
describe('基本四則運算', () => {
  test('加法: 5 + 3 = 8', () => {
    expect(add(5, 3)).toBe(8);
  });

  test('減法: 10 - 4 = 6', () => {
    expect(subtract(10, 4)).toBe(6);
  });

  test('乘法: 7 × 6 = 42', () => {
    expect(multiply(7, 6)).toBe(42);
  });

  test('除法: 20 ÷ 4 = 5', () => {
    expect(divide(20, 4)).toBe(5);
  });

  test('除以零應拋出錯誤', () => {
    expect(() => divide(5, 0)).toThrow('無法除以零');
  });
});
```

### 5. 執行測試

```bash
npm test
```

---

## 📝 開發流程（TDD）

### 遵循測試先行原則

```
1. 撰寫測試 → 2. 測試失敗（紅燈）→ 3. 實作功能 → 4. 測試通過（綠燈）→ 5. 重構
     ↑                                                                            ↓
     └─────────────────────────── 回到步驟 1（下一個功能）←────────────────────────┘
```

### P1 MVP 開發順序

#### 任務 1: 實作加法（最簡單的功能）

```javascript
// 1. 先寫測試（tests/unit/basicOperations.test.js）
test('加法: 5 + 3 = 8', () => {
  expect(add(5, 3)).toBe(8);
});

// 2. 執行測試 → 失敗（add 函數尚未定義）
npm test

// 3. 實作功能（index.html 的 <script> 區塊）
function add(a, b) {
  return a + b;
}

// 4. 執行測試 → 通過 ✅
npm test

// 5. 重構（如果需要，目前不需要）
```

#### 任務 2-4: 實作減法、乘法、除法

重複上述流程...

#### 任務 5: 實作 UI

```javascript
// 1. 先寫整合測試（tests/integration/calculator.integration.test.js）
test('使用者點擊 5 + 3 = 應顯示 8', () => {
  // 模擬點擊
  clickButton('5');
  clickButton('+');
  clickButton('3');
  clickButton('=');

  // 驗證顯示
  expect(getDisplayValue()).toBe('8');
});

// 2. 實作 UI 互動邏輯
// 3. 手動在瀏覽器中測試
// 4. 調整直到測試通過
```

---

## 🎨 UI 開發指南

### 計算機佈局

```
┌─────────────────────────────┐
│  0                          │ ← 顯示螢幕
├─────────────────────────────┤
│ [C] [√] [x²] [sin] [cos]    │ ← 功能列
├─────────────────────────────┤
│ [7] [8] [9] [÷]             │
│ [4] [5] [6] [×]             │ ← 數字鍵盤
│ [1] [2] [3] [-]             │
│ [0] [.] [=] [+]             │
└─────────────────────────────┘
```

### CSS Grid 佈局範例

```css
.calculator {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 10px;
    max-width: 400px;
    padding: 20px;
    border: 2px solid #333;
    border-radius: 10px;
    background-color: #f0f0f0;
}

#display {
    grid-column: 1 / -1;  /* 佔滿整行 */
    padding: 20px;
    font-size: 2em;
    text-align: right;
    border: 1px solid #999;
    border-radius: 5px;
}

button {
    padding: 20px;
    font-size: 1.5em;
    border: 1px solid #999;
    border-radius: 5px;
    background-color: #fff;
    cursor: pointer;
}

button:hover {
    background-color: #e0e0e0;
}

button.operator {
    background-color: #ff9500;
    color: white;
}
```

---

## 🔍 驗證 MVP 完成

### P1 完成檢查清單

- [ ] ✅ 所有基本運算測試通過
- [ ] ✅ 瀏覽器中可以點擊按鈕
- [ ] ✅ 顯示螢幕正確顯示輸入與結果
- [ ] ✅ 除以零顯示錯誤訊息
- [ ] ✅ 清除（C）按鈕可以重置狀態
- [ ] ✅ 支援小數點輸入
- [ ] ✅ 所有 UI 文字使用正體中文

### 測試方式

```bash
# 1. 執行單元測試
npm test

# 2. 在瀏覽器中手動測試
# 開啟 index.html
# 嘗試以下操作：
# - 5 + 3 = → 應顯示 8
# - 10 - 4 = → 應顯示 6
# - 7 × 6 = → 應顯示 42
# - 20 ÷ 4 = → 應顯示 5
# - 5 ÷ 0 = → 應顯示 "錯誤：無法除以零"
# - C → 應重置為 0
```

---

## 🚦 進階階段（P2 & P3）

完成 P1 後，繼續實作：

### P2: 平方與開根號

```javascript
// 添加函數
function square(x) { return x * x; }
function sqrt(x) {
  if (x < 0) throw new Error('無法對負數開根號');
  return Math.sqrt(x);
}

// 添加 UI 按鈕
<button onclick="handleUnaryOperatorClick('square')">x²</button>
<button onclick="handleUnaryOperatorClick('sqrt')">√</button>
```

### P3: 三角函數

```javascript
// 添加函數
function degreesToRadians(degrees) {
  return degrees * (Math.PI / 180);
}

function sin(degrees) {
  return Math.sin(degreesToRadians(degrees));
}

function cos(degrees) {
  return Math.cos(degreesToRadians(degrees));
}

// 添加 UI 按鈕
<button onclick="handleUnaryOperatorClick('sin')">sin</button>
<button onclick="handleUnaryOperatorClick('cos')">cos</button>
```

---

## 🐛 常見問題

### Q1: 測試顯示 "add is not defined"
**解決**: 確保在測試檔案頂端匯入函數：
```javascript
// 如果函數在 src/calculator.js
const { add, subtract, multiply, divide } = require('../src/calculator.js');
```

### Q2: 浮點數計算不精確（如 0.1 + 0.2 = 0.30000000000000004）
**解決**: 使用 `toFixed()` 格式化結果：
```javascript
function formatResult(value) {
  return parseFloat(value.toFixed(6));
}
```

### Q3: 按鈕點擊沒有反應
**解決**: 檢查是否正確綁定事件監聽器：
```javascript
document.querySelectorAll('button').forEach(button => {
  button.addEventListener('click', () => {
    // 處理點擊
  });
});
```

### Q4: 錯誤訊息沒有顯示
**解決**: 確保使用 try-catch 捕捉錯誤：
```javascript
try {
  const result = divide(a, b);
  updateDisplay(result);
} catch (error) {
  displayError(error.message);
}
```

---

## 📚 參考文件

### 專案文件
- [spec.md](./spec.md) - 功能規格
- [plan.md](./plan.md) - 實作計劃
- [research.md](./research.md) - 技術研究
- [data-model.md](./data-model.md) - 資料模型
- [contracts/calculator-api.md](./contracts/calculator-api.md) - API 合約

### 外部資源
- [MDN: JavaScript](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript)
- [MDN: CSS Grid](https://developer.mozilla.org/zh-TW/docs/Web/CSS/CSS_Grid_Layout)
- [Jest 文件](https://jestjs.io/docs/getting-started)
- [JavaScript Math 物件](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Math)

---

## 🎓 下一步

1. ✅ 完成環境設定（已完成此指南）
2. ⏭️ 執行 `/speckit.tasks` 生成詳細任務清單
3. ⏭️ 開始 TDD 開發：撰寫第一個測試
4. ⏭️ 實作 P1 MVP
5. ⏭️ 驗證 MVP 完成後，繼續 P2 和 P3

---

## 💡 提醒

### 遵循憲法原則
- ✅ **可測試性**: 每個功能都有對應測試
- ✅ **測試先行**: 先寫測試再實作
- ✅ **MVP 優先**: 先完成 P1，驗證後再進行 P2/P3
- ✅ **拒絕過度設計**: 保持簡單，無需框架
- ✅ **正體中文優先**: 所有文字使用正體中文

### 開發紀律
- 📝 每次完成一個功能就提交 Git
- 🧪 測試通過後再進入下一個功能
- 🎯 專注於當前優先級（P1 → P2 → P3）
- 🚫 避免提前實作未來功能

---

**祝開發順利！** 🚀

如有問題，請參考上述文件或開啟 issue 討論。
