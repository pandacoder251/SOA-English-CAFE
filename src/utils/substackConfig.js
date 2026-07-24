// ==============================================================================
// SUBSTACK EMAIL INTEGRATION CONFIGURATION
// ==============================================================================
// Connecting your Substack to the site allows users to type in their email
// and subscribe seamlessly through an embedded widget.
//
// HOW TO OBTAIN YOUR SUBSTACK ACCOUNT URL:
// 1. Go to your beautiful Substack homepage.
// 2. Look at the URL in your browser. It usually looks like:
//    https://yourname.substack.com/ 
//    or 
//    https://thechaoticor.substack.com/
// 3. Copy just the subdomain part (the word right before ".substack.com").
// 4. Paste that subdomain into the variable below.
// ==============================================================================

// Replace 'yourname' with your actual Substack subdomain.
// Example: if your substack is 'https://thechaoticcafe.substack.com', enter 'thechaoticcafe'
export const SUBSTACK_USERNAME = "soaenglishcafe";

// You generally do not need to edit anything below this line.
export const getSubstackEmbedUrl = () => {
    return `https://${SUBSTACK_USERNAME}.substack.com/embed`;
};
