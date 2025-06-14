import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from './App';
import './App.css';
import './styles/modern-design.css';
import './styles/components.css';
import './styles/utilities.css';
import { initializeAnalytics, analyticsConfig } from './config/analytics.js';
import { initializeSecurity } from './config/security.js';

// Performance monitoring (only in development)
if (import.meta.env.DEV) {
  import('./utils/performance');
}

// Speed optimizations (production only)
if (import.meta.env.PROD) {
  import('./utils/speedOptimizations');
}

// Optimized service worker registration
if ('serviceWorker' in navigator && import.meta.env.PROD) {
  // Use requestIdleCallback for better performance
  const registerSW = () => {
    navigator.serviceWorker
      .register('/sw.js', { scope: '/' })
      .then(registration => {
        // Update on reload
        if (registration.waiting) {
          registration.waiting.postMessage({ type: 'SKIP_WAITING' });
        }
      })
      .catch(() => {
        // Silently fail in production
      });
  };

  if ('requestIdleCallback' in window) {
    requestIdleCallback(registerSW);
  } else {
    setTimeout(registerSW, 1000);
  }
}

// Optimized root creation with error handling
const container = document.getElementById('root');
const root = createRoot(container);

// Fallback component for critical errors
const FallbackApp = () => (
  <div
    style={{
      minHeight: '100vh',
      backgroundColor: '#111827',
      color: 'white',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      fontFamily: 'system-ui, -apple-system, sans-serif',
    }}
  >
    <div
      style={{
        maxWidth: '400px',
        textAlign: 'center',
        backgroundColor: '#1f2937',
        padding: '40px',
        borderRadius: '8px',
      }}
    >
      <h1 style={{ marginBottom: '20px', fontSize: '24px' }}>
        KONIVRER Deck Database
      </h1>
      <p style={{ marginBottom: '20px', opacity: 0.8 }}>
        The application is starting up. If this message persists, please refresh
        the page.
      </p>
      <button
        onClick={() => window.location.reload()}
        className="btn btn-primary"
      >
        Refresh Page
      </button>
    </div>
  </div>
);

try {
  root.render(
    <StrictMode>
      <App />
      {analyticsConfig.vercel.enabled && (
        <>
          <Analytics />
          <SpeedInsights
            sampleRate={analyticsConfig.vercel.speedInsights.sampleRate}
          />
        </>
      )}
    </StrictMode>,
  );
} catch (error) {
  console.error('Critical error during app initialization:', error);
  root.render(<FallbackApp />);
}

// Initialize security and analytics after render with error handling
try {
  initializeSecurity();
} catch (error) {
  console.warn('Security initialization failed:', error);
}

try {
  initializeAnalytics();
} catch (error) {
  console.warn('Analytics initialization failed:', error);
}

// CRITICAL: Comprehensive loading spinner removal
const removeAllLoadingElements = () => {
  // Remove by class names
  const loadingSelectors = [
    '.loading',
    '.loading-container',
    '.loading-spinner',
    '[class*="loading"]',
    '[class*="spinner"]',
    '[data-loading]',
    '#loading',
    '#spinner',
  ];

  loadingSelectors.forEach(selector => {
    document.querySelectorAll(selector).forEach(element => {
      element.style.display = 'none';
      element.remove();
    });
  });

  // Remove any elements with loading text
  const allElements = document.querySelectorAll('*');
  allElements.forEach(element => {
    if (
      element.textContent &&
      element.textContent.includes('Loading KONIVRER')
    ) {
      element.style.display = 'none';
      element.remove();
    }
  });

  console.log('🗑️ Comprehensive loading element removal completed');
};

// CRITICAL: Unregister all service workers
const unregisterServiceWorkers = async () => {
  if ('serviceWorker' in navigator) {
    try {
      const registrations = await navigator.serviceWorker.getRegistrations();
      for (const registration of registrations) {
        await registration.unregister();
        console.log('🗑️ Unregistered service worker:', registration.scope);
      }
    } catch (error) {
      console.log('⚠️ Service worker unregistration error:', error);
    }
  }
};

// CRITICAL: Clear all caches
const clearAllCaches = async () => {
  if ('caches' in window) {
    try {
      const cacheNames = await caches.keys();
      for (const cacheName of cacheNames) {
        await caches.delete(cacheName);
        console.log('🗑️ Deleted cache:', cacheName);
      }
    } catch (error) {
      console.log('⚠️ Cache clearing error:', error);
    }
  }
};

// Global error handlers
window.addEventListener('error', event => {
  console.error('Global error:', event.error);
});

window.addEventListener('unhandledrejection', event => {
  console.error('Unhandled promise rejection:', event.reason);
  event.preventDefault(); // Prevent the default browser behavior
});

// Execute all cleanup operations with error handling
try {
  removeAllLoadingElements();
  unregisterServiceWorkers();
  clearAllCaches();

  // Repeat cleanup after delays as fallback
  setTimeout(removeAllLoadingElements, 100);
  setTimeout(removeAllLoadingElements, 500);
  setTimeout(removeAllLoadingElements, 1000);
} catch (error) {
  console.warn('Cleanup operations failed:', error);
}
