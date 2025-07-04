/**
 * KONIVRER Deck Database
 *
 * Copyright (c) 2024 KONIVRER Deck Database
 * Licensed under the MIT License
 */

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Eye,
  Type,
  Monitor,
  Volume2,
  Keyboard,
  Hand,
  HelpCircle,
  RotateCcw,
  Check,
  ChevronRight,
  Globe,
  MessageSquare,
} from 'lucide-react';

import { useAccessibility } from './AccessibilityProvider';

/**
 * Accessibility Settings Component
 * Allows users to customize accessibility settings
 */
interface AccessibilitySettingsProps {
  onClose
}

const AccessibilitySettings: React.FC<AccessibilitySettingsProps> = ({  onClose  }) => {
  const { settings, updateSetting, resetSettings } = useAccessibility();
  const [activeTab, setActiveTab] = useState('visual');

  // Handle setting change
  const handleChange = (key, value): any => {
    updateSetting(key, value);
  };

  // Handle reset
  const handleReset = (): any => {
    if (
      window.confirm(
        'Are you sure you want to reset all accessibility settings to defaults?',
      )
    ) {
      resetSettings();
    }
  };

  return (
    <div className="accessibility-settings bg-white rounded-lg shadow-lg overflow-hidden max-w-4xl w-full"></div>
      <div className="flex flex-col md:flex-row h-full"></div>
        {/* Sidebar */}
        <div className="bg-gray-100 p-4 md:w-64"></div>
          <h2 className="text-xl font-bold text-gray-800 mb-4" />
            Accessibility
          </h2>

          <nav className="space-y-1" />
            <button
              className={`flex items-center w-full px-3 py-0 whitespace-nowrap rounded-md text-left ${
                activeTab === 'visual'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-700 hover:bg-gray-200'
              }`}
              onClick={() => setActiveTab('visual')}
            >
              <Eye className="w-5 h-5 mr-3" / />
              <span>Visual</span>

            <button
              className={`flex items-center w-full px-3 py-0 whitespace-nowrap rounded-md text-left ${
                activeTab === 'interface'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-700 hover:bg-gray-200'
              }`}
              onClick={() => setActiveTab('interface')}
            >
              <Monitor className="w-5 h-5 mr-3" / />
              <span>Interface</span>

            <button
              className={`flex items-center w-full px-3 py-0 whitespace-nowrap rounded-md text-left ${
                activeTab === 'audio'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-700 hover:bg-gray-200'
              }`}
              onClick={() => setActiveTab('audio')}
            >
              <Volume2 className="w-5 h-5 mr-3" / />
              <span>Audio</span>

            <button
              className={`flex items-center w-full px-3 py-0 whitespace-nowrap rounded-md text-left ${
                activeTab === 'input'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-700 hover:bg-gray-200'
              }`}
              onClick={() => setActiveTab('input')}
            >
              <Keyboard className="w-5 h-5 mr-3" / />
              <span>Input</span>

            <button
              className={`flex items-center w-full px-3 py-0 whitespace-nowrap rounded-md text-left ${
                activeTab === 'language'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-700 hover:bg-gray-200'
              }`}
              onClick={() => setActiveTab('language')}
            >
              <Globe className="w-5 h-5 mr-3" / />
              <span>Language</span>

            <button
              className={`flex items-center w-full px-3 py-0 whitespace-nowrap rounded-md text-left ${
                activeTab === 'help'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-700 hover:bg-gray-200'
              }`}
              onClick={() => setActiveTab('help')}
            >
              <HelpCircle className="w-5 h-5 mr-3" / />
              <span>Help</span>
          </nav>

          <div className="mt-6"></div>
            <button
              className="flex items-center w-full px-3 py-0 whitespace-nowrap rounded-md text-left text-red-600 hover:bg-red-50"
              onClick={handleReset}
             />
              <RotateCcw className="w-5 h-5 mr-3" / />
              <span>Reset All</span>
          </div>

        {/* Content */}
        <div className="flex-1 p-6 overflow-y-auto"></div>
          {/* Visual Settings */}
          {activeTab === 'visual' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
             />
              <h3 className="text-lg font-semibold text-gray-800 mb-4" />
                Visual Settings
              </h3>

              {/* Font Size */}
              <div className="mb-6"></div>
                <label className="block text-sm font-medium text-gray-700 mb-2"></label>
                  Font Size
                </label>
                <div className="grid grid-cols-4 gap-2"></div>
                  {['small', 'medium', 'large', 'x-large'].map(size => (
                    <button
                      key={size}
                      className={`px-4 py-0 whitespace-nowrap rounded-md border ${
                        settings.fontSize === size
                          ? 'bg-blue-100 border-blue-500 text-blue-700'
                          : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                      }`}
                      onClick={() => handleChange('fontSize', size)}
                    >
                      <span
                        className={`
                        ${size === 'small' ? 'text-sm' : ''}
                        ${size === 'medium' ? 'text-base' : ''}
                        ${size === 'large' ? 'text-lg' : ''}
                        ${size === 'x-large' ? 'text-xl' : ''}
                      `}
                       />
                        {size.charAt(0).toUpperCase() + size.slice(1)}
                    </button>
                  ))}
                </div>

              {/* Color Mode */}
              <div className="mb-6"></div>
                <label className="block text-sm font-medium text-gray-700 mb-2"></label>
                  Color Mode
                </label>
                <div className="grid grid-cols-2 gap-2"></div>
                  {[
                    { id: 'default', name: 'Default' },
                    { id: 'high-contrast', name: 'High Contrast' },
                    { id: 'dark', name: 'Dark Mode' },
                    { id: 'light', name: 'Light Mode' },
                  ].map(mode => (
                    <button
                      key={mode.id}
                      className={`px-4 py-0 whitespace-nowrap rounded-md border ${
                        settings.colorMode === mode.id
                          ? 'bg-blue-100 border-blue-500 text-blue-700'
                          : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                      }`}
                      onClick={() => handleChange('colorMode', mode.id)}
                    >
                      {mode.name}
                  ))}
                </div>

              {/* Color Blind Mode */}
              <div className="mb-6"></div>
                <label className="block text-sm font-medium text-gray-700 mb-2"></label>
                  Color Blind Mode
                </label>
                <div className="grid grid-cols-2 gap-2"></div>
                  {[
                    { id: 'none', name: 'None' },
                    { id: 'protanopia', name: 'Protanopia' },
                    { id: 'deuteranopia', name: 'Deuteranopia' },
                    { id: 'tritanopia', name: 'Tritanopia' },
                    { id: 'achromatopsia', name: 'Achromatopsia' },
                  ].map(mode => (
                    <button
                      key={mode.id}
                      className={`px-4 py-0 whitespace-nowrap rounded-md border ${
                        settings.colorBlindMode === mode.id
                          ? 'bg-blue-100 border-blue-500 text-blue-700'
                          : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                      }`}
                      onClick={() => handleChange('colorBlindMode', mode.id)}
                    >
                      {mode.name}
                  ))}
                </div>

              {/* Motion & Transparency */}
              <div className="mb-6 space-y-4"></div>
                <div className="flex items-center"></div>
                  <input
                    id="reduceMotion"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    checked={settings.reduceMotion}
                    onChange={e = />
                      handleChange('reduceMotion', e.target.checked)}
                  />
                  <label
                    htmlFor="reduceMotion"
                    className="ml-2 block text-sm text-gray-700"
                   />
                    Reduce motion and animations
                  </label>

                <div className="flex items-center"></div>
                  <input
                    id="reduceTransparency"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    checked={settings.reduceTransparency}
                    onChange={e = />
                      handleChange('reduceTransparency', e.target.checked)}
                  />
                  <label
                    htmlFor="reduceTransparency"
                    className="ml-2 block text-sm text-gray-700"
                   />
                    Reduce transparency effects
                  </label>
              </div>
            </motion.div>
          )}
          {/* Interface Settings */}
          {activeTab === 'interface' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
             />
              <h3 className="text-lg font-semibold text-gray-800 mb-4" />
                Interface Settings
              </h3>

              {/* Interface Complexity */}
              <div className="mb-6"></div>
                <label className="block text-sm font-medium text-gray-700 mb-2"></label>
                  Interface Complexity
                </label>
                <div className="space-y-2"></div>
                  {[
                    {
                      id: 'simple',
                      name: 'Simple',
                      description:
                        'Minimal interface with essential features only',
                    },
                    {
                      id: 'standard',
                      name: 'Standard',
                      description: 'Default interface with balanced features',
                    },
                    {
                      id: 'advanced',
                      name: 'Advanced',
                      description:
                        'Full interface with all features and options',
                    },
                  ].map(option => (
                    <div
                      key={option.id}
                      className={`p-3 rounded-md border ${
                        settings.interfaceComplexity === option.id
                          ? 'bg-blue-50 border-blue-500'
                          : 'border-gray-300 hover:bg-gray-50'
                      }`}
                      onClick={() = />
                        handleChange('interfaceComplexity', option.id)}
                    >
                      <div className="flex items-center"></div>
                        <div
                          className={`w-4 h-4 rounded-full border ${
                            settings.interfaceComplexity === option.id
                              ? 'bg-blue-500 border-blue-500'
                              : 'border-gray-400'
                          }`}
                         />
                          {settings.interfaceComplexity === option.id && (
                            <Check className="w-4 h-4 text-white" / />
                          )}
                        <span className="ml-2 font-medium text-gray-800"></span>
                          {option.name}
                      </div>
                      <p className="mt-1 text-sm text-gray-600 ml-6"></p>
                        {option.description}
                    </div>
                  ))}
                </div>

              {/* Screen Reader Optimization */}
              <div className="mb-6"></div>
                <div className="flex items-center"></div>
                  <input
                    id="screenReaderOptimized"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    checked={settings.screenReaderOptimized}
                    onChange={e = />
                      handleChange('screenReaderOptimized', e.target.checked)}
                  />
                  <label
                    htmlFor="screenReaderOptimized"
                    className="ml-2 block text-sm text-gray-700"
                   />
                    Optimize for screen readers
                  </label>
                <p className="mt-1 text-xs text-gray-500 ml-6"></p>
                  Enhances compatibility with screen readers by adding
                  additional ARIA labels and improving navigation
                </p>

              {/* Guided Experience */}
              <div className="mb-6 space-y-4"></div>
                <div className="flex items-center"></div>
                  <input
                    id="showTutorials"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    checked={settings.showTutorials}
                    onChange={e = />
                      handleChange('showTutorials', e.target.checked)}
                  />
                  <label
                    htmlFor="showTutorials"
                    className="ml-2 block text-sm text-gray-700"
                   />
                    Show tutorials for new features
                  </label>

                <div className="flex items-center"></div>
                  <input
                    id="showContextualHelp"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    checked={settings.showContextualHelp}
                    onChange={e = />
                      handleChange('showContextualHelp', e.target.checked)}
                  />
                  <label
                    htmlFor="showContextualHelp"
                    className="ml-2 block text-sm text-gray-700"
                   />
                    Show contextual help and tooltips
                  </label>
              </div>
            </motion.div>
          )}
          {/* Audio Settings */}
          {activeTab === 'audio' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
             />
              <h3 className="text-lg font-semibold text-gray-800 mb-4" />
                Audio Settings
              </h3>

              <div className="mb-6 space-y-4"></div>
                <div className="flex items-center"></div>
                  <input
                    id="enableSoundEffects"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    checked={settings.enableSoundEffects}
                    onChange={e = />
                      handleChange('enableSoundEffects', e.target.checked)}
                  />
                  <label
                    htmlFor="enableSoundEffects"
                    className="ml-2 block text-sm text-gray-700"
                   />
                    Enable sound effects
                  </label>

                <div className="flex items-center"></div>
                  <input
                    id="enableVoiceAnnouncements"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    checked={settings.enableVoiceAnnouncements}
                    onChange={e = />
                      handleChange('enableVoiceAnnouncements', e.target.checked)}
                  />
                  <label
                    htmlFor="enableVoiceAnnouncements"
                    className="ml-2 block text-sm text-gray-700"
                   />
                    Enable voice announcements
                  </label>
              </div>

              {settings.enableVoiceAnnouncements && (
                <div className="mb-6"></div>
                  <label className="block text-sm font-medium text-gray-700 mb-2"></label>
                    Voice Announcement Volume
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    step="10"
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    value={settings.voiceVolume || 80}
                    onChange={e = />
                      handleChange('voiceVolume', parseInt(e.target.value))}
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1"></div>
                    <span>0%</span>
                    <span>50%</span>
                    <span>100%</span>
                </div>
              )}
            </motion.div>
          )}
          {/* Input Settings */}
          {activeTab === 'input' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
             />
              <h3 className="text-lg font-semibold text-gray-800 mb-4" />
                Input Settings
              </h3>

              {/* Keyboard Navigation */}
              <div className="mb-6"></div>
                <div className="flex items-center"></div>
                  <input
                    id="enhancedKeyboardNavigation"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    checked={settings.enhancedKeyboardNavigation}
                    onChange={e = />
                      handleChange(
                        'enhancedKeyboardNavigation',
                        e.target.checked,
                      )}
                  />
                  <label
                    htmlFor="enhancedKeyboardNavigation"
                    className="ml-2 block text-sm text-gray-700"
                   />
                    Enhanced keyboard navigation
                  </label>
                <p className="mt-1 text-xs text-gray-500 ml-6"></p>
                  Improves keyboard navigation with additional shortcuts and
                  focus indicators
                </p>

              {/* Touch Target Size */}
              <div className="mb-6"></div>
                <label className="block text-sm font-medium text-gray-700 mb-2"></label>
                  Touch Target Size
                </label>
                <div className="grid grid-cols-3 gap-2"></div>
                  {['small', 'medium', 'large'].map(size => (
                    <button
                      key={size}
                      className={`px-4 py-0 whitespace-nowrap rounded-md border ${
                        settings.touchTargetSize === size
                          ? 'bg-blue-100 border-blue-500 text-blue-700'
                          : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                      }`}
                      onClick={() => handleChange('touchTargetSize', size)}
                    >
                      {size.charAt(0).toUpperCase() + size.slice(1)}
                  ))}
                </div>
                <p className="mt-1 text-xs text-gray-500"></p>
                  Adjusts the size of buttons and interactive elements for
                  easier touch interaction
                </p>
            </motion.div>
          )}
          {/* Language Settings */}
          {activeTab === 'language' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
             />
              <h3 className="text-lg font-semibold text-gray-800 mb-4" />
                Language Settings
              </h3>

              {/* Language Selection */}
              <div className="mb-6"></div>
                <label className="block text-sm font-medium text-gray-700 mb-2"></label>
                  Interface Language
                </label>
                <select
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                  value={settings.language}
                  onChange={e => handleChange('language', e.target.value)}
                >
                  <option value="en">English</option>
                  <option value="es">Español</option>
                  <option value="fr">Français</option>
                  <option value="de">Deutsch</option>
                  <option value="ja">日本語</option>
                  <option value="zh">中文</option>
                  <option value="ko">한국어</option>
                  <option value="pt">Português</option>
                  <option value="ru">Русский</option>
              </div>

              {/* Terminology Preferences */}
              <div className="mb-6"></div>
                <label className="block text-sm font-medium text-gray-700 mb-2"></label>
                  Terminology Preferences
                </label>
                <div className="space-y-2"></div>
                  {[
                    {
                      id: 'standard',
                      name: 'Standard',
                      description: 'Use standard card game terminology',
                    },
                    {
                      id: 'simplified',
                      name: 'Simplified',
                      description: 'Use simplified terms for beginners',
                    },
                    {
                      id: 'technical',
                      name: 'Technical',
                      description: 'Use precise technical terminology',
                    },
                  ].map(option => (
                    <div
                      key={option.id}
                      className={`p-3 rounded-md border ${
                        (settings.terminologyPreference || 'standard') ===
                        option.id
                          ? 'bg-blue-50 border-blue-500'
                          : 'border-gray-300 hover:bg-gray-50'
                      }`}
                      onClick={() = />
                        handleChange('terminologyPreference', option.id)}
                    >
                      <div className="flex items-center"></div>
                        <div
                          className={`w-4 h-4 rounded-full border ${
                            (settings.terminologyPreference || 'standard') ===
                            option.id
                              ? 'bg-blue-500 border-blue-500'
                              : 'border-gray-400'
                          }`}
                         />
                          {(settings.terminologyPreference || 'standard') ===
                            option.id && (
                            <Check className="w-4 h-4 text-white" / />
                          )}
                        <span className="ml-2 font-medium text-gray-800"></span>
                          {option.name}
                      </div>
                      <p className="mt-1 text-sm text-gray-600 ml-6"></p>
                        {option.description}
                    </div>
                  ))}
                </div>
            </motion.div>
          )}
          {/* Help Settings */}
          {activeTab === 'help' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
             />
              <h3 className="text-lg font-semibold text-gray-800 mb-4" />
                Help & Support
              </h3>

              <div className="space-y-4"></div>
                <div className="bg-blue-50 p-4 rounded-lg"></div>
                  <h4 className="font-medium text-blue-800 mb-2" />
                    Accessibility Support
                  </h4>
                  <p className="text-sm text-blue-700 mb-3"></p>
                    If you need additional accessibility accommodations or have
                    feedback, please contact our support team.
                  </p>
                  <a
                    href="mailto:accessibility@example.com"
                    className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800"
                   />
                    <MessageSquare className="w-4 h-4 mr-1" / />
                    Contact Accessibility Support
                  </a>

                <div className="border border-gray-200 rounded-lg divide-y divide-gray-200"></div>
                  <div className="p-4"></div>
                    <h4 className="font-medium text-gray-800 mb-1" />
                      Keyboard Shortcuts
                    </h4>
                    <p className="text-sm text-gray-600"></p>
                      View and customize keyboard shortcuts for navigation and
                      actions
                    </p>
                    <button className="mt-2 inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800"></button>
                      View Shortcuts
                      <ChevronRight className="w-4 h-4 ml-1" / />
                    </button>

                  <div className="p-4"></div>
                    <h4 className="font-medium text-gray-800 mb-1" />
                      Accessibility Guide
                    </h4>
                    <p className="text-sm text-gray-600"></p>
                      Learn about all accessibility features and how to use them
                    </p>
                    <button className="mt-2 inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800"></button>
                      Open Guide
                      <ChevronRight className="w-4 h-4 ml-1" / />
                    </button>

                  <div className="p-4"></div>
                    <h4 className="font-medium text-gray-800 mb-1" />
                      Screen Reader Tips
                    </h4>
                    <p className="text-sm text-gray-600"></p>
                      Tips for using the application with screen readers
                    </p>
                    <button className="mt-2 inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800"></button>
                      View Tips
                      <ChevronRight className="w-4 h-4 ml-1" / />
                    </button>
                </div>
            </motion.div>
          )}
        </div>

      {/* Footer */}
      <div className="bg-gray-50 px-6 py-0 whitespace-nowrap flex justify-end"></div>
        <button
          className="px-4 py-0 whitespace-nowrap bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          onClick={onClose}
         />
          Save & Close
        </button>
    </div>
  );
};

export default AccessibilitySettings;