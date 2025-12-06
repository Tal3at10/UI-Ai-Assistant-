// Main Application Logic

class LegalAssistantApp {
    constructor() {
        this.currentView = 'dashboard';
        this.currentTemplate = null;
        this.currentStep = 0;
        this.formData = {};
        this.uploadedFile = null;
        this.conversations = [];
        this.currentConversationId = null;
        this.messages = [];
        this.init();
    }

    init() {
        this.renderLandingPage();
        this.renderDashboard();
        this.loadChatHistory();
        this.setupMainChatListeners();
        this.setupEventListeners();
        this.setupScrollAnimations();
        this.startDemoAnimation();
        this.setupNavbarScroll();
    }

    // Setup Navbar Scroll Effect
    setupNavbarScroll() {
        const navbar = document.querySelector('.navbar');
        
        if (!navbar) {
            console.error('Navbar not found!');
            return;
        }
        
        console.log('Navbar scroll effect initialized');
        
        window.addEventListener('scroll', () => {
            if (window.scrollY > 10) {
                navbar.classList.add('scrolled');
                console.log('Added scrolled class');
            } else {
                navbar.classList.remove('scrolled');
                console.log('Removed scrolled class');
            }
        });
    }

    // Render Landing Page
    renderLandingPage() {
        const servicesGrid = document.getElementById('servicesGrid');
        if (!servicesGrid) return;
        
        servicesGrid.innerHTML = appData.features.map(feature => `
            <div class="service-card" data-view="${feature.view}">
                <svg class="service-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    ${feature.icon}
                </svg>
                <h3 class="service-title">${feature.title}</h3>
                <p class="service-description">${feature.description}</p>
            </div>
        `).join('');
        
        // Add click event listeners to service cards
        servicesGrid.querySelectorAll('.service-card').forEach(card => {
            card.addEventListener('click', () => {
                const view = card.getAttribute('data-view');
                this.showView(view);
            });
        });
    }

    // Setup Scroll Animations
    setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.3,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        // Observe demo section
        const demoSection = document.querySelector('.demo-section');
        if (demoSection) {
            observer.observe(demoSection);
        }
    }

    // Start Demo Animation
    startDemoAnimation() {
        const demoContent = document.getElementById('demoContent');
        if (!demoContent) {
            console.log('Demo content not found');
            return;
        }

        console.log('Starting demo animation');

        // Animation sequence
        setTimeout(() => {
            // After 1 second, show typing dots briefly, then start typing
            const aiMsg = demoContent.querySelector('.ai-msg');
            console.log('AI message element:', aiMsg);
            
            if (aiMsg) {
                const bubble = aiMsg.querySelector('.demo-bubble');
                console.log('Bubble element:', bubble);
                
                // Wait 0.5 seconds (dots show briefly), then start typewriter
                setTimeout(() => {
                    console.log('Starting typewriter effect');
                    this.typewriterEffect(bubble);
                }, 500);
            }
        }, 1000);

        // Restart animation every 15 seconds (increased to show full text)
        setInterval(() => {
            this.resetDemoAnimation();
        }, 15000);
    }

    typewriterEffect(element) {
        if (!element) {
            console.error('Element not found for typewriter effect');
            return;
        }
        
        console.log('Typewriter effect starting on element:', element);
        
        // Clear any existing content (including typing dots)
        element.innerHTML = '';
        
        // Text to display with typing effect
        const fullText = `<strong>تحليل العقد:</strong><br><br>• مدة العقد: سنة واحدة قابلة للتجديد<br>• قيمة الإيجار: 3000 جنيه شهرياً<br>• التأمين: شهرين مقدماً<br>• المسؤول عن الصيانة: المالك`;
        
        let index = 0;
        
        const typeInterval = setInterval(() => {
            if (index < fullText.length) {
                // Handle HTML tags
                if (fullText.charAt(index) === '<') {
                    const closingTag = fullText.indexOf('>', index);
                    if (closingTag !== -1) {
                        element.innerHTML += fullText.substring(index, closingTag + 1);
                        index = closingTag + 1;
                    } else {
                        element.innerHTML += fullText.charAt(index);
                        index++;
                    }
                } else {
                    element.innerHTML += fullText.charAt(index);
                    index++;
                }
            } else {
                clearInterval(typeInterval);
                console.log('Typewriter effect completed');
            }
        }, 30); // Speed of typing (30ms per character)
    }

    resetDemoAnimation() {
        const demoContent = document.getElementById('demoContent');
        if (!demoContent) return;

        const aiMsg = demoContent.querySelector('.ai-msg');
        if (aiMsg) {
            const bubble = aiMsg.querySelector('.demo-bubble');
            
            // Reset to typing indicator (dots)
            bubble.innerHTML = `
                <div class="demo-typing">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            `;

            // Show dots briefly (0.5s), then start typing
            setTimeout(() => {
                this.typewriterEffect(bubble);
            }, 500);
        }
    }

    // Main Chat Functions
    setupMainChatListeners() {
        const mainChatInput = document.getElementById('mainChatInput');
        const mainSendBtn = document.getElementById('mainSendBtn');
        const fileAttachment = document.getElementById('fileAttachment');

        if (mainChatInput) {
            // Auto-resize textarea
            mainChatInput.addEventListener('input', (e) => {
                e.target.style.height = 'auto';
                e.target.style.height = e.target.scrollHeight + 'px';
            });

            // Send on Enter (Shift+Enter for new line)
            mainChatInput.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    this.sendMainMessage();
                }
            });
        }

        if (fileAttachment) {
            fileAttachment.addEventListener('change', (e) => {
                const file = e.target.files[0];
                if (file) this.handleFileAttachment(file);
            });
        }
    }

    sendMainMessage() {
        const input = document.getElementById('mainChatInput');
        const message = input.value.trim();

        if (!message) return;

        // Hide welcome screen, show messages
        document.getElementById('welcomeScreen').classList.add('hidden');
        document.getElementById('messagesContainer').classList.remove('hidden');

        // Add user message
        this.addMessage(message, 'user');
        input.value = '';
        input.style.height = 'auto';

        // Show typing indicator
        this.showTypingIndicator();

        // Simulate AI response
        setTimeout(() => {
            this.hideTypingIndicator();
            this.generateAIResponse(message);
        }, 1500);

        // Save to conversation
        if (!this.currentConversationId) {
            this.startNewConversation(message);
        }
    }

    addMessage(content, sender) {
        const messagesList = document.getElementById('messagesList');
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message-item';

        const avatarText = sender === 'user' ? 'م' : 'AI';
        const senderName = sender === 'user' ? 'أنت' : 'مُعين';

        messageDiv.innerHTML = `
            <div class="message-header">
                <div class="message-avatar ${sender}">${avatarText}</div>
                <span class="message-sender">${senderName}</span>
            </div>
            <div class="message-content">${this.formatMessage(content)}</div>
            ${sender === 'ai' ? `
                <div class="message-actions">
                    <button class="action-btn" onclick="app.copyMessage(this)">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" stroke-width="2"/>
                        </svg>
                        نسخ
                    </button>
                </div>
            ` : ''}
        `;

        messagesList.appendChild(messageDiv);
        messagesList.scrollTop = messagesList.scrollHeight;

        this.messages.push({ content, sender, timestamp: new Date() });
    }

    formatMessage(content) {
        // Convert markdown-like formatting to HTML
        content = content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        content = content.replace(/\n/g, '<br>');
        return content;
    }

    showTypingIndicator() {
        const messagesList = document.getElementById('messagesList');
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message-item';
        typingDiv.id = 'typingIndicator';
        typingDiv.innerHTML = `
            <div class="message-header">
                <div class="message-avatar ai">AI</div>
                <span class="message-sender">مُعين</span>
            </div>
            <div class="typing-indicator">
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
            </div>
        `;
        messagesList.appendChild(typingDiv);
        messagesList.scrollTop = messagesList.scrollHeight;
    }

    hideTypingIndicator() {
        const indicator = document.getElementById('typingIndicator');
        if (indicator) indicator.remove();
    }

    generateAIResponse(userMessage) {
        const lowerMessage = userMessage.toLowerCase();
        let response = '';

        // Intelligent response based on keywords
        if (lowerMessage.includes('عقد') || lowerMessage.includes('إنشاء')) {
            response = this.getContractResponse();
        } else if (lowerMessage.includes('مستند') || lowerMessage.includes('تحليل') || lowerMessage.includes('حلل')) {
            response = this.getDocumentAnalysisResponse();
        } else if (lowerMessage.includes('معنى') || lowerMessage.includes('شرح') || lowerMessage.includes('مصطلح')) {
            response = this.getTermExplanationResponse(userMessage);
        } else if (lowerMessage.includes('حقوق') || lowerMessage.includes('واجبات')) {
            response = this.getRightsResponse(userMessage);
        } else if (lowerMessage.includes('إيجار') || lowerMessage.includes('مستأجر') || lowerMessage.includes('مؤجر')) {
            response = this.getRentalResponse();
        } else if (lowerMessage.includes('عمل') || lowerMessage.includes('موظف') || lowerMessage.includes('راتب')) {
            response = this.getEmploymentResponse();
        } else {
            response = this.getGeneralResponse();
        }

        this.addMessage(response, 'ai');
    }

    getContractResponse() {
        return `بالتأكيد! يمكنني مساعدتك في إنشاء عقد قانوني. لدينا عدة أنواع من العقود:

**1. عقد إيجار** - للشقق والعقارات
**2. عقد بيع** - للعقارات والسيارات والممتلكات
**3. عقد عمل** - بين صاحب العمل والموظف
**4. عقد شراكة** - للمشاريع التجارية

أي نوع من العقود تريد إنشاءه؟ سأقوم بإرشادك خطوة بخطوة لملء البيانات المطلوبة.`;
    }

    getDocumentAnalysisResponse() {
        return `يمكنني مساعدتك في تحليل المستندات القانونية! 📄

**ما يمكنني فعله:**
• تلخيص المستند بلغة مبسطة
• استخراج النقاط الرئيسية والبنود المهمة
• الإجابة على أسئلتك حول محتوى المستند
• تحديد الحقوق والالتزامات لكل طرف

**لرفع مستند:**
اضغط على زر المرفقات 📎 بجانب مربع الكتابة، ثم اختر الملف (PDF, DOCX, أو صورة).

هل لديك مستند تريد تحليله الآن؟`;
    }

    getTermExplanationResponse(message) {
        // Try to extract term from message
        const terms = Object.keys(appData.legalTerms);
        const foundTerm = terms.find(term => message.includes(term));

        if (foundTerm) {
            return `**${foundTerm}:**

${appData.legalTerms[foundTerm]}

**مصطلحات ذات صلة:**
• الحيازة
• الملكية
• التقادم

هل تريد شرح أي مصطلح آخر؟`;
        }

        return `يمكنني شرح المصطلحات القانونية بلغة بسيطة! 📚

**بعض المصطلحات الشائعة:**
• **حق الانتفاع** - حق استخدام شيء مملوك للغير
• **الحيازة** - السيطرة الفعلية على شيء معين
• **التقادم** - اكتساب حق بمرور الزمن
• **الشفعة** - حق الشريك في شراء حصة شريكه
• **الرهن** - ضمان الوفاء بدين

أي مصطلح تريد معرفة المزيد عنه؟`;
    }

    getRightsResponse(message) {
        if (message.includes('مستأجر')) {
            return `**حقوق المستأجر في القانون المصري:**

✅ **الحقوق الأساسية:**
• الانتفاع بالعين المؤجرة طوال مدة العقد
• الحصول على إيصالات بالمبالغ المدفوعة
• استرداد مبلغ التأمين عند انتهاء العقد
• طلب الصيانة الأساسية من المؤجر

⚠️ **الالتزامات:**
• دفع الإيجار في المواعيد المحددة
• المحافظة على العين المؤجرة
• عدم التأجير من الباطن بدون إذن
• إخطار المؤجر بأي أضرار

هل تريد معرفة المزيد عن موضوع معين؟`;
        }

        return `يمكنني مساعدتك في معرفة حقوقك وواجباتك القانونية! ⚖️

**في أي مجال تريد معرفة حقوقك؟**
• حقوق المستأجر/المؤجر
• حقوق الموظف/صاحب العمل
• حقوق المشتري/البائع
• حقوق الشريك في الشراكة

أخبرني بالمجال وسأقدم لك معلومات تفصيلية.`;
    }

    getRentalResponse() {
        return `**معلومات عن عقود الإيجار في مصر:**

📋 **البنود الأساسية:**
• أسماء وبيانات الطرفين (المؤجر والمستأجر)
• وصف العقار وموقعه ومساحته
• قيمة الإيجار الشهري وطريقة الدفع
• مدة العقد وشروط التجديد
• مبلغ التأمين (عادة شهر أو شهرين)

⚖️ **نصائح قانونية:**
• توثيق العقد في الشهر العقاري يحمي حقوق الطرفين
• التأكد من ملكية المؤجر للعقار
• تحديد المسؤول عن الصيانة والمرافق
• الاحتفاظ بنسخة موثقة من العقد

هل تريد إنشاء عقد إيجار الآن؟`;
    }

    getEmploymentResponse() {
        return `**معلومات عن عقود العمل في مصر:**

📝 **البنود الأساسية:**
• بيانات صاحب العمل والموظف
• المسمى الوظيفي ووصف المهام
• الراتب والحوافز والبدلات
• ساعات العمل والإجازات
• فترة التجربة (إن وجدت)
• شروط إنهاء العقد

⚖️ **حقوق الموظف:**
• الحصول على راتب منتظم
• إجازة سنوية مدفوعة (21 يوم على الأقل)
• تأمينات اجتماعية
• بيئة عمل آمنة

💼 **أنواع العقود:**
• عقد دائم (غير محدد المدة)
• عقد مؤقت (محدد المدة)
• عقد تجريبي (عادة 3 أشهر)

هل تريد إنشاء عقد عمل؟`;
    }

    getGeneralResponse() {
        return `مرحباً! أنا مُعين، مساعدك القانوني الذكي. 👋

**يمكنني مساعدتك في:**
• تحليل المستندات القانونية وتلخيصها
• إنشاء عقود قانونية احترافية
• شرح المصطلحات القانونية المعقدة
• الإجابة على أسئلتك القانونية
• توضيح حقوقك وواجباتك

**كيف يمكنني مساعدتك اليوم؟**

💡 يمكنك أن تسألني مثلاً:
• "أريد إنشاء عقد إيجار"
• "ما معنى حق الانتفاع؟"
• "ما هي حقوقي كمستأجر؟"
• "حلل هذا المستند" (مع إرفاق ملف)`;
    }

    useSuggestion(suggestion) {
        const input = document.getElementById('mainChatInput');
        input.value = suggestion;
        input.focus();
    }

    attachFile() {
        document.getElementById('fileAttachment').click();
    }

    handleFileAttachment(file) {
        // Validate file
        const maxSize = 10 * 1024 * 1024; // 10MB
        if (file.size > maxSize) {
            alert('حجم الملف كبير جداً. الحد الأقصى 10 ميجابايت.');
            return;
        }

        const allowedTypes = ['application/pdf', 'application/msword', 
                            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                            'image/jpeg', 'image/png', 'image/jpg'];
        
        if (!allowedTypes.includes(file.type)) {
            alert('صيغة الملف غير مدعومة. يرجى رفع PDF أو DOCX أو صورة.');
            return;
        }

        // Add file message
        const fileName = file.name;
        const fileSize = (file.size / 1024).toFixed(2) + ' KB';
        
        document.getElementById('welcomeScreen').classList.add('hidden');
        document.getElementById('messagesContainer').classList.remove('hidden');

        this.addMessage(`📎 تم إرفاق الملف: **${fileName}** (${fileSize})`, 'user');
        
        // Show typing indicator
        this.showTypingIndicator();

        // Simulate processing
        setTimeout(() => {
            this.hideTypingIndicator();
            this.addMessage(`تم استلام الملف بنجاح! 📄

جاري تحليل المستند... هذا قد يستغرق بضع ثوان.

**معلومات الملف:**
• الاسم: ${fileName}
• الحجم: ${fileSize}
• النوع: ${file.type.includes('pdf') ? 'PDF' : file.type.includes('word') ? 'Word' : 'صورة'}

سأقوم الآن بـ:
✓ استخراج النص من المستند
✓ تحليل المحتوى القانوني
✓ إنشاء ملخص مبسط

يمكنك طرح أي أسئلة عن المستند بعد انتهاء التحليل.`, 'ai');

            // Simulate analysis completion
            setTimeout(() => {
                const summary = appData.mockSummaries.default;
                this.addMessage(`✅ **اكتمل التحليل!**

${summary.content}

**يمكنك الآن:**
• طرح أسئلة محددة عن المستند
• طلب توضيح أي بند
• معرفة حقوقك والتزاماتك

ما الذي تريد معرفته عن هذا المستند؟`, 'ai');
            }, 2000);
        }, 1500);
    }

    copyMessage(button) {
        const messageContent = button.closest('.message-item').querySelector('.message-content');
        const text = messageContent.innerText;
        
        navigator.clipboard.writeText(text).then(() => {
            button.innerHTML = `
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M5 13l4 4L19 7" stroke-width="2"/>
                </svg>
                تم النسخ
            `;
            setTimeout(() => {
                button.innerHTML = `
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" stroke-width="2"/>
                    </svg>
                    نسخ
                `;
            }, 2000);
        });
    }

    startNewChat() {
        this.currentConversationId = null;
        this.messages = [];
        document.getElementById('messagesList').innerHTML = '';
        document.getElementById('messagesContainer').classList.add('hidden');
        document.getElementById('welcomeScreen').classList.remove('hidden');
        document.getElementById('mainChatInput').value = '';
    }

    startNewConversation(firstMessage) {
        const conversation = {
            id: Date.now(),
            title: firstMessage.substring(0, 30) + (firstMessage.length > 30 ? '...' : ''),
            date: new Date().toLocaleDateString('ar-EG'),
            messages: []
        };
        this.conversations.unshift(conversation);
        this.currentConversationId = conversation.id;
        this.saveChatHistory();
        this.renderChatHistory();
    }

    loadChatHistory() {
        const saved = localStorage.getItem('mueen_conversations');
        if (saved) {
            this.conversations = JSON.parse(saved);
            this.renderChatHistory();
        }
    }

    saveChatHistory() {
        localStorage.setItem('mueen_conversations', JSON.stringify(this.conversations));
    }

    renderChatHistory() {
        const historyList = document.getElementById('chatHistoryList');
        if (!historyList) return;

        if (this.conversations.length === 0) {
            historyList.innerHTML = '<p style="text-align: center; color: var(--text-light); font-size: 0.9rem;">لا توجد محادثات سابقة</p>';
            return;
        }

        historyList.innerHTML = this.conversations.slice(0, 10).map(conv => `
            <div class="chat-history-item ${conv.id === this.currentConversationId ? 'active' : ''}" 
                 onclick="app.loadConversation(${conv.id})">
                <div class="chat-history-title">${conv.title}</div>
                <div class="chat-history-date">${conv.date}</div>
            </div>
        `).join('');
    }

    loadConversation(id) {
        // This would load a saved conversation
        alert('سيتم تحميل المحادثة قريباً');
    }

    // Render Dashboard
    renderDashboard() {
        const featuresGrid = document.getElementById('featuresGrid');
        const recentDocuments = document.getElementById('recentDocuments');

        // Check if elements exist (they might not be on landing page)
        if (!featuresGrid || !recentDocuments) {
            console.log('Dashboard elements not found - probably on landing page');
            return;
        }

        // Render Features
        featuresGrid.innerHTML = appData.features.map(feature => `
            <div class="feature-card" onclick="app.showView('${feature.view}')">
                <svg class="feature-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    ${feature.icon}
                </svg>
                <h3 class="feature-title">${feature.title}</h3>
                <p class="feature-description">${feature.description}</p>
            </div>
        `).join('');

        // Render Recent Documents
        if (appData.recentDocuments.length > 0) {
            recentDocuments.innerHTML = appData.recentDocuments.map(doc => `
                <div class="document-item">
                    <div class="document-info">
                        <svg class="document-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" stroke-width="2"/>
                        </svg>
                        <div class="document-details">
                            <h3>${doc.name}</h3>
                            <p>${doc.date}</p>
                        </div>
                    </div>
                    <span class="document-date">${doc.date}</span>
                </div>
            `).join('');
        } else {
            recentDocuments.innerHTML = '<p style="text-align: center; color: var(--text-light);">لا توجد مستندات حديثة</p>';
        }
    }

    // Setup Event Listeners
    setupEventListeners() {
        // Document Analysis
        const uploadZone = document.getElementById('uploadZone');
        const fileInput = document.getElementById('fileInput');
        
        if (uploadZone && fileInput) {
            uploadZone.addEventListener('click', () => fileInput.click());
            
            uploadZone.addEventListener('dragover', (e) => {
                e.preventDefault();
                uploadZone.classList.add('drag-over');
            });
            
            uploadZone.addEventListener('dragleave', () => {
                uploadZone.classList.remove('drag-over');
            });
            
            uploadZone.addEventListener('drop', (e) => {
                e.preventDefault();
                uploadZone.classList.remove('drag-over');
                const file = e.dataTransfer.files[0];
                if (file) this.handleFileUpload(file);
            });
            
            fileInput.addEventListener('change', (e) => {
                const file = e.target.files[0];
                if (file) this.handleFileUpload(file);
            });
        }

        // Chat
        const chatSendBtn = document.getElementById('chatSendBtn');
        const chatInput = document.getElementById('chatInput');
        
        if (chatSendBtn && chatInput) {
            chatSendBtn.addEventListener('click', () => this.sendChatMessage());
            chatInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') this.sendChatMessage();
            });
        }

        // Template Selection
        this.renderTemplates();

        // Form Navigation
        const nextStepBtn = document.getElementById('nextStepBtn');
        const prevStepBtn = document.getElementById('prevStepBtn');
        
        if (nextStepBtn) nextStepBtn.addEventListener('click', () => this.nextFormStep());
        if (prevStepBtn) prevStepBtn.addEventListener('click', () => this.prevFormStep());

        // Legal Term Explanation
        const explainBtn = document.getElementById('explainBtn');
        const termInput = document.getElementById('termInput');
        
        if (explainBtn && termInput) {
            explainBtn.addEventListener('click', () => this.explainTerm());
            termInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') this.explainTerm();
            });
        }
    }

    // View Management
    showView(viewName) {
        // Scroll to top smoothly
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        // Hide all views
        document.querySelectorAll('.landing-view, .dashboard-view, .chat-view, .analysis-view, .template-view, .explanation-view').forEach(view => {
            view.classList.remove('active-view');
        });

        // Show selected view
        const viewMap = {
            'landing': 'landingView',
            'dashboard': 'dashboardView',
            'chat': 'chatView',
            'analysis': 'analysisView',
            'template': 'templateView',
            'explanation': 'explanationView'
        };

        const viewId = viewMap[viewName];
        if (viewId) {
            document.getElementById(viewId).classList.add('active-view');
            this.currentView = viewName;
            
            // Update body class for styling
            if (viewName === 'landing') {
                document.body.classList.add('landing-mode');
            } else {
                document.body.classList.remove('landing-mode');
            }
            
            // If opening chat view, ensure welcome screen is visible if no messages
            if (viewName === 'chat' && this.messages.length === 0) {
                document.getElementById('welcomeScreen').classList.remove('hidden');
                document.getElementById('messagesContainer').classList.add('hidden');
            }
            
            // If opening template view, render templates and reset form
            if (viewName === 'template') {
                this.renderTemplates();
                // Show template selection, hide forms
                const templateSelection = document.getElementById('templateSelection');
                const guidedForm = document.getElementById('guidedForm');
                const contractPreview = document.getElementById('contractPreview');
                
                if (templateSelection) templateSelection.classList.remove('hidden');
                if (guidedForm) guidedForm.classList.add('hidden');
                if (contractPreview) contractPreview.classList.add('hidden');
            }
        }
    }

    // Document Analysis Functions
    handleFileUpload(file) {
        this.uploadedFile = file;
        
        // Hide upload section
        document.getElementById('uploadSection').classList.add('hidden');
        
        // Show processing section
        const processingSection = document.getElementById('processingSection');
        processingSection.classList.remove('hidden');
        
        // Render progress steps
        this.renderProcessingSteps();
        
        // Simulate processing
        this.simulateProcessing();
    }

    renderProcessingSteps() {
        const progressSteps = document.getElementById('progressSteps');
        progressSteps.innerHTML = appData.processingSteps.map((step, index) => `
            <div class="progress-step" id="step-${step.id}">
                <div class="step-circle">${step.id}</div>
                <div class="step-label">${step.label}</div>
            </div>
        `).join('');
    }

    simulateProcessing() {
        const progressFill = document.getElementById('progressFill');
        let progress = 0;
        let currentStep = 1;

        const interval = setInterval(() => {
            progress += 2;
            progressFill.style.width = progress + '%';

            // Update step status
            const stepElement = document.getElementById(`step-${currentStep}`);
            if (stepElement) {
                if (progress >= currentStep * 25) {
                    stepElement.classList.add('completed');
                    currentStep++;
                } else {
                    stepElement.classList.add('active');
                }
            }

            if (progress >= 100) {
                clearInterval(interval);
                setTimeout(() => {
                    this.showResults();
                }, 500);
            }
        }, 50);
    }

    showResults() {
        // Hide processing section
        document.getElementById('processingSection').classList.add('hidden');
        
        // Show results section
        const resultsSection = document.getElementById('resultsSection');
        resultsSection.classList.remove('hidden');
        
        // Display summary
        const summaryContent = document.getElementById('summaryContent');
        const summary = appData.mockSummaries.default;
        summaryContent.innerHTML = `
            <h3>${summary.title}</h3>
            ${summary.content}
        `;
        
        // Clear chat
        this.chatHistory = [];
        document.getElementById('chatMessages').innerHTML = '';
    }

    sendChatMessage() {
        const chatInput = document.getElementById('chatInput');
        const message = chatInput.value.trim();
        
        if (!message) return;
        
        // Add user message
        this.addChatMessage(message, 'user');
        chatInput.value = '';
        
        // Simulate AI response
        setTimeout(() => {
            const randomResponse = appData.mockChatResponses[
                Math.floor(Math.random() * appData.mockChatResponses.length)
            ];
            this.addChatMessage(randomResponse, 'ai');
        }, 1000);
    }

    addChatMessage(message, sender) {
        const chatMessages = document.getElementById('chatMessages');
        const messageDiv = document.createElement('div');
        messageDiv.className = `chat-message message-${sender}`;
        messageDiv.innerHTML = `
            <div class="message-bubble">${message}</div>
        `;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        this.chatHistory.push({ message, sender });
    }

    // Template Functions
    renderTemplates() {
        const templateGrid = document.getElementById('templateGrid');
        if (!templateGrid) return;
        
        templateGrid.innerHTML = appData.templates.map(template => `
            <div class="template-card" data-template-id="${template.id}">
                <svg class="template-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    ${template.icon}
                </svg>
                <h3 class="template-name">${template.name}</h3>
            </div>
        `).join('');
        
        // Add click event listeners to template cards
        templateGrid.querySelectorAll('.template-card').forEach(card => {
            card.addEventListener('click', () => {
                const templateId = card.getAttribute('data-template-id');
                this.selectTemplate(templateId);
            });
        });
    }

    selectTemplate(templateId) {
        this.currentTemplate = appData.templates.find(t => t.id === templateId);
        this.currentStep = 0;
        this.formData = {};
        
        // Hide template selection
        document.getElementById('templateSelection').classList.add('hidden');
        
        // Show guided form
        const guidedForm = document.getElementById('guidedForm');
        guidedForm.classList.remove('hidden');
        
        // Render form
        this.renderFormStep();
    }

    renderFormStep() {
        if (!this.currentTemplate) return;
        
        const step = this.currentTemplate.steps[this.currentStep];
        const formContent = document.getElementById('formContent');
        
        formContent.innerHTML = `
            <h2 class="section-title">${step.title}</h2>
            ${step.fields.map(field => this.renderFormField(field)).join('')}
        `;
        
        // Update progress indicator
        this.updateFormProgress();
        
        // Update button states
        document.getElementById('prevStepBtn').disabled = this.currentStep === 0;
        document.getElementById('nextStepBtn').textContent = 
            this.currentStep === this.currentTemplate.steps.length - 1 ? 'إنشاء العقد' : 'التالي';
    }

    renderFormField(field) {
        const value = this.formData[field.name] || '';
        const required = field.required ? 'required' : '';
        
        switch (field.type) {
            case 'textarea':
                return `
                    <div class="form-group">
                        <label class="form-label">${field.label}${field.required ? ' *' : ''}</label>
                        <textarea class="form-textarea" name="${field.name}" ${required}>${value}</textarea>
                    </div>
                `;
            case 'select':
                return `
                    <div class="form-group">
                        <label class="form-label">${field.label}${field.required ? ' *' : ''}</label>
                        <select class="form-select" name="${field.name}" ${required}>
                            <option value="">اختر...</option>
                            ${field.options.map(opt => `
                                <option value="${opt}" ${value === opt ? 'selected' : ''}>${opt}</option>
                            `).join('')}
                        </select>
                    </div>
                `;
            default:
                return `
                    <div class="form-group">
                        <label class="form-label">${field.label}${field.required ? ' *' : ''}</label>
                        <input type="${field.type}" class="form-input" name="${field.name}" value="${value}" ${required}>
                    </div>
                `;
        }
    }

    updateFormProgress() {
        const progressIndicator = document.getElementById('formProgressIndicator');
        progressIndicator.innerHTML = this.currentTemplate.steps.map((step, index) => `
            <div class="indicator-step ${index === this.currentStep ? 'active' : ''} ${index < this.currentStep ? 'completed' : ''}">
                <div class="indicator-circle">${index + 1}</div>
                <div class="indicator-label">${step.title}</div>
            </div>
        `).join('');
    }

    nextFormStep() {
        // Save current step data
        this.saveFormData();
        
        // Validate required fields
        if (!this.validateCurrentStep()) {
            alert('يرجى ملء جميع الحقول المطلوبة');
            return;
        }
        
        if (this.currentStep < this.currentTemplate.steps.length - 1) {
            this.currentStep++;
            this.renderFormStep();
        } else {
            // Generate contract
            this.generateContract();
        }
    }

    prevFormStep() {
        if (this.currentStep > 0) {
            this.saveFormData();
            this.currentStep--;
            this.renderFormStep();
        }
    }

    saveFormData() {
        const formContent = document.getElementById('formContent');
        const inputs = formContent.querySelectorAll('input, textarea, select');
        
        inputs.forEach(input => {
            this.formData[input.name] = input.value;
        });
    }

    validateCurrentStep() {
        const step = this.currentTemplate.steps[this.currentStep];
        const requiredFields = step.fields.filter(f => f.required);
        
        return requiredFields.every(field => {
            const value = this.formData[field.name];
            return value && value.trim() !== '';
        });
    }

    generateContract() {
        this.saveFormData();
        
        // Hide form
        document.getElementById('guidedForm').classList.add('hidden');
        
        // Show preview
        const contractPreview = document.getElementById('contractPreview');
        contractPreview.classList.remove('hidden');
        
        // Generate contract content
        const previewContent = document.getElementById('previewContent');
        previewContent.innerHTML = this.buildContractHTML();
    }

    buildContractHTML() {
        const template = this.currentTemplate;
        const data = this.formData;
        
        // Build contract based on template type
        let html = `
            <div style="text-align: center; margin-bottom: 2rem;">
                <h1 style="color: var(--primary-blue); font-size: 2rem; margin-bottom: 0.5rem;">${template.name}</h1>
                <p style="color: var(--text-medium);">تم إنشاؤه بواسطة مُعين - المساعد القانوني الذكي</p>
            </div>
        `;
        
        template.steps.forEach(step => {
            html += `<h3 style="color: var(--primary-blue); margin-top: 2rem; margin-bottom: 1rem;">${step.title}</h3>`;
            html += '<div style="margin-right: 1rem;">';
            
            step.fields.forEach(field => {
                const value = data[field.name] || 'غير محدد';
                html += `<p style="margin-bottom: 0.75rem;"><strong>${field.label}:</strong> ${value}</p>`;
            });
            
            html += '</div>';
        });
        
        html += `
            <div style="margin-top: 3rem; padding-top: 2rem; border-top: 2px solid var(--border-color);">
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin-top: 2rem;">
                    <div style="text-align: center;">
                        <p style="margin-bottom: 3rem;">توقيع الطرف الأول</p>
                        <div style="border-top: 2px solid var(--text-dark); padding-top: 0.5rem;">التوقيع</div>
                    </div>
                    <div style="text-align: center;">
                        <p style="margin-bottom: 3rem;">توقيع الطرف الثاني</p>
                        <div style="border-top: 2px solid var(--text-dark); padding-top: 0.5rem;">التوقيع</div>
                    </div>
                </div>
            </div>
        `;
        
        return html;
    }

    editContract() {
        document.getElementById('contractPreview').classList.add('hidden');
        document.getElementById('guidedForm').classList.remove('hidden');
        this.currentStep = 0;
        this.renderFormStep();
    }

    downloadContract(format) {
        alert(`سيتم تحميل العقد بصيغة ${format.toUpperCase()}. هذه ميزة تجريبية.`);
        // In production, this would generate and download the actual file
    }

    // Legal Term Explanation
    explainTerm() {
        const termInput = document.getElementById('termInput');
        const term = termInput.value.trim();
        
        if (!term) return;
        
        const explanationResult = document.getElementById('explanationResult');
        const explanation = appData.legalTerms[term];
        
        if (explanation) {
            explanationResult.innerHTML = `
                <h3>${term}</h3>
                <p>${explanation}</p>
            `;
            explanationResult.classList.remove('hidden');
        } else {
            explanationResult.innerHTML = `
                <h3>${term}</h3>
                <p>عذراً، لم نتمكن من العثور على شرح لهذا المصطلح في قاعدة البيانات. يرجى المحاولة بمصطلح آخر أو التواصل مع محامٍ متخصص.</p>
            `;
            explanationResult.classList.remove('hidden');
        }
    }

    // Search term from tag
    searchTerm(term) {
        const termInput = document.getElementById('termInput');
        termInput.value = term;
        this.explainTerm();
    }
}

// Initialize App
let app;

// Function to initialize the app
function initializeApp() {
    app = new LegalAssistantApp();
    window.app = app; // Make app globally available
}

// Check if DOM is already loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    // DOM is already loaded
    initializeApp();
}
