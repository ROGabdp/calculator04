# 工程用計算機 (Engineering Calculator)

一個使用純 JavaScript 開發的 Web 應用程式，提供基本四則運算與工程函數計算功能。

## 功能特點

### P1: 基本四則運算 (MVP)
- ✅ 加法 (+)
- ✅ 減法 (-)
- ✅ 乘法 (×)
- ✅ 除法 (÷)
- ✅ 小數點支援
- ✅ 錯誤處理（除以零）

### P2: 平方與開根號
- ✅ 平方運算 (x²)
- ✅ 開根號運算 (√)
- ✅ 負數開根號錯誤處理

### P3: 三角函數
- ✅ 正弦函數 (sin) - 輸入度數制
- ✅ 餘弦函數 (cos) - 輸入度數制

## 技術規格

- **語言**: HTML5, CSS3, JavaScript (ES6+)
- **依賴**: 無（Vanilla JavaScript）
- **測試框架**: Jest 29.7.0
- **瀏覽器支援**: 現代瀏覽器 (Chrome, Firefox, Safari, Edge)

## 快速開始

### 使用計算機

1. 開啟 `index.html` 檔案於瀏覽器中
2. 無需安裝或建置，直接使用

### 開發與測試

#### 安裝依賴

```bash
npm install
```

#### 執行測試

```bash
# 執行所有測試
npm test

# 監視模式（開發時使用）
npm run test:watch

# 產生測試覆蓋率報告
npm run test:coverage
```

#### 測試結果

✅ **102 個測試全部通過**

- 單元測試：
  - `tests/unit/basicOperations.test.js` - 基本四則運算 (27 個測試)
  - `tests/unit/powerOperations.test.js` - 平方與開根號 (14 個測試)
  - `tests/unit/trigOperations.test.js` - 三角函數 (28 個測試)
- 整合測試：
  - `tests/integration/calculator.integration.test.js` - 端對端情境測試 (33 個測試)

## 專案結構

```
calculator/
├── index.html                          # 主應用程式（包含 HTML、CSS、JavaScript）
├── package.json                        # NPM 設定與依賴
├── README.md                           # 專案說明文件
├── .gitignore                          # Git 忽略設定
├── tests/
│   ├── unit/                          # 單元測試
│   │   ├── basicOperations.test.js    # 基本運算測試
│   │   ├── powerOperations.test.js    # 平方/開根號測試
│   │   └── trigOperations.test.js     # 三角函數測試
│   └── integration/                   # 整合測試
│       └── calculator.integration.test.js  # 端對端測試
└── specs/001-engineering-calculator/  # 規格文件
    ├── spec.md                        # 功能規格
    ├── plan.md                        # 實作計畫
    ├── tasks.md                       # 任務清單
    └── ...                            # 其他設計文件
```

## 使用說明

### 基本運算

1. 點擊數字按鈕輸入數字
2. 點擊運算子按鈕（+、-、×、÷）
3. 輸入第二個數字
4. 點擊 = 號查看結果

### 工程函數

1. 輸入數字
2. 點擊工程函數按鈕：
   - **√**: 開根號
   - **x²**: 平方
   - **sin**: 正弦（度數制）
   - **cos**: 餘弦（度數制）
3. 結果立即顯示

### 清除

- 點擊 **C** 按鈕清除所有輸入並重置計算機

### 錯誤處理

計算機會自動處理以下錯誤：
- 除以零：顯示「錯誤：無法除以零」
- 負數開根號：顯示「錯誤：無法對負數開根號」
- 無效輸入：顯示「錯誤：請輸入有效的數字」

錯誤訊息會在 2 秒後自動消失。

## 設計原則

本專案遵循以下核心原則：

1. **可測試性 (NON-NEGOTIABLE)**: 所有功能皆可獨立測試
2. **測試先行 (NON-NEGOTIABLE)**: 採用 TDD 開發方法
3. **MVP 優先**: 優先實現核心功能
4. **拒絕過度設計**: 保持簡單，避免不必要的複雜度
5. **正體中文優先 (NON-NEGOTIABLE)**: 介面與文件使用正體中文

## 瀏覽器相容性

- ✅ Chrome (最新版本)
- ✅ Firefox (最新版本)
- ✅ Safari (最新版本)
- ✅ Edge (最新版本)

## 授權

MIT License

## 專案資訊

- **版本**: 1.0.0
- **開發語言**: JavaScript
- **測試通過率**: 100% (102/102)
- **程式碼品質**: 遵循 TDD 原則
