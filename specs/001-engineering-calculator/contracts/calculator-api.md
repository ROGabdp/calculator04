# 計算機 API 合約

**功能**: 工程用計算機
**日期**: 2025-11-01
**類型**: JavaScript 函數 API

## 概述

本文件定義計算機的 JavaScript API 合約（函數簽章與行為）。由於這是純前端應用，沒有 REST API 或 GraphQL，而是定義 JavaScript 模組的公開介面。

---

## 1. 核心計算 API（Core Calculation API）

### 1.1 基本運算函數（P1）

#### `add(a, b)`
**描述**: 執行加法運算

**參數**:
- `a` (number): 第一個運算元
- `b` (number): 第二個運算元

**回傳值**:
- `number`: 兩數之和

**錯誤**:
- 無（加法不會失敗）

**範例**:
```javascript
add(5, 3);     // 回傳 8
add(-5, 3);    // 回傳 -2
add(2.5, 3.7); // 回傳 6.2
```

---

#### `subtract(a, b)`
**描述**: 執行減法運算

**參數**:
- `a` (number): 被減數
- `b` (number): 減數

**回傳值**:
- `number`: 兩數之差

**錯誤**:
- 無

**範例**:
```javascript
subtract(10, 4);  // 回傳 6
subtract(5, 10);  // 回傳 -5
```

---

#### `multiply(a, b)`
**描述**: 執行乘法運算

**參數**:
- `a` (number): 第一個運算元
- `b` (number): 第二個運算元

**回傳值**:
- `number`: 兩數之積

**錯誤**:
- 無

**範例**:
```javascript
multiply(7, 6);    // 回傳 42
multiply(-3, 4);   // 回傳 -12
multiply(2.5, 4);  // 回傳 10
```

---

#### `divide(a, b)`
**描述**: 執行除法運算

**參數**:
- `a` (number): 被除數
- `b` (number): 除數

**回傳值**:
- `number`: 兩數之商

**錯誤**:
- `Error`: 當 `b === 0` 時，拋出 `"無法除以零"`

**範例**:
```javascript
divide(20, 4);   // 回傳 5
divide(7, 2);    // 回傳 3.5
divide(5, 0);    // 拋出 Error("無法除以零")
```

---

### 1.2 單運算元函數（P2）

#### `square(x)`
**描述**: 計算數字的平方

**參數**:
- `x` (number): 要計算平方的數字

**回傳值**:
- `number`: x 的平方（x²）

**錯誤**:
- 無

**範例**:
```javascript
square(5);    // 回傳 25
square(-3);   // 回傳 9
square(2.5);  // 回傳 6.25
```

---

#### `sqrt(x)`
**描述**: 計算數字的平方根

**參數**:
- `x` (number): 要計算平方根的數字

**回傳值**:
- `number`: x 的平方根（√x）

**錯誤**:
- `Error`: 當 `x < 0` 時，拋出 `"無法對負數開根號"`

**範例**:
```javascript
sqrt(25);   // 回傳 5
sqrt(100);  // 回傳 10
sqrt(2);    // 回傳 1.414214
sqrt(-4);   // 拋出 Error("無法對負數開根號")
```

---

### 1.3 三角函數（P3）

#### `sin(degrees)`
**描述**: 計算角度的正弦值（輸入為度數）

**參數**:
- `degrees` (number): 角度值（度數制）

**回傳值**:
- `number`: sin 值（範圍 -1 到 1）

**錯誤**:
- 無

**內部實作**: 將度數轉換為弧度後呼叫 `Math.sin()`

**範例**:
```javascript
sin(0);    // 回傳 0
sin(30);   // 回傳 0.5
sin(90);   // 回傳 1
sin(180);  // 回傳 0 (近似值，實際可能是極小的浮點數)
```

---

#### `cos(degrees)`
**描述**: 計算角度的餘弦值（輸入為度數）

**參數**:
- `degrees` (number): 角度值（度數制）

**回傳值**:
- `number`: cos 值（範圍 -1 到 1）

**錯誤**:
- 無

**內部實作**: 將度數轉換為弧度後呼叫 `Math.cos()`

**範例**:
```javascript
cos(0);    // 回傳 1
cos(60);   // 回傳 0.5
cos(90);   // 回傳 0 (近似值)
cos(180);  // 回傳 -1
```

---

## 2. 工具函數 API（Utility API）

### `degreesToRadians(degrees)`
**描述**: 將度數轉換為弧度（內部使用）

**參數**:
- `degrees` (number): 度數

**回傳值**:
- `number`: 弧度值

**範例**:
```javascript
degreesToRadians(180);  // 回傳 Math.PI (3.14159...)
degreesToRadians(90);   // 回傳 Math.PI / 2 (1.5708...)
```

---

### `formatResult(value)`
**描述**: 格式化計算結果顯示

**參數**:
- `value` (number): 要格式化的數值

**回傳值**:
- `string`: 格式化後的字串（小數點後最多 6 位，移除尾隨零）

**範例**:
```javascript
formatResult(8);         // 回傳 "8"
formatResult(3.5);       // 回傳 "3.5"
formatResult(1.234567);  // 回傳 "1.234567"
formatResult(5.000000);  // 回傳 "5"
formatResult(1.23e10);   // 回傳 "1.23e+10"
```

---

## 3. 驗證 API（Validation API）

### `validateInput(input)`
**描述**: 驗證使用者輸入是否為有效數字

**參數**:
- `input` (string): 使用者輸入的字串

**回傳值**:
- `ValidationResult` 物件:
  ```javascript
  {
    isValid: boolean,      // 是否有效
    errorMessage: string | null,  // 錯誤訊息
    value: number | null   // 解析後的數值
  }
  ```

**驗證規則**:
- 必須是有效的數字格式
- 只能有一個小數點
- 可以有負號（只能在開頭）
- 不允許其他非數字字元

**範例**:
```javascript
validateInput("123");
// 回傳 { isValid: true, errorMessage: null, value: 123 }

validateInput("12.34");
// 回傳 { isValid: true, errorMessage: null, value: 12.34 }

validateInput("abc");
// 回傳 { isValid: false, errorMessage: "請輸入有效的數字", value: null }

validateInput("12.34.56");
// 回傳 { isValid: false, errorMessage: "請輸入有效的數字", value: null }
```

---

## 4. 狀態管理 API（State Management API）

### `resetCalculator()`
**描述**: 重置計算機狀態（清除功能）

**參數**: 無

**回傳值**:
- `CalculatorState`: 重置後的狀態物件

**範例**:
```javascript
resetCalculator();
// 回傳 {
//   displayValue: "0",
//   firstOperand: null,
//   operator: null,
//   waitingForSecondOperand: false,
//   isError: false
// }
```

---

### `updateDisplay(value)`
**描述**: 更新顯示螢幕的值

**參數**:
- `value` (string): 要顯示的值

**回傳值**: 無（直接更新 DOM）

**副作用**: 更新 `<input id="display">` 的值

**範例**:
```javascript
updateDisplay("123");     // 顯示螢幕顯示 "123"
updateDisplay("錯誤：無法除以零");  // 顯示錯誤訊息
```

---

### `displayError(errorMessage)`
**描述**: 顯示錯誤訊息並設定錯誤狀態

**參數**:
- `errorMessage` (string): 錯誤訊息

**回傳值**: 無

**副作用**:
- 更新顯示螢幕顯示錯誤訊息
- 添加錯誤樣式類別（紅色背景）
- 2 秒後移除錯誤樣式

**範例**:
```javascript
displayError("無法除以零");
// 顯示螢幕變紅，顯示 "錯誤：無法除以零"
// 2 秒後移除紅色背景
```

---

## 5. 事件處理 API（Event Handling API）

### `handleNumberClick(digit)`
**描述**: 處理數字按鈕點擊

**參數**:
- `digit` (string): 被點擊的數字（"0" 到 "9" 或 "."）

**回傳值**: 無

**副作用**: 更新 `displayValue`

**範例**:
```javascript
// 使用者點擊 "5"
handleNumberClick("5");  // displayValue 變為 "5"

// 使用者再點擊 "3"
handleNumberClick("3");  // displayValue 變為 "53"
```

---

### `handleOperatorClick(operator)`
**描述**: 處理運算子按鈕點擊

**參數**:
- `operator` (string): 運算子符號（"+", "-", "×", "÷"）

**回傳值**: 無

**副作用**:
- 儲存 `firstOperand`
- 設定 `operator`
- 設定 `waitingForSecondOperand = true`

**範例**:
```javascript
// 使用者輸入 "5" 後點擊 "+"
handleOperatorClick("+");
// state.firstOperand = 5
// state.operator = "+"
// state.waitingForSecondOperand = true
```

---

### `handleEqualsClick()`
**描述**: 處理等號按鈕點擊，執行計算

**參數**: 無

**回傳值**: 無

**副作用**:
- 執行計算
- 更新 `displayValue` 為結果
- 重置運算狀態

**錯誤處理**:
- 捕捉計算錯誤並顯示錯誤訊息

**範例**:
```javascript
// 狀態: firstOperand=5, operator="+", displayValue="3"
handleEqualsClick();
// 執行: add(5, 3) = 8
// displayValue 變為 "8"
// state 重置
```

---

### `handleClearClick()`
**描述**: 處理清除按鈕點擊

**參數**: 無

**回傳值**: 無

**副作用**: 呼叫 `resetCalculator()` 並更新顯示

**範例**:
```javascript
handleClearClick();
// 所有狀態重置
// displayValue 顯示 "0"
```

---

### `handleUnaryOperatorClick(operator)`
**描述**: 處理單運算元運算子點擊（√, x², sin, cos）

**參數**:
- `operator` (string): 運算子符號（"sqrt", "square", "sin", "cos"）

**回傳值**: 無

**副作用**:
- 立即執行計算
- 更新 `displayValue` 為結果
- 不改變其他狀態（單運算元操作獨立執行）

**錯誤處理**:
- 捕捉計算錯誤並顯示錯誤訊息

**範例**:
```javascript
// displayValue = "25"
handleUnaryOperatorClick("sqrt");
// 立即執行: sqrt(25) = 5
// displayValue 變為 "5"
```

---

## 6. 測試合約（Test Contracts）

### 單元測試應涵蓋的情境

#### 基本運算測試（P1）
```javascript
// 加法測試
expect(add(5, 3)).toBe(8);
expect(add(-5, 3)).toBe(-2);
expect(add(2.5, 3.7)).toBeCloseTo(6.2);

// 減法測試
expect(subtract(10, 4)).toBe(6);
expect(subtract(5, 10)).toBe(-5);

// 乘法測試
expect(multiply(7, 6)).toBe(42);
expect(multiply(-3, 4)).toBe(-12);

// 除法測試
expect(divide(20, 4)).toBe(5);
expect(() => divide(5, 0)).toThrow("無法除以零");
```

#### 單運算元測試（P2）
```javascript
// 平方測試
expect(square(5)).toBe(25);
expect(square(-3)).toBe(9);

// 開根號測試
expect(sqrt(25)).toBe(5);
expect(() => sqrt(-4)).toThrow("無法對負數開根號");
```

#### 三角函數測試（P3）
```javascript
// sin 測試
expect(sin(0)).toBeCloseTo(0, 6);
expect(sin(30)).toBeCloseTo(0.5, 6);
expect(sin(90)).toBeCloseTo(1, 6);

// cos 測試
expect(cos(0)).toBeCloseTo(1, 6);
expect(cos(60)).toBeCloseTo(0.5, 6);
expect(cos(90)).toBeCloseTo(0, 6);
```

#### 驗證測試
```javascript
expect(validateInput("123").isValid).toBe(true);
expect(validateInput("abc").isValid).toBe(false);
expect(validateInput("12.34").isValid).toBe(true);
expect(validateInput("12.34.56").isValid).toBe(false);
```

---

## 7. 錯誤處理合約

### 錯誤類型與訊息標準

| 錯誤情況 | 拋出方式 | 錯誤訊息 | HTTP 狀態碼 (N/A) |
|----------|----------|----------|-------------------|
| 除以零 | `throw new Error()` | "無法除以零" | N/A（前端） |
| 負數開根號 | `throw new Error()` | "無法對負數開根號" | N/A |
| 無效輸入 | 回傳 ValidationResult | "請輸入有效的數字" | N/A |
| 數值溢位 | `throw new Error()` | "數值超出範圍" | N/A |

### 錯誤處理流程
```javascript
try {
  const result = divide(a, b);
  updateDisplay(formatResult(result));
} catch (error) {
  displayError(error.message);
}
```

---

## 8. 版本與相容性

**API 版本**: 1.0.0
**目標瀏覽器**:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

**ES 標準**: ES6+ (ECMAScript 2015+)

---

## 9. 效能合約

### 回應時間要求
- 所有計算函數應在 < 1ms 內完成
- UI 更新應在 < 50ms 內反映
- 按鈕點擊回應 < 100ms

### 記憶體使用
- 計算機狀態物件 < 1KB
- 無記憶體洩漏（無事件監聽器累積）

---

## 10. 未來擴展保留介面（非 MVP）

以下 API 為未來可能添加的功能預留，目前不實作：

```javascript
// 歷史記錄（未實作）
getHistory(): HistoryEntry[]
addToHistory(entry: HistoryEntry): void
clearHistory(): void

// 設定管理（未實作）
setSetting(key: string, value: any): void
getSetting(key: string): any

// 鍵盤支援（未實作）
handleKeyPress(event: KeyboardEvent): void
```

---

## 總結

本 API 合約定義了工程用計算機的所有公開函數介面，包括：

- ✅ 核心計算 API（8 個運算函數）
- ✅ 工具函數 API（格式化、轉換）
- ✅ 驗證 API（輸入驗證）
- ✅ 狀態管理 API（重置、更新）
- ✅ 事件處理 API（使用者互動）
- ✅ 錯誤處理合約
- ✅ 測試合約
- ✅ 效能要求

所有函數都有明確的輸入、輸出、錯誤處理規範，確保實作的一致性與可測試性。
