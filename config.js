// Configuration File for Legal Assistant App

const appConfig = {
    // App Information
    appName: 'مُعين - المساعد القانوني الذكي',
    appVersion: '1.0.0',
    appDescription: 'تطبيق ويب يعمل بالذكاء الاصطناعي لمساعدة المواطنين المصريين في الأمور القانونية',
    
    // API Configuration (for future integration)
    api: {
        baseUrl: 'https://api.mueen-legal.com/v1',
        endpoints: {
            documentAnalysis: '/analyze-document',
            generateContract: '/generate-contract',
            explainTerm: '/explain-term',
            chatbot: '/chat'
        },
        timeout: 30000, // 30 seconds
        maxFileSize: 10 * 1024 * 1024, // 10 MB
        supportedFormats: ['.pdf', '.docx', '.doc', '.jpg', '.jpeg', '.png']
    },
    
    // Feature Flags
    features: {
        documentAnalysis: true,
        contractGeneration: true,
        termExplanation: true,
        userAuthentication: false, // Future feature
        documentStorage: false, // Future feature
        liveChat: false, // Future feature
        paymentIntegration: false // Future feature
    },
    
    // UI Configuration
    ui: {
        theme: 'light', // 'light' or 'dark'
        language: 'ar', // 'ar' for Arabic
        direction: 'rtl', // 'rtl' for Arabic
        animationsEnabled: true,
        maxRecentDocuments: 5
    },
    
    // Processing Configuration
    processing: {
        simulationDelay: 50, // milliseconds per progress step
        progressSteps: 4,
        chatResponseDelay: 1000 // milliseconds
    },
    
    // Validation Rules
    validation: {
        requiredFields: true,
        minNameLength: 3,
        maxNameLength: 100,
        minIdLength: 14,
        maxIdLength: 14,
        minAmount: 0,
        maxAmount: 999999999
    },
    
    // Legal Disclaimer
    disclaimer: {
        ar: 'هذه الخدمة توفر معلومات ومساعدة قانونية أولية، وليست استشارة قانونية رسمية. يُرجى استشارة محامٍ مرخص للأمور الرسمية.',
        en: 'This service provides preliminary legal information and assistance, not official legal advice. Please consult a licensed attorney for official matters.'
    },
    
    // Contact Information
    contact: {
        email: 'support@mueen-legal.com',
        phone: '+20 2 1234 5678',
        website: 'https://www.mueen-legal.com',
        address: 'القاهرة، مصر'
    },
    
    // Social Media
    social: {
        facebook: 'https://facebook.com/mueen-legal',
        twitter: 'https://twitter.com/mueen_legal',
        linkedin: 'https://linkedin.com/company/mueen-legal',
        instagram: 'https://instagram.com/mueen_legal'
    },
    
    // Analytics (for future integration)
    analytics: {
        enabled: false,
        googleAnalyticsId: 'UA-XXXXXXXXX-X',
        trackPageViews: true,
        trackEvents: true
    },
    
    // Error Messages
    errorMessages: {
        ar: {
            fileUploadError: 'حدث خطأ أثناء رفع الملف. يرجى المحاولة مرة أخرى.',
            fileSizeError: 'حجم الملف كبير جداً. الحد الأقصى 10 ميجابايت.',
            fileFormatError: 'صيغة الملف غير مدعومة. يرجى رفع PDF أو DOCX أو صورة.',
            networkError: 'خطأ في الاتصال بالإنترنت. يرجى التحقق من اتصالك.',
            validationError: 'يرجى ملء جميع الحقول المطلوبة بشكل صحيح.',
            generalError: 'حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى.'
        },
        en: {
            fileUploadError: 'An error occurred while uploading the file. Please try again.',
            fileSizeError: 'File size is too large. Maximum 10 MB.',
            fileFormatError: 'File format not supported. Please upload PDF, DOCX, or image.',
            networkError: 'Network connection error. Please check your connection.',
            validationError: 'Please fill all required fields correctly.',
            generalError: 'An unexpected error occurred. Please try again.'
        }
    },
    
    // Success Messages
    successMessages: {
        ar: {
            fileUploaded: 'تم رفع الملف بنجاح!',
            contractGenerated: 'تم إنشاء العقد بنجاح!',
            contractDownloaded: 'تم تحميل العقد بنجاح!',
            dataSaved: 'تم حفظ البيانات بنجاح!'
        },
        en: {
            fileUploaded: 'File uploaded successfully!',
            contractGenerated: 'Contract generated successfully!',
            contractDownloaded: 'Contract downloaded successfully!',
            dataSaved: 'Data saved successfully!'
        }
    }
};

// Export configuration
if (typeof module !== 'undefined' && module.exports) {
    module.exports = appConfig;
}
