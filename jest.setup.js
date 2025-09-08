import '@testing-library/jest-dom/extend-expect';

// Allow router mocks.

jest.mock('next/router', () => require('next-router-mock'));
