'use client';

import React, { useEffect, useState } from 'react';
import { Upload, Search, Trash2, Copy, Image as ImageIcon, Check } from 'lucide-react';
import { useAuthStore } from '@/lib/store/authStore';
import toast from 'react-hot-toast';

export default function MediaPage() {
  const { token } = useAuthStore();
  const [mediaList, setMediaList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [search, setSearch] = useState('');
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    fetchMedia();
  }, [token]);

  const fetchMedia = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/media', {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      if (res.ok) {
        const data = await res.json();
        setMediaList(data.data || []);
      }
    } catch (err) {
      console.error('[FETCH_MEDIA_ERROR]', err);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i]);
    }

    try {
      const res = await fetch('/api/media', {
        method: 'POST',
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        setMediaList((prev) => [...(data.data || []), ...prev]);
        toast.success(`Successfully uploaded ${files.length} file(s)!`);
      } else {
        toast.error('Failed to upload file');
      }
    } catch (err) {
      console.error('[UPLOAD_MEDIA_ERROR]', err);
      toast.error('Error during upload');
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this media file?')) return;
    try {
      const res = await fetch(`/api/media?id=${id}`, {
        method: 'DELETE',
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      if (res.ok) {
        setMediaList((prev) => prev.filter((m) => m.id !== id));
        toast.success('Media file deleted');
      }
    } catch (err) {
      console.error('[DELETE_MEDIA_ERROR]', err);
      toast.error('Failed to delete media');
    }
  };

  const handleCopyUrl = (id: string, url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    toast.success('Image URL copied to clipboard!');
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filtered = mediaList.filter((m) => m.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <ImageIcon className="w-6 h-6 text-violet-600" />
            <span>Media Library</span>
          </h1>
          <p className="text-slate-500 text-xs mt-1">Upload and manage image assets</p>
        </div>

        <label className="flex items-center gap-2 px-5 py-2.5 bg-violet-600 hover:bg-violet-700 text-white rounded-md font-bold text-xs transition-colors cursor-pointer shadow-md shadow-violet-500/20">
          <Upload className="w-4 h-4" />
          <span>{uploading ? 'Uploading...' : 'Upload Files'}</span>
          <input type="file" className="hidden" multiple accept="image/*" onChange={handleFileUpload} disabled={uploading} />
        </label>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search media files..."
            className="w-full pl-9 pr-4 py-2 rounded-md border border-slate-200 bg-white text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-violet-500"
          />
        </div>

        <div className="flex border border-slate-200 rounded-md overflow-hidden bg-white p-1">
          <button
            onClick={() => setView('grid')}
            className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all cursor-pointer ${
              view === 'grid' ? 'bg-violet-600 text-white shadow-2xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Grid
          </button>
          <button
            onClick={() => setView('list')}
            className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all cursor-pointer ${
              view === 'list' ? 'bg-violet-600 text-white shadow-2xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            List
          </button>
        </div>
      </div>

      {/* Content */}
      {loading ? (
        <div className="py-12 text-center text-xs text-slate-400 animate-pulse">Loading media files...</div>
      ) : filtered.length === 0 ? (
        <div className="bg-white border border-slate-200 border-dashed rounded-md p-12 text-center space-y-3">
          <div className="w-12 h-12 rounded-md bg-violet-50 text-violet-600 flex items-center justify-center mx-auto">
            <ImageIcon className="w-6 h-6" />
          </div>
          <p className="text-sm font-bold text-slate-900">No media files uploaded yet</p>
          <p className="text-xs text-slate-500">Click Upload Files above to add images to your library.</p>
        </div>
      ) : view === 'grid' ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {filtered.map((f) => (
            <div
              key={f.id}
              className="group rounded-md border border-slate-200 bg-white overflow-hidden hover:border-violet-500 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="h-28 bg-slate-100 relative overflow-hidden flex items-center justify-center p-2">
                <img src={f.url} alt={f.name} className="max-h-full max-w-full object-contain rounded-md" />
              </div>
              <div className="p-3">
                <p className="text-xs font-bold text-slate-900 truncate">{f.name}</p>
                <p className="text-[10px] text-slate-400 mt-0.5">{f.size}</p>
                <div className="flex items-center gap-1 mt-2 pt-2 border-t border-slate-100">
                  <button
                    onClick={() => handleCopyUrl(f.id, f.url)}
                    className="p-1.5 hover:bg-slate-100 text-slate-500 hover:text-violet-600 rounded-md transition-colors cursor-pointer"
                    title="Copy URL"
                  >
                    {copiedId === f.id ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                  <button
                    onClick={() => handleDelete(f.id)}
                    className="p-1.5 hover:bg-red-50 text-slate-400 hover:text-red-600 rounded-md transition-colors cursor-pointer ml-auto"
                    title="Delete File"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-md border border-slate-200 bg-white divide-y divide-slate-100 shadow-2xs overflow-hidden">
          {filtered.map((f) => (
            <div key={f.id} className="flex items-center gap-4 px-6 py-3 hover:bg-slate-50 transition-colors">
              <div className="w-10 h-10 rounded-md bg-slate-100 flex items-center justify-center overflow-hidden shrink-0 border border-slate-200">
                <img src={f.url} alt={f.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-slate-900 truncate">{f.name}</p>
                <p className="text-[10px] text-slate-400">{f.type} · {f.size}</p>
              </div>
              <span className="text-xs text-slate-400">{new Date(f.createdAt || Date.now()).toLocaleDateString()}</span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => handleCopyUrl(f.id, f.url)}
                  className="p-1.5 hover:bg-slate-100 text-slate-500 rounded-md transition-colors cursor-pointer"
                  title="Copy URL"
                >
                  {copiedId === f.id ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => handleDelete(f.id)}
                  className="p-1.5 hover:bg-red-50 text-slate-400 hover:text-red-600 rounded-md transition-colors cursor-pointer"
                  title="Delete File"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
