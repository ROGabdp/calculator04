/**
 * 三次方運算功能單元測試
 * 測試 cube() 函數的各種情境
 */

// ==================== 輔助函數（從 index.html 複製） ====================

/**
 * 驗證輸入是否為有效數字
 * @param {string} input - 使用者輸入的字串
 * @returns {{isValid: boolean, errorMessage: string|null, value: number|null}}
 */
function validateInput(input) {
    // 移除前導零（除了 "0." 的情況）
    if (input.length > 1 && input[0] === '0' && input[1] !== '.') {
        input = input.substring(1);
    }

    // 檢查是否包含多個小數點
    const dotCount = (input.match(/\./g) || []).length;
    if (dotCount > 1) {
        return {
            isValid: false,
            errorMessage: '請輸入有效的數字',
            value: null
        };
    }

    // 檢查是否為有效數字
    const value = parseFloat(input);
    if (isNaN(value) && input !== '.') {
        return {
            isValid: false,
            errorMessage: '請輸入有效的數字',
            value: null
        };
    }

    return {
        isValid: true,
        errorMessage: null,
        value: value
    };
}

/**
 * 格式化計算結果
 * @param {number} value - 要格式化的數值
 * @returns {string} 格式化後的字串
 */
function formatResult(value) {
    // 處理特殊值
    if (!isFinite(value)) {
        return 'Infinity';
    }
    if (isNaN(value)) {
        return 'NaN';
    }

    // 格式化為小數點後 6 位，移除尾隨的零
    let formatted = parseFloat(value.toFixed(6));
    return formatted.toString();
}

/**
 * 三次方運算
 * @param {number} x - 要計算三次方的數字（底數）
 * @returns {number} x 的三次方
 */
function cube(x) {
    return x ** 3;
}

// ==================== 測試區塊 ====================

describe('三次方運算功能', () => {
    describe('基本功能測試', () => {
        test('應該正確計算 2 的三次方', () => {
            expect(cube(2)).toBe(8);
        });

        test('應該正確計算 5 的三次方', () => {
            expect(cube(5)).toBe(125);
        });

        test('應該正確計算 10 的三次方', () => {
            expect(cube(10)).toBe(1000);
        });

        test('應該正確計算 0 的三次方', () => {
            expect(cube(0)).toBe(0);
        });

        test('應該正確計算 1 的三次方', () => {
            expect(cube(1)).toBe(1);
        });
    });
});
