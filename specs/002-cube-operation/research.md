# Research Document: 三次方運算功能

**Feature**: 002-cube-operation
**Date**: 2025-11-02
**Status**: Completed

## Overview

本文件記錄三次方運算功能的技術研究與決策過程。由於專案已有明確的技術堆疊（Vanilla JavaScript 單檔案架構），且功能需求簡單明確，本研究主要聚焦於最佳實踐和與現有程式碼的一致性。

## Technical Decisions

### 決策 1: 三次方運算實作方式

**選擇**: 使用 JavaScript 的 `**` 運算子（`x ** 3`）

**理由**:
1. **現代性**: ES2016 引入的運算子，所有目標瀏覽器都支援
2. **可讀性**: `x ** 3` 比 `Math.pow(x, 3)` 更簡潔直觀
3. **效能**: 運算子比函數呼叫略快（雖然差異可忽略）
4. **一致性**: 與現有專案中可能的數學運算風格保持一致

**替代方案考慮**:
- `Math.pow(x, 3)`: 較傳統的方式，但較冗長
- `x * x * x`: 最快速但不夠通用，且可讀性較差
- 自定義迴圈: 過度設計，違反 YAGNI 原則

**最終決定**: 使用 `x ** 3`

---

### 決策 2: 測試檔案組織

**選擇**: 建立新的測試檔案 `tests/unit/cubeOperations.test.js`

**理由**:
1. **獨立性**: 與現有測試檔案（basicOperations, powerOperations, trigOperations）保持一致的組織模式
2. **可維護性**: 獨立檔案便於未來維護和擴展
3. **TDD 友善**: 方便執行單一測試檔案進行開發

**替代方案考慮**:
- 加入 `powerOperations.test.js`: 雖然三次方與平方（x²）相關，但為保持檔案專注度，選擇獨立檔案
- 加入 `basicOperations.test.js`: 不適合，因為三次方是單運算元運算子，與二元運算子性質不同

**最終決定**: 建立 `cubeOperations.test.js`

---

### 決策 3: UI 按鈕位置

**選擇**: 將 x³ 按鈕放置在 x² 按鈕旁邊（工程函數區域）

**理由**:
1. **邏輯分組**: 三次方與平方都是次方運算，應該放在一起
2. **使用者習慣**: 符合一般計算機的按鈕配置慣例
3. **視覺一致性**: 與現有 UI 佈局保持一致

**替代方案考慮**:
- 放置在其他位置: 不符合邏輯分組原則

**最終決定**: 緊鄰 x² 按鈕

---

### 決策 4: 精確度處理

**選擇**: 複用現有的 `formatResult()` 函數

**理由**:
1. **一致性**: 所有運算結果使用相同的格式化邏輯（小數點後 6 位，移除尾隨零）
2. **DRY 原則**: 不重複實作相同邏輯
3. **維護性**: 未來若需調整精確度，只需修改一處

**實作細節**:
```javascript
// formatResult() 已存在於 index.html
// 三次方函數將直接使用此函數格式化結果
function cube(x) {
  // 計算三次方
  const result = x ** 3;
  // 使用現有的格式化函數
  return formatResult(result);
}
```

---

### 決策 5: 錯誤處理策略

**選擇**: 複用現有的 `validateInput()` 和 `displayError()` 函數

**理由**:
1. **一致性**: 與現有運算功能（平方、開根號）保持一致的錯誤處理方式
2. **簡單性**: 三次方運算對所有實數都有效，不需要特殊錯誤處理（不像開根號不能處理負數）
3. **使用者體驗**: 錯誤訊息顯示方式與其他運算一致

**邊界情況處理**:
- **極大數值**: JavaScript 會自動處理為 `Infinity`，由現有錯誤處理機制處理
- **極小數值**: 正常計算，精確度由 `formatResult()` 保證
- **無效輸入**: 由 `validateInput()` 在事件處理層攔截

---

## Best Practices & Patterns

### 模式 1: 單運算元運算子（Unary Operator）

**參考現有實作**: `square(x)` 和 `sqrt(x)`

**實作模式**:
```javascript
// 參考 square 函數的實作模式
function cube(x) {
  // 三次方運算對所有實數都有效，無需特殊驗證
  const result = x ** 3;
  return formatResult(result);
}
```

**事件處理模式**:
```javascript
// 參考現有的 handleUnaryOperatorClick
document.querySelector('.cube-btn').addEventListener('click', () => {
  handleUnaryOperatorClick('cube');
});
```

---

### 模式 2: 測試檔案結構

**參考現有測試檔案**: `powerOperations.test.js`

**測試組織**:
1. **基本功能測試**: 正整數、0、1 的三次方
2. **負數測試**: 負整數的三次方
3. **小數測試**: 小數的三次方
4. **邊界情況測試**: 極大值、極小值
5. **精確度測試**: 驗證小數點後 6 位精確度

**測試數量估計**: 約 15-20 個測試案例

---

### 模式 3: 函數同步（index.html ↔ 測試檔案）

**重要提醒**: 由於測試環境無法直接載入 HTML 檔案中的函數，必須將函數副本複製到測試檔案中。

**同步流程**:
1. 在 `index.html` 中實作 `cube()` 函數
2. 複製相同的函數到 `tests/unit/cubeOperations.test.js`
3. 未來任何修改都必須同步更新兩處

**現有範例**: `powerOperations.test.js` 中包含 `square()` 和 `sqrt()` 函數的副本

---

## Technology Stack Validation

### JavaScript ES6+ 功能使用

**使用的 ES6+ 功能**:
- `**` 運算子（ES2016）
- Arrow functions（ES2015）
- `const`/`let`（ES2015）

**瀏覽器相容性**: ✅ 所有目標瀏覽器（Chrome, Firefox, Safari, Edge 最新版本）都完全支援

---

### Jest 測試環境

**現有設定**: Jest 29.7.0 + jsdom

**三次方測試需求**:
- ✅ 無需額外設定
- ✅ jsdom 環境足以測試純數學運算
- ✅ 不需要瀏覽器特定 API

---

## Performance Considerations

### 運算效能

**預期效能**: < 1ms（實際測量可能 < 0.1ms）

**效能分析**:
- `x ** 3` 是原生 JavaScript 運算，極快
- `formatResult()` 的字串處理開銷可忽略
- 總響應時間受 DOM 更新影響大於計算本身

**結論**: 無需效能優化，簡單實作即可滿足 < 1 秒的成功標準

---

### 記憶體使用

**記憶體影響**: 可忽略

**分析**:
- 新增 1 個函數（約 5-10 行程式碼）
- 新增 1 個事件監聽器
- 無新增全域變數
- 無資料持久化

---

## Integration Points

### 與現有功能的整合

**整合點 1**: 事件處理系統
- 使用現有的 `handleUnaryOperatorClick()` 函數
- 在初始化區塊新增事件監聽器

**整合點 2**: 工具函數
- 複用 `validateInput()`
- 複用 `formatResult()`
- 複用 `displayError()`
- 複用 `updateDisplay()`

**整合點 3**: 計算機狀態管理
- 使用現有的 `calculatorState` 物件
- 遵循現有的狀態更新模式

**相容性驗證**: ✅ 無衝突，完全相容

---

## Testing Strategy

### 單元測試策略

**測試檔案**: `tests/unit/cubeOperations.test.js`

**測試案例設計**:

| 測試類別 | 測試案例數 | 範例 |
|---------|----------|------|
| 基本功能 | 5 | cube(2) = 8, cube(0) = 0, cube(1) = 1, cube(5) = 125, cube(10) = 1000 |
| 負數處理 | 3 | cube(-2) = -8, cube(-5) = -125, cube(-1) = -1 |
| 小數處理 | 4 | cube(1.5) = 3.375, cube(0.5) = 0.125, cube(2.5) = 15.625 |
| 精確度驗證 | 3 | 驗證小數點後 6 位，驗證尾隨零移除 |
| 邊界情況 | 3 | 極大值、極小值、接近零的值 |

**總計**: 約 18 個單元測試

---

### 整合測試策略

**測試檔案**: `tests/integration/calculator.integration.test.js`（更新）

**整合測試場景**:
1. 基本三次方運算流程（輸入 → 點擊 x³ → 顯示結果）
2. 三次方後再執行其他運算（如 2³ = 8，8 + 2 = 10）
3. 連續三次方運算（2³ = 8，8³ = 512）
4. 三次方後清除（2³ = 8，按 C，顯示 0）
5. 錯誤輸入處理（無效輸入 → 點擊 x³ → 顯示錯誤）

**總計**: 約 5 個整合測試

---

## Implementation Checklist

- [ ] 在 `index.html` 中實作 `cube(x)` 函數
- [ ] 新增 x³ 按鈕 HTML
- [ ] 新增 x³ 按鈕 CSS 樣式
- [ ] 新增 x³ 按鈕事件監聽器
- [ ] 更新 `handleUnaryOperatorClick()` 函數（如需）
- [ ] 建立 `tests/unit/cubeOperations.test.js`
- [ ] 撰寫單元測試（約 18 個）
- [ ] 更新 `tests/integration/calculator.integration.test.js`
- [ ] 撰寫整合測試（約 5 個）
- [ ] 執行所有測試確保 100% 通過
- [ ] 更新 README.md 文件
- [ ] 同步更新 CLAUDE.md（如需）

---

## Risks & Mitigation

### 風險 1: 測試檔案同步問題

**風險描述**: 修改 `index.html` 中的 `cube()` 函數後，忘記同步更新測試檔案中的副本

**緩解措施**:
- 在 CLAUDE.md 中明確記錄同步需求
- 在 Code Review 時檢查
- 使用 TODO 註解提醒

**影響**: 中等（可能導致測試失敗）

---

### 風險 2: UI 按鈕樣式不一致

**風險描述**: 新增的 x³ 按鈕樣式與現有按鈕不一致

**緩解措施**:
- 複製現有 x² 按鈕的 CSS 類別
- 進行視覺驗證

**影響**: 低（僅影響外觀）

---

## References

### 內部文件
- `specs/002-cube-operation/spec.md` - 功能規格
- `specs/002-cube-operation/plan.md` - 實作計劃
- `.specify/memory/constitution.md` - 專案憲法
- `CLAUDE.md` - 開發指引

### 現有程式碼參考
- `index.html` 第 294-386 行 - 核心計算函數（square, sqrt）
- `tests/unit/powerOperations.test.js` - 測試檔案範例
- `tests/integration/calculator.integration.test.js` - 整合測試範例

### 技術文件
- [MDN: Exponentiation (\*\*)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Exponentiation)
- [MDN: Math.pow()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/pow)
- [Jest Documentation](https://jestjs.io/docs/getting-started)

---

## Conclusion

所有技術決策都已明確，無需進一步研究。本功能採用最簡單的實作方式，完全符合專案憲法的「拒絕過度設計」原則。下一步可直接進入 Phase 1 設計階段。
