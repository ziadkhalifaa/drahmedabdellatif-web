'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Layout, Edit3, ArrowRight, MousePointer2 } from 'lucide-react';
import { Button } from '@/components/ui';
import { Link } from '@/i18n/routing';

const pages = [
  { id: 'home', name: 'Home Page', path: '/', icon: Layout },
  { id: 'about', name: 'About Us', path: '/about', icon: MousePointer2 },
  { id: 'services', name: 'Services', path: '/services', icon: Layout },
  { id: 'blog', name: 'Blog', path: '/blog', icon: Layout },
  { id: 'contact', name: 'Contact Us', path: '/contact', icon: Layout },
];

export default function LiveEditorManagement() {
  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="mb-12">
        <h1 className="text-4xl font-extrabold text-[#072a44] mb-4">Live Website Editor</h1>
        <p className="text-gray-500 text-lg">Choose a page and language to start editing your website live.</p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {pages.map((page, idx) => (
          <motion.div
            key={page.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-all group"
          >
            <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mb-6 group-hover:scale-110 transition-transform">
              <page.icon size={28} />
            </div>
            
            <h3 className="text-xl font-bold text-gray-900 mb-6">{page.name}</h3>
            
            <div className="space-y-3">
              <Link href={`${page.path}?edit=true`} locale="ar">
                <Button className="w-full justify-between h-12 rounded-xl bg-[#072a44] hover:bg-[#0a2e4a] text-white">
                  <span className="flex items-center gap-2 font-bold">
                    <Globe size={18} className="text-blue-400" />
                    Edit in Arabic (العربية)
                  </span>
                  <ArrowRight size={16} />
                </Button>
              </Link>

              <Link href={`${page.path}?edit=true`} locale="en">
                <Button variant="outline" className="w-full justify-between h-12 rounded-xl border-gray-200 hover:border-blue-500 hover:text-blue-600">
                  <span className="flex items-center gap-2 font-bold">
                    <Globe size={18} />
                    Edit in English
                  </span>
                  <ArrowRight size={16} />
                </Button>
              </Link>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-16 p-8 bg-blue-600 rounded-[2.5rem] text-white overflow-hidden relative">
        <div className="relative z-10">
          <h2 className="text-2xl font-bold mb-2">How it works?</h2>
          <p className="text-blue-100 opacity-90 max-w-xl">
            After choosing a page, you will be redirected to the live site. 
            Click on any text or image to change it, and use the toolbar at the bottom to publish your changes.
          </p>
        </div>
        <div className="absolute top-1/2 -right-20 -translate-y-1/2 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
      </div>
    </div>
  );
}
