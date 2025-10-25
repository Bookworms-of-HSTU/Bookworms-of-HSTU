import { NextResponse } from 'next/server';
import axios from 'axios';
import { load } from 'cheerio';

export async function GET(request) {
  const url = request.nextUrl.searchParams.get('url');

  if (!url) {
    return NextResponse.json({ error: 'URL is required' }, { status: 400 });
  }

  try {
    const { data } = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });

    const $ = load(data);
    
    // Imgur uses the 'og:image' meta property for the direct image link
    const imageUrl = $('meta[property="og:image"]').attr('content');

    if (imageUrl) {
      // Return the direct image URL as JSON
      return NextResponse.json({ imageUrl });
    } else {
      return NextResponse.json({ error: 'Could not find an og:image at the provided Imgur URL.' }, { status: 404 });
    }
  } catch (error) {
    console.error('Error fetching the Imgur URL:', error.message);
    return NextResponse.json({ error: 'Failed to fetch the URL.' }, { status: 500 });
  }
}
