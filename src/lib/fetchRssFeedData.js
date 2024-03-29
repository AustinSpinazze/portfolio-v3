import client from './sanityClient';

export async function fetchFeedData() {
  try {
    // Fetch all post from Sanity for RSS Feed
    const response = await client.fetch(`
  		*[_type == "post"]{
      	title,
     		publishedAt,
      	slug,
      	summary,
		  	author,
		  	tags,
		  	ogImage,
		  	"ogImageUrl": ogImage.asset->url,
		  	ogDescription,
      	ogTitle
    	}`);

    return response;
  } catch (e) {
    throw new Error('Error fetching feed data.');
  }
}
