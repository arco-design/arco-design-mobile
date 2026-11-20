import bezierEasing from '../../../common-widgets/utils/bezier-easing';

describe('bezierEasing', () => {
    it('matches the analytic inverse near the steep curve midpoint', () => {
        const x = 0.4996;
        // For control points (1, 0, 0, 1), x(t) = 0.5 + 4(t - 0.5)^3.
        // This inverse is independent of the easing implementation.
        const t = 0.5 + Math.cbrt((x - 0.5) / 4);
        const expected = t * t * (3 - 2 * t);

        expect(expected).toBeCloseTo(0.430576, 6);
        expect(bezierEasing(1, 0, 0, 1)(x)).toBeCloseTo(expected, 10);
    });
});
