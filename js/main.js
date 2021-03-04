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

async function RegisterTabs()
{
    let url = location.href.replace(/\/$/, "");

    let triggerTabList = [].slice.call(document.querySelectorAll('#mainTabs a'))
    triggerTabList.forEach(function (triggerEl) {
        let tabTrigger = new bootstrap.Tab(triggerEl)
        triggerEl.addEventListener('click', function (event) {
            event.preventDefault();
            tabTrigger.show();
            let newUrl;
            const hash = triggerEl.getAttribute("href");
            console.log(hash);
            if(hash === "#about") {
                newUrl = url.split("#")[0];
            } else {
                newUrl = url.split("#")[0] + hash;

            }
            newUrl += "/";
            history.replaceState(null, null, newUrl);
        })
    })

    if (location.hash) {
        const hash = url.split("#");
        await LoadTab(hash[1]);
        console.log(hash);
        const triggerEl = document.querySelector('#mainTabs a[href="#'+hash[1]+'"]');
        console.log(bootstrap.Tab.getInstance(triggerEl));
        bootstrap.Tab.getInstance(triggerEl).show() // Select tab by name
        //url = location.href.replace(/\/#/, "#");
        history.replaceState(null, null, url);
        setTimeout(() => {
            window.scrollTo(0,0);
        }, 400);
    }
}

async function LoadTab(tab_name)
{
    await loadHtmlIntoDiv("pages/" + tab_name + "/navbar.html", tab_name + "-navbar")
}