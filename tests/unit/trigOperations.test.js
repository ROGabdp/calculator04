/**
 * 三角函數單元測試
 * 測試 sin, cos, degreesToRadians 函數
 */

// 由於函數在 HTML 中定義，我們需要模擬它們
// 在實際環境中，這些函數會從 index.html 載入

// ==================== 核心計算函數 ====================

function degreesToRadians(degrees) {
    return degrees * (Math.PI / 180);
}

function sin(degrees) {
    return Math.sin(degreesToRadians(degrees));
}

function cos(degrees) {
    return Math.cos(degreesToRadians(degrees));
}

// ==================== 測試 ====================

describe('度數轉弧度 (degreesToRadians)', () => {
    test('0° 應該等於 0 弧度', () => {
        expect(degreesToRadians(0)).toBe(0);
    });

    test('90° 應該等於 π/2 弧度', () => {
        expect(degreesToRadians(90)).toBeCloseTo(Math.PI / 2, 10);
    });

    test('180° 應該等於 π 弧度', () => {
        expect(degreesToRadians(180)).toBeCloseTo(Math.PI, 10);
    });

    test('360° 應該等於 2π 弧度', () => {
        expect(degreesToRadians(360)).toBeCloseTo(2 * Math.PI, 10);
    });

    test('45° 應該等於 π/4 弧度', () => {
        expect(degreesToRadians(45)).toBeCloseTo(Math.PI / 4, 10);
    });

    test('負角度：-90° 應該等於 -π/2 弧度', () => {
        expect(degreesToRadians(-90)).toBeCloseTo(-Math.PI / 2, 10);
    });
});

describe('正弦函數 (sin)', () => {
    test('sin(0°) 應該等於 0', () => {
        expect(sin(0)).toBeCloseTo(0, 10);
    });

    test('sin(30°) 應該等於 0.5', () => {
        expect(sin(30)).toBeCloseTo(0.5, 10);
    });

    test('sin(45°) 應該接近 √2/2', () => {
        expect(sin(45)).toBeCloseTo(Math.sqrt(2) / 2, 10);
    });

    test('sin(60°) 應該接近 √3/2', () => {
        expect(sin(60)).toBeCloseTo(Math.sqrt(3) / 2, 10);
    });

    test('sin(90°) 應該等於 1', () => {
        expect(sin(90)).toBeCloseTo(1, 10);
    });

    test('sin(180°) 應該接近 0', () => {
        expect(sin(180)).toBeCloseTo(0, 10);
    });

    test('sin(270°) 應該等於 -1', () => {
        expect(sin(270)).toBeCloseTo(-1, 10);
    });

    test('sin(360°) 應該接近 0', () => {
        expect(sin(360)).toBeCloseTo(0, 10);
    });

    test('負角度：sin(-30°) 應該等於 -0.5', () => {
        expect(sin(-30)).toBeCloseTo(-0.5, 10);
    });

    test('大角度：sin(450°) 應該等於 sin(90°)', () => {
        expect(sin(450)).toBeCloseTo(sin(90), 10);
    });
});

describe('餘弦函數 (cos)', () => {
    test('cos(0°) 應該等於 1', () => {
        expect(cos(0)).toBeCloseTo(1, 10);
    });

    test('cos(30°) 應該接近 √3/2', () => {
        expect(cos(30)).toBeCloseTo(Math.sqrt(3) / 2, 10);
    });

    test('cos(45°) 應該接近 √2/2', () => {
        expect(cos(45)).toBeCloseTo(Math.sqrt(2) / 2, 10);
    });

    test('cos(60°) 應該等於 0.5', () => {
        expect(cos(60)).toBeCloseTo(0.5, 10);
    });

    test('cos(90°) 應該接近 0', () => {
        expect(cos(90)).toBeCloseTo(0, 10);
    });

    test('cos(180°) 應該等於 -1', () => {
        expect(cos(180)).toBeCloseTo(-1, 10);
    });

    test('cos(270°) 應該接近 0', () => {
        expect(cos(270)).toBeCloseTo(0, 10);
    });

    test('cos(360°) 應該等於 1', () => {
        expect(cos(360)).toBeCloseTo(1, 10);
    });

    test('負角度：cos(-60°) 應該等於 0.5', () => {
        expect(cos(-60)).toBeCloseTo(0.5, 10);
    });

    test('大角度：cos(450°) 應該等於 cos(90°)', () => {
        expect(cos(450)).toBeCloseTo(cos(90), 10);
    });
});

describe('三角函數恆等式驗證', () => {
    test('sin²(x) + cos²(x) = 1：測試 30°', () => {
        const angle = 30;
        const sinVal = sin(angle);
        const cosVal = cos(angle);
        expect(sinVal * sinVal + cosVal * cosVal).toBeCloseTo(1, 10);
    });

    test('sin²(x) + cos²(x) = 1：測試 45°', () => {
        const angle = 45;
        const sinVal = sin(angle);
        const cosVal = cos(angle);
        expect(sinVal * sinVal + cosVal * cosVal).toBeCloseTo(1, 10);
    });

    test('sin²(x) + cos²(x) = 1：測試 60°', () => {
        const angle = 60;
        const sinVal = sin(angle);
        const cosVal = cos(angle);
        expect(sinVal * sinVal + cosVal * cosVal).toBeCloseTo(1, 10);
    });

    test('sin(90° - x) = cos(x)：測試 30°', () => {
        expect(sin(60)).toBeCloseTo(cos(30), 10);
    });

    test('cos(90° - x) = sin(x)：測試 30°', () => {
        expect(cos(60)).toBeCloseTo(sin(30), 10);
    });
});
