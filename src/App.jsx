import React, { useState } from 'react';
import Header from './components/Header';
import HeroBanner from './components/HeroBanner';
import MessageInput from './components/MessageInput';
import AnalysisLoader from './components/AnalysisLoader';
import ResultsDashboard from './components/ResultsDashboard';
import ReportScamModal from './components/ReportScamModal';
import ScamLibraryModal from './components/ScamLibraryModal';
import AuthModal from './components/AuthModal';
import Footer from './components/Footer';
import { AuthProvider, useAuth } from './context/AuthContext';
import { SAMPLE_PRESETS, DEFAULT_ANALYSIS_DATA } from './data/mockData';
import { analyzeMessageWithGemini } from './services/geminiService';

function AppContent() {
  const { incrementScans } = useAuth();

  // Initialize with the primary hackathon demo sample
  const [inputText, setInputText] = useState(SAMPLE_PRESETS[0].text);
  const [analyzedText, setAnalyzedText] = useState('');
  const [selectedPresetId, setSelectedPresetId] = useState(SAMPLE_PRESETS[0].id);
  const [isLoading, setIsLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);

  // Modals state
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isLibraryModalOpen, setIsLibraryModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState('login');
  const [reportedScamCount, setReportedScamCount] = useState(1248);

  // Handle Preset Selection
  const handleSelectPreset = (preset) => {
    setSelectedPresetId(preset.id);
    setInputText(preset.text);
    // Reset results on preset change so user can click Analyze
    setAnalysisResult(null);
  };

  // Analyze Request with live Google Gemini 3.5 Flash AI
  const handleAnalyze = async () => {
    if (!inputText.trim() || isLoading) return;

    setIsLoading(true);
    setAnalysisResult(null);

    const startTime = Date.now();
    try {
      // Analyze with live Google Gemini API
      const resultData = await analyzeMessageWithGemini(inputText);

      // Smooth scanner animation experience (minimum 1500ms)
      const elapsed = Date.now() - startTime;
      const remainingWait = Math.max(0, 1500 - elapsed);
      if (remainingWait > 0) {
        await new Promise(res => setTimeout(res, remainingWait));
      }

      setAnalyzedText(inputText);
      setAnalysisResult(resultData);
      incrementScans();
    } catch (err) {
      console.error('Gemini analysis failed, using fallback:', err);
      setAnalyzedText(inputText);
      setAnalysisResult(DEFAULT_ANALYSIS_DATA);
      incrementScans();
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenAuth = (mode = 'login') => {
    setAuthModalMode(mode);
    setIsAuthModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] selection:bg-[#2B58FF]/20 selection:text-[#2B58FF]">
      
      {/* 1. Header Navigation Bar with Auth Integration */}
      <Header 
        onOpenReportModal={() => setIsReportModalOpen(true)}
        onOpenLibraryModal={() => setIsLibraryModalOpen(true)}
        onOpenAuthModal={handleOpenAuth}
        reportedCount={reportedScamCount}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Hero Section */}
        <HeroBanner />

        {/* 2. Input Section */}
        <MessageInput 
          inputText={inputText}
          setInputText={setInputText}
          onAnalyze={handleAnalyze}
          isLoading={isLoading}
          onSelectPreset={handleSelectPreset}
          selectedPresetId={selectedPresetId}
        />

        {/* Loading State Scanner */}
        {isLoading && <AnalysisLoader />}

        {/* 3 & 4. Results Dashboard & Shareable Warning Card */}
        {analysisResult && !isLoading && (
          <ResultsDashboard 
            analysisData={analysisResult}
            originalText={analyzedText}
          />
        )}
      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive Modals */}
      <ReportScamModal 
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        onScamReported={() => setReportedScamCount(prev => prev + 1)}
      />

      <ScamLibraryModal 
        isOpen={isLibraryModalOpen}
        onClose={() => setIsLibraryModalOpen(false)}
      />

      {/* Authentication Modal */}
      <AuthModal 
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialMode={authModalMode}
      />

    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
