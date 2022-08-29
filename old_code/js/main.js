/**
 * @param {String} url - address for the HTML to fetch
 * @return {String} the resulting HTML string fragment
 */
async function fetchHtmlAsText(url) {
    return await (await fetch(url)).text();
}

async function loadHtmlIntoDiv(html_file, div_id) {
    const contentDiv = document.getElementById(div_id);
    contentDiv.innerHTML = await fetchHtmlAsText(html_file);
}