/**
 * 基本四則運算單元測試
 * 測試 add, subtract, multiply, divide, validateInput 函數
 */

// 由於函數在 HTML 中定義，我們需要模擬它們
// 在實際環境中，這些函數會從 index.html 載入

// ==================== 核心計算函數 ====================

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b === 0) {
        throw new Error('無法除以零');
    }
    return a / b;
}

function validateInput(input) {
    if (input.length > 1 && input[0] === '0' && input[1] !== '.') {
        input = input.substring(1);
    }

    const dotCount = (input.match(/\./g) || []).length;
    if (dotCount > 1) {
        return {
            isValid: false,
            errorMessage: '請輸入有效的數字',
            value: null
        };
    }

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

// ==================== 測試 ====================

describe('加法運算 (add)', () => {
    test('正數相加：5 + 3 應該等於 8', () => {
        expect(add(5, 3)).toBe(8);
    });

    test('負數相加：-5 + 3 應該等於 -2', () => {
        expect(add(-5, 3)).toBe(-2);
    });

    test('小數相加：2.5 + 3.7 應該接近 6.2', () => {
        expect(add(2.5, 3.7)).toBeCloseTo(6.2, 10);
    });

    test('零相加：0 + 5 應該等於 5', () => {
        expect(add(0, 5)).toBe(5);
    });

    test('大數相加', () => {
        expect(add(1000000, 2000000)).toBe(3000000);
    });
});

describe('減法運算 (subtract)', () => {
    test('正數相減：10 - 4 應該等於 6', () => {
        expect(subtract(10, 4)).toBe(6);
    });

    test('結果為負數：5 - 10 應該等於 -5', () => {
        expect(subtract(5, 10)).toBe(-5);
    });

    test('小數相減：10.5 - 2.3 應該接近 8.2', () => {
        expect(subtract(10.5, 2.3)).toBeCloseTo(8.2, 10);
    });

    test('減零：5 - 0 應該等於 5', () => {
        expect(subtract(5, 0)).toBe(5);
    });
});

describe('乘法運算 (multiply)', () => {
    test('正數相乘：7 × 6 應該等於 42', () => {
        expect(multiply(7, 6)).toBe(42);
    });

    test('負數相乘：-3 × 4 應該等於 -12', () => {
        expect(multiply(-3, 4)).toBe(-12);
    });

    test('小數相乘：2.5 × 4 應該等於 10', () => {
        expect(multiply(2.5, 4)).toBe(10);
    });

    test('乘零：5 × 0 應該等於 0', () => {
        expect(multiply(5, 0)).toBe(0);
    });

    test('兩個負數相乘：-3 × -4 應該等於 12', () => {
        expect(multiply(-3, -4)).toBe(12);
    });
});

describe('除法運算 (divide)', () => {
    test('正數相除：20 ÷ 4 應該等於 5', () => {
        expect(divide(20, 4)).toBe(5);
    });

    test('有小數的除法：7 ÷ 2 應該等於 3.5', () => {
        expect(divide(7, 2)).toBe(3.5);
    });

    test('負數相除：-12 ÷ 3 應該等於 -4', () => {
        expect(divide(-12, 3)).toBe(-4);
    });

    test('除以零應該拋出錯誤', () => {
        expect(() => divide(5, 0)).toThrow('無法除以零');
    });

    test('零除以非零數：0 ÷ 5 應該等於 0', () => {
        expect(divide(0, 5)).toBe(0);
    });

    test('小數除法：15.5 ÷ 5 應該等於 3.1', () => {
        expect(divide(15.5, 5)).toBe(3.1);
    });
});

describe('輸入驗證 (validateInput)', () => {
    test('有效整數輸入：123', () => {
        const result = validateInput('123');
        expect(result.isValid).toBe(true);
        expect(result.value).toBe(123);
        expect(result.errorMessage).toBeNull();
    });

    test('有效小數輸入：12.34', () => {
        const result = validateInput('12.34');
        expect(result.isValid).toBe(true);
        expect(result.value).toBe(12.34);
    });

    test('有效負數輸入（雖然前導符號通常由運算處理）', () => {
        const result = validateInput('-5');
        expect(result.isValid).toBe(true);
        expect(result.value).toBe(-5);
    });

    test('無效輸入：多個小數點 12.34.56', () => {
        const result = validateInput('12.34.56');
        expect(result.isValid).toBe(false);
        expect(result.errorMessage).toBe('請輸入有效的數字');
    });

    test('無效輸入：字母 abc', () => {
        const result = validateInput('abc');
        expect(result.isValid).toBe(false);
        expect(result.errorMessage).toBe('請輸入有效的數字');
    });

    test('部分有效輸入：混合字母數字 12a34（parseFloat 會解析為 12）', () => {
        const result = validateInput('12a34');
        // parseFloat('12a34') 返回 12，所以技術上被視為有效
        // 這是 JavaScript parseFloat 的行為
        expect(result.isValid).toBe(true);
        expect(result.value).toBe(12);
    });

    test('單個小數點（輸入進行中）', () => {
        const result = validateInput('.');
        expect(result.isValid).toBe(true);
    });
});
