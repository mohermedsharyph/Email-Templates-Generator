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

  const generateEmailHTML = () => {
    // Helper function to render contact info with conditional emojis
    const renderContactInfo = () => {
      const contactItems = [];
      
      if (formData.email) {
        contactItems.push(`<div style="margin-bottom: 3px;">📧 <a href="mailto:${formData.email}" style="color: inherit; text-decoration: none;">${formData.email}</a></div>`);
      }
      
      if (formData.phone) {
        contactItems.push(`<div style="margin-bottom: 3px;">📱 ${formData.phone}</div>`);
      }
      
      if (formData.website) {
        const websiteUrl = formData.website.startsWith('http') ? formData.website : `https://${formData.website}`;
        contactItems.push(`<div style="margin-bottom: 3px;">🌐 <a href="${websiteUrl}" style="color: inherit; text-decoration: none;">${formData.website}</a></div>`);
      }
      
      if (formData.address) {
        contactItems.push(`<div>📍 ${formData.address}</div>`);
      }
      
      return contactItems.join('');
    };

    // Helper function to render social media links
    const renderSocialLinks = () => {
      const socialItems = [];
      
      if (formData.linkedinUrl) {
        socialItems.push(`<a href="${formData.linkedinUrl}" style="color: #0077B5; text-decoration: none; margin-right: 10px;">LinkedIn</a>`);
      }
      
      if (formData.twitterUrl) {
        socialItems.push(`<a href="${formData.twitterUrl}" style="color: #1DA1F2; text-decoration: none; margin-right: 10px;">X/Twitter</a>`);
      }
      
      if (formData.instagramUrl) {
        socialItems.push(`<a href="${formData.instagramUrl}" style="color: #E4405F; text-decoration: none; margin-right: 10px;">Instagram</a>`);
      }
      
      if (formData.substackUrl) {
        socialItems.push(`<a href="${formData.substackUrl}" style="color: #FF6719; text-decoration: none; margin-right: 10px;">Substack</a>`);
      }
      
      return socialItems.length > 0 ? `<div style="margin-top: 8px; font-size: 12px;">${socialItems.join('')}</div>` : '';
    };

    const templates = {
      modern: `
<table border="0" cellpadding="0" cellspacing="0" style="font-family: Arial, sans-serif; font-size: 14px; line-height: 1.4; max-width: 500px;">
  <tr>
    <td style="padding: 20px 0; border-top: 3px solid #3B82F6;">
      <table border="0" cellpadding="0" cellspacing="0">
        <tr>
          <td style="vertical-align: top; padding-right: 20px;">
            ${formData.profileImage ? 
              `<img src="${formData.profileImage}" alt="${formData.name}" style="width: 80px; height: 80px; border-radius: 50%; object-fit: cover;">` :
              `<div style="width: 80px; height: 80px; background: linear-gradient(135deg, #3B82F6, #1D4ED8); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 32px; font-weight: bold;">
                ${formData.name.split(' ').map(n => n[0]).join('').toUpperCase()}
              </div>`
            }
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
              ${renderContactInfo()}
            </div>
            ${renderSocialLinks()}
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
      ${formData.profileImage ? 
        `<img src="${formData.profileImage}" alt="${formData.name}" style="width: 60px; height: 60px; border-radius: 50%; object-fit: cover; float: left; margin-right: 15px; margin-bottom: 10px;">` : 
        ''
      }
      <div style="color: #111827; font-size: 20px; font-weight: bold; margin-bottom: 6px;">
        ${formData.name}
      </div>
      <div style="color: #6B7280; font-size: 14px; font-style: italic; margin-bottom: 4px;">
        ${formData.title}
      </div>
      <div style="color: #374151; font-size: 14px; font-weight: 600; margin-bottom: 15px;">
        ${formData.company}
      </div>
      <hr style="border: 0; height: 1px; background-color: #D1D5DB; margin: 15px 0; clear: both;">
      <div style="font-size: 12px; color: #4B5563; line-height: 1.6;">
        ${formData.email ? `<div><strong>Email:</strong> <a href="mailto:${formData.email}" style="color: inherit; text-decoration: none;">${formData.email}</a></div>` : ''}
        ${formData.phone ? `<div><strong>Phone:</strong> ${formData.phone}</div>` : ''}
        ${formData.website ? `<div><strong>Website:</strong> <a href="${formData.website.startsWith('http') ? formData.website : `https://${formData.website}`}" style="color: inherit; text-decoration: none;">${formData.website}</a></div>` : ''}
        ${formData.address ? `<div><strong>Address:</strong> ${formData.address}</div>` : ''}
      </div>
      ${renderSocialLinks()}
    </td>
  </tr>
</table>`,

      minimal: `
<table border="0" cellpadding="0" cellspacing="0" style="font-family: 'Helvetica Neue', Arial, sans-serif; font-size: 13px; line-height: 1.4; max-width: 400px;">
  <tr>
    <td style="padding: 15px 0;">
      ${formData.profileImage ? 
        `<img src="${formData.profileImage}" alt="${formData.name}" style="width: 40px; height: 40px; border-radius: 50%; object-fit: cover; float: left; margin-right: 10px;">` : 
        ''
      }
      <div style="color: #000000; font-size: 16px; font-weight: 600; margin-bottom: 2px;">
        ${formData.name}
      </div>
      <div style="color: #666666; font-size: 13px; margin-bottom: 8px;">
        ${formData.title} | ${formData.company}
      </div>
      <div style="font-size: 12px; color: #888888; clear: both;">
        ${[
          formData.email ? `<a href="mailto:${formData.email}" style="color: inherit; text-decoration: none;">${formData.email}</a>` : '',
          formData.phone || '',
          formData.website ? `<a href="${formData.website.startsWith('http') ? formData.website : `https://${formData.website}`}" style="color: inherit; text-decoration: none;">${formData.website}</a>` : ''
        ].filter(Boolean).join(' | ')}
      </div>
      ${renderSocialLinks()}
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
              {/* Profile Picture Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Profile Picture
                </label>
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    {formData.profileImage ? (
                      <img
                        src={formData.profileImage}
                        alt="Profile"
                        className="w-16 h-16 rounded-full object-cover border-2 border-gray-200"
                      />
                    ) : (
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                        {formData.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />
                    <p className="mt-1 text-xs text-gray-500">PNG, JPG up to 2MB. Will be embedded as base64.</p>
                  </div>
                </div>
              </div>

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

              {/* Social Media Links */}
              <div className="border-t pt-6">
                <h3 className="text-lg font-medium text-gray-800 mb-4">Social Media Links</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      LinkedIn URL
                    </label>
                    <input
                      type="url"
                      name="linkedinUrl"
                      value={formData.linkedinUrl}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="https://linkedin.com/in/yourname"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      X/Twitter URL
                    </label>
                    <input
                      type="url"
                      name="twitterUrl"
                      value={formData.twitterUrl}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="https://x.com/yourhandle"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Instagram URL
                    </label>
                    <input
                      type="url"
                      name="instagramUrl"
                      value={formData.instagramUrl}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="https://instagram.com/yourhandle"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Substack URL
                    </label>
                    <input
                      type="url"
                      name="substackUrl"
                      value={formData.substackUrl}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="https://yourname.substack.com"
                    />
                  </div>
                </div>
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