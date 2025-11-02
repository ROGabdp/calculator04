# Calculator API Contract: 三次方運算功能

**Feature**: 002-cube-operation
**Date**: 2025-11-02
**Version**: 1.0.0

## Overview

本文件定義三次方運算功能的 JavaScript 函數 API 規範。由於這是單檔案瀏覽器應用程式，此「API」指的是內部函數介面，而非 HTTP API。

## Function Contracts

### 核心函數: `cube(x)`

**描述**: 計算輸入數字的三次方。

**簽名**:
```javascript
function cube(x: number): string
```

**參數**:

| 參數名 | 類型 | 必填 | 說明 | 約束 |
|--------|------|------|------|------|
| `x` | Number | ✅ | 要計算三次方的數字（底數） | 任意實數（正數、負數、零、小數） |

**返回值**:

| 類型 | 說明 | 格式 |
|------|------|------|
| String | 格式化後的三次方結果 | 小數點後最多 6 位，移除尾隨零 |

**行為**:
1. 計算 `x ** 3`
2. 使用 `formatResult()` 格式化結果
3. 返回格式化後的字串

**範例**:

```javascript
// 正整數
cube(2)   // 返回 "8"
cube(5)   // 返回 "125"
cube(10)  // 返回 "1000"

// 零和一
cube(0)   // 返回 "0"
cube(1)   // 返回 "1"

// 負數
cube(-2)  // 返回 "-8"
cube(-5)  // 返回 "-125"

// 小數
cube(1.5) // 返回 "3.375"
cube(0.5) // 返回 "0.125"
cube(2.5) // 返回 "15.625"
```

**錯誤處理**:
- 此函數**不拋出錯誤**
- 輸入驗證在呼叫層（`handleUnaryOperatorClick`）進行
- 無效輸入不應傳遞給此函數

**效能保證**:
- 執行時間: < 1ms（典型 < 0.1ms）
- 記憶體使用: 可忽略

---

### 事件處理函數: `handleUnaryOperatorClick(operator)`

**描述**: 處理單運算元運算子的點擊事件（包括三次方、平方、開根號、三角函數）。

**簽名**:
```javascript
function handleUnaryOperatorClick(operator: string): void
```

**參數**:

| 參數名 | 類型 | 必填 | 說明 | 有效值 |
|--------|------|------|------|--------|
| `operator` | String | ✅ | 運算子識別碼 | 'cube', 'square', 'sqrt', 'sin', 'cos' |

**返回值**: `void`（無返回值，直接更新 UI）

**行為** (針對 'cube'):
1. 檢查 `calculatorState.isError` 是否為 `false`
2. 檢查 `calculatorState.displayValue` 是否為有效數字
3. 解析 `displayValue` 為數字（`parseFloat`）
4. 呼叫 `cube(number)`
5. 使用 `updateDisplay()` 更新顯示結果
6. 更新 `calculatorState.displayValue`

**範例**:

```javascript
// 使用者輸入 5 後點擊 x³ 按鈕
calculatorState.displayValue = "5";
handleUnaryOperatorClick('cube');
// 結果: calculatorState.displayValue = "125"
//       螢幕顯示 "125"
```

**錯誤處理**:

```javascript
// 無效輸入
calculatorState.displayValue = "abc";
handleUnaryOperatorClick('cube');
// 結果: 顯示錯誤訊息「錯誤：請輸入有效的數字」
//       calculatorState.isError = true

// 已處於錯誤狀態
calculatorState.isError = true;
handleUnaryOperatorClick('cube');
// 結果: 靜默失敗，不執行運算
```

**副作用**:
- 更新 `calculatorState.displayValue`
- 更新 DOM（顯示螢幕）
- 可能更新 `calculatorState.isError`（若輸入無效）

---

### 輔助函數: `validateInput(input)`

**描述**: 驗證輸入字串是否為有效數字。

**簽名**:
```javascript
function validateInput(input: string): boolean
```

**參數**:

| 參數名 | 類型 | 必填 | 說明 |
|--------|------|------|------|
| `input` | String | ✅ | 要驗證的輸入字串 |

**返回值**:

| 類型 | 說明 |
|------|------|
| Boolean | `true` 表示有效數字，`false` 表示無效 |

**範例**:

```javascript
validateInput("123")     // true
validateInput("-45.6")   // true
validateInput("0.123")   // true
validateInput("abc")     // false
validateInput("")        // false
validateInput("12.34.56") // false
```

**使用場景**: 在 `handleUnaryOperatorClick()` 中驗證 `displayValue`

---

### 輔助函數: `formatResult(value)`

**描述**: 格式化數值結果為字串，保留小數點後 6 位，移除尾隨零。

**簽名**:
```javascript
function formatResult(value: number): string
```

**參數**:

| 參數名 | 類型 | 必填 | 說明 |
|--------|------|------|------|
| `value` | Number | ✅ | 要格式化的數值 |

**返回值**:

| 類型 | 說明 | 格式 |
|------|------|------|
| String | 格式化後的數字字串 | 小數點後最多 6 位，尾隨零已移除 |

**範例**:

```javascript
formatResult(125)       // "125"
formatResult(3.375)     // "3.375"
formatResult(3.500000)  // "3.5"
formatResult(0.001)     // "0.001"
formatResult(1000000)   // "1000000"
```

**使用場景**: 在 `cube()` 函數中格式化結果

---

### 輔助函數: `updateDisplay(value)`

**描述**: 更新計算機螢幕顯示。

**簽名**:
```javascript
function updateDisplay(value: string): void
```

**參數**:

| 參數名 | 類型 | 必填 | 說明 |
|--------|------|------|------|
| `value` | String | ✅ | 要顯示的值 |

**返回值**: `void`

**行為**:
1. 取得 DOM 元素 `#display`
2. 設定其 `value` 或 `textContent` 為 `value`
3. 更新 `calculatorState.displayValue = value`

**副作用**:
- 更新 DOM
- 更新 `calculatorState.displayValue`

---

### 輔助函數: `displayError(message)`

**描述**: 顯示錯誤訊息並標記錯誤狀態。

**簽名**:
```javascript
function displayError(message: string): void
```

**參數**:

| 參數名 | 類型 | 必填 | 說明 |
|--------|------|------|------|
| `message` | String | ✅ | 錯誤訊息（正體中文） |

**返回值**: `void`

**行為**:
1. 設定 `calculatorState.isError = true`
2. 在螢幕上顯示錯誤訊息
3. 新增錯誤樣式到顯示元素
4. 2 秒後自動移除錯誤樣式

**範例**:

```javascript
displayError("錯誤：請輸入有效的數字");
// 結果: 螢幕顯示紅色錯誤訊息
//       2 秒後錯誤樣式自動消失
```

**使用場景**: 在 `handleUnaryOperatorClick()` 驗證失敗時呼叫

---

## Event Listener Contract

### 三次方按鈕事件

**事件類型**: `click`

**DOM 選擇器**: `.cube-btn` 或 `#cubeBtn`（待實作時決定）

**事件處理器**:

```javascript
document.querySelector('.cube-btn').addEventListener('click', () => {
  handleUnaryOperatorClick('cube');
});
```

**觸發時機**: 使用者點擊 x³ 按鈕

**前置條件**: 無（驗證在 `handleUnaryOperatorClick` 中進行）

**後置條件**:
- 若輸入有效：顯示三次方結果
- 若輸入無效：顯示錯誤訊息

---

## State Contract

### CalculatorState 物件

**類型定義**:

```typescript
interface CalculatorState {
  displayValue: string;      // 當前顯示值
  firstOperand: number | null;  // 第一個運算元（二元運算用）
  operator: string | null;   // 運算符（二元運算用）
  waitingForSecondOperand: boolean;  // 是否等待第二個運算元
  isError: boolean;          // 錯誤狀態標記
}
```

**初始狀態**:

```javascript
const calculatorState = {
  displayValue: '0',
  firstOperand: null,
  operator: null,
  waitingForSecondOperand: false,
  isError: false
};
```

**三次方運算對狀態的影響**:

| 屬性 | 修改 | 說明 |
|------|------|------|
| `displayValue` | ✅ | 更新為三次方結果 |
| `firstOperand` | ❌ | 不修改 |
| `operator` | ❌ | 不修改 |
| `waitingForSecondOperand` | ❌ | 不修改 |
| `isError` | ⚠️ | 若輸入無效則設為 `true` |

---

## Integration Points

### 與現有函數的整合

**複用的函數**:
1. `validateInput()` - 輸入驗證
2. `formatResult()` - 結果格式化
3. `updateDisplay()` - 更新顯示
4. `displayError()` - 錯誤處理
5. `handleUnaryOperatorClick()` - 事件處理（可能需要擴展）

**新增的函數**:
1. `cube()` - 三次方計算

**修改的函數**: 無（或僅擴展 `handleUnaryOperatorClick()` 以支援 'cube' 參數）

---

## Testing Contract

### 單元測試介面

**測試檔案**: `tests/unit/cubeOperations.test.js`

**測試函數**（複製自 index.html）:

```javascript
// 測試環境中的函數副本
function cube(x) {
  const result = x ** 3;
  return formatResult(result);
}

function formatResult(value) {
  // 與 index.html 相同的實作
}
```

**測試案例結構**:

```javascript
describe('cube 函數', () => {
  describe('基本功能測試', () => {
    it('應該正確計算正整數的三次方', () => {
      expect(cube(2)).toBe('8');
      expect(cube(5)).toBe('125');
    });
  });

  describe('負數測試', () => {
    it('應該正確計算負數的三次方', () => {
      expect(cube(-2)).toBe('-8');
    });
  });

  describe('小數測試', () => {
    it('應該正確計算小數的三次方', () => {
      expect(cube(1.5)).toBe('3.375');
    });
  });
});
```

---

### 整合測試介面

**測試檔案**: `tests/integration/calculator.integration.test.js`

**測試場景**:

```javascript
describe('三次方整合測試', () => {
  it('應該能執行基本三次方運算', () => {
    // 模擬輸入 5
    // 點擊 x³ 按鈕
    // 驗證顯示 "125"
  });

  it('應該能連續執行三次方運算', () => {
    // 模擬輸入 2 → x³ → 8
    // 再次點擊 x³ → 512
  });

  it('應該處理無效輸入', () => {
    // 模擬輸入 "abc"
    // 點擊 x³
    // 驗證顯示錯誤訊息
  });
});
```

---

## Performance Contract

### 效能保證

| 指標 | 保證值 | 實際預期 |
|------|--------|---------|
| `cube()` 執行時間 | < 1ms | < 0.1ms |
| `handleUnaryOperatorClick('cube')` 總時間 | < 100ms | < 50ms |
| UI 更新延遲 | < 1 秒 | < 100ms |
| 記憶體增量 | < 10KB | < 1KB |

---

## Error Contract

### 錯誤類型

| 錯誤類型 | HTTP 狀態碼 (N/A) | 錯誤訊息 | 恢復方式 |
|---------|------------------|---------|---------|
| 無效輸入 | N/A | "錯誤：請輸入有效的數字" | 點擊 C 清除 |
| 已處於錯誤狀態 | N/A | （無訊息） | 點擊 C 清除 |

### 錯誤回應格式

**顯示方式**: 直接在計算機螢幕上顯示錯誤訊息（紅色背景）

**自動恢復**: 錯誤樣式在 2 秒後自動移除（但 `isError` 狀態保持，直到使用者點擊 C）

---

## Versioning & Compatibility

**版本**: 1.0.0（與功能同步）

**向後相容性**: ✅ 完全相容現有功能

**中斷性變更**: 無

**棄用**: 無

---

## Security Considerations

**輸入驗證**: ✅ 使用 `validateInput()` 防止注入攻擊

**XSS 防護**: ✅ 數值運算結果不包含 HTML，無 XSS 風險

**DoS 防護**: ✅ 純客戶端運算，無伺服器端 DoS 風險

---

## Conclusion

此 API 規範定義了三次方功能的所有函數介面、狀態管理和整合點。所有函數簽名都明確定義了參數、返回值和行為，便於 TDD 開發和未來維護。
