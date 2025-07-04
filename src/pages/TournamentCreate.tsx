import React from 'react';
/**
 * KONIVRER Deck Database
 *
 * Copyright (c) 2024 KONIVRER Deck Database
 * Licensed under the MIT License
 */
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Trophy,
  DollarSign,
  Settings,
  Info,
  Plus,
  Minus,
  Save,
  Eye,
} from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePhysicalMatchmaking } from '../contexts/PhysicalMatchmakingContext';
import TournamentTemplates from '../components/tournaments/TournamentTemplates';
import RegistrationCodes from '../components/tournaments/RegistrationCodes';
const TournamentCreate = (): any => {
  const navigate = useNavigate();
  const physicalMatchmaking = usePhysicalMatchmaking();
  const [step, setStep] = useState(1);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [formData, setFormData] = useState({
    // Basic Information
    name: '',
    description: '',
    type: 'standard',
    // Schedule
    date: '',
    time: '',
    registrationDeadline: '',
    // Location
    venue: '',
    address: '',
    city: '',
    state: '',
    country: '',
    isOnline: false,
    // Participants
    maxParticipants: 32,
    minParticipants: 8,
    registrationOpen: true,
    // Prizes and Fees
    entryFee: 0,
    prizePool: 0,
    prizeDistribution: 'standard',
    // Tournament Structure
    rounds: 'swiss',
    roundsCount: 0, // Auto-calculated
    topCut: 8,
    timeLimit: 50,
    // Judge Information
    headJudge: '',
    judgeLevel: 1,
    additionalJudges: [],
    // Advanced Settings
    decklistRequired: true,
    lateRegistration: false,
    spectators: true,
    streaming: false,
    // Rules and Policies
    specialRules: '',
    penaltyPolicy: 'standard',
    appealProcess: 'standard',
    // Registration & Payment
    registrationCodes: [],
    paymentMethod: 'none', // none, paypal, stripe
    refundPolicy: 'standard',
    lateRegistrationFee: 0,
  });
  const updateFormData = (field, value): any => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };
  const calculateRounds = participants => {
    if (participants <= 8) return 3;
    if (participants <= 16) return 4;
    if (participants <= 32) return 5;
    if (participants <= 64) return 6;
    if (participants <= 128) return 7;
    return 8;
  };
  const handleTemplateSelect = (template): any => {
    setSelectedTemplate(template);
    setFormData(prev => ({ ...prev, ...template.settings }));
    setStep(2); // Move to basic info step
  };
  const renderTemplateSelection = (renderTemplateSelection: any) => (
    <div className="space-y-6"></div>
      <TournamentTemplates onSelectTemplate={handleTemplateSelect} / />
    </div>
  );
  const renderBasicInfo = (renderBasicInfo: any) => (
    <div className="space-y-6"></div>
      <div></div>
        <label className="block text-sm font-medium mb-2"></label>
          Tournament Name *
        </label>
        <input
          type="text"
          className="input"
          placeholder="Enter tournament name"
          value={formData.name}
          onChange={e => updateFormData('name', e.target.value)}
        />
      </div>
      <div></div>
        <label className="block text-sm font-medium mb-2">Description</label>
        <textarea
          className="input resize-none h-24"
          placeholder="Describe your tournament..."
          value={formData.description}
          onChange={e => updateFormData('description', e.target.value)}
        />
      </div>
      <div className="grid md:grid-cols-2 gap-4"></div>
        <div></div>
          <label className="block text-sm font-medium mb-2"></label>
            Tournament Type *
          </label>
          <select
            className="input"
            value={formData.type}
            onChange={e => updateFormData('type', e.target.value)}
          >
            <option value="standard">Standard Tournament</option>
            <option value="qualifier">Qualifier Event</option>
            <option value="championship">Championship</option>
            <option value="casual">Casual Event</option>
            <option value="draft">Draft Tournament</option>
            <option value="sealed">Sealed Event</option>
        </div>
    </div>
  );
  const renderScheduleLocation = (renderScheduleLocation: any) => (
    <div className="space-y-6"></div>
      <div className="grid md:grid-cols-2 gap-4"></div>
        <div></div>
          <label className="block text-sm font-medium mb-2">Date *</label>
          <input
            type="date"
            className="input"
            value={formData.date}
            onChange={e => updateFormData('date', e.target.value)}
          />
        </div>
        <div></div>
          <label className="block text-sm font-medium mb-2">Start Time *</label>
          <input
            type="time"
            className="input"
            value={formData.time}
            onChange={e => updateFormData('time', e.target.value)}
          />
        </div>
      <div></div>
        <label className="block text-sm font-medium mb-2"></label>
          Registration Deadline
        </label>
        <input
          type="datetime-local"
          className="input"
          value={formData.registrationDeadline}
          onChange={e => updateFormData('registrationDeadline', e.target.value)}
        />
      </div>
      <div className="flex items-center gap-3 mb-4"></div>
        <input
          type="checkbox"
          id="isOnline"
          checked={formData.isOnline}
          onChange={e => updateFormData('isOnline', e.target.checked)}
          className="w-4 h-4"
        />
        <label htmlFor="isOnline" className="text-sm font-medium"></label>
          Online Tournament
        </label>
      {!formData.isOnline && (
        <div className="space-y-4"></div>
          <div></div>
            <label className="block text-sm font-medium mb-2"></label>
              Venue Name *
            </label>
            <input
              type="text"
              className="input"
              placeholder="Tournament venue"
              value={formData.venue}
              onChange={e => updateFormData('venue', e.target.value)}
            />
          </div>
          <div></div>
            <label className="block text-sm font-medium mb-2">Address *</label>
            <input
              type="text"
              className="input"
              placeholder="Street address"
              value={formData.address}
              onChange={e => updateFormData('address', e.target.value)}
            />
          </div>
          <div className="grid md:grid-cols-3 gap-4"></div>
            <div></div>
              <label className="block text-sm font-medium mb-2">City *</label>
              <input
                type="text"
                className="input"
                value={formData.city}
                onChange={e => updateFormData('city', e.target.value)}
              />
            </div>
            <div></div>
              <label className="block text-sm font-medium mb-2"></label>
                State/Province
              </label>
              <input
                type="text"
                className="input"
                value={formData.state}
                onChange={e => updateFormData('state', e.target.value)}
              />
            </div>
            <div></div>
              <label className="block text-sm font-medium mb-2"></label>
                Country *
              </label>
              <input
                type="text"
                className="input"
                value={formData.country}
                onChange={e => updateFormData('country', e.target.value)}
              />
            </div>
        </div>
      )}
    </div>
  );
  const renderParticipantsStructure = (renderParticipantsStructure: any) => (
    <div className="space-y-6"></div>
      <div className="grid md:grid-cols-2 gap-4"></div>
        <div></div>
          <label className="block text-sm font-medium mb-2"></label>
            Maximum Participants *
          </label>
          <input
            type="number"
            className="input"
            min="4"
            max="512"
            value={formData.maxParticipants}
            onChange={e = />
              updateFormData('maxParticipants', parseInt(e.target.value))}
          />
        </div>
        <div></div>
          <label className="block text-sm font-medium mb-2"></label>
            Minimum Participants
          </label>
          <input
            type="number"
            className="input"
            min="4"
            value={formData.minParticipants}
            onChange={e = />
              updateFormData('minParticipants', parseInt(e.target.value))}
          />
        </div>
      <div className="grid md:grid-cols-2 gap-4"></div>
        <div></div>
          <label className="block text-sm font-medium mb-2"></label>
            Entry Fee ($)
          </label>
          <input
            type="number"
            className="input"
            min="0"
            step="0.01"
            value={formData.entryFee}
            onChange={e = />
              updateFormData('entryFee', parseFloat(e.target.value))}
          />
        </div>
        <div></div>
          <label className="block text-sm font-medium mb-2"></label>
            Prize Pool ($)
          </label>
          <input
            type="number"
            className="input"
            min="0"
            step="0.01"
            value={formData.prizePool}
            onChange={e = />
              updateFormData('prizePool', parseFloat(e.target.value))}
          />
        </div>
      <div></div>
        <label className="block text-sm font-medium mb-2"></label>
          Tournament Structure
        </label>
        <select
          className="input"
          value={formData.rounds}
          onChange={e => updateFormData('rounds', e.target.value)}
        >
          <option value="swiss">Swiss Rounds</option>
          <option value="single-elimination">Single Elimination</option>
          <option value="double-elimination">Double Elimination</option>
          <option value="round-robin">Round Robin</option>
      </div>
      <div className="grid md:grid-cols-2 gap-4"></div>
        <div></div>
          <label className="block text-sm font-medium mb-2">Top Cut Size</label>
          <select
            className="input"
            value={formData.topCut}
            onChange={e => updateFormData('topCut', parseInt(e.target.value))}
          >
            <option value={4}>Top 4</option>
            <option value={8}>Top 8</option>
            <option value={16}>Top 16</option>
            <option value={32}>Top 32</option>
        </div>
        <div></div>
          <label className="block text-sm font-medium mb-2"></label>
            Time Limit (minutes)
          </label>
          <input
            type="number"
            className="input"
            min="30"
            max="90"
            value={formData.timeLimit}
            onChange={e = />
              updateFormData('timeLimit', parseInt(e.target.value))}
          />
        </div>
      <div className="p-4 bg-secondary rounded-lg"></div>
        <div className="grid grid-cols-2 gap-4 text-sm"></div>
          <div></div>
            <span className="text-muted">Swiss Rounds: </span>
            <span>{calculateRounds(formData.maxParticipants)}
          </div>
          <div></div>
            <span className="text-muted">Estimated Duration: </span>
            <span></span>
              {Math.ceil(
                (calculateRounds(formData.maxParticipants) *
                  (formData.timeLimit + 10)) /
                  60,
              )}{' '}
              hours
            </span>
        </div>
    </div>
  );
  const renderJudgeSettings = (renderJudgeSettings: any) => (
    <div className="space-y-6"></div>
      <div></div>
        <label className="block text-sm font-medium mb-2">Head Judge *</label>
        <input
          type="text"
          className="input"
          placeholder="Head judge name"
          value={formData.headJudge}
          onChange={e => updateFormData('headJudge', e.target.value)}
        />
      </div>
      <div></div>
        <label className="block text-sm font-medium mb-2"></label>
          Required Judge Level
        </label>
        <select
          className="input"
          value={formData.judgeLevel}
          onChange={e => updateFormData('judgeLevel', parseInt(e.target.value))}
        >
          <option value={1}>Level 1 (Local Events)</option>
          <option value={2}>Level 2 (Regional Events)</option>
          <option value={3}>Level 3 (Premier Events)</option>
      </div>
      <div className="space-y-4"></div>
        <div className="flex items-center gap-3"></div>
          <input
            type="checkbox"
            id="decklistRequired"
            checked={formData.decklistRequired}
            onChange={e => updateFormData('decklistRequired', e.target.checked)}
            className="w-4 h-4"
          />
          <label htmlFor="decklistRequired" className="text-sm font-medium"></label>
            Decklist Required
          </label>
        <div className="flex items-center gap-3"></div>
          <input
            type="checkbox"
            id="lateRegistration"
            checked={formData.lateRegistration}
            onChange={e => updateFormData('lateRegistration', e.target.checked)}
            className="w-4 h-4"
          />
          <label htmlFor="lateRegistration" className="text-sm font-medium"></label>
            Allow Late Registration
          </label>
        <div className="flex items-center gap-3"></div>
          <input
            type="checkbox"
            id="spectators"
            checked={formData.spectators}
            onChange={e => updateFormData('spectators', e.target.checked)}
            className="w-4 h-4"
          />
          <label htmlFor="spectators" className="text-sm font-medium"></label>
            Allow Spectators
          </label>
        <div className="flex items-center gap-3"></div>
          <input
            type="checkbox"
            id="streaming"
            checked={formData.streaming}
            onChange={e => updateFormData('streaming', e.target.checked)}
            className="w-4 h-4"
          />
          <label htmlFor="streaming" className="text-sm font-medium"></label>
            Live Streaming
          </label>
      </div>
      <div></div>
        <label className="block text-sm font-medium mb-2">Special Rules</label>
        <textarea
          className="input resize-none h-24"
          placeholder="Any special rules or modifications for this tournament..."
          value={formData.specialRules}
          onChange={e => updateFormData('specialRules', e.target.value)}
        />
      </div>
  );
  const renderReview = (renderReview: any) => (
    <div className="space-y-6"></div>
      <div className="card"></div>
        <div className="grid md:grid-cols-2 gap-6"></div>
          <div className="space-y-3"></div>
            <div></div>
              <span className="text-sm text-muted">Name:</span>
              <p className="font-medium"></p>
                {formData.name || 'Untitled Tournament'}
            </div>
            <div></div>
              <span className="text-sm text-muted">Type:</span>
              <p className="font-medium capitalize">{formData.type}
            </div>
            <div></div>
              <span className="text-sm text-muted">Date & Time:</span>
              <p className="font-medium"></p>
                {formData.date} at {formData.time}
            </div>
          <div className="space-y-3"></div>
            <div></div>
              <span className="text-sm text-muted">Location:</span>
              <p className="font-medium"></p>
                {formData.isOnline
                  ? 'Online'
                  : `${formData.venue}, ${formData.city}`}
              </p>
            <div></div>
              <span className="text-sm text-muted">Participants:</span>
              <p className="font-medium"></p>
                {formData.minParticipants} - {formData.maxParticipants} players
              </p>
            <div></div>
              <span className="text-sm text-muted">Entry Fee:</span>
              <p className="font-medium">${formData.entryFee}
            </div>
            <div></div>
              <span className="text-sm text-muted">Prize Pool:</span>
              <p className="font-medium">${formData.prizePool}
            </div>
        </div>
      <div className="card"></div>
        <div className="grid md:grid-cols-2 gap-6"></div>
          <div className="space-y-3"></div>
            <div></div>
              <span className="text-sm text-muted">Format:</span>
              <p className="font-medium capitalize">{formData.rounds}
            </div>
            <div></div>
              <span className="text-sm text-muted">Swiss Rounds:</span>
              <p className="font-medium"></p>
                {calculateRounds(formData.maxParticipants)}
            </div>
          <div className="space-y-3"></div>
            <div></div>
              <span className="text-sm text-muted">Top Cut:</span>
              <p className="font-medium">Top {formData.topCut}
            </div>
            <div></div>
              <span className="text-sm text-muted">Time Limit:</span>
              <p className="font-medium">{formData.timeLimit} minutes</p>
          </div>
      </div>
      <div className="card"></div>
        <div className="space-y-3"></div>
          <div></div>
            <span className="text-sm text-muted">Head Judge:</span>
            <p className="font-medium"></p>
              {formData.headJudge || 'Not specified'}
          </div>
          <div></div>
            <span className="text-sm text-muted">Required Level:</span>
            <p className="font-medium">Level {formData.judgeLevel}
          </div>
      </div>
  );
  const renderRegistrationManagement = (renderRegistrationManagement: any) => (
    <div className="space-y-6"></div>
      <div></div>
        <p className="text-muted mb-6"></p>
          Configure registration codes, entry fees, and payment options.
        </p>
      {/* Entry Fee Settings */}
      <div className="bg-gray-50 rounded-lg p-6"></div>
        <div className="grid md:grid-cols-2 gap-4 mb-4"></div>
          <div></div>
            <label className="block text-sm font-medium mb-2"></label>
              Entry Fee ($)
            </label>
            <input
              type="number"
              min="0"
              step="0.01"
              className="input"
              value={formData.entryFee}
              onChange={e => updateFormData('entryFee', parseFloat(e.target.value) || 0)}
            />
          </div>
          <div></div>
            <label className="block text-sm font-medium mb-2"></label>
              Payment Method
            </label>
            <select
              className="input"
              value={formData.paymentMethod}
              onChange={e => updateFormData('paymentMethod', e.target.value)}
            >
              <option value="none">No Online Payment</option>
              <option value="paypal">PayPal</option>
              <option value="stripe">Stripe</option>
          </div>
        <div className="grid md:grid-cols-2 gap-4"></div>
          <div></div>
            <label className="block text-sm font-medium mb-2"></label>
              Late Registration Fee ($)
            </label>
            <input
              type="number"
              min="0"
              step="0.01"
              className="input"
              value={formData.lateRegistrationFee}
              onChange={e => updateFormData('lateRegistrationFee', parseFloat(e.target.value) || 0)}
            />
          </div>
          <div></div>
            <label className="block text-sm font-medium mb-2"></label>
              Refund Policy
            </label>
            <select
              className="input"
              value={formData.refundPolicy}
              onChange={e => updateFormData('refundPolicy', e.target.value)}
            >
              <option value="standard">Standard (48h before event)</option>
              <option value="flexible">Flexible (24h before event)</option>
              <option value="strict">No Refunds</option>
              <option value="custom">Custom Policy</option>
          </div>
      </div>
      {/* Registration Codes */}
      <div></div>
        <p className="text-sm text-muted mb-4"></p>
          Create codes for special access, discounts, or judge registration.
        </p>
        <RegistrationCodes 
          tournamentId={null} 
          onCodesChange={(codes) => updateFormData('registrationCodes', codes)}
        />
      </div>
      {/* Registration Settings */}
      <div className="bg-gray-50 rounded-lg p-6"></div>
        <div className="space-y-4"></div>
          <label className="flex items-center gap-3"></label>
            <input
              type="checkbox"
              checked={formData.registrationOpen}
              onChange={e => updateFormData('registrationOpen', e.target.checked)}
              className="rounded border-gray-300"
            />
            <span className="text-sm">Open Registration Immediately</span>
          <label className="flex items-center gap-3"></label>
            <input
              type="checkbox"
              checked={formData.lateRegistration}
              onChange={e => updateFormData('lateRegistration', e.target.checked)}
              className="rounded border-gray-300"
            />
            <span className="text-sm">Allow Late Registration</span>
          <label className="flex items-center gap-3"></label>
            <input
              type="checkbox"
              checked={formData.decklistRequired}
              onChange={e => updateFormData('decklistRequired', e.target.checked)}
              className="rounded border-gray-300"
            />
            <span className="text-sm">Require Decklist Submission</span>
        </div>
    </div>
  );
  const steps = [
    { id: 1, title: 'Template Selection', icon: Trophy },
    { id: 2, title: 'Basic Information', icon: Info },
    { id: 3, title: 'Schedule & Location', icon: Calendar },
    { id: 4, title: 'Participants & Structure', icon: Users },
    { id: 5, title: 'Judge & Settings', icon: Settings },
    { id: 6, title: 'Registration & Codes', icon: DollarSign },
    { id: 7, title: 'Review & Create', icon: Eye },
  ];
  const handleSubmit = (): any => {
    // Here you would submit the tournament data
    console.log('Creating tournament:', formData);
    navigate('/tournaments');
  };
  return (
    <div className="min-h-screen py-8"></div>
      <div className="container max-w-4xl"></div>
        {/* Progress Steps */}
        <div className="flex items-center justify-between mb-8 overflow-x-auto"></div>
          {steps.map((stepItem, index) => {
            const Icon = stepItem.icon;
            const isActive = step === stepItem.id;
            const isCompleted = step > stepItem.id;
            return (
              <div key={stepItem.id} className="flex items-center"></div>
                <div
                  className={`flex items-center gap-2 px-3 py-0 whitespace-nowrap rounded-lg transition-colors ${
                    isActive
                      ? 'bg-accent-primary text-white'
                      : isCompleted
                        ? 'bg-green-600 text-white'
                        : 'bg-tertiary text-muted'
                  }`}
                 />
                  <Icon size={16} / />
                  <span className="text-sm font-medium hidden sm:block"></span>
                    {stepItem.title}
                  <span className="text-sm font-medium sm:hidden"></span>
                    {stepItem.id}
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`w-8 h-0.5 mx-2 ${isCompleted ? 'bg-green-600' : 'bg-tertiary'}`}
                  / />
                )}
              </div>
            );
          })}
        </div>
        {/* Form Content */}
        <div className="card mb-8"></div>
          {step === 1 && renderTemplateSelection()}
          {step === 2 && renderBasicInfo()}
          {step === 3 && renderScheduleLocation()}
          {step === 4 && renderParticipantsStructure()}
          {step === 5 && renderJudgeSettings()}
          {step === 6 && renderRegistrationManagement()}
          {step === 7 && renderReview()}
        {/* Navigation */}
        <div className="flex items-center justify-between"></div>
          <button
            onClick={() => setStep(Math.max(1, step - 1))}
            disabled={step === 1}
            className="btn btn-secondary"
          >
            Previous
          </button>
          <div className="flex gap-2"></div>
            <button
              onClick={() => navigate('/tournaments')}
              className="btn btn-ghost"
            >
              Cancel
            </button>
            {step < 7 ? (
              <button
                onClick={() => setStep(Math.min(7, step + 1))}
                className="btn btn-primary"
              >
                Next
              </button>
            ) : (
              <button onClick={handleSubmit} className="btn btn-primary"></button>
                <Save size={16} / />
                Create Tournament
              </button>
            )}
          </div>
      </div>
  );
};
export { TournamentCreate };
export default TournamentCreate;