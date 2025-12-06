// Data Configuration - All dynamic content is stored here

const appData = {
    // Dashboard Features
    features: [
        {
            id: 'chat',
            title: 'دردشة مع المساعد',
            description: 'تحدث مع المساعد القانوني الذكي واحصل على إجابات فورية لجميع أسئلتك القانونية',
            icon: `<path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" stroke-width="2"/>`,
            view: 'chat'
        },
        {
            id: 'analysis',
            title: 'تحليل المستندات',
            description: 'قم برفع أي مستند قانوني واحصل على ملخص مبسط وإجابات فورية على أسئلتك',
            icon: `<path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" stroke-width="2"/>`,
            view: 'analysis'
        },
        {
            id: 'template',
            title: 'إنشاء عقد',
            description: 'اختر نوع العقد واملأ البيانات المطلوبة لإنشاء عقد قانوني احترافي',
            icon: `<path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" stroke-width="2"/><path d="M13 3v6h6" stroke-width="2"/>`,
            view: 'template'
        },
        {
            id: 'explanation',
            title: 'شرح المصطلحات',
            description: 'أدخل أي مصطلح قانوني معقد واحصل على شرح واضح بلغة بسيطة',
            icon: `<circle cx="12" cy="12" r="10" stroke-width="2"/><path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3m.08 4h.01" stroke-width="2"/>`,
            view: 'explanation'
        },
        {
            id: 'legal-advice',
            title: 'استشارات قانونية',
            description: 'احصل على استشارة قانونية متخصصة في مختلف المجالات من خبراء القانون المصري',
            icon: `<path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" stroke-width="2"/>`,
            view: 'chat'
        },
        {
            id: 'case-tracking',
            title: 'متابعة القضايا',
            description: 'تتبع حالة قضاياك القانونية واحصل على تحديثات فورية عن مواعيد الجلسات والإجراءات',
            icon: `<path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" stroke-width="2"/>`,
            view: 'chat'
        }
    ],

    // Recent Documents (Mock Data)
    recentDocuments: [
        {
            id: 1,
            name: 'عقد إيجار شقة سكنية',
            date: '٢٠٢٥/١١/٢٥',
            type: 'rental'
        },
        {
            id: 2,
            name: 'عقد بيع سيارة',
            date: '٢٠٢٥/١١/٢٣',
            type: 'sale'
        },
        {
            id: 3,
            name: 'عقد عمل',
            date: '٢٠٢٥/١١/٢٠',
            type: 'employment'
        }
    ],

    // Processing Steps
    processingSteps: [
        { id: 1, label: 'رفع الملف' },
        { id: 2, label: 'معالجة النص' },
        { id: 3, label: 'التحليل' },
        { id: 4, label: 'إنشاء الملخص' }
    ],

    // Contract Templates
    templates: [
        {
            id: 'rental',
            name: 'عقد إيجار',
            icon: `<path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" stroke-width="2"/>`,
            steps: [
                {
                    title: 'بيانات الأطراف',
                    fields: [
                        { name: 'landlordName', label: 'اسم المؤجر', type: 'text', required: true },
                        { name: 'landlordId', label: 'الرقم القومي للمؤجر', type: 'text', required: true },
                        { name: 'tenantName', label: 'اسم المستأجر', type: 'text', required: true },
                        { name: 'tenantId', label: 'الرقم القومي للمستأجر', type: 'text', required: true }
                    ]
                },
                {
                    title: 'بيانات العقار',
                    fields: [
                        { name: 'propertyAddress', label: 'عنوان العقار', type: 'textarea', required: true },
                        { name: 'propertyType', label: 'نوع العقار', type: 'select', options: ['شقة', 'فيلا', 'محل تجاري', 'مكتب'], required: true },
                        { name: 'propertyArea', label: 'مساحة العقار (متر مربع)', type: 'number', required: true }
                    ]
                },
                {
                    title: 'الشروط المالية',
                    fields: [
                        { name: 'rentAmount', label: 'قيمة الإيجار الشهري (جنيه)', type: 'number', required: true },
                        { name: 'deposit', label: 'مبلغ التأمين (جنيه)', type: 'number', required: true },
                        { name: 'paymentDay', label: 'يوم الدفع من كل شهر', type: 'number', required: true }
                    ]
                },
                {
                    title: 'مدة العقد والشروط',
                    fields: [
                        { name: 'startDate', label: 'تاريخ بداية العقد', type: 'date', required: true },
                        { name: 'duration', label: 'مدة العقد (بالأشهر)', type: 'number', required: true },
                        { name: 'utilities', label: 'المرافق المشمولة', type: 'textarea', required: false },
                        { name: 'specialTerms', label: 'شروط خاصة', type: 'textarea', required: false }
                    ]
                }
            ]
        },
        {
            id: 'sale',
            name: 'عقد بيع',
            icon: `<path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" stroke-width="2"/>`,
            steps: [
                {
                    title: 'بيانات الأطراف',
                    fields: [
                        { name: 'sellerName', label: 'اسم البائع', type: 'text', required: true },
                        { name: 'sellerId', label: 'الرقم القومي للبائع', type: 'text', required: true },
                        { name: 'buyerName', label: 'اسم المشتري', type: 'text', required: true },
                        { name: 'buyerId', label: 'الرقم القومي للمشتري', type: 'text', required: true }
                    ]
                },
                {
                    title: 'بيانات المبيع',
                    fields: [
                        { name: 'itemType', label: 'نوع المبيع', type: 'select', options: ['عقار', 'سيارة', 'أثاث', 'أخرى'], required: true },
                        { name: 'itemDescription', label: 'وصف المبيع', type: 'textarea', required: true },
                        { name: 'itemCondition', label: 'حالة المبيع', type: 'select', options: ['جديد', 'مستعمل - ممتاز', 'مستعمل - جيد', 'مستعمل - متوسط'], required: true }
                    ]
                },
                {
                    title: 'الشروط المالية',
                    fields: [
                        { name: 'salePrice', label: 'سعر البيع (جنيه)', type: 'number', required: true },
                        { name: 'paymentMethod', label: 'طريقة الدفع', type: 'select', options: ['نقدي', 'تقسيط', 'شيك', 'تحويل بنكي'], required: true },
                        { name: 'paymentTerms', label: 'شروط الدفع', type: 'textarea', required: false }
                    ]
                }
            ]
        },
        {
            id: 'employment',
            name: 'عقد عمل',
            icon: `<path d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" stroke-width="2"/>`,
            steps: [
                {
                    title: 'بيانات الأطراف',
                    fields: [
                        { name: 'employerName', label: 'اسم صاحب العمل/الشركة', type: 'text', required: true },
                        { name: 'employerAddress', label: 'عنوان الشركة', type: 'textarea', required: true },
                        { name: 'employeeName', label: 'اسم الموظف', type: 'text', required: true },
                        { name: 'employeeId', label: 'الرقم القومي للموظف', type: 'text', required: true }
                    ]
                },
                {
                    title: 'بيانات الوظيفة',
                    fields: [
                        { name: 'jobTitle', label: 'المسمى الوظيفي', type: 'text', required: true },
                        { name: 'jobDescription', label: 'وصف الوظيفة', type: 'textarea', required: true },
                        { name: 'workLocation', label: 'مكان العمل', type: 'text', required: true },
                        { name: 'workHours', label: 'ساعات العمل اليومية', type: 'number', required: true }
                    ]
                },
                {
                    title: 'الشروط المالية',
                    fields: [
                        { name: 'salary', label: 'الراتب الشهري (جنيه)', type: 'number', required: true },
                        { name: 'bonuses', label: 'الحوافز والبدلات', type: 'textarea', required: false },
                        { name: 'paymentDate', label: 'يوم صرف الراتب', type: 'number', required: true }
                    ]
                },
                {
                    title: 'مدة العقد والإجازات',
                    fields: [
                        { name: 'startDate', label: 'تاريخ بداية العمل', type: 'date', required: true },
                        { name: 'contractType', label: 'نوع العقد', type: 'select', options: ['دائم', 'مؤقت', 'تجريبي'], required: true },
                        { name: 'probationPeriod', label: 'فترة التجربة (بالأشهر)', type: 'number', required: false },
                        { name: 'annualLeave', label: 'الإجازة السنوية (بالأيام)', type: 'number', required: true }
                    ]
                }
            ]
        },
        {
            id: 'partnership',
            name: 'عقد شراكة',
            icon: `<path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" stroke-width="2"/>`,
            steps: [
                {
                    title: 'بيانات الشركاء',
                    fields: [
                        { name: 'partner1Name', label: 'اسم الشريك الأول', type: 'text', required: true },
                        { name: 'partner1Id', label: 'الرقم القومي للشريك الأول', type: 'text', required: true },
                        { name: 'partner2Name', label: 'اسم الشريك الثاني', type: 'text', required: true },
                        { name: 'partner2Id', label: 'الرقم القومي للشريك الثاني', type: 'text', required: true }
                    ]
                },
                {
                    title: 'بيانات المشروع',
                    fields: [
                        { name: 'businessName', label: 'اسم المشروع/الشركة', type: 'text', required: true },
                        { name: 'businessType', label: 'نوع النشاط', type: 'text', required: true },
                        { name: 'businessAddress', label: 'عنوان المشروع', type: 'textarea', required: true }
                    ]
                },
                {
                    title: 'رأس المال والحصص',
                    fields: [
                        { name: 'totalCapital', label: 'رأس المال الكلي (جنيه)', type: 'number', required: true },
                        { name: 'partner1Share', label: 'حصة الشريك الأول (%)', type: 'number', required: true },
                        { name: 'partner2Share', label: 'حصة الشريك الثاني (%)', type: 'number', required: true },
                        { name: 'profitDistribution', label: 'طريقة توزيع الأرباح', type: 'textarea', required: true }
                    ]
                }
            ]
        }
    ],

    // Legal Terms Dictionary (Mock Data)
    legalTerms: {
        'حق الانتفاع': 'حق الانتفاع هو حق عيني يخول صاحبه استعمال شيء مملوك للغير واستغلاله، مع بقاء ملكية الشيء لصاحبه الأصلي. مثال: استئجار شقة يعطيك حق الانتفاع بها دون امتلاكها.',
        'الحيازة': 'الحيازة هي السيطرة الفعلية على شيء معين بنية امتلاكه أو الانتفاع به. وهي تختلف عن الملكية القانونية، فقد تحوز شيئاً دون أن تملكه.',
        'التقادم': 'التقادم هو اكتساب حق أو سقوطه بمرور مدة زمنية معينة يحددها القانون. مثال: إذا حزت أرضاً لمدة 15 سنة دون اعتراض، قد تكتسب ملكيتها بالتقادم.',
        'الشفعة': 'الشفعة هي حق الشريك في شراء حصة شريكه عند بيعها لشخص أجنبي، بنفس الثمن والشروط. الهدف منها منع دخول شخص غريب في الشراكة.',
        'الرهن': 'الرهن هو حق عيني تبعي يتقرر على عقار أو منقول لضمان الوفاء بدين. إذا لم يسدد المدين، يحق للدائن بيع المرهون واستيفاء دينه من ثمنه.',
        'الوكالة': 'الوكالة هي عقد يفوض بموجبه شخص (الموكل) شخصاً آخر (الوكيل) للقيام بعمل قانوني نيابة عنه. مثال: توكيل محامٍ لتمثيلك في قضية.',
        'الكفالة': 'الكفالة هي عقد يلتزم بمقتضاه شخص (الكفيل) بأن يفي بالتزام المدين إذا لم يف به المدين نفسه. وهي ضمان شخصي للدين.',
        'الإيجار': 'الإيجار هو عقد يلتزم المؤجر بمقتضاه أن يمكن المستأجر من الانتفاع بشيء معين مدة معينة لقاء أجر معلوم.',
        'البيع': 'البيع هو عقد يلتزم به البائع أن ينقل للمشتري ملكية شيء أو حق مالي آخر في مقابل ثمن نقدي.',
        'الطلاق': 'الطلاق هو حل رابطة الزواج بإرادة الزوج أو بناءً على طلب الزوجة بحكم قضائي وفقاً للشروط القانونية.',
        'النفقة': 'النفقة هي ما يلزم الشخص أداؤه لإعالة غيره من طعام وكسوة ومسكن وعلاج وتعليم حسب العرف والقدرة المالية.',
        'الحضانة': 'الحضانة هي حفظ الولد وتربيته ورعايته بما لا يتعارض مع حق الولي في الولاية على النفس.',
        'الميراث': 'الميراث هو انتقال مال الميت إلى ورثته الشرعيين وفقاً لأحكام الشريعة الإسلامية والقانون المصري.',
        'الوصية': 'الوصية هي تصرف في التركة مضاف إلى ما بعد الموت، بحيث لا تنفذ إلا بعد وفاة الموصي في حدود ثلث التركة.',
        'التعويض': 'التعويض هو المبلغ المالي الذي يحكم به القاضي لجبر الضرر الذي لحق بالمضرور نتيجة فعل ضار.',
        'المسؤولية التقصيرية': 'المسؤولية التقصيرية هي الالتزام بتعويض الضرر الناشئ عن الإخلال بالتزام قانوني عام بعدم الإضرار بالغير.',
        'العقد': 'العقد هو توافق إرادتين أو أكثر على إنشاء التزام أو نقله أو تعديله أو إنهائه.',
        'البطلان': 'البطلان هو الجزاء الذي يرتبه القانون على عدم استيفاء العقد لأركانه أو شروط صحته.',
        'الفسخ': 'الفسخ هو حل الرابطة العقدية بأثر رجعي بسبب عدم تنفيذ أحد المتعاقدين لالتزاماته الجوهرية.',
        'الإنذار': 'الإنذار هو إعلان رسمي يوجهه الدائن إلى المدين لحثه على الوفاء بالتزامه خلال مدة معينة وإلا اتخذ ضده الإجراءات القانونية.'
    },

    // Mock AI Responses for Document Analysis
    mockSummaries: {
        rental: {
            title: 'ملخص عقد الإيجار',
            content: `
                <h3>الأطراف:</h3>
                <ul>
                    <li>المؤجر: أحمد محمد علي</li>
                    <li>المستأجر: محمود حسن إبراهيم</li>
                </ul>
                
                <h3>العقار:</h3>
                <ul>
                    <li>شقة سكنية بمساحة 120 متر مربع</li>
                    <li>العنوان: 15 شارع الجمهورية، المعادي، القاهرة</li>
                </ul>
                
                <h3>الشروط المالية:</h3>
                <ul>
                    <li>الإيجار الشهري: 3,500 جنيه</li>
                    <li>التأمين: 7,000 جنيه (شهرين)</li>
                    <li>الدفع: في اليوم الأول من كل شهر</li>
                </ul>
                
                <h3>المدة:</h3>
                <ul>
                    <li>سنة واحدة تبدأ من 1 ديسمبر 2025</li>
                    <li>قابلة للتجديد بالاتفاق</li>
                </ul>
                
                <h3>الالتزامات الرئيسية:</h3>
                <ul>
                    <li>المستأجر مسؤول عن فواتير الكهرباء والغاز</li>
                    <li>المؤجر مسؤول عن الصيانة الأساسية</li>
                    <li>يُمنع التأجير من الباطن</li>
                </ul>
            `
        },
        default: {
            title: 'ملخص المستند',
            content: `
                <p>تم تحليل المستند بنجاح. هذا المستند يحتوي على معلومات قانونية مهمة.</p>
                
                <h3>النقاط الرئيسية:</h3>
                <ul>
                    <li>المستند يتضمن اتفاقية بين طرفين أو أكثر</li>
                    <li>يحدد حقوق والتزامات كل طرف</li>
                    <li>يتضمن شروط مالية وزمنية محددة</li>
                </ul>
                
                <p>يمكنك الآن طرح أسئلة محددة عن المستند في نافذة الدردشة.</p>
            `
        }
    },

    // Mock Chat Responses
    mockChatResponses: [
        'بناءً على المستند، البند الخامس ينص على أن الإنهاء المبكر ممكن بإشعار مسبق لمدة شهرين.',
        'المسؤولية عن الإصلاحات تقع على عاتق المؤجر للأضرار الهيكلية، وعلى المستأجر للأضرار الناتجة عن الاستخدام.',
        'وفقاً للعقد، يتم دفع الإيجار في اليوم الأول من كل شهر، والتأخير يترتب عليه غرامة 2% من قيمة الإيجار.',
        'نعم، العقد يسمح بالتجديد التلقائي لمدة مماثلة ما لم يُخطر أحد الطرفين الآخر قبل انتهاء المدة بشهر.',
        'التأمين المدفوع يُسترد كاملاً عند انتهاء العقد، بشرط عدم وجود أضرار أو مستحقات متأخرة.'
    ]
};

// Export for use in app.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = appData;
}
