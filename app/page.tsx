import Link from "next/link";

export default function ResuMateLanding() {
  const features = [
    {
      icon: '🤖',
      title: 'AI Resume Writer',
      desc: 'Speak your experience and watch AI craft professional bullet points, summaries, and skills sections tailored to your target role.',
    },
    {
      icon: '🎯',
      title: 'Job Description Tailoring',
      desc: 'Paste any job posting and our AI instantly rewrites your resume with the exact keywords and skills recruiters are hunting for.',
    },
    {
      icon: '📊',
      title: 'Live ATS Score',
      desc: "Get real-time feedback on your resume's ATS compatibility. See your score improve as you edit — no more guessing.",
    },
    {
      icon: '✍️',
      title: 'Smart Bullet Rewriter',
      desc: 'Stuck on a bullet point? Get 3 sharper alternatives — simplify, elevate, or highlight quantifiable impact instantly.',
    },
    {
      icon: '📝',
      title: 'Cover Letter Generator',
      desc: 'Generate personalized cover letters matched to any job description in seconds. Never write from scratch again.',
    },
    {
      icon: '🌍',
      title: '40+ Languages',
      desc: 'Build resumes in any language with RTL support. Translate your entire resume with one click while keeping perfect formatting.',
    },
  ];

  const steps = [
    {
      number: '1',
      title: 'Tell Us Your Story',
      desc: 'Upload your old resume, paste your LinkedIn, or simply chat with our AI about your work experience and career goals.',
    },
    {
      number: '2',
      title: 'AI Builds & Optimizes',
      desc: 'Our AI structures your content, suggests powerful language, quantifies achievements, and ensures ATS compatibility.',
    },
    {
      number: '3',
      title: 'Download & Apply',
      desc: 'Export as PDF or DOCX. Use the job tailor to match any posting. Track applications and ace the interview.',
    },
  ];

  const templates = [
    {
      name: 'Modern Professional',
      meta: 'Clean lines, strong hierarchy',
      tag: 'Most Popular',
      layout: 'modern',
    },
    {
      name: 'Harvard Standard',
      meta: 'Education-first, conservative',
      tag: 'Ivy League Trusted',
      layout: 'harvard',
    },
    {
      name: 'Tech Specialist',
      meta: 'Skills-forward, developer focus',
      tag: 'Engineer Favorite',
      layout: 'tech',
    },
  ];

  const testimonials = [
    {
      stars: 5,
      text: '"I went from zero callbacks to three interviews in one week. The job tailoring feature matched my resume perfectly to each posting. Game changer!"',
      initials: 'SM',
      name: 'Sarah Mitchell',
      role: 'Product Manager @ Spotify',
    },
    {
      stars: 5,
      text: '"The ATS score feature alone is worth it. I discovered my old resume was missing critical keywords. After optimizing, I finally started hearing back."',
      initials: 'JC',
      name: 'James Chen',
      role: 'Software Engineer @ Stripe',
    },
    {
      stars: 5,
      text: '"As a career changer, I struggled to frame my experience. ResuMate\'s AI rewrote my bullets to highlight transferable skills. Landed my dream role!"',
      initials: 'AR',
      name: 'Aisha Rodriguez',
      role: 'UX Designer @ Airbnb',
    },
  ];

  const navLinks = [
    { label: 'Features', href: '#features' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Templates', href: '#templates' },
  ];

  const stats = [
    { number: '4.3', suffix: 'M+', label: 'Resumes Created' },
    { number: '94', suffix: '%', label: 'ATS Pass Rate' },
    { number: '200', suffix: '+', label: 'Pro Templates' },
    { number: '3', suffix: 'x', label: 'More Interviews' },
  ];

  const footerLinks = {
    Product: ['AI Resume Builder', 'ATS Checker', 'Cover Letters', 'Templates'],
    Resources: ['Resume Examples', 'Career Blog', 'Interview Prep', 'Job Search Guide', 'Help Center'],
    Company: ['About Us', 'Careers', 'Privacy', 'Terms', 'Contact'],
  };

  // Inline keyframes for animations not available in Tailwind
  const keyframes = `
    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.4; }
    }
    @keyframes float {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-8px); }
    }
    @keyframes barFill {
      from { width: 0; }
    }
    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(30px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `;

  return (
    <div className="min-h-screen font-sans text-slate-800 overflow-x-hidden" style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif" }}>
      <style>{keyframes}</style>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300" style={{ background: 'rgba(10, 22, 40, 0.95)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-[72px]">
          <a href="#" className="flex items-center gap-2.5 no-underline">
            <div className="w-9 h-9 rounded-[10px] flex items-center justify-center text-white font-extrabold text-lg" style={{ background: 'linear-gradient(135deg, #14b8a6, #2dd4bf)' }}>R</div>
            <div className="text-[22px] font-extrabold text-white tracking-[-0.5px]">
              Resu<span className="text-teal-400">Mate</span>
            </div>
          </a>
          <ul className="hidden md:flex items-center gap-9 list-none">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a href={link.href} className="text-slate-300 text-sm font-medium no-underline hover:text-white transition-colors duration-200">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <button className="md:hidden bg-none border-none text-white text-2xl cursor-pointer">☰</button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center pt-[120px] pb-20 px-6 relative overflow-hidden" style={{ background: 'linear-gradient(160deg, #0a1628 0%, #0f1d33 40%, #162544 100%)' }}>
        <div className="absolute top-[-50%] right-[-20%] w-[800px] h-[800px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(20, 184, 166, 0.08) 0%, transparent 70%)' }}></div>
        <div className="absolute bottom-[-30%] left-[-10%] w-[600px] h-[600px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(45, 212, 191, 0.05) 0%, transparent 70%)' }}></div>
        
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-[60px] items-center relative z-10">
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-[18px] py-2 rounded-full text-[13px] font-semibold mb-7 mx-auto lg:mx-0" style={{ background: 'rgba(20, 184, 166, 0.12)', border: '1px solid rgba(20, 184, 166, 0.25)', color: '#5eead4', animation: 'fadeInUp 0.6s ease' }}>
              <span className="w-2 h-2 rounded-full bg-teal-400" style={{ animation: 'pulse 2s infinite' }}></span>
              AI-Powered Resume Builder
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-[64px] font-extrabold text-white leading-[1.1] tracking-[-1.5px] mb-6" style={{ animation: 'fadeInUp 0.6s ease 0.1s both' }}>
              Build Resumes That<br />
              <span className="bg-gradient-to-r from-teal-400 to-teal-300 bg-clip-text text-transparent">Get You Hired.</span>
            </h1>
            <p className="text-lg text-slate-400 leading-relaxed max-w-[520px] mb-9 mx-auto lg:mx-0" style={{ animation: 'fadeInUp 0.6s ease 0.2s both' }}>
              AI writes, optimizes, and scores your resume in real-time. 
              ATS-friendly templates, keyword targeting, and job tailoring — 
              everything you need to land interviews faster.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-12 justify-center lg:justify-start" style={{ animation: 'fadeInUp 0.6s ease 0.3s both' }}>
              <Link href="/builder/templates" className="inline-flex items-center justify-center gap-2 px-9 py-4 rounded-xl text-base font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 no-underline" style={{ background: 'linear-gradient(135deg, #14b8a6, #0d9488)', boxShadow: '0 4px 20px rgba(20, 184, 166, 0.3)' }}>
                Build Your Resume Free →
              </Link>
              <a href="#how-it-works" className="inline-flex items-center justify-center gap-2 px-9 py-4 rounded-xl text-base font-semibold text-white border border-white/20 hover:border-teal-400 hover:text-[] transition-all duration-300 no-underline">
                See How It Works
              </a>
            </div>
            <div className="flex items-center gap-4 justify-center lg:justify-start" style={{ animation: 'fadeInUp 0.6s ease 0.4s both' }}>
              <div className="flex">
                {['https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face', 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'].map((src, i) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img key={i} src={src} alt="User" className="w-10 h-10 rounded-full border-[3px] border-[#0f1d33] -ml-3 first:ml-0 object-cover" />
                ))}
              </div>
              <div>
                <div className="text-amber-400 text-sm mb-1">★★★★★</div>
                <div className="text-slate-400 text-sm">
                  <strong className="text-white font-semibold">4.9/5</strong> from <strong className="text-white font-semibold">12,000+</strong> job seekers
                </div>
              </div>
            </div>
          </div>
          
          <div className="hidden lg:block relative" style={{ animation: 'fadeInUp 0.8s ease 0.3s both' }}>
            <div className="bg-white rounded-2xl p-8 max-w-[480px] ml-auto transition-transform duration-400 hover:rotate-0 hover:scale-[1.02]" style={{ boxShadow: '0 40px 80px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.1)', transform: 'rotate(2deg)' }}>
              <div className="absolute -top-4 -right-4 px-5 py-2.5 rounded-full text-[13px] font-bold text-white" style={{ background: 'linear-gradient(135deg, #14b8a6, #0d9488)', boxShadow: '0 8px 24px rgba(20, 184, 166, 0.4)', animation: 'float 3s ease-in-out infinite' }}>
                AI Optimized ✨
              </div>
              <div className="flex items-center gap-4 mb-5 pb-4 border-b-2 border-slate-100">
                <div className="w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-xl" style={{ background: 'linear-gradient(135deg, #14b8a6, #2dd4bf)' }}>JD</div>
                <div>
                  <div className="text-xl font-bold text-[#0a1628]">Jane Doe</div>
                  <div className="text-[13px] text-slate-500">Senior Product Manager</div>
                </div>
              </div>
              {[
                { label: 'ATS Score', width: 'w-[90%]', delay: '1s' },
                { label: 'Keyword Match', width: 'w-[75%]', delay: '1.3s' },
                { label: 'Impact Score', width: 'w-[60%]', delay: '1.6s' },
              ].map((item) => (
                <div key={item.label} className="mb-4">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-teal-600 mb-2">{item.label}</div>
                  <div className="h-2.5 bg-slate-100 rounded-md overflow-hidden">
                    <div className="h-full rounded-md" style={{ width: '0', background: 'linear-gradient(90deg, #14b8a6, #2dd4bf)', animation: `barFill 2s ease ${item.delay} forwards` }}></div>
                  </div>
                </div>
              ))}
            </div>
            <div className="absolute bottom-[60px] -left-10 bg-white rounded-xl px-5 py-3.5 flex items-center gap-3" style={{ boxShadow: '0 12px 40px rgba(0,0,0,0.15)', animation: 'float 4s ease-in-out infinite 0.5s' }}>
              <div className="w-9 h-9 rounded-lg flex items-center justify-center text-teal-500 text-base" style={{ background: 'rgba(20, 184, 166, 0.1)' }}>🎯</div>
              <div>
                <div className="text-[13px] font-semibold text-[#0a1628]">98% Keyword Match</div>
                <div className="text-[11px] text-slate-500">Tailored for Job ID #4821</div>
              </div>
            </div>
            <div className="absolute top-10 -right-8 bg-white rounded-xl px-5 py-3.5 flex items-center gap-3" style={{ boxShadow: '0 12px 40px rgba(0,0,0,0.15)', animation: 'float 4s ease-in-out infinite 1s' }}>
              <div className="w-9 h-9 rounded-lg flex items-center justify-center text-teal-500 text-base" style={{ background: 'rgba(20, 184, 166, 0.1)' }}>⚡</div>
              <div>
                <div className="text-[13px] font-semibold text-[#0a1628]">AI Rewrote Summary</div>
                <div className="text-[11px] text-slate-500">+3 stronger action verbs</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <div className="py-10 px-6" style={{ background: '#0f1d33', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-4xl font-extrabold text-white tracking-[-1px]">
                {stat.number}<span className="text-[]">{stat.suffix}</span>
              </div>
              <div className="text-sm text-slate-400 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <section id="features" className="py-24 px-6" style={{ background: '#fafaf9' }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-[640px] mx-auto mb-16">
            <div className="inline-block px-4 py-1.5 rounded-full text-[13px] font-semibold mb-4" style={{ background: 'rgba(20, 184, 166, 0.1)', color: '#0d9488' }}>Powerful Features</div>
            <h2 className="text-3xl md:text-4xl lg:text-[44px] font-extrabold text-[#0a1628] tracking-[-1px] leading-tight mb-4">Everything You Need to Win the Job</h2>
            <p className="text-lg text-slate-500 leading-relaxed">
              From AI writing to ATS optimization, ResuMate packs every tool 
              job seekers need into one intelligent platform.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <div key={i} className="bg-white rounded-2xl p-9 border border-slate-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)] hover:border-transparent relative overflow-hidden group">
                <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-teal-500 to-teal-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                <div className="w-[52px] h-[52px] rounded-[14px] flex items-center justify-center text-2xl mb-5 text-teal-600" style={{ background: 'linear-gradient(135deg, rgba(20, 184, 166, 0.1), rgba(45, 212, 191, 0.05))' }}>{feature.icon}</div>
                <h3 className="text-lg font-bold text-[#0a1628] mb-2.5">{feature.title}</h3>
                <p className="text-[15px] text-slate-500 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-[640px] mx-auto mb-12">
            <div className="inline-block px-4 py-1.5 rounded-full text-[13px] font-semibold mb-4" style={{ background: 'rgba(20, 184, 166, 0.1)', color: '#0d9488' }}>Simple Process</div>
            <h2 className="text-3xl md:text-4xl lg:text-[44px] font-extrabold text-[#0a1628] tracking-[-1px] leading-tight mb-4">Build Your Resume in 3 Steps</h2>
            <p className="text-lg text-slate-500 leading-relaxed">
              No complex forms. No design headaches. Just answer a few questions 
              and let AI handle the rest.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {steps.map((step, i) => (
              <div key={i} className="relative p-10 rounded-[20px] text-center" style={{ background: '#fafaf9' }}>
                <div className="w-14 h-14 rounded-full flex items-center justify-center text-white text-[22px] font-extrabold mx-auto mb-6 relative" style={{ background: 'linear-gradient(135deg, #14b8a6, #2dd4bf)' }}>
                  {step.number}
                  {i < steps.length - 1 && (
                    <div className="hidden md:block absolute top-1/2 left-full w-[calc(100%+32px)] h-0.5 -translate-y-1/2" style={{ background: 'linear-gradient(90deg, #2dd4bf, transparent)' }}></div>
                  )}
                </div>
                <h3 className="text-xl font-bold text-[#0a1628] mb-3">{step.title}</h3>
                <p className="text-[15px] text-slate-500 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Templates */}
      <section id="templates" className="py-24 px-6 relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #0a1628 0%, #0f1d33 100%)' }}>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center max-w-[640px] mx-auto mb-12">
            <div className="inline-block px-4 py-1.5 rounded-full text-[13px] font-semibold mb-4" style={{ background: 'rgba(20, 184, 166, 0.15)', color: '#5eead4' }}>Recruiter-Tested Designs</div>
            <h2 className="text-3xl md:text-4xl lg:text-[44px] font-extrabold text-white tracking-[-1px] leading-tight mb-4">200+ ATS-Friendly Templates</h2>
            <p className="text-lg text-slate-400 leading-relaxed">
              Modern, classic, creative, and executive designs — all tested against 
              real ATS parsers like Workday, Greenhouse, and Lever.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {templates.map((template, i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden transition-all duration-400 hover:-translate-y-2 hover:scale-[1.02]" style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.2)' }}>
                <div className="h-[280px] bg-slate-100 relative overflow-hidden">
                  <div className="p-5 scale-[0.85] origin-top-left h-full overflow-hidden">
                    <div className="bg-white rounded-lg p-4 shadow-sm h-full">
                      {template.layout === 'modern' && (
                        <>
                          <div className="flex gap-2.5 mb-3 pb-2 border-b border-slate-200">
                            <div className="w-8 h-8 rounded-full bg-teal-500 flex-shrink-0"></div>
                            <div className="flex-1">
                              <div className="h-1.5 bg-slate-200 rounded w-[60%] mb-1"></div>
                              <div className="h-1.5 bg-slate-200 rounded w-[40%]"></div>
                            </div>
                          </div>
                          <div className="space-y-1">
                            <div className="h-1.5 bg-slate-200 rounded w-full"></div>
                            <div className="h-1.5 bg-slate-200 rounded w-[80%]"></div>
                            <div className="h-1.5 bg-slate-200 rounded w-full"></div>
                            <div className="h-1.5 bg-slate-200 rounded w-[40%]"></div>
                          </div>
                          <div className="mt-3 flex gap-2">
                            <div className="w-[60px] h-1.5 bg-teal-500 rounded"></div>
                            <div className="w-[40px] h-1.5 bg-slate-200 rounded"></div>
                          </div>
                        </>
                      )}
                      {template.layout === 'harvard' && (
                        <>
                          <div className="text-center pb-3 border-b border-slate-200">
                            <div className="w-8 h-8 rounded-full bg-teal-500 mx-auto mb-2"></div>
                            <div className="h-1.5 bg-slate-200 rounded w-[60%] mx-auto mb-1"></div>
                            <div className="h-1.5 bg-slate-200 rounded w-[40%] mx-auto"></div>
                          </div>
                          <div className="mt-3 space-y-1">
                            <div className="h-1.5 bg-slate-200 rounded w-full"></div>
                            <div className="h-1.5 bg-slate-200 rounded w-[80%]"></div>
                            <div className="h-1.5 bg-slate-200 rounded w-full"></div>
                          </div>
                        </>
                      )}
                      {template.layout === 'tech' && (
                        <div className="flex gap-3">
                          <div className="w-20 flex-shrink-0">
                            <div className="w-full h-10 rounded bg-teal-500 mb-2"></div>
                            <div className="h-1 bg-teal-500 rounded mb-1"></div>
                            <div className="h-1 bg-teal-500 rounded"></div>
                          </div>
                          <div className="flex-1 space-y-1">
                            <div className="h-1.5 bg-slate-200 rounded w-[60%]"></div>
                            <div className="h-1.5 bg-slate-200 rounded w-[40%]"></div>
                            <div className="h-1.5 bg-slate-200 rounded w-full"></div>
                            <div className="h-1.5 bg-slate-200 rounded w-full"></div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="p-5">
                  <div className="text-base font-bold text-[#0a1628] mb-1">{template.name}</div>
                  <div className="text-[13px] text-slate-500">{template.meta}</div>
                  <span className="inline-block mt-2 px-2.5 py-1 rounded-md text-[11px] font-semibold" style={{ background: 'rgba(20, 184, 166, 0.1)', color: '#0d9488' }}>{template.tag}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-6" style={{ background: '#fafaf9' }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-[640px] mx-auto mb-12">
            <div className="inline-block px-4 py-1.5 rounded-full text-[13px] font-semibold mb-4" style={{ background: 'rgba(20, 184, 166, 0.1)', color: '#0d9488' }}>Success Stories</div>
            <h2 className="text-3xl md:text-4xl lg:text-[44px] font-extrabold text-[#0a1628] tracking-[-1px] leading-tight mb-4">Loved by Job Seekers Worldwide</h2>
            <p className="text-lg text-slate-500 leading-relaxed">
              Join thousands who transformed their job search with AI-powered resumes.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-white rounded-2xl p-8 border border-slate-200 transition-all duration-300 hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)] hover:-translate-y-1">
                <div className="text-amber-400 text-base mb-4">{'★'.repeat(t.stars)}</div>
                <p className="text-[15px] text-slate-600 leading-relaxed mb-5 italic">{t.text}</p>
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full flex items-center justify-center text-white font-bold text-base flex-shrink-0" style={{ background: 'linear-gradient(135deg, #14b8a6, #2dd4bf)' }}>{t.initials}</div>
                  <div>
                    <div className="text-sm font-bold text-[#0a1628]">{t.name}</div>
                    <div className="text-[13px] text-slate-500">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 text-center relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #0a1628 0%, #162544 100%)' }}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(20, 184, 166, 0.1) 0%, transparent 70%)' }}></div>
        <div className="max-w-[640px] mx-auto relative z-10">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white tracking-[-1px] mb-4">Ready to Land Your Dream Job?</h2>
          <p className="text-lg text-slate-400 mb-9">Join 4.3 million job seekers who built interview-winning resumes with ResuMate AI.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/builder/templates" className="inline-flex items-center justify-center gap-2 px-9 py-4 rounded-xl text-base font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 no-underline" style={{ background: 'linear-gradient(135deg, #14b8a6, #0d9488)', boxShadow: '0 4px 20px rgba(20, 184, 166, 0.3)' }}>
              Build Your Resume Free →
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-6 pt-[60px]" style={{ background: '#0a1628', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="lg:col-span-1 max-w-[300px]">
            <div className="text-[22px] font-extrabold text-white tracking-[-0.5px] mb-4">
              Resu<span className="text-[]">Mate</span>
            </div>
            <p className="text-sm text-slate-500 leading-relaxed">
              The AI resume builder that helps job seekers create ATS-optimized, recruiter-approved resumes in minutes. Trusted by millions worldwide.
            </p>
          </div>
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-white text-sm font-bold mb-5 uppercase tracking-wide">{title}</h4>
              <ul className="space-y-2.5 list-none">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-slate-500 no-underline hover:text-[] transition-colors duration-200">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="max-w-7xl mx-auto mt-10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          <p className="text-[13px] text-slate-600">© 2026 ResuMate AI. All rights reserved.</p>
          <div className="flex gap-4">
            {['𝕏', 'in', 'f', 'ig'].map((social) => (
              <a key={social} href="#" className="w-9 h-9 rounded-lg flex items-center justify-center text-slate-400 no-underline transition-all duration-200 hover:text-[]" style={{ background: 'rgba(255,255,255,0.05)' }}>
                {social}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}