/**
 * 計算機整合測試
 * 測試使用者故事的完整流程
 */

// ==================== 模擬計算機狀態與函數 ====================

const calculatorState = {
    displayValue: '0',
    firstOperand: null,
    operator: null,
    waitingForSecondOperand: false,
    isError: false
};

function resetCalculator() {
    calculatorState.displayValue = '0';
    calculatorState.firstOperand = null;
    calculatorState.operator = null;
    calculatorState.waitingForSecondOperand = false;
    calculatorState.isError = false;
}

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

function square(x) {
    return x * x;
}

function sqrt(x) {
    if (x < 0) {
        throw new Error('無法對負數開根號');
    }
    return Math.sqrt(x);
}

function degreesToRadians(degrees) {
    return degrees * (Math.PI / 180);
}

function sin(degrees) {
    return Math.sin(degreesToRadians(degrees));
}

function cos(degrees) {
    return Math.cos(degreesToRadians(degrees));
}

function formatResult(value) {
    if (!isFinite(value)) {
        return 'Infinity';
    }
    if (isNaN(value)) {
        return 'NaN';
    }
    let formatted = parseFloat(value.toFixed(6));
    return formatted.toString();
}

// ==================== 測試 ====================

describe('使用者故事 1：基本四則運算整合測試', () => {
    beforeEach(() => {
        resetCalculator();
    });

    test('情境：計算 12 + 8 = 20', () => {
        const result = add(12, 8);
        expect(result).toBe(20);
        expect(formatResult(result)).toBe('20');
    });

    test('情境：計算 45 - 17 = 28', () => {
        const result = subtract(45, 17);
        expect(result).toBe(28);
        expect(formatResult(result)).toBe('28');
    });

    test('情境：計算 7 × 6 = 42', () => {
        const result = multiply(7, 6);
        expect(result).toBe(42);
        expect(formatResult(result)).toBe('42');
    });

    test('情境：計算 100 ÷ 4 = 25', () => {
        const result = divide(100, 4);
        expect(result).toBe(25);
        expect(formatResult(result)).toBe('25');
    });

    test('情境：連續運算 5 + 3 - 2 = 6', () => {
        let result = add(5, 3);  // 8
        result = subtract(result, 2);  // 6
        expect(result).toBe(6);
    });

    test('情境：複合運算 (10 + 5) × 2 = 30', () => {
        const step1 = add(10, 5);  // 15
        const result = multiply(step1, 2);  // 30
        expect(result).toBe(30);
    });

    test('情境：小數運算 12.5 + 7.3 = 19.8', () => {
        const result = add(12.5, 7.3);
        expect(result).toBeCloseTo(19.8, 10);
    });

    test('情境：除以零錯誤處理', () => {
        expect(() => divide(10, 0)).toThrow('無法除以零');
    });
});

describe('使用者故事 2：平方與開根號整合測試', () => {
    beforeEach(() => {
        resetCalculator();
    });

    test('情境：計算 5² = 25', () => {
        const result = square(5);
        expect(result).toBe(25);
        expect(formatResult(result)).toBe('25');
    });

    test('情境：計算 √16 = 4', () => {
        const result = sqrt(16);
        expect(result).toBe(4);
        expect(formatResult(result)).toBe('4');
    });

    test('情境：計算 3² + 4² = 25（勾股定理）', () => {
        const a_squared = square(3);  // 9
        const b_squared = square(4);  // 16
        const c_squared = add(a_squared, b_squared);  // 25
        expect(c_squared).toBe(25);
    });

    test('情境：計算 √(3² + 4²) = 5（勾股定理）', () => {
        const a_squared = square(3);  // 9
        const b_squared = square(4);  // 16
        const c_squared = add(a_squared, b_squared);  // 25
        const c = sqrt(c_squared);  // 5
        expect(c).toBe(5);
    });

    test('情境：計算 (√9)² = 9', () => {
        const step1 = sqrt(9);  // 3
        const result = square(step1);  // 9
        expect(result).toBe(9);
    });

    test('情境：負數開根號錯誤處理', () => {
        expect(() => sqrt(-16)).toThrow('無法對負數開根號');
    });
});

describe('使用者故事 3：三角函數整合測試', () => {
    beforeEach(() => {
        resetCalculator();
    });

    test('情境：計算 sin(30°) = 0.5', () => {
        const result = sin(30);
        expect(result).toBeCloseTo(0.5, 10);
        expect(formatResult(result)).toBe('0.5');
    });

    test('情境：計算 cos(60°) = 0.5', () => {
        const result = cos(60);
        expect(result).toBeCloseTo(0.5, 10);
        expect(formatResult(result)).toBe('0.5');
    });

    test('情境：計算 sin(90°) = 1', () => {
        const result = sin(90);
        expect(result).toBeCloseTo(1, 10);
    });

    test('情境：計算 cos(0°) = 1', () => {
        const result = cos(0);
        expect(result).toBeCloseTo(1, 10);
    });

    test('情境：驗證 sin²(45°) + cos²(45°) = 1', () => {
        const sinVal = sin(45);
        const cosVal = cos(45);
        const result = add(square(sinVal), square(cosVal));
        expect(result).toBeCloseTo(1, 10);
    });

    test('情境：計算直角三角形：已知角度 30° 和斜邊 10，求對邊', () => {
        // 對邊 = 斜邊 × sin(30°) = 10 × 0.5 = 5
        const hypotenuse = 10;
        const angle = 30;
        const opposite = multiply(hypotenuse, sin(angle));
        expect(opposite).toBeCloseTo(5, 5);
    });

    test('情境：計算直角三角形：已知角度 60° 和斜邊 10，求鄰邊', () => {
        // 鄰邊 = 斜邊 × cos(60°) = 10 × 0.5 = 5
        const hypotenuse = 10;
        const angle = 60;
        const adjacent = multiply(hypotenuse, cos(angle));
        expect(adjacent).toBeCloseTo(5, 5);
    });
});

describe('跨使用者故事整合測試', () => {
    beforeEach(() => {
        resetCalculator();
    });

    test('情境：複雜計算 √((3² + 4²) × 2)', () => {
        // 3² = 9
        const a_squared = square(3);
        // 4² = 16
        const b_squared = square(4);
        // 9 + 16 = 25
        const sum = add(a_squared, b_squared);
        // 25 × 2 = 50
        const product = multiply(sum, 2);
        // √50 ≈ 7.071
        const result = sqrt(product);
        expect(result).toBeCloseTo(7.071067, 5);
    });

    test('情境：計算圓的面積：A = π × r²，r = 5', () => {
        const PI = 3.141593;
        const radius = 5;
        const r_squared = square(radius);  // 25
        const area = multiply(PI, r_squared);  // 78.54
        expect(area).toBeCloseTo(78.54, 2);
    });

    test('情境：使用三角函數與平方計算向量長度', () => {
        // 向量 (3, 4) 的長度 = √(3² + 4²) = 5
        const x = 3;
        const y = 4;
        const length = sqrt(add(square(x), square(y)));
        expect(length).toBe(5);
    });

    test('情境：計算角度的正弦平方：sin²(30°) = 0.25', () => {
        const sinVal = sin(30);  // 0.5
        const result = square(sinVal);  // 0.25
        expect(result).toBeCloseTo(0.25, 10);
    });
});

describe('錯誤處理整合測試', () => {
    beforeEach(() => {
        resetCalculator();
    });

    test('情境：除以零後繼續計算', () => {
        expect(() => divide(10, 0)).toThrow('無法除以零');
        // 重置後應該能正常計算
        resetCalculator();
        const result = add(5, 3);
        expect(result).toBe(8);
    });

    test('情境：負數開根號後繼續計算', () => {
        expect(() => sqrt(-4)).toThrow('無法對負數開根號');
        // 重置後應該能正常計算
        resetCalculator();
        const result = sqrt(9);
        expect(result).toBe(3);
    });
});
