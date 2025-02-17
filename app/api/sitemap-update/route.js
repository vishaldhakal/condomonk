import { NextResponse } from 'next/server';
import sitemapGenerator from '../../../utils/sitemapGenerator';
import { revalidatePath } from 'next/cache';

export async function GET() {
  try {
    const result = await sitemapGenerator.generateSitemap();

    if (result.success) {
      // Revalidate the sitemap.xml path
      revalidatePath('/sitemap.xml');
      
      return NextResponse.json(
        { 
          message: result.message,
          timestamp: new Date().toISOString()
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { error: result.message },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Sitemap generation error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

// Set revalidation period to 24 hours
export const revalidate = 86400;
