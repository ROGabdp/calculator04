/**
 * 平方與開根號運算單元測試
 * 測試 square, sqrt 函數
 */

// 由於函數在 HTML 中定義，我們需要模擬它們
// 在實際環境中，這些函數會從 index.html 載入

// ==================== 核心計算函數 ====================

function square(x) {
    return x * x;
}

function sqrt(x) {
    if (x < 0) {
        throw new Error('無法對負數開根號');
    }
    return Math.sqrt(x);
}

// ==================== 測試 ====================

describe('平方運算 (square)', () => {
    test('正數平方：5² 應該等於 25', () => {
        expect(square(5)).toBe(25);
    });

    test('負數平方：(-3)² 應該等於 9', () => {
        expect(square(-3)).toBe(9);
    });

    test('小數平方：2.5² 應該等於 6.25', () => {
        expect(square(2.5)).toBe(6.25);
    });

    test('零平方：0² 應該等於 0', () => {
        expect(square(0)).toBe(0);
    });

    test('大數平方：100² 應該等於 10000', () => {
        expect(square(100)).toBe(10000);
    });

    test('1 的平方：1² 應該等於 1', () => {
        expect(square(1)).toBe(1);
    });
});

describe('開根號運算 (sqrt)', () => {
    test('完全平方數：√25 應該等於 5', () => {
        expect(sqrt(25)).toBe(5);
    });

    test('非完全平方數：√2 應該接近 1.414213', () => {
        expect(sqrt(2)).toBeCloseTo(1.414213, 5);
    });

    test('√0 應該等於 0', () => {
        expect(sqrt(0)).toBe(0);
    });

    test('√1 應該等於 1', () => {
        expect(sqrt(1)).toBe(1);
    });

    test('小數開根號：√6.25 應該等於 2.5', () => {
        expect(sqrt(6.25)).toBe(2.5);
    });

    test('大數開根號：√10000 應該等於 100', () => {
        expect(sqrt(10000)).toBe(100);
    });

    test('負數開根號應該拋出錯誤', () => {
        expect(() => sqrt(-4)).toThrow('無法對負數開根號');
    });

    test('負數開根號應該拋出錯誤：-1', () => {
        expect(() => sqrt(-1)).toThrow('無法對負數開根號');
    });
});

describe('平方與開根號互逆運算', () => {
    test('√(x²) 應該等於 |x|：測試正數', () => {
        const x = 7;
        expect(sqrt(square(x))).toBe(Math.abs(x));
    });

    test('√(x²) 應該等於 |x|：測試負數', () => {
        const x = -7;
        expect(sqrt(square(x))).toBe(Math.abs(x));
    });

    test('(√x)² 應該等於 x', () => {
        const x = 16;
        expect(square(sqrt(x))).toBe(x);
    });
});
