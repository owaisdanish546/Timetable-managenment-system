async function loadPageContent(page,option_id) {
    try {
        event.preventDefault()
        const response = await fetch(page);

        if (!response.ok) {
            throw new Error("Could not load the page");
        }

        // Clear existing content
        document.getElementById('pageContent').innerHTML = '';

        // Delete dynamically loaded script elements
        const existingScripts = document.querySelectorAll('script[data-dynamically-loaded="true"]');
        existingScripts.forEach(script => script.parentNode.removeChild(script));

        // Load HTML content into pageContent div
        const html = await response.text();
        document.getElementById('pageContent').innerHTML = html;

        // Extract script elements from the loaded HTML and execute them
        const scriptElements = document.getElementById('pageContent').querySelectorAll('script');
        for (const script of scriptElements) {
            // Create a new script element for each extracted script
            const newScript = document.createElement('script');
            newScript.src = script.src;
            newScript.async = true;
            newScript.setAttribute('data-dynamically-loaded', 'true'); // Add custom attribute
            document.body.appendChild(newScript);
        }

        return true;
    } catch (error) {
        console.error('Error:', error);
    }
}
