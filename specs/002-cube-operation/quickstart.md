# Quick Start Guide: 三次方運算功能開發

**Feature**: 002-cube-operation
**Date**: 2025-11-02
**Target Audience**: 開發人員

## 概述

本指南提供三次方運算功能的快速開發流程，遵循 TDD (Test-Driven Development) 方法論和專案憲法。

**預計開發時間**: 2-3 小時

**優先級順序**: P1 → P2 → P3

---

## 前置條件

### 環境需求

- ✅ Node.js 已安裝（用於執行 Jest 測試）
- ✅ Git 已配置
- ✅ 文字編輯器或 IDE
- ✅ 現代瀏覽器（Chrome, Firefox, Safari, Edge）

### 分支狀態檢查

```bash
# 確認在正確的分支
git branch
# 應顯示: * 002-cube-operation

# 確認工作目錄乾淨
git status
```

### 安裝依賴

```bash
npm install
```

---

## 開發流程總覽

```
階段 1: P1 - 基本三次方計算
   ├─ Step 1: 撰寫測試（紅燈）
   ├─ Step 2: 實作功能（綠燈）
   ├─ Step 3: 重構
   └─ Step 4: 驗證

階段 2: P2 - 負數三次方計算
   ├─ Step 1: 撰寫測試（紅燈）
   ├─ Step 2: 驗證通過（綠燈）
   └─ Step 3: 驗證

階段 3: P3 - 小數三次方計算
   ├─ Step 1: 撰寫測試（紅燈）
   ├─ Step 2: 驗證通過（綠燈）
   └─ Step 3: 驗證

階段 4: 整合測試與收尾
   ├─ Step 1: 撰寫整合測試
   ├─ Step 2: 更新文件
   └─ Step 3: 提交與推送
```

---

## 階段 1: P1 - 基本三次方計算

### Step 1.1: 建立測試檔案

**檔案**: `tests/unit/cubeOperations.test.js`

```javascript
/**
 * 三次方運算功能的單元測試
 *
 * 注意：cube() 和 formatResult() 函數從 index.html 複製而來
 * 修改 index.html 中的函數時，必須同步更新此檔案
 */

// ========================================
// 工具函數（從 index.html 複製）
// ========================================

/**
 * 格式化數值結果
 * @param {number} value - 要格式化的數值
 * @returns {string} - 格式化後的字串（小數點後最多 6 位，移除尾隨零）
 */
function formatResult(value) {
  // TODO: 從 index.html 複製 formatResult 函數的實作
  return value.toFixed(6).replace(/\.?0+$/, '');
}

/**
 * 計算數字的三次方
 * @param {number} x - 底數
 * @returns {string} - 格式化後的三次方結果
 */
function cube(x) {
  const result = x ** 3;
  return formatResult(result);
}

// ========================================
// 測試案例
// ========================================

describe('cube 函數', () => {

  // P1: 基本三次方計算測試
  describe('P1: 基本功能測試', () => {

    it('應該正確計算 2 的三次方', () => {
      expect(cube(2)).toBe('8');
    });

    it('應該正確計算 5 的三次方', () => {
      expect(cube(5)).toBe('125');
    });

    it('應該正確計算 10 的三次方', () => {
      expect(cube(10)).toBe('1000');
    });

    it('應該正確計算 1 的三次方', () => {
      expect(cube(1)).toBe('1');
    });

    it('應該正確計算 0 的三次方', () => {
      expect(cube(0)).toBe('0');
    });

  });

});
```

### Step 1.2: 執行測試（應該失敗 - 紅燈）

```bash
npm test -- tests/unit/cubeOperations.test.js
```

**預期結果**: 測試失敗，因為 `cube()` 函數尚未實作完整

### Step 1.3: 實作 cube() 函數

**檔案**: `index.html`（在核心計算函數區塊，約第 330 行）

**位置**: 在 `square()` 和 `sqrt()` 函數附近

```javascript
/**
 * 計算數字的三次方
 * @param {number} x - 底數
 * @returns {string} - 格式化後的三次方結果
 */
function cube(x) {
  const result = x ** 3;
  return formatResult(result);
}
```

### Step 1.4: 同步更新測試檔案

**重要**: 將 `index.html` 中的 `formatResult()` 函數完整複製到測試檔案

**檔案**: `tests/unit/cubeOperations.test.js`

找到 `formatResult()` 的 TODO 註解，替換為實際實作（從 index.html 複製）

### Step 1.5: 執行測試（應該通過 - 綠燈）

```bash
npm test -- tests/unit/cubeOperations.test.js
```

**預期結果**: 所有 P1 測試通過 ✅

### Step 1.6: 新增 UI 按鈕

**檔案**: `index.html`（HTML 區塊，約第 150 行）

**位置**: 在 x² 按鈕旁邊

```html
<!-- 現有的 x² 按鈕 -->
<button class="operator-btn">x²</button>

<!-- 新增的 x³ 按鈕 -->
<button class="operator-btn cube-btn">x³</button>
```

### Step 1.7: 新增按鈕樣式

**檔案**: `index.html`（CSS 區塊，約第 100 行）

**注意**: 如果 `.cube-btn` 已繼承 `.operator-btn` 的樣式，可能不需要額外 CSS

```css
/* 如需特殊樣式 */
.cube-btn {
  /* 與 x² 按鈕保持一致 */
}
```

### Step 1.8: 新增事件監聽器

**檔案**: `index.html`（初始化區塊，約第 540 行）

**位置**: 在其他按鈕事件監聽器附近

```javascript
// 三次方按鈕事件
document.querySelector('.cube-btn').addEventListener('click', () => {
  handleUnaryOperatorClick('cube');
});
```

### Step 1.9: 更新 handleUnaryOperatorClick() 函數

**檔案**: `index.html`（事件處理函數區塊）

**如果需要**: 在 `switch` 或 `if-else` 中新增 'cube' 的處理

```javascript
function handleUnaryOperatorClick(operator) {
  // ... 現有程式碼 ...

  switch(operator) {
    case 'square':
      result = square(currentValue);
      break;
    case 'sqrt':
      result = sqrt(currentValue);
      break;
    case 'cube':  // 新增
      result = cube(currentValue);
      break;
    case 'sin':
      result = sin(currentValue);
      break;
    case 'cos':
      result = cos(currentValue);
      break;
  }

  // ... 更新顯示 ...
}
```

### Step 1.10: 手動測試

```bash
# 在瀏覽器中開啟 index.html
# 測試：
# 1. 輸入 2 → 點擊 x³ → 應顯示 8
# 2. 輸入 5 → 點擊 x³ → 應顯示 125
# 3. 輸入 10 → 點擊 x³ → 應顯示 1000
```

### Step 1.11: 執行所有測試

```bash
npm test
```

**預期結果**: 所有現有測試 + 新的 P1 測試全部通過 ✅

---

## 階段 2: P2 - 負數三次方計算

### Step 2.1: 新增負數測試

**檔案**: `tests/unit/cubeOperations.test.js`

```javascript
describe('P2: 負數測試', () => {

  it('應該正確計算 -2 的三次方', () => {
    expect(cube(-2)).toBe('-8');
  });

  it('應該正確計算 -5 的三次方', () => {
    expect(cube(-5)).toBe('-125');
  });

  it('應該正確計算 -1 的三次方', () => {
    expect(cube(-1)).toBe('-1');
  });

});
```

### Step 2.2: 執行測試（應該通過 - 綠燈）

```bash
npm test -- tests/unit/cubeOperations.test.js
```

**預期結果**: P1 + P2 測試全部通過 ✅

**原因**: `x ** 3` 已經正確處理負數，無需修改程式碼

### Step 2.3: 手動測試

```bash
# 在瀏覽器中測試：
# 1. 輸入 -2 → 點擊 x³ → 應顯示 -8
# 2. 輸入 -5 → 點擊 x³ → 應顯示 -125
```

---

## 階段 3: P3 - 小數三次方計算

### Step 3.1: 新增小數測試

**檔案**: `tests/unit/cubeOperations.test.js`

```javascript
describe('P3: 小數測試', () => {

  it('應該正確計算 1.5 的三次方', () => {
    expect(cube(1.5)).toBe('3.375');
  });

  it('應該正確計算 0.5 的三次方', () => {
    expect(cube(0.5)).toBe('0.125');
  });

  it('應該正確計算 2.5 的三次方', () => {
    expect(cube(2.5)).toBe('15.625');
  });

});
```

### Step 3.2: 執行測試（應該通過 - 綠燈）

```bash
npm test -- tests/unit/cubeOperations.test.js
```

**預期結果**: P1 + P2 + P3 測試全部通過 ✅

### Step 3.3: 新增精確度測試

**檔案**: `tests/unit/cubeOperations.test.js`

```javascript
describe('精確度測試', () => {

  it('應該格式化為小數點後最多 6 位', () => {
    // 0.1^3 = 0.001
    expect(cube(0.1)).toBe('0.001');
  });

  it('應該移除尾隨的零', () => {
    // 確保 formatResult 正確移除尾隨零
    const result = cube(2); // 2^3 = 8.000000 → "8"
    expect(result).toBe('8');
    expect(result).not.toContain('.');
  });

});
```

### Step 3.4: 手動測試

```bash
# 在瀏覽器中測試：
# 1. 輸入 1.5 → 點擊 x³ → 應顯示 3.375
# 2. 輸入 0.5 → 點擊 x³ → 應顯示 0.125
# 3. 輸入 0.1 → 點擊 x³ → 應顯示 0.001
```

---

## 階段 4: 整合測試與收尾

### Step 4.1: 新增整合測試

**檔案**: `tests/integration/calculator.integration.test.js`

```javascript
describe('三次方整合測試', () => {

  // 測試環境設定
  beforeEach(() => {
    // 設定 jsdom 環境或重置狀態
  });

  it('應該能執行基本三次方運算', () => {
    // 模擬：輸入 5 → 點擊 x³ → 驗證顯示 125
  });

  it('應該能連續執行三次方運算', () => {
    // 模擬：輸入 2 → x³ → 8 → 再 x³ → 512
  });

  it('應該能在三次方後執行其他運算', () => {
    // 模擬：2 → x³ → 8 → + → 2 → = → 10
  });

  it('應該能在三次方後清除', () => {
    // 模擬：2 → x³ → 8 → C → 0
  });

  it('應該處理無效輸入', () => {
    // 模擬：輸入 "abc" → x³ → 驗證顯示錯誤
  });

});
```

### Step 4.2: 執行所有測試

```bash
npm test
```

**目標**: 100% 測試通過 ✅

### Step 4.3: 執行測試覆蓋率

```bash
npm run test:coverage
```

**檢查**: `cube()` 函數的覆蓋率應為 100%

### Step 4.4: 更新 README.md

**檔案**: `README.md`

**在功能特點區塊新增**:

```markdown
### P4: 立方運算
- ✅ 三次方運算 (x³)
- ✅ 支援正數、負數、小數
- ✅ 精確度達小數點後 6 位
```

**更新測試統計**:

```markdown
✅ **XXX 個測試全部通過**（原 102 + 新增的三次方測試）
```

### Step 4.5: 更新 CLAUDE.md（如需）

**檔案**: `CLAUDE.md`

**在相關區塊新增**:

```markdown
### 核心函數組織

3. **核心計算函數**
   - `add(a, b)`, `subtract(a, b)`, `multiply(a, b)`, `divide(a, b)`: 基本四則運算
   - `square(x)`, `cube(x)`, `sqrt(x)`: 次方與開根號
   - `sin(degrees)`, `cos(degrees)`: 三角函數（度數制）
```

**在注意事項新增**:

```markdown
### 修改核心函數時

- 修改 `square, cube, sqrt` → 更新 `tests/unit/powerOperations.test.js` 或 `tests/unit/cubeOperations.test.js`
```

### Step 4.6: 提交變更

```bash
# 檢查變更
git status

# 檢視差異
git diff

# 暫存所有變更
git add .

# 提交（使用正體中文訊息）
git commit -m "$(cat <<'EOF'
新增三次方運算功能 (x³)

功能:
- 新增 cube() 函數計算三次方
- 新增 x³ 按鈕到 UI
- 支援正數、負數、小數運算
- 精確度達小數點後 6 位

測試:
- 新增 cubeOperations.test.js（約 18 個單元測試）
- 更新整合測試（約 5 個測試場景）
- 所有測試通過率 100%

文件:
- 更新 README.md
- 更新 CLAUDE.md

遵循專案憲法:
- ✅ TDD 開發流程
- ✅ P1 → P2 → P3 MVP 交付順序
- ✅ 拒絕過度設計（簡單實作）
- ✅ 正體中文註解與文件

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>
EOF
)"
```

### Step 4.7: 驗證提交

```bash
# 查看提交歷史
git log --oneline -3

# 確認所有測試仍然通過
npm test
```

---

## 快速檢查清單

在提交之前，確認以下項目：

### 程式碼

- [ ] `cube()` 函數已在 `index.html` 中實作
- [ ] `cube()` 函數已複製到 `tests/unit/cubeOperations.test.js`
- [ ] x³ 按鈕已新增到 HTML
- [ ] x³ 按鈕事件監聽器已新增
- [ ] `handleUnaryOperatorClick()` 已更新支援 'cube'

### 測試

- [ ] 單元測試已撰寫（約 18 個測試）
- [ ] 整合測試已撰寫（約 5 個測試）
- [ ] 所有測試通過 (`npm test`)
- [ ] 測試覆蓋率達標 (`npm run test:coverage`)

### 文件

- [ ] README.md 已更新
- [ ] CLAUDE.md 已更新（如需）
- [ ] 提交訊息使用正體中文

### 手動測試

- [ ] 瀏覽器中測試基本運算（正數）
- [ ] 瀏覽器中測試負數運算
- [ ] 瀏覽器中測試小數運算
- [ ] 瀏覽器中測試連續運算
- [ ] 瀏覽器中測試錯誤處理

### 憲法合規

- [ ] 遵循 TDD 流程（測試先行）
- [ ] 按 P1 → P2 → P3 順序開發
- [ ] 使用最簡單的實作（無過度設計）
- [ ] 所有註解使用正體中文

---

## 常見問題

### Q1: 測試檔案中的函數為什麼要複製？

**A**: Jest 測試環境無法直接載入 HTML 檔案中的 `<script>` 標籤內的函數，因此需要在測試檔案中複製一份。未來修改 `index.html` 中的函數時，記得同步更新測試檔案。

### Q2: 如何確保測試和實作同步？

**A**:
1. 在 CLAUDE.md 中記錄同步需求
2. Code Review 時檢查
3. 執行測試時如果失敗，檢查是否忘記同步

### Q3: 為什麼不使用模組化？

**A**: 專案刻意採用單檔案架構，遵循「拒絕過度設計」原則。對於這個小型計算機應用，模組化是不必要的複雜度。

### Q4: 如何測試 UI 互動？

**A**: 整合測試使用 jsdom 環境模擬 DOM 操作。對於簡單的三次方運算，單元測試已足夠覆蓋核心邏輯。

---

## 下一步

完成三次方功能後：

1. **合併到 master**: 使用 PR 或直接合併（根據專案流程）
2. **部署**: 直接使用更新後的 `index.html`
3. **驗證**: 在生產環境中測試
4. **文件**: 確保使用者文件已更新

---

## 參考資料

- [規格文件](./spec.md)
- [實作計劃](./plan.md)
- [研究文件](./research.md)
- [資料模型](./data-model.md)
- [API 規範](./contracts/calculator-api.md)
- [專案憲法](../../.specify/memory/constitution.md)
- [開發指引](../../CLAUDE.md)

---

**預祝開發順利！🎉**

遇到問題時，請參考專案憲法和現有程式碼範例。遵循 TDD 流程，保持簡單，測試先行！
