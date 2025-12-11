import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const siteTreeData = [
  {
    id: 1,
    title: 'Home Dashboard',
    icon: '🏠',
    color: '#F45F37',
    children: [
      {
        title: 'Real-time Queue Status',
        children: [
          { title: 'Estimated Wait Time' },
          { title: 'Position in Queue' },
          { title: 'Peak Hours Indicator', badge: 'smart' },
        ],
      },
      {
        title: "Today's Stations (5)",
        children: [
          { title: 'Station 1' },
          { title: 'Station 2' },
          { title: 'Station 3' },
          { title: 'Station 4' },
          { title: 'Station 5' },
        ],
      },
      {
        title: 'Quick Actions',
        children: [
          { title: 'See Routine of the Day' },
          { title: 'Check Benchmarks' },
          { title: 'Log Activity', badge: 'manual' },
        ],
      },
      { title: 'Notifications Center' },
    ],
  },
  {
    id: 2,
    title: 'Plan & Routines',
    icon: '📋',
    color: '#10B981',
    children: [
      {
        title: 'Current Plan Overview',
        children: [
          { title: 'Goal', badge: 'customizable' },
          { title: 'Plan Duration' },
          { title: 'Expected Progress' },
        ],
      },
      {
        title: 'Personalized Routine',
        children: [
          { title: 'Daily Routine' },
          { title: 'Weekly Structure' },
          { title: 'Next Milestones' },
        ],
      },
      {
        title: 'Personalized Cooldowns',
        children: [
          { title: 'After-Session Cooldown' },
          { title: 'Mobility / Stretching Suggestions' },
        ],
      },
      {
        title: 'Nutrition',
        badge: 'upsell',
        children: [
          { title: 'Daily Meal Plan' },
          { title: 'Grocery List' },
          { title: 'Supplements Recommendation' },
        ],
      },
      {
        title: 'Additional Upsells',
        children: [
          { title: 'Premium Plan Upgrade', badge: 'premium' },
          { title: '1:1 Personalized Coaching', badge: 'premium' },
          { title: 'Specialized Programs', badge: 'premium' },
        ],
      },
    ],
  },
  {
    id: 3,
    title: 'Activity & History',
    icon: '📊',
    color: '#6366F1',
    children: [
      { title: 'Daily Activity Log' },
      { title: 'Past Sessions' },
      { title: 'Consistency & Streaks' },
      {
        title: 'Smart Recommendations',
        badge: 'AI',
        children: [
          { title: '"You missed station X yesterday"' },
          { title: '"Tomorrow peak hours are at…"' },
          { title: '"Suggested arrival time reduces wait by 20%"' },
        ],
      },
    ],
  },
  {
    id: 4,
    title: 'Benchmarks',
    icon: '🏆',
    color: '#F59E0B',
    children: [
      {
        title: 'Personal Records (PRs)',
        children: [
          { title: 'Strength Benchmarks' },
          { title: 'Cardio Benchmarks' },
          { title: 'Mobility Benchmarks' },
        ],
      },
      { title: 'Benchmark Progress Graphs' },
      { title: 'Comparison vs Past Weeks' },
      { title: '"Next Benchmark Goal"' },
    ],
  },
  {
    id: 5,
    title: 'Social / Community',
    icon: '👥',
    color: '#EC4899',
    badge: 'optional',
    children: [
      { title: 'Friends at the Gym', badge: 'live' },
      { title: 'Leaderboards' },
      {
        title: 'Challenges',
        children: [
          { title: 'Weekly Challenge' },
          { title: 'Monthly Challenge' },
        ],
      },
      { title: 'Community Feed' },
    ],
  },
  {
    id: 6,
    title: 'Profile',
    icon: '👤',
    color: '#8B5CF6',
    children: [
      {
        title: 'Membership Status',
        children: [
          { title: 'Renewal Date' },
          { title: 'Attendance Stats' },
          { title: 'Plan Type' },
        ],
      },
      { title: 'Personal Info' },
      {
        title: 'Preferences',
        children: [
          { title: 'Notifications' },
          { title: 'Units / Language' },
          { title: 'Training Goals' },
        ],
      },
      { title: 'Billing & Payments' },
    ],
  },
  {
    id: 7,
    title: 'Settings & Support',
    icon: '⚙️',
    color: '#64748B',
    children: [
      { title: 'Help Center' },
      { title: 'FAQ' },
      { title: 'Contact Support' },
      { title: 'Legal & Privacy' },
    ],
  },
];

const Badge = ({ type }) => {
  const badgeStyles = {
    smart: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    manual: 'bg-slate-500/20 text-slate-400 border-slate-500/30',
    customizable: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    upsell: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
    premium: 'bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-300 border-amber-500/30',
    AI: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
    optional: 'bg-slate-500/20 text-slate-400 border-slate-500/30',
    live: 'bg-red-500/20 text-red-400 border-red-500/30',
  };

  return (
    <span
      className={`ml-2 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider rounded-full border ${badgeStyles[type] || badgeStyles.smart}`}
    >
      {type}
    </span>
  );
};

const TreeNode = ({ node, depth = 0, isLast = false, parentColor = '#F45F37' }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const hasChildren = node.children && node.children.length > 0;
  const nodeColor = node.color || parentColor;

  return (
    <div className="relative tree-node">
      {/* Vertical line from parent */}
      {depth > 0 && (
        <div
          className="absolute left-0 top-0 w-px bg-gradient-to-b from-white/20 to-transparent"
          style={{
            height: isLast ? '16px' : '100%',
            transform: 'translateX(-16px)',
          }}
        />
      )}

      {/* Horizontal connector line */}
      {depth > 0 && (
        <div
          className="absolute left-0 top-4 h-px bg-white/20"
          style={{
            width: '16px',
            transform: 'translateX(-16px)',
          }}
        />
      )}

      {/* Node content */}
      <div
        className={`group relative flex items-center gap-3 py-2 px-3 rounded-lg transition-all duration-300 cursor-pointer
          ${depth === 0 ? 'bg-white/5 hover:bg-white/10 border border-white/10' : 'hover:bg-white/5'}
        `}
        onClick={() => hasChildren && setIsExpanded(!isExpanded)}
        style={{
          marginLeft: depth > 0 ? '0' : '0',
        }}
      >
        {/* Expand/collapse indicator */}
        {hasChildren && (
          <div
            className={`w-5 h-5 flex items-center justify-center rounded-md text-xs transition-all duration-300
              ${isExpanded ? 'bg-white/10 rotate-90' : 'bg-white/5'}
            `}
            style={{ color: nodeColor }}
          >
            ›
          </div>
        )}

        {/* Icon for main sections */}
        {depth === 0 && node.icon && (
          <div
            className="w-10 h-10 flex items-center justify-center rounded-xl text-xl"
            style={{ backgroundColor: `${nodeColor}20` }}
          >
            {node.icon}
          </div>
        )}

        {/* Node dot for sub-items */}
        {depth > 0 && !hasChildren && (
          <div
            className="w-2 h-2 rounded-full flex-shrink-0"
            style={{ backgroundColor: nodeColor, opacity: 0.6 }}
          />
        )}

        {/* Title */}
        <span
          className={`transition-colors duration-300 ${
            depth === 0
              ? 'text-white font-semibold text-lg'
              : depth === 1
              ? 'text-white/90 font-medium'
              : 'text-white/70 text-sm'
          } group-hover:text-white`}
        >
          {node.title}
        </span>

        {/* Badge */}
        {node.badge && <Badge type={node.badge} />}

        {/* Hover glow effect */}
        <div
          className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse at left, ${nodeColor}10 0%, transparent 70%)`,
          }}
        />
      </div>

      {/* Children */}
      {hasChildren && isExpanded && (
        <div className="ml-8 pl-4 border-l border-white/10 mt-1 space-y-1">
          {node.children.map((child, index) => (
            <TreeNode
              key={index}
              node={child}
              depth={depth + 1}
              isLast={index === node.children.length - 1}
              parentColor={nodeColor}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const SiteTreeSection = () => {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const treeRef = useRef(null);
  const cardsRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Header animation
      gsap.from(headerRef.current, {
        opacity: 0,
        y: 40,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: headerRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      });

      // Tree items staggered animation
      const treeNodes = treeRef.current?.querySelectorAll('.tree-node');
      if (treeNodes) {
        gsap.from(treeNodes, {
          opacity: 0,
          x: -30,
          duration: 0.6,
          stagger: 0.03,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: treeRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        });
      }

      // Stats cards animation
      const cards = cardsRef.current?.querySelectorAll('.stat-card');
      if (cards) {
        gsap.from(cards, {
          opacity: 0,
          y: 30,
          scale: 0.95,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const stats = [
    { value: '7', label: 'Main Sections', color: '#F45F37' },
    { value: '25+', label: 'Features', color: '#10B981' },
    { value: '50+', label: 'Sub-features', color: '#6366F1' },
    { value: '∞', label: 'Possibilities', color: '#EC4899' },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen py-20 overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #0a0a0a 0%, #111111 50%, #0a0a0a 100%)',
      }}
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Glow effects */}
      <div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-[120px] opacity-20"
        style={{ background: '#F45F37' }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-[120px] opacity-10"
        style={{ background: '#6366F1' }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
            <div className="w-2 h-2 rounded-full bg-[#F45F37] animate-pulse" />
            <span className="text-white/60 text-sm font-medium tracking-wide uppercase">
              App Architecture
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 font-firs">
            TecnoFit{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F45F37] to-[#F59E0B]">
              Site Tree
            </span>
          </h2>

          <p className="text-white/50 text-lg max-w-2xl mx-auto">
            A comprehensive overview of the TecnoFit application structure and features
          </p>
        </div>

        {/* Stats Cards */}
        <div ref={cardsRef} className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="stat-card relative p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm group hover:bg-white/10 transition-all duration-300"
            >
              <div
                className="text-4xl font-bold mb-2 font-firs"
                style={{ color: stat.color }}
              >
                {stat.value}
              </div>
              <div className="text-white/50 text-sm">{stat.label}</div>
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{
                  background: `radial-gradient(ellipse at center, ${stat.color}10 0%, transparent 70%)`,
                }}
              />
            </div>
          ))}
        </div>

        {/* Tree Container */}
        <div className="relative">
          {/* Tree header */}
          <div className="flex items-center gap-3 mb-8 pb-4 border-b border-white/10">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>
            <span className="text-white/40 font-mono text-sm ml-4">tecnofit-app/</span>
          </div>

          {/* Tree */}
          <div
            ref={treeRef}
            className="space-y-4 font-space"
          >
            {siteTreeData.map((section, index) => (
              <TreeNode key={section.id} node={section} />
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="mt-16 p-6 rounded-2xl bg-white/5 border border-white/10">
          <h4 className="text-white/80 font-semibold mb-4">Legend</h4>
          <div className="flex flex-wrap gap-4">
            {[
              { type: 'smart', label: 'Smart Feature' },
              { type: 'AI', label: 'AI Powered' },
              { type: 'premium', label: 'Premium' },
              { type: 'upsell', label: 'Upsell Opportunity' },
              { type: 'live', label: 'Real-time' },
              { type: 'optional', label: 'Optional Module' },
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <Badge type={item.type} />
                <span className="text-white/50 text-sm">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SiteTreeSection;


