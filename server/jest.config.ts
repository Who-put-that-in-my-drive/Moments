export default {
    clearMocks: true,
    collectCoverage: true,
    coverageDirectory: 'coverage',
    maxWorkers: 1,
    moduleFileExtensions: [
        'js',
        'mjs',
        'cjs',
        'jsx',
        'ts',
        'tsx',
        'json',
        'node'
    ],
    testMatch: [
        '**/__tests__/**/*.[jt]s?(x)',
    ],
    testTimeout: 30000,
    testPathIgnorePatterns: [
        '\\\\node_modules\\\\',
        'utils.ts'
    ],
    transform: {
        '^.+\\.(ts|tsx)$': ['ts-jest', {'tsConfigFile': 'tsconfig.json'}]
    },
    preset: 'ts-jest',
    testEnvironment: 'node',
};
