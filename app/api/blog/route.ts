import { NextResponse } from 'next/server';
import { INITIAL_BLOG_POSTS } from '@/lib/blogData';

// GET /api/blog - Fetch all or limit published blog posts
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const limitParam = searchParams.get('limit');
    const statusParam = searchParams.get('status');

    let posts = [...INITIAL_BLOG_POSTS];

    if (statusParam === 'published') {
      posts = posts.filter(p => p.status === 'published');
    }

    if (limitParam) {
      const limit = parseInt(limitParam, 10);
      if (!isNaN(limit) && limit > 0) {
        posts = posts.slice(0, limit);
      }
    }

    return NextResponse.json({
      success: true,
      data: posts,
      total: posts.length,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Failed to fetch blog posts', error: (error as Error).message },
      { status: 500 }
    );
  }
}

// POST /api/blog - Create a new blog post
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, excerpt, content, category, status, coverImage, author, readTime } = body;

    if (!title || !content) {
      return NextResponse.json({ success: false, message: 'Title and Content are required' }, { status: 400 });
    }

    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');

    const newPost = {
      id: `post-${Date.now()}`,
      slug,
      title,
      excerpt: excerpt || '',
      content,
      category: category || 'General',
      tags: body.tags || ['Resume Tips'],
      status: status || 'published',
      views: 0,
      author: author || 'Admin',
      date: new Date().toISOString().split('T')[0],
      readTime: readTime || '4 min read',
      coverImage: coverImage || 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&auto=format&fit=crop&q=80',
    };

    return NextResponse.json({ success: true, data: newPost }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Failed to create blog post', error: (error as Error).message },
      { status: 500 }
    );
  }
}
