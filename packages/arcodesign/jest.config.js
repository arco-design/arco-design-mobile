module.exports = {
    clearMocks: true,
    collectCoverage: true,
    collectCoverageFrom: [
        'components/**/*.{ts,tsx}',
        '!components/**/style/*.ts',
        '!components/**/type.ts',
    ],
    coverageDirectory: 'tests/coverage',
    coveragePathIgnorePatterns: ['/node_modules/', '/scripts/', '/icon/', '/components/_helpers/'],
    moduleFileExtensions: ['js', 'json', 'jsx', 'ts', 'tsx', 'md'],
    setupFiles: ['./tests/setup.js'],
    snapshotSerializers: ['enzyme-to-json/serializer'],
    testPathIgnorePatterns: ['/node_modules/', '/scripts/'],
    testRegex: ['.*/components/.*\\.spec\\.jsx?$'],
    transform: {
        '^.+\\.j|tsx?$': 'babel-jest',
        '.*\\.(css|less|scss)$': '<rootDir>/tests/mocks/styleMock.js',
        '.*\\.md$': '<rootDir>/tests/mocks/mdMock.js',
    },
    transformIgnorePatterns: ['/node_modules/'],
    coverageThreshold: {
        global: {
          lines: 80,
          statements: 80,
        },
      },
};
