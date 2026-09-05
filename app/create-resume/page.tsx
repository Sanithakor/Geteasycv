'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import UserLayout from '@/components/layout/UserLayout';
import CategorySelector from '@/components/resume/CategorySelector';
import { useResumeCategory } from '@/hooks/useResumeCategory';
import { useAuthStore } from '@/lib/store/authStore';
import { 
  ArrowLeft, 
  ArrowRight, 
  FileText, 
  Sparkles, 
  Clock,
  CheckCircle,
  Zap
} from 'lucide-react';

type Step = 'category' | 'template' | 'create';

export default function CreateResumePage() {
  const router = useRouter();
  const { token } = useAuthStore();
  const [currentStep, setCurrentStep] = useState<Step>('category');
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(null);
  const [resumeTitle, setResumeTitle] = useState('');
  const [creating, setCreating] = useState(false);
  
  const { 
    selectedCategory, 
    categoryData, 
    selectCategory,
    clearCategory,
    sampleData,
    loading: categoryLoading 
  } = useResumeCategory();

  const handleCategorySelect = async (categoryId: string) => {
    setSelectedCategoryId(categoryId);
    await selectCategory(categoryId);
  };

  const handleSkipCategory = () => {
    setSelectedCategoryId(null);
    clearCategory();
    setCurrentStep('template');
  };

  const handleNextStep = () => {
    if (currentStep === 'category') {
      setCurrentStep('template');
    } else if (currentStep === 'template') {
      setCurrentStep('create');
    }
  };

  const handleBackStep = () => {
    if (currentStep === 'template') {
      setCurrentStep('category');
    } else if (currentStep === 'create') {
      setCurrentStep('template');
    }
  };

  const handleCreateResume = async () => {
    try {
      setCreating(true);

      // Create the resume
      const createResponse = await fetch('/api/resumes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          title: resumeTitle || `${selectedCategory?.name || 'New'} Resume`,
          templateId: selectedTemplateId,
          categoryId: selectedCategoryId,
        }),
      });

      const createData = await createResponse.json();
      
      if (createData.success && createData.data) {
        const resumeId = createData.data.id;

        // If we have category sample data, populate the resume
        if (sampleData && selectedCategoryId) {
          const populateResponse = await fetch(`/api/resumes/${resumeId}/populate-from-category`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              ...(token ? { Authorization: `Bearer ${token}` } : {}),
            },
            body: JSON.stringify({
              categoryId: selectedCategoryId,
              sampleData: sampleData
            }),
          });

          if (!populateResponse.ok) {
            console.warn('Failed to populate resume with category data, continuing anyway');
          }
        }

        // Redirect to editor
        router.push(`/editor?id=${resumeId}`);
      } else if (createResponse.status === 403 || createData.code === 'RESUME_LIMIT_REACHED') {
        const redirectUrl = createData.redirectUrl || '/pricing?reason=resume_limit';
        alert(createData.error || 'You have reached your CV creation limit. Upgrade to Pro or Lifetime for unlimited CVs.');
        router.push(redirectUrl);
      } else {
        throw new Error(createData.error || 'Failed to create resume');
      }
    } catch (error: any) {
      console.error('Error creating resume:', error);
      alert(error.message || 'Failed to create resume. Please try again.');
    } finally {
      setCreating(false);
    }
  };

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center mb-8">
      <div className="flex items-center gap-4">
        {/* Step 1: Category */}
        <div className="flex items-center gap-2">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
            currentStep === 'category' 
              ? 'bg-blue-600 text-white' 
              : 'bg-green-100 text-green-600'
          }`}>
            {currentStep === 'category' ? '1' : <CheckCircle className="w-4 h-4" />}
          </div>
          <span className="text-sm font-medium text-gray-700">Choose Industry</span>
        </div>
        
        <div className="w-8 h-0.5 bg-gray-300"></div>
        
        {/* Step 2: Template */}
        <div className="flex items-center gap-2">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
            currentStep === 'template' 
              ? 'bg-blue-600 text-white'
              : currentStep === 'create' 
                ? 'bg-green-100 text-green-600'
                : 'bg-gray-200 text-gray-600'
          }`}>
            {currentStep === 'create' ? <CheckCircle className="w-4 h-4" /> : '2'}
          </div>
          <span className="text-sm font-medium text-gray-700">Select Template</span>
        </div>
        
        <div className="w-8 h-0.5 bg-gray-300"></div>
        
        {/* Step 3: Create */}
        <div className="flex items-center gap-2">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
            currentStep === 'create' 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-200 text-gray-600'
          }`}>
            3
          </div>
          <span className="text-sm font-medium text-gray-700">Create Resume</span>
        </div>
      </div>
    </div>
  );

  const renderCategoryStep = () => (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">
          Let's Create Your Perfect Resume
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Start by selecting your industry to get professionally written, ATS-friendly content 
          tailored specifically for your field.
        </p>
      </div>

      <CategorySelector
        selectedCategoryId={selectedCategoryId || undefined}
        onCategorySelect={handleCategorySelect}
        onSkip={handleSkipCategory}
      />

      {selectedCategoryId && (
        <div className="flex justify-center mt-8">
          <button
            onClick={handleNextStep}
            disabled={categoryLoading}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <span>Continue to Templates</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );

  const renderTemplateStep = () => (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">
          Choose Your Resume Template
        </h1>
        <p className="text-lg text-gray-600">
          Select a professional template that matches your industry and personal style.
        </p>
        
        {selectedCategory && (
          <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-800 rounded-md border border-blue-200">
            <div 
              className="w-6 h-6 rounded flex items-center justify-center text-white text-sm"
              style={{ backgroundColor: selectedCategory.color }}
            >
              {selectedCategory.icon}
            </div>
            <span className="font-medium">{selectedCategory.name}</span>
          </div>
        )}
      </div>

      {/* Template selection would go here */}
      <div className="bg-white rounded-md border p-8 text-center">
        <div className="w-16 h-16 bg-gray-100 rounded-md flex items-center justify-center mx-auto mb-4">
          <FileText className="w-8 h-8 text-gray-600" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Template Selection</h3>
        <p className="text-gray-600 mb-6">
          Template selection component would be integrated here. For now, we'll use the default template.
        </p>
        <button
          onClick={() => {
            setSelectedTemplateId('default-template');
            handleNextStep();
          }}
          className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Continue with Default Template
        </button>
      </div>

      <div className="flex justify-between mt-8">
        <button
          onClick={handleBackStep}
          className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Industry Selection</span>
        </button>
      </div>
    </div>
  );

  const renderCreateStep = () => (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">
          Almost Ready!
        </h1>
        <p className="text-lg text-gray-600">
          Give your resume a name and we'll create it with professional content from your industry.
        </p>
      </div>

      <div className="bg-white rounded-md border p-8">
        {/* Resume Preview */}
        <div className="mb-6 p-4 bg-gray-50 rounded-md">
          <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-yellow-500" />
            Your Resume Will Include:
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {selectedCategory ? (
              <>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Industry-specific professional summary</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Relevant work experience examples</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Essential {selectedCategory.name.toLowerCase()} skills</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Education and certifications</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Portfolio projects and achievements</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>ATS-optimized formatting</span>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Professional resume template</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>ATS-optimized formatting</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Clean, modern design</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Easy to customize sections</span>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Resume Title Input */}
        <div className="mb-6">
          <label htmlFor="resumeTitle" className="block text-sm font-medium text-gray-700 mb-2">
            Resume Title
          </label>
          <input
            type="text"
            id="resumeTitle"
            value={resumeTitle}
            onChange={(e) => setResumeTitle(e.target.value)}
            placeholder={`${selectedCategory?.name || 'My'} Resume`}
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <p className="text-xs text-gray-500 mt-1">
            You can always change this later in the editor.
          </p>
        </div>

        {/* Create Button */}
        <button
          onClick={handleCreateResume}
          disabled={creating}
          className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium text-lg"
        >
          {creating ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
              <span>Creating Your Resume...</span>
            </>
          ) : (
            <>
              <Zap className="w-5 h-5" />
              <span>Create My Resume</span>
            </>
          )}
        </button>

        {selectedCategory && (
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600 flex items-center justify-center gap-1">
              <Clock className="w-4 h-4" />
              <span>Estimated time to complete: 10-15 minutes</span>
            </p>
          </div>
        )}
      </div>

      <div className="flex justify-between mt-8">
        <button
          onClick={handleBackStep}
          className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Templates</span>
        </button>
      </div>
    </div>
  );

  return (
    <UserLayout>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {renderStepIndicator()}
          
          {currentStep === 'category' && renderCategoryStep()}
          {currentStep === 'template' && renderTemplateStep()}
          {currentStep === 'create' && renderCreateStep()}
        </div>
      </div>
    </UserLayout>
  );
}