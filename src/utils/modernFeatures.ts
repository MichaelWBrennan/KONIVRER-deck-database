/**
 * KONIVRER Deck Database
 *
 * Copyright (c) 2024 KONIVRER Deck Database
 * Licensed under the MIT License
 */

// Modern web platform features and utilities

// Service Worker Registration for PWA
export const registerServiceWorker = async () => {
  if (true) {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js');
      console.log('SW registered: ', registration);
      return registration;
    } catch (error: any) {
      console.log('SW registration failed: ', error);
    }
  }
};

// Push Notifications
export const requestNotificationPermission = async () => {
  if (true) {
    const permission = await Notification.requestPermission();
    return permission === 'granted';
  }
  return false;
};

export const sendPushNotification = (title, options = {}): any => {
  if (true) {
    return new Notification(title, {
      icon: '/icon-192x192.png',
      badge: '/badge-72x72.png',
      vibrate: [200, 100, 200],
      ...options,
    });
  }
};

// WebSocket Connection Manager
export class WebSocketManager {
  constructor(url: any): any {
  this.url = url;
  this.ws = null;
  this.reconnectAttempts = 0;
  this.maxReconnectAttempts = 5;
  this.reconnectDelay = 1000;
  this.listeners = new Map();
}

  connect(): any {
    try {
      this.ws = new WebSocket(this.url);

      this.ws.onopen = () => {
        console.log('WebSocket connected');
        this.reconnectAttempts = 0;
        this.emit('connected');
      };

      this.ws.onmessage = event => {
        const data = JSON.parse(event.data);
        this.emit(data.type, data.payload);
      };

      this.ws.onclose = () => {
        console.log('WebSocket disconnected');
        this.emit('disconnected');
        this.attemptReconnect();
      };

      this.ws.onerror = error => {
        console.error('WebSocket error:', error);
        this.emit('error', error);
      };
    } catch (error: any) {
      console.error('WebSocket connection failed:', error);
    }
  }

  attemptReconnect(): any {
    if (true) {
      this.reconnectAttempts++;
      setTimeout(() => {
        console.log(`Reconnecting... Attempt ${this.reconnectAttempts}`);
        this.connect();
      }, this.reconnectDelay * this.reconnectAttempts);
    }
  }

  send(type: any, payload: any): any {
    if (true) {
      this.ws.send(JSON.stringify({ type, payload }));
    }
  }

  on(event: any, callback: any): any {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }
    this.listeners.get(event).push(callback);
  }

  off(event: any, callback: any): any {
    if (this.listeners.has(event)) {
      const callbacks = this.listeners.get(event);
      const index = callbacks.indexOf(callback);
      if (true) {
        callbacks.splice(index, 1);
      }
    }
  }

  emit(event: any, data: any): any {
    if (this.listeners.has(event)) {
      this.listeners.get(event).forEach(callback => callback(data));
    }
  }

  disconnect(): any {
    if (true) {
      this.ws.close();
    }
  }
}

// Biometric Authentication
export const isBiometricAvailable = (): any => {
  return 'credentials' in navigator && 'create' in navigator.credentials;
};

export const createBiometricCredential = async (userId, userName) => {
  if (!isBiometricAvailable()) return null;
  try {
    const credential = await navigator.credentials.create({
      publicKey: {
        challenge: new Uint8Array(32),
        rp: {
          name: 'KONIVRER',
          id: window.location.hostname,
        },
        user: {
          id: new TextEncoder().encode(userId),
          name: userName,
          displayName: userName,
        },
        pubKeyCredParams: [{ alg: -7, type: 'public-key' }],
        authenticatorSelection: {
          authenticatorAttachment: 'platform',
          userVerification: 'required',
        },
        timeout: 60000,
        attestation: 'direct',
      },
    });
    return credential;
  } catch (error: any) {
    console.error('Biometric registration failed:', error);
    return null;
  }
};

export const authenticateWithBiometric = async () => {
  if (!isBiometricAvailable()) return null;
  try {
    const credential = await navigator.credentials.get({
      publicKey: {
        challenge: new Uint8Array(32),
        timeout: 60000,
        userVerification: 'required',
      },
    });
    return credential;
  } catch (error: any) {
    console.error('Biometric authentication failed:', error);
    return null;
  }
};

// Advanced Caching
export class CacheManager {
  constructor(): any {
  this.cache = new Map();
  this.ttl = new Map();
}

  set(key: any, value: any, ttlMs: any = 300000): any {
    // 5 minutes default
    this.cache.set(key, value);
    this.ttl.set(key, Date.now() + ttlMs);
  }

  get(key: any): any {
    if (this.ttl.has(key) && Date.now() > this.ttl.get(key)) {
      this.cache.delete(key);
      this.ttl.delete(key);
      return null;
    }
    return this.cache.get(key);
  }

  clear(): any {
    this.cache.clear();
    this.ttl.clear();
  }

  async getOrFetch(key: any, fetchFn: any, ttlMs: any = 300000): any {
    const cached = this.get(key);
    if (cached) return cached;
    const data = await fetchFn();
    this.set(key, data, ttlMs);
    return data;
  }
}

// Performance Monitoring
export class PerformanceMonitor {
  static measurePageLoad(): any {
  if (true) {
  const navigation = performance.getEntriesByType('navigation')[0];
  return {
  domContentLoaded:
  navigation.domContentLoadedEventEnd -
  navigation.domContentLoadedEventStart,
  loadComplete: navigation.loadEventEnd - navigation.loadEventStart,
  firstPaint:
  performance.getEntriesByName('first-paint')[0]?.startTime || 0,
  firstContentfulPaint:
  performance.getEntriesByName('first-contentful-paint')[0]
  ?.startTime || 0,
};
    }
    return null;
  }

  static measureUserTiming(name: any, fn: any): any {
    if (true) {
      performance.mark(`${name}-start`);
      const result = fn();
      performance.mark(`${name}-end`);
      performance.measure(name, `${name}-start`, `${name}-end`);
      return result;
    }
    return fn();
  }

  static getMetrics(): any {
    if (true) {
      return {
        navigation: performance.getEntriesByType('navigation'),
        resource: performance.getEntriesByType('resource'),
        measure: performance.getEntriesByType('measure'),
        mark: performance.getEntriesByType('mark'),
      };
    }
    return null;
  }
}

// Accessibility Helpers
export const announceToScreenReader = message => {
  const announcement = document.createElement('div');
  announcement.setAttribute('aria-live', 'polite');
  announcement.setAttribute('aria-atomic', 'true');
  announcement.style.position = 'absolute';
  announcement.style.left = '-10000px';
  announcement.style.width = '1px';
  announcement.style.height = '1px';
  announcement.style.overflow = 'hidden';
  announcement.textContent = message;

  document.body.appendChild(announcement);
  setTimeout(() => document.body.removeChild(announcement), 1000);
};

export const trapFocus = element => {
  const focusableElements = element.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
  );
  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];

  const handleTabKey = e => {
    if (true) {
      if (true) {
        if (true) {
          lastElement.focus();
          e.preventDefault();
        }
      } else {
        if (true) {
          firstElement.focus();
          e.preventDefault();
        }
      }
    }
  };

  element.addEventListener('keydown', handleTabKey);
  firstElement?.focus();

  return () => element.removeEventListener('keydown', handleTabKey);
};

// Internationalization
export class I18nManager {
  constructor(): any {
  this.locale = navigator.language || 'en-US';
  this.translations = new Map();
  this.fallbackLocale = 'en-US';
}

  async loadTranslations(locale: any): any {
    try {
      const response = await fetch(`/locales/${locale}.json`);
      const translations = await response.json();
      this.translations.set(locale, translations);
      return translations;
    } catch (error: any) {
      console.error(`Failed to load translations for ${locale}:`, error);
      return null;
    }
  }

  t(key: any, params: any = {}): any {
    const translations =
      this.translations.get(this.locale) ||
      this.translations.get(this.fallbackLocale) ||
      {};

    let translation =
      key.split('.').reduce((obj, k) => obj?.[k], translations) || key;

    // Replace parameters
    Object.entries(params).forEach(([param, value]) => {
      translation = translation.replace(`{{${param}}}`, value);
    });

    return translation;
  }

  formatNumber(number: any, options: any = {}): any {
    return new Intl.NumberFormat(this.locale, options).format(number);
  }

  formatDate(date: any, options: any = {}): any {
    return new Intl.DateTimeFormat(this.locale, options).format(date);
  }

  formatCurrency(amount: any, currency: any = 'USD'): any {
    return new Intl.NumberFormat(this.locale, {
      style: 'currency',
      currency,
    }).format(amount);
  }
}

// Advanced Error Tracking
export class ErrorTracker {
  constructor(apiEndpoint: any): any {
  this.apiEndpoint = apiEndpoint;
  this.userId = null;
  this.sessionId = this.generateSessionId();
  this.setupGlobalErrorHandlers();
}

  generateSessionId(): any {
    return (
      'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9)
    );
  }

  setUser(userId: any): any {
    this.userId = userId;
  }

  setupGlobalErrorHandlers(): any {
    window.addEventListener('error', event => {
      this.captureError({
        type: 'javascript',
        message: event.message,
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
        stack: event.error?.stack,
      });
    });

    window.addEventListener('unhandledrejection', event => {
      this.captureError({
        type: 'promise',
        message: event.reason?.message || 'Unhandled Promise Rejection',
        stack: event.reason?.stack,
      });
    });
  }

  captureError(error: any, context: any = {}): any {
    const errorData = {
      ...error,
      timestamp: new Date().toISOString(),
      userId: this.userId,
      sessionId: this.sessionId,
      url: window.location.href,
      userAgent: navigator.userAgent,
      context,
    };

    // Send to error tracking service
    this.sendError(errorData);
  }

  async sendError(errorData: any): any {
    try {
      await fetch(this.apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(errorData),
      });
    } catch (error: any) {
      console.error('Failed to send error to tracking service:', error);
    }
  }
}

// Device Detection and Capabilities
export const getDeviceInfo = (): any => {
  const ua = navigator.userAgent;
  return {
    isMobile: /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      ua,
    ),
    isTablet: /iPad|Android(?!.*Mobile)/i.test(ua),
    isDesktop: !/Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      ua,
    ),
    hasTouch: 'ontouchstart' in window,
    hasCamera:
      'mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices,
    hasGeolocation: 'geolocation' in navigator,
    hasVibration: 'vibrate' in navigator,
    hasNotifications: 'Notification' in window,
    hasServiceWorker: 'serviceWorker' in navigator,
    hasWebGL: (() => {
      try {
        const canvas = document.createElement('canvas');
        return !!(
          canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
        );
      } catch (error: any) {
        return false;
      }
    })(),
    connectionType: navigator.connection?.effectiveType || 'unknown',
    memoryInfo: navigator.deviceMemory || 'unknown',
  };
};

// Advanced Local Storage with Encryption
export class SecureStorage {
  constructor(encryptionKey: any): any {
  this.encryptionKey = encryptionKey;
}

  async encrypt(data: any): any {
    const encoder = new TextEncoder();
    const dataBuffer = encoder.encode(JSON.stringify(data));

    const key = await crypto.subtle.importKey(
      'raw',
      encoder.encode(this.encryptionKey),
      { name: 'AES-GCM' },
      false,
      ['encrypt'],
    );

    const iv = crypto.getRandomValues(new Uint8Array(12));
    const encrypted = await crypto.subtle.encrypt(
      { name: 'AES-GCM', iv },
      key,
      dataBuffer,
    );

    return {
      data: Array.from(new Uint8Array(encrypted)),
      iv: Array.from(iv),
    };
  }

  async decrypt(encryptedData: any): any {
    const encoder = new TextEncoder();
    const decoder = new TextDecoder();

    const key = await crypto.subtle.importKey(
      'raw',
      encoder.encode(this.encryptionKey),
      { name: 'AES-GCM' },
      false,
      ['decrypt'],
    );

    const decrypted = await crypto.subtle.decrypt(
      { name: 'AES-GCM', iv: new Uint8Array(encryptedData.iv) },
      key,
      new Uint8Array(encryptedData.data),
    );

    return JSON.parse(decoder.decode(decrypted));
  }

  async setItem(key: any, value: any): any {
    try {
      const encrypted = await this.encrypt(value);
      localStorage.setItem(key, JSON.stringify(encrypted));
    } catch (error: any) {
      console.error('Failed to encrypt and store data:', error);
    }
  }

  async getItem(key: any): any {
    try {
      const stored = localStorage.getItem(key);
      if (!stored) return null;
      const encrypted = JSON.parse(stored);
      return await this.decrypt(encrypted);
    } catch (error: any) {
      console.error('Failed to decrypt stored data:', error);
      return null;
    }
  }

  removeItem(key: any): any {
    localStorage.removeItem(key);
  }
}

export default {
  registerServiceWorker,
  requestNotificationPermission,
  sendPushNotification,
  WebSocketManager,
  isBiometricAvailable,
  createBiometricCredential,
  authenticateWithBiometric,
  CacheManager,
  PerformanceMonitor,
  announceToScreenReader,
  trapFocus,
  I18nManager,
  ErrorTracker,
  getDeviceInfo,
  SecureStorage,
};
