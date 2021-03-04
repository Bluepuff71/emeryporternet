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

async function loadHtmlIntoDivWithCallback(html_file, div_id, callback)
{
    await loadHtmlIntoDiv(html_file, div_id);
    callback();
}

function loadTabs()
{
    let url = location.href.replace(/\/$/, "");

    if (location.hash) {
        const hash = url.split("#");
        const triggerEl = document.querySelector('#mainTabs a[href="#'+hash[1]+'"]');
        bootstrap.Tab.getInstance(triggerEl).show() // Select tab by name
        url = location.href.replace(/\/#/, "#");
        history.replaceState(null, null, url);
        setTimeout(() => {
            window.scrollTo(0,0);
        }, 400);
    }

    let triggerTabList = [].slice.call(document.querySelectorAll('#mainTabs a[data-bs-toggle="tab"]'))
    triggerTabList.forEach(function (triggerEl) {
        let tabTrigger = new bootstrap.Tab(triggerEl)

        triggerEl.addEventListener('click', function (event) {
            console.log("TESt");
            let newUrl;
            const hash = triggerEl.getAttribute("href");
            if(hash === "#about") {
                newUrl = url.split("#")[0];
            } else {
                newUrl = url.split("#")[0] + hash;
            }
            newUrl += "/";
            history.replaceState(null, null, newUrl);
        })
    });
}