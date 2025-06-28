import React, { useState, useRef } from 'react';
import './App.css';

const EmailTemplateGenerator = () => {
  const [formData, setFormData] = useState({
    name: 'John Doe',
    title: 'Senior Software Engineer',
    company: 'TechCorp Inc.',
    phone: '+1 (555) 123-4567',
    email: 'john.doe@techcorp.com',
    website: 'www.techcorp.com',
    address: '123 Tech Street, San Francisco, CA 94105',
    profileImage: '',
    linkedinUrl: '',
    twitterUrl: '',
    instagramUrl: '',
    substackUrl: ''
  });

  const [selectedTemplate, setSelectedTemplate] = useState('modern');
  const [showCode, setShowCode] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const textAreaRef = useRef(null);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData({
          ...formData,
          profileImage: e.target.result
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const generateEmailHTML = () => {
    const templates = {
      modern: `
<table border="0" cellpadding="0" cellspacing="0" style="font-family: Arial, sans-serif; font-size: 14px; line-height: 1.4; max-width: 500px;">
  <tr>
    <td style="padding: 20px 0; border-top: 3px solid #3B82F6;">
      <table border="0" cellpadding="0" cellspacing="0">
        <tr>
          <td style="vertical-align: top; padding-right: 20px;">
            <div style="width: 80px; height: 80px; background: linear-gradient(135deg, #3B82F6, #1D4ED8); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 32px; font-weight: bold;">
              ${formData.name.split(' ').map(n => n[0]).join('').toUpperCase()}
            </div>
          </td>
          <td style="vertical-align: top;">
            <div style="color: #1F2937; font-size: 18px; font-weight: bold; margin-bottom: 4px;">
              ${formData.name}
            </div>
            <div style="color: #3B82F6; font-size: 14px; font-weight: 600; margin-bottom: 8px;">
              ${formData.title}
            </div>
            <div style="color: #6B7280; font-size: 14px; margin-bottom: 12px;">
              ${formData.company}
            </div>
            <div style="font-size: 13px; color: #4B5563;">
              <div style="margin-bottom: 3px;">📧 ${formData.email}</div>
              <div style="margin-bottom: 3px;">📱 ${formData.phone}</div>
              <div style="margin-bottom: 3px;">🌐 ${formData.website}</div>
              <div>📍 ${formData.address}</div>
            </div>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>`,
      
      classic: `
<table border="0" cellpadding="0" cellspacing="0" style="font-family: 'Times New Roman', serif; font-size: 14px; line-height: 1.5; max-width: 500px; border: 1px solid #E5E7EB;">
  <tr>
    <td style="padding: 20px; background-color: #F9FAFB;">
      <div style="color: #111827; font-size: 20px; font-weight: bold; margin-bottom: 6px;">
        ${formData.name}
      </div>
      <div style="color: #6B7280; font-size: 14px; font-style: italic; margin-bottom: 4px;">
        ${formData.title}
      </div>
      <div style="color: #374151; font-size: 14px; font-weight: 600; margin-bottom: 15px;">
        ${formData.company}
      </div>
      <hr style="border: 0; height: 1px; background-color: #D1D5DB; margin: 15px 0;">
      <div style="font-size: 12px; color: #4B5563; line-height: 1.6;">
        <div><strong>Email:</strong> ${formData.email}</div>
        <div><strong>Phone:</strong> ${formData.phone}</div>
        <div><strong>Website:</strong> ${formData.website}</div>
        <div><strong>Address:</strong> ${formData.address}</div>
      </div>
    </td>
  </tr>
</table>`,

      minimal: `
<table border="0" cellpadding="0" cellspacing="0" style="font-family: 'Helvetica Neue', Arial, sans-serif; font-size: 13px; line-height: 1.4; max-width: 400px;">
  <tr>
    <td style="padding: 15px 0;">
      <div style="color: #000000; font-size: 16px; font-weight: 600; margin-bottom: 2px;">
        ${formData.name}
      </div>
      <div style="color: #666666; font-size: 13px; margin-bottom: 8px;">
        ${formData.title} | ${formData.company}
      </div>
      <div style="font-size: 12px; color: #888888;">
        ${formData.email} | ${formData.phone} | ${formData.website}
      </div>
    </td>
  </tr>
</table>`
    };

    return templates[selectedTemplate];
  };

  const copyToClipboard = async () => {
    const html = generateEmailHTML();
    
    // Reset copy success state
    setCopySuccess(false);
    
    try {
      // Try modern clipboard API first
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(html);
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 3000);
      } else {
        // Fallback method for older browsers or non-HTTPS
        const textArea = document.createElement('textarea');
        textArea.value = html;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        const successful = document.execCommand('copy');
        document.body.removeChild(textArea);
        
        if (successful) {
          setCopySuccess(true);
          setTimeout(() => setCopySuccess(false), 3000);
        } else {
          throw new Error('Copy command was unsuccessful');
        }
      }
    } catch (err) {
      console.error('Failed to copy text: ', err);
      // Final fallback - show the code and ask user to copy manually
      setShowCode(true);
      alert('Unable to copy automatically. The HTML code is now displayed - please select and copy it manually.');
    }
  };

  const templates = [
    { id: 'modern', name: 'Modern', description: 'Clean design with avatar and icons' },
    { id: 'classic', name: 'Classic', description: 'Traditional professional look' },
    { id: 'minimal', name: 'Minimal', description: 'Simple and clean layout' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Email Template Generator
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Create professional email signatures with clean, email-client compatible HTML/CSS code
          </p>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Panel - Form */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              Customize Your Signature
            </h2>

            {/* Template Selection */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Choose Template Style
              </label>
              <div className="grid grid-cols-1 gap-3">
                {templates.map((template) => (
                  <div
                    key={template.id}
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      selectedTemplate === template.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedTemplate(template.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-gray-800">{template.name}</h3>
                        <p className="text-sm text-gray-600">{template.description}</p>
                      </div>
                      <div className={`w-4 h-4 rounded-full border-2 ${
                        selectedTemplate === template.id
                          ? 'bg-blue-500 border-blue-500'
                          : 'border-gray-300'
                      }`}>
                        {selectedTemplate === template.id && (
                          <div className="w-full h-full bg-white rounded-full scale-50"></div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Form Fields */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Job Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Senior Software Engineer"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Company
                </label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="TechCorp Inc."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="john@company.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Website
                </label>
                <input
                  type="text"
                  name="website"
                  value={formData.website}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="www.company.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="123 Main St, City, State 12345"
                />
              </div>
            </div>
          </div>

          {/* Right Panel - Preview */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-gray-800">
                Preview & Code
              </h2>
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowCode(!showCode)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    showCode
                      ? 'bg-gray-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {showCode ? 'Show Preview' : 'Show Code'}
                </button>
                <button
                  onClick={copyToClipboard}
                  className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                    copySuccess 
                      ? 'bg-green-500 text-white' 
                      : 'bg-blue-500 text-white hover:bg-blue-600'
                  }`}
                >
                  {copySuccess ? '✓ Copied!' : 'Copy HTML'}
                </button>
              </div>
            </div>

            {showCode ? (
              <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-auto max-h-96">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-gray-400">HTML Code (Select All & Copy)</span>
                  <button
                    onClick={() => {
                      const codeElement = document.querySelector('#html-code');
                      if (codeElement) {
                        const range = document.createRange();
                        range.selectNode(codeElement);
                        window.getSelection().removeAllRanges();
                        window.getSelection().addRange(range);
                      }
                    }}
                    className="text-xs bg-gray-700 hover:bg-gray-600 text-white px-2 py-1 rounded"
                  >
                    Select All
                  </button>
                </div>
                <pre className="text-sm">
                  <code id="html-code">{generateEmailHTML()}</code>
                </pre>
              </div>
            ) : (
              <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 bg-gray-50">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div dangerouslySetInnerHTML={{ __html: generateEmailHTML() }} />
                </div>
              </div>
            )}

            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <h3 className="font-medium text-blue-800 mb-2">
                📧 Email Client Compatibility
              </h3>
              <p className="text-sm text-blue-700">
                This signature uses table-based layout and inline styles for maximum compatibility 
                across email clients including Outlook, Gmail, Apple Mail, and Thunderbird.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12">
          <p className="text-gray-600">
            More template sections coming soon: Testimonials, Headers, CTAs, and more!
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmailTemplateGenerator;