// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

// Polyfill window.matchMedia for Jest and react-slick
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => {},
  }),
});

// Polyfill IntersectionObserver for Jest and react-awesome-reveal
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  unobserve() {}
  takeRecords() {
    return [];
  }
};

// Mock ESM-only Swiper components for Jest environment
jest.mock('swiper/react', () => ({
  Swiper: ({ children }) => <div data-testid="mock-swiper">{children}</div>,
  SwiperSlide: ({ children }) => <div data-testid="mock-swiper-slide">{children}</div>,
}), { virtual: true });
jest.mock('swiper/modules', () => ({
  Navigation: {},
  Pagination: {},
  Autoplay: {},
  Thumbs: {},
  FreeMode: {},
}), { virtual: true });
jest.mock('swiper/css', () => ({}), { virtual: true });
jest.mock('swiper/css/navigation', () => ({}), { virtual: true });
jest.mock('swiper/css/pagination', () => ({}), { virtual: true });
jest.mock('swiper/css/thumbs', () => ({}), { virtual: true });
jest.mock('swiper/css/free-mode', () => ({}), { virtual: true });

// Mock react-owl-carousel for Jest JSDOM environment
window.$ = window.jQuery = require('jquery');
jest.mock('react-owl-carousel', () => ({ children }) => <div data-testid="mock-owl-carousel">{children}</div>);
