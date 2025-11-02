# 資料模型：工程用計算機

**功能**: 工程用計算機
**日期**: 2025-11-01
**目的**: 定義計算機核心實體及其屬性與關係

---

## 概述

工程用計算機是純前端應用，無需後端資料庫。資料模型描述的是運行時的 JavaScript 物件結構與狀態管理。

---

## 核心實體

### 1. CalculatorState（計算機狀態）

**描述**: 計算機當前的運行狀態，包含顯示值、當前運算等資訊

**屬性**:

| 屬性名稱 | 型別 | 必填 | 描述 | 預設值 |
|---------|------|------|------|--------|
| `displayValue` | string | ✅ | 顯示螢幕上的值 | "0" |
| `firstOperand` | number \| null | ✅ | 第一個運算元 | null |
| `operator` | string \| null | ✅ | 當前運算子 (+, -, ×, ÷, sqrt, power, sin, cos) | null |
| `waitingForSecondOperand` | boolean | ✅ | 是否等待輸入第二個運算元 | false |
| `isError` | boolean | ✅ | 當前是否處於錯誤狀態 | false |

**狀態轉換**:
```
初始狀態 → 輸入第一個運算元 → 選擇運算子 → 輸入第二個運算元 → 顯示結果
   ↑                                                                        ↓
   └────────────────────────── 重置（C 按鈕）←──────────────────────────────┘
```

**驗證規則**:
- `displayValue` 必須是有效的數字字串或錯誤訊息
- `firstOperand` 在選擇運算子後必須有值
- `operator` 必須是支援的運算子之一
- 錯誤狀態下，`isError` 為 true，`displayValue` 顯示錯誤訊息

---

### 2. Operation（運算操作）

**描述**: 定義單一運算操作的行為

**屬性**:

| 屬性名稱 | 型別 | 必填 | 描述 |
|---------|------|------|------|
| `type` | string | ✅ | 運算類型：'binary'（雙運算元）或 'unary'（單運算元） |
| `symbol` | string | ✅ | 運算子符號（+, -, ×, ÷, √, x², sin, cos） |
| `execute` | function | ✅ | 執行運算的函數 |
| `priority` | string | ✅ | 優先級：'P1', 'P2', 'P3' |

**運算類型**:

#### 雙運算元運算（Binary Operations）
需要兩個輸入值的運算

| 運算 | 符號 | 函數簽章 | 優先級 |
|------|------|----------|--------|
| 加法 | + | `add(a: number, b: number): number` | P1 |
| 減法 | - | `subtract(a: number, b: number): number` | P1 |
| 乘法 | × | `multiply(a: number, b: number): number` | P1 |
| 除法 | ÷ | `divide(a: number, b: number): number` | P1 |

#### 單運算元運算（Unary Operations）
只需要一個輸入值的運算

| 運算 | 符號 | 函數簽章 | 優先級 |
|------|------|----------|--------|
| 平方 | x² | `square(x: number): number` | P2 |
| 開根號 | √ | `sqrt(x: number): number` | P2 |
| 正弦 | sin | `sin(degrees: number): number` | P3 |
| 餘弦 | cos | `cos(degrees: number): number` | P3 |

---

### 3. ValidationResult（驗證結果）

**描述**: 輸入驗證的結果

**屬性**:

| 屬性名稱 | 型別 | 必填 | 描述 |
|---------|------|------|------|
| `isValid` | boolean | ✅ | 輸入是否有效 |
| `errorMessage` | string \| null | ✅ | 錯誤訊息（如果無效） |
| `value` | number \| null | ✅ | 解析後的數值（如果有效） |

**驗證規則**:
- 輸入必須是有效的數字格式（整數或浮點數）
- 不允許多個小數點
- 不允許非數字字元（除了小數點和負號）

---

### 4. CalculationResult（計算結果）

**描述**: 計算操作的結果

**屬性**:

| 屬性名稱 | 型別 | 必填 | 描述 |
|---------|------|------|------|
| `success` | boolean | ✅ | 計算是否成功 |
| `value` | number \| null | ✅ | 計算結果值 |
| `error` | string \| null | ✅ | 錯誤訊息（如果失敗） |

**可能的錯誤情況**:
- 除以零：`"錯誤：無法除以零"`
- 負數開根號：`"錯誤：無法對負數開根號"`
- 數值溢位：`"錯誤：數值超出範圍"`
- 無效輸入：`"錯誤：請輸入有效的數字"`

---

## 實體關係圖

```
┌─────────────────────┐
│  CalculatorState    │
│  - displayValue     │◄──── 使用者輸入
│  - firstOperand     │
│  - operator         │
│  - waiting...       │
│  - isError          │
└──────────┬──────────┘
           │ 使用
           ▼
┌─────────────────────┐
│    Operation        │
│  - type             │
│  - symbol           │
│  - execute()        │────► 執行運算
│  - priority         │
└──────────┬──────────┘
           │ 產生
           ▼
┌─────────────────────┐
│ CalculationResult   │
│  - success          │
│  - value            │
│  - error            │
└─────────────────────┘

┌─────────────────────┐
│ ValidationResult    │◄──── 輸入驗證
│  - isValid          │
│  - errorMessage     │
│  - value            │
└─────────────────────┘
```

---

## 狀態流程範例

### 範例 1: 基本加法（P1）

```
初始狀態:
{
  displayValue: "0",
  firstOperand: null,
  operator: null,
  waitingForSecondOperand: false,
  isError: false
}

步驟 1: 輸入 "5"
{
  displayValue: "5",
  firstOperand: null,
  operator: null,
  waitingForSecondOperand: false,
  isError: false
}

步驟 2: 按下 "+"
{
  displayValue: "5",
  firstOperand: 5,
  operator: "+",
  waitingForSecondOperand: true,
  isError: false
}

步驟 3: 輸入 "3"
{
  displayValue: "3",
  firstOperand: 5,
  operator: "+",
  waitingForSecondOperand: false,
  isError: false
}

步驟 4: 按下 "="
計算: add(5, 3) = 8
{
  displayValue: "8",
  firstOperand: null,
  operator: null,
  waitingForSecondOperand: false,
  isError: false
}
```

### 範例 2: 開根號（P2）

```
初始狀態:
{
  displayValue: "0",
  firstOperand: null,
  operator: null,
  waitingForSecondOperand: false,
  isError: false
}

步驟 1: 輸入 "25"
{
  displayValue: "25",
  firstOperand: null,
  operator: null,
  waitingForSecondOperand: false,
  isError: false
}

步驟 2: 按下 "√" （單運算元，立即執行）
計算: sqrt(25) = 5
{
  displayValue: "5",
  firstOperand: null,
  operator: null,
  waitingForSecondOperand: false,
  isError: false
}
```

### 範例 3: 錯誤處理（除以零）

```
步驟: 執行 10 ÷ 0
計算: divide(10, 0) → 拋出錯誤

結果狀態:
{
  displayValue: "錯誤：無法除以零",
  firstOperand: null,
  operator: null,
  waitingForSecondOperand: false,
  isError: true
}
```

---

## 資料驗證規範

### 輸入驗證
1. **數字格式驗證**
   - 允許：`"123"`, `"12.34"`, `"-5"`, `"0.5"`
   - 不允許：`"12.34.56"`, `"abc"`, `"12a34"`, `"--5"`

2. **範圍驗證**
   - 最小值：`-Number.MAX_VALUE`
   - 最大值：`Number.MAX_VALUE`
   - 超出範圍顯示：`"錯誤：數值超出範圍"`

3. **特殊值處理**
   - `Infinity`: 顯示 `"錯誤：數值超出範圍"`
   - `NaN`: 顯示 `"錯誤：請輸入有效的數字"`
   - `-0`: 顯示為 `"0"`

### 輸出格式化
1. **精確度**
   - 使用 `toFixed(6)` 格式化結果
   - 移除尾隨的零：`5.000000` → `5`

2. **大數值顯示**
   - 超過 12 位數使用科學記號：`1.23456e+10`

---

## 記憶體管理

### 狀態重置
- 按下 "C" （Clear）按鈕時重置所有狀態
- 錯誤發生後，任何按鈕都會先清除錯誤狀態

### 無需持久化
- 無需 localStorage（MVP 階段不保存歷史）
- 無需 sessionStorage（每次載入都是新狀態）
- 重新載入頁面即重置所有狀態

---

## 擴展性考量

### 未來可能添加的實體（非 MVP）

1. **HistoryEntry**（歷史記錄項目）
   - `expression`: string（運算式，如 "5 + 3"）
   - `result`: number（結果）
   - `timestamp`: Date（時間戳）

2. **UserSettings**（使用者設定）
   - `angleUnit`: 'degrees' | 'radians'（角度單位）
   - `decimalPlaces`: number（小數位數）
   - `theme`: 'light' | 'dark'（主題）

**注意**: 這些擴展功能不在當前 MVP 範圍內。

---

## 總結

本資料模型描述了工程用計算機的核心實體：

1. **CalculatorState**: 運行時狀態管理
2. **Operation**: 運算操作定義
3. **ValidationResult**: 輸入驗證結果
4. **CalculationResult**: 計算結果封裝

所有實體都是簡單的 JavaScript 物件，無需複雜的 OOP 類別或設計模式，符合「拒絕過度設計」原則。
