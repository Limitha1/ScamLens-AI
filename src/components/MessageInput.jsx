import React, { useRef, useState } from 'react';
import { 
  FileText, 
  UploadCloud, 
  Image as ImageIcon, 
  Sparkles, 
  Trash2, 
  ShieldAlert, 
  CheckCircle,
  HelpCircle,
  CornerDownLeft
} from 'lucide-react';
import { SAMPLE_PRESETS } from '../data/mockData';

export default function MessageInput({ 
  inputText, 
  setInputText, 
  onAnalyze, 
  isLoading, 
  onSelectPreset,
  selectedPresetId 
}) {
  const fileInputRef = useRef(null);
  const [screenshotPreview, setScreenshotPreview] = useState(null);
  const [isScanningOCR, setIsScanningOCR] = useState(false);
  const [ocrSuccess, setOcrSuccess] = useState(false);

  // Handle mock screenshot upload
  const handleScreenshotUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        setScreenshotPreview(uploadEvent.target.result);
        setIsScanningOCR(true);
        setOcrSuccess(false);

        // Simulate 1.2s OCR processing
        setTimeout(() => {
          setIsScanningOCR(false);
          setOcrSuccess(true);
          // Pre-populate with standard suspicious hackathon message if current text is empty
          if (!inputText.trim()) {
            setInputText(SAMPLE_PRESETS[0].text);
          }
        }, 1200);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSimulateScreenshot = () => {
    // Simulated upload for fast demo
    setScreenshotPreview("https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=500&auto=format&fit=crop&q=60");
    setIsScanningOCR(true);
    setOcrSuccess(false);

    setTimeout(() => {
      setIsScanningOCR(false);
      setOcrSuccess(true);
      setInputText(SAMPLE_PRESETS[0].text);
    }, 1100);
  };

  const clearScreenshot = () => {
    setScreenshotPreview(null);
    setOcrSuccess(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleKeyDown = (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      if (inputText.trim() && !isLoading) {
        onAnalyze();
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-lg shadow-slate-200/50 p-5 sm:p-7 transition-all">
        
        {/* Preset Selector for Fast Hackathon Evaluation */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center space-x-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#2B58FF]" />
              <span>1-Click Hackathon Presets:</span>
            </span>
            <span className="text-[11px] text-slate-400 hidden sm:inline">
              Click any sample to load demo data
            </span>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {SAMPLE_PRESETS.map((preset) => {
              const isSelected = selectedPresetId === preset.id;
              return (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => onSelectPreset(preset)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition-all duration-150 border text-left flex items-center space-x-1.5 ${
                    isSelected
                      ? 'bg-[#2B58FF] text-white border-[#2B58FF] shadow-sm shadow-[#2B58FF]/30'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100 hover:border-slate-300'
                  }`}
                >
                  <span>{preset.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Screenshot Upload Preview & OCR Simulation Bar */}
        {screenshotPreview && (
          <div className="mb-4 p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 animate-fade-in">
            <div className="flex items-center space-x-3 w-full sm:w-auto">
              <div className="relative w-12 h-12 rounded-lg overflow-hidden border border-slate-200 bg-white flex-shrink-0">
                <img 
                  src={screenshotPreview} 
                  alt="Screenshot preview" 
                  className="w-full h-full object-cover" 
                />
                {isScanningOCR && (
                  <div className="absolute inset-0 bg-[#2B58FF]/20 flex items-center justify-center">
                    <div className="w-full h-0.5 bg-[#2B58FF] animate-scan shadow-sm"></div>
                  </div>
                )}
              </div>
              <div>
                <p className="text-xs font-bold text-slate-800 flex items-center space-x-1">
                  <span>Attached Screenshot</span>
                  {isScanningOCR && (
                    <span className="text-[10px] text-[#2B58FF] animate-pulse font-normal">
                      • Running Optical Character Recognition...
                    </span>
                  )}
                  {ocrSuccess && (
                    <span className="text-[10px] text-emerald-600 font-medium inline-flex items-center space-x-0.5">
                      <CheckCircle className="w-3 h-3 text-emerald-500" />
                      <span>Text Extracted</span>
                    </span>
                  )}
                </p>
                <p className="text-[11px] text-slate-500">
                  {isScanningOCR 
                    ? "Extracting recruitment phrases..." 
                    : "Simulated OCR populated suspicious text into analyzer below."}
                </p>
              </div>
            </div>
            
            <button
              onClick={clearScreenshot}
              type="button"
              className="text-xs text-rose-600 hover:text-rose-700 hover:bg-rose-50 px-2.5 py-1 rounded-lg transition-colors flex items-center space-x-1 self-end sm:self-auto"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Remove</span>
            </button>
          </div>
        )}

        {/* Main Textarea */}
        <div className="relative">
          <label htmlFor="message-input" className="sr-only">
            Paste suspicious message here
          </label>
          <textarea
            id="message-input"
            rows={5}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Paste suspicious message here... (e.g. 'Congratulations! You are selected. Pay the registration fee today...')"
            className="w-full p-4 text-sm sm:text-base text-slate-800 bg-[#FAFBFD] hover:bg-white focus:bg-white rounded-xl border border-slate-200 focus:border-[#2B58FF] focus:ring-4 focus:ring-[#2B58FF]/10 outline-none transition-all placeholder:text-slate-400 resize-y font-normal leading-relaxed"
          ></textarea>

          {/* Bottom toolbar inside text area area */}
          <div className="mt-3 flex flex-wrap items-center justify-between gap-3 pt-2">
            
            {/* Left Tools: Upload Screenshot (Mock file input) & Clear */}
            <div className="flex items-center space-x-2">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleScreenshotUpload}
                accept="image/*"
                className="hidden"
                id="screenshot-file-input"
              />
              
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                id="upload-screenshot-btn"
                className="inline-flex items-center space-x-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 active:scale-95 transition-all border border-slate-200"
                title="Upload screenshot of WhatsApp, email, or Telegram message"
              >
                <ImageIcon className="w-4 h-4 text-[#2B58FF]" />
                <span>Upload Screenshot</span>
              </button>

              <button
                type="button"
                onClick={handleSimulateScreenshot}
                className="hidden sm:inline-flex items-center space-x-1 px-2.5 py-2 rounded-xl text-xs font-medium text-slate-500 hover:text-slate-800 hover:bg-slate-50 transition-colors"
                title="Mock screenshot upload with sample image"
              >
                <UploadCloud className="w-3.5 h-3.5 text-slate-400" />
                <span>Try Sample Image</span>
              </button>

              {inputText.length > 0 && (
                <button
                  type="button"
                  onClick={() => setInputText("")}
                  className="inline-flex items-center space-x-1 px-2.5 py-1.5 text-xs font-medium text-slate-400 hover:text-rose-600 transition-colors"
                  title="Clear text"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Clear</span>
                </button>
              )}
            </div>

            {/* Right Tools: Analyze Button & Character count */}
            <div className="flex items-center space-x-3 ml-auto">
              <span className="text-[11px] text-slate-400 font-mono hidden md:inline">
                {inputText.length} chars
              </span>

              <button
                type="button"
                onClick={onAnalyze}
                disabled={isLoading || !inputText.trim()}
                id="analyze-request-btn"
                className={`inline-flex items-center space-x-2 px-5 sm:px-6 py-2.5 rounded-xl text-sm font-bold text-white transition-all duration-200 shadow-md ${
                  isLoading || !inputText.trim()
                    ? 'bg-slate-300 text-slate-500 cursor-not-allowed shadow-none'
                    : 'bg-[#2B58FF] hover:bg-[#1E44D9] active:scale-95 shadow-[#2B58FF]/30 hover:shadow-lg hover:shadow-[#2B58FF]/40'
                }`}
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Analyzing Request...</span>
                  </>
                ) : (
                  <>
                    <ShieldAlert className="w-4 h-4" />
                    <span>Analyze Request</span>
                    <span className="hidden sm:inline-flex items-center text-[10px] bg-white/20 px-1.5 py-0.5 rounded text-white/90">
                      Ctrl+↵
                    </span>
                  </>
                )}
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
