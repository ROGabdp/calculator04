# Data Model: 三次方運算功能

**Feature**: 002-cube-operation
**Date**: 2025-11-02
**Status**: Final

## Overview

三次方運算功能不涉及資料持久化或複雜的資料結構，僅使用簡單的數值運算和狀態管理。本文件記錄與此功能相關的資料實體和狀態管理。

## Core Entities

### 實體 1: 計算機狀態（CalculatorState）

**描述**: 計算機的全域狀態物件，管理當前顯示值、運算符、運算元等資訊。

**屬性**:

| 屬性名稱 | 類型 | 說明 | 範例值 | 驗證規則 |
|---------|------|------|--------|---------|
| `displayValue` | String | 當前顯示在螢幕上的值 | "125" | 必須為有效數字字串 |
| `firstOperand` | Number \| null | 第一個運算元（用於二元運算） | 5 | 可為任意數字或 null |
| `operator` | String \| null | 當前運算符（+, -, ×, ÷） | null | 三次方運算時為 null |
| `waitingForSecondOperand` | Boolean | 是否等待輸入第二個運算元 | false | Boolean |
| `isError` | Boolean | 是否處於錯誤狀態 | false | Boolean |

**狀態轉換** (三次方運算):

```text
初始狀態:
  displayValue = "5"
  firstOperand = null
  operator = null
  waitingForSecondOperand = false
  isError = false

點擊 x³ 按鈕:
  → 執行 cube(5)
  → 結果 = 125
  → displayValue = "125"
  → firstOperand = null (保持不變)
  → operator = null (保持不變)
  → waitingForSecondOperand = false (保持不變)
  → isError = false (保持不變)
```

**與三次方功能的關聯**:
- 三次方運算是**單運算元運算子**，只需要 `displayValue`
- 不修改 `firstOperand`、`operator`、`waitingForSecondOperand`
- 運算完成後更新 `displayValue` 為計算結果

---

### 實體 2: 三次方運算（CubeOperation）

**描述**: 三次方數學運算的邏輯表示。

**屬性**:

| 屬性名稱 | 類型 | 說明 | 範例值 | 驗證規則 |
|---------|------|------|--------|---------|
| `input` | Number | 輸入值（底數） | 5 | 必須為有效數字（實數） |
| `exponent` | Number | 固定為 3 | 3 | 常數，不可變 |
| `output` | Number | 輸出值（結果） | 125 | input<sup>3</sup> |
| `formattedOutput` | String | 格式化後的輸出（小數點後 6 位，移除尾隨零） | "125" | 字串形式的數字 |

**計算公式**:
```
output = input ** 3
formattedOutput = formatResult(output)
```

**範例**:

| input | output | formattedOutput | 說明 |
|-------|--------|----------------|------|
| 2 | 8 | "8" | 基本整數 |
| -2 | -8 | "-8" | 負數 |
| 1.5 | 3.375 | "3.375" | 小數 |
| 0 | 0 | "0" | 零 |
| 10 | 1000 | "1000" | 較大整數 |
| 0.1 | 0.001 | "0.001" | 極小值 |
| 100 | 1000000 | "1000000" | 極大值 |

---

## Validation Rules

### 輸入驗證

**驗證點**: `handleUnaryOperatorClick()` 函數中

**驗證規則**:
1. **有效數字檢查**: 使用 `validateInput(displayValue)` 確保輸入為有效數字
2. **非錯誤狀態**: 如果 `isError === true`，不執行運算
3. **非空值**: `displayValue` 不可為空字串

**驗證失敗處理**:
- 顯示錯誤訊息：「錯誤：請輸入有效的數字」
- 設定 `isError = true`
- 錯誤樣式自動在 2 秒後移除

---

### 輸出格式化

**格式化規則**: 使用現有的 `formatResult()` 函數

1. **精確度**: 小數點後最多 6 位
2. **尾隨零移除**: "3.500000" → "3.5"
3. **整數保持整數**: "8.000000" → "8"
4. **科學記號**: 不使用（即使是極大或極小值）

---

## State Management

### 狀態更新流程（三次方運算）

```text
使用者點擊 x³ 按鈕
    ↓
handleUnaryOperatorClick('cube')
    ↓
驗證 calculatorState.isError === false
    ↓
驗證 calculatorState.displayValue 為有效數字
    ↓
解析 displayValue 為數字（parseFloat）
    ↓
執行 cube(number)
    ↓
結果 = number ** 3
    ↓
formatResult(結果)
    ↓
updateDisplay(格式化後的結果)
    ↓
更新 calculatorState.displayValue
```

### 狀態不變性原則

**三次方運算不修改以下狀態**:
- `firstOperand`: 保持原值
- `operator`: 保持原值
- `waitingForSecondOperand`: 保持原值

**原因**: 三次方是單運算元運算子，不參與二元運算的狀態管理

---

## Error Handling

### 錯誤類型

| 錯誤類型 | 觸發條件 | 錯誤訊息 | 處理方式 |
|---------|---------|---------|---------|
| 無效輸入 | displayValue 不是有效數字 | "錯誤：請輸入有效的數字" | displayError(), isError = true |
| 已處於錯誤狀態 | isError === true | （不執行運算） | 靜默失敗，等待使用者清除錯誤 |
| 結果溢出 | 結果 > Number.MAX_VALUE | "Infinity" | 由 JavaScript 自動處理，顯示為字串 "Infinity" |

### 錯誤恢復

**恢復機制**: 使用者點擊 C（清除）按鈕

```javascript
resetCalculator()
    ↓
displayValue = '0'
firstOperand = null
operator = null
waitingForSecondOperand = false
isError = false
```

---

## Data Flow Diagram

```
使用者輸入數字 → displayValue (String)
         ↓
    點擊 x³ 按鈕
         ↓
    驗證輸入 (validateInput)
         ↓
    parseFloat(displayValue) → Number
         ↓
    cube(number) → result (Number)
         ↓
    formatResult(result) → formattedResult (String)
         ↓
    updateDisplay(formattedResult)
         ↓
    displayValue = formattedResult
         ↓
    顯示在螢幕上
```

---

## Integration with Existing Data Model

### 與現有功能的資料相容性

**相容性驗證**:

| 功能 | 資料流程 | 與三次方的相容性 | 備註 |
|------|---------|----------------|------|
| 四則運算 (+, -, ×, ÷) | 使用 firstOperand + operator + secondOperand | ✅ 完全相容 | 三次方不修改這些狀態 |
| 平方 (x²) | 單運算元，與三次方相同模式 | ✅ 完全相容 | 相同的事件處理邏輯 |
| 開根號 (√) | 單運算元，與三次方相同模式 | ✅ 完全相容 | 相同的事件處理邏輯 |
| 三角函數 (sin, cos) | 單運算元，與三次方相同模式 | ✅ 完全相容 | 相同的事件處理邏輯 |
| 清除 (C) | 重置所有狀態 | ✅ 完全相容 | 三次方不引入新狀態 |

**結論**: 三次方功能完全相容現有資料模型，無需修改現有狀態結構。

---

## Performance Considerations

### 記憶體使用

**狀態物件大小**: 不變（三次方不新增屬性）

**函數記憶體**: 約 1KB（cube 函數和事件監聽器）

**總計**: 可忽略，< 1KB

---

### 計算效能

**運算複雜度**: O(1)（固定時間）

**預期執行時間**: < 1ms

**瓶頸**: 無（JavaScript 原生運算極快）

---

## Testing Data Sets

### 單元測試資料集

**正整數**:
```javascript
[0, 1, 2, 3, 5, 10, 100]
```

**負整數**:
```javascript
[-1, -2, -5, -10]
```

**小數**:
```javascript
[0.5, 1.5, 2.5, 0.1, 0.01]
```

**邊界值**:
```javascript
[Number.MIN_VALUE, Number.MAX_SAFE_INTEGER, 1e10, 1e-10]
```

---

### 整合測試場景資料

**場景 1**: 基本運算
```
輸入: "5" → 點擊 x³ → 預期: "125"
```

**場景 2**: 連續運算
```
輸入: "2" → 點擊 x³ → "8" → 再點擊 x³ → 預期: "512"
```

**場景 3**: 混合運算
```
輸入: "2" → 點擊 x³ → "8" → 點擊 + → 輸入 "2" → 點擊 = → 預期: "10"
```

**場景 4**: 錯誤處理
```
輸入: "abc" → 點擊 x³ → 預期: 顯示錯誤訊息
```

---

## Conclusion

三次方功能的資料模型極其簡單，不引入新的資料結構或狀態，完全複用現有的 `calculatorState` 物件和工具函數。所有資料流程都遵循現有模式，確保與其他功能的完全相容性。
