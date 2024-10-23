<script>
  // Import css
  import '../app.css'  
  
  // Import data
  const { data, children } = $props()

  // Import from svelte/lib
  import { page, navigating } from '$app/stores';  
  import { pageIn, pageOut } from '$lib/utils/transition';
  import { urlFor } from '$lib/utils/image';
  import { formatSocial } from '$lib/utils/social';
  import { beforeNavigate, afterNavigate, pushState, replaceState } from '$app/navigation';
  import { onMount } from 'svelte';

  // Variables
  let innerHeight = $state()
  let innerWidth = $state()
  let scrollY = $state()
  let prevScroll = $state()
  let scrolledDown = $state()
  let headerHeight = $state()
  let headerFixed = $state(false)
  let showMenu = $state(false)
  let menuHeight = $state()
  let showBanner = $state();

  afterNavigate (() => {
    if ($page.url.hash && $page.url.hash !== '#newsletter') {
      headerFixed = true
      const element = document.querySelector($page.url.hash + '>h2');
      if (element) {
        window.scrollTo({top: 0})
        setTimeout(() => {
          const targetPosition = element.getBoundingClientRect().top + scrollY - (innerWidth > 900 ? headerHeight + 40 : 62);
          smoothScrollTo(targetPosition);
        }, 300);
      }
    }
  });

  $effect(() => {
    if (scrollY < headerHeight) {
      scrolledDown = false;
    }
    if($page.state.showNewsletter) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  })

  onMount(() => {
    if ($page.url.hash === '#newsletter') {
      setTimeout(() => {
        replaceState('', { showNewsletter: true }, '#newsletter');
      }, 500);
    }
    const cookieConsent = localStorage.getItem('cookieConsent');
    if (cookieConsent === 'accepted') {
      showBanner = false;
    } else {
      showBanner = true;
    }
  })

  // Functions
  function acceptCookies() {
    localStorage.setItem('cookieConsent', 'accepted');
    showBanner = false;
  }

  function handleScroll() {
    const scrollDiff = scrollY - prevScroll;
    if (!headerFixed && !$navigating && scrollY > headerHeight && scrollDiff > 30) {
      scrolledDown = true;
    } else if (!headerFixed && !$navigating && scrollY < prevScroll) {
      scrolledDown = false;
    }
    prevScroll = scrollY;
  }
  function handleClick() {
    setTimeout(() => {
      prevScroll = scrollY
    }, 100);
  }
  function openNewsletter() {
    pushState('', { showNewsletter: true }, '#newsletter');
  }
  function closeNewsletter() { 
    replaceState('', '', $page.url.pathname);
  }
  function handleLogoClick() {
    if ($page.url.pathname == '/') {
      smoothScrollTo(0)
    }
  }

  function smoothScrollTo(targetPosition) {
    const start = window.scrollY;
    const distance = targetPosition - start;
    const duration = 700;
    const startTime = performance.now();

    function animateScroll(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      const easeInOutQuad = progress < 0.5
        ? 2 * progress * progress
        : -1 + (4 - 2 * progress) * progress;

      window.scrollTo(0, start + distance * easeInOutQuad);
      if (progress < 1) {
        requestAnimationFrame(animateScroll);
      }
    }
    requestAnimationFrame(animateScroll);
  }

  // Grid (not needed in production)
  let viewGrid = $state(false)
  const gridColumnsDesktop = 16
  const gridColumnsMobile = 4
  function handleKey({key}) {if (key === 'G') {viewGrid = !viewGrid}}
</script>

<svelte:head>
  <title>{data.seo[0].SEOTitle ? data.seo[0].SEOTitle : ''}</title>
  <meta name="description" content={data.seo[0].SEOTitle ? data.seo[0].SEOTitle : ''}>
  <link rel="canonical" href={$page.url}>
  <meta name="robots" content="index,follow">
  <meta name="googlebot" content="index,follow">
  <meta property="og:title" content={data.seo[0].SEOTitle ? data.seo[0].SEOTitle : ''}>
  <meta property="og:description" content={data.seo[0].SEODescription ? data.seo[0].SEODescription : ''}>
  <meta property="og:image" content={data.seo[0].SEOImage ? urlFor(data.seo[0].SEOImage).width(1920) : ''}>
  <meta property="og:url" content={$page.url}>
  <meta property="og:type" content="website">
  <meta property="og:site_name" content={data.seo[0].SEOTitle ? data.seo[0].SEOTitle : ''}>
</svelte:head>

<svelte:window onkeyup={handleKey} bind:scrollY bind:innerHeight bind:innerWidth onscroll={handleScroll}></svelte:window>

{#if viewGrid}
  <div id="layout"
       style="grid-template-columns:repeat({innerWidth > 800 ? gridColumnsDesktop : gridColumnsMobile}, 1fr);pointer-events:none;display: grid;position:fixed; z-index:999;width: -moz-available;width: -webkit-fill-available;height: -moz-available;height: -webkit-fill-available;margin:0 var(--margin);gap:var(--gutter);opacity:.2;">
    {#each Array(innerWidth > 800 ? gridColumnsDesktop : gridColumnsMobile) as _, i}
      <div style="background-color:red"></div>
    {/each}
  </div>
{/if}


{#if $page.url.host === 'localhost:5173' || $page.url.host === 'dialoghi-d-arte.vercel.app'}
  <header class:up={scrolledDown} class:down={showMenu}>
    <a class="menu-item" onclick={(e) => {showMenu = false; handleLogoClick()}} href="/" bind:clientHeight={headerHeight}>
      <svg id="logo" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 130 45">
        <path d="M70.94 28.51c0-6.5-4.21-10.18-8.79-10.18s-8.97 3.49-8.97 10.24 4.45 10.36 8.91 10.36 8.85-3.86 8.85-10.42Zm-26.54 0c0-10.06 7.81-16.25 16.11-16.25 4.82 0 8.36 2.08 10.07 3.99h.24V0h8.79v44.14h-8.05l-.61-3.56h-.3c-1.4 1.65-5.31 4.41-10.62 4.41-8.24 0-15.62-6.68-15.62-16.49Zm62.24-19.19h.24l6.65 17.41H99.99l6.65-17.41ZM101.82 0 83.58 44.14h9.94l3.97-10.12h18.48L120 44.14h10L111.7 0h-9.88ZM16.71 37.09c8.05 0 15.98-2.21 15.98-14.53S24.76 7.05 16.71 7.05h-7.5v30.04h7.5ZM0 0h18.3c12.87 0 23.61 7.23 23.61 22.56s-10.74 21.58-23.3 21.58H0V0Zm84.89 15.08c4.15-.8 5.06-2.82 5.06-4.29 0-1.78-1.4-2.21-2.93-2.45-1.52-.24-3.29-1.47-3.29-4.05 0-2.21 1.71-3.86 4.09-3.86 2.99 0 5.43 2.7 5.43 7.05 0 5.83-3.9 8.64-8.17 9.2l-.18-1.59Z"/>
      </svg>
    </a>
    <nav style="max-height: {showMenu ? menuHeight + headerHeight : ''}px">
      <div class="mobile-only" id="menuSwitch" onclick={(e) => {showMenu = !showMenu}} class:crossed={showMenu}>
        <div class="line"></div>
        <div class="line"></div>
        <div class="line"></div>
      </div>
      <ul id="menu" bind:clientHeight={menuHeight}>
        <li class="menu-item underline" onclick={(e) => {showMenu = false}} class:active={$page.url.pathname == '/cosa-facciamo' || $page.url.pathname.includes('/cosa-facciamo/')}><a href="/cosa-facciamo">Cosa facciamo</a></li>
        <li class="menu-item underline" onclick={(e) => {showMenu = false}} class:active={$page.url.pathname == '/con-chi'}><a href="/con-chi">Con chi</a></li>
        <li class="menu-item underline" onclick={(e) => {showMenu = false}} class:active={$page.url.pathname == '/pubblicazioni' || $page.url.pathname.includes('/pubblicazioni/')}><a href="/pubblicazioni">Pubblicazioni</a></li>
        <li class="menu-item underline" onclick={(e) => {showMenu = false}} class:active={$page.url.hash == '#chi-siamo'}><a onclick={handleClick} data-sveltekit-noscroll href="/#chi-siamo">Chi siamo</a></li>
        <li class="menu-item underline" onclick={(e) => {showMenu = false}} class:active={$page.url.pathname == '/archivio' || $page.url.pathname.includes('/archivio/')}><a href="/archivio">Archivio</a></li>
      </ul>
    </nav>
  </header>

  {#key data.pathname}
    <main>
      {@render children()}
    </main>
  {/key}

  <footer class="uppercase text-xs">
    <div>
      <p>{data.contacts[0].companyName}</p>
      <p>{data.contacts[0].legalForm}</p>
    </div>
    <div>
      <p>{#each data.contacts[0].adresses as adress, i}{#if i > 0}{@html ', '}{/if}<a class="underline" target="_blank" href={adress.adressGoogleMaps}>{adress.adressName}</a>{/each}</p>
      <p>P. IVA {data.contacts[0].vat}</p>
    </div>
    <hr class="flex-break mobile-only">
    <div>
      <p><a class="underline" href="/privacy">Privacy policy</a></p>
      <p><a class="underline" href="/cookies">Cookie policy</a></p>
    </div>
    <div>
      <a class="underline" href="#newsletter" onclick={openNewsletter}>Newsletter</a>
    </div>
    <div>
      <p class="desktop-only">Seguici su</p>
      {#each data.contacts[0].socials as social, i}
        <a class="social-link" target="_blank" href={social}>
          {#if formatSocial(social)[0] === 'instagram'}
            <svg class="ig-icon desktop-only" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M15.04 0H4.98C2.25-.02 0 2.23 0 4.97v10.07A4.96 4.96 0 0 0 4.96 20h10.08A4.96 4.96 0 0 0 20 15.04V4.97C20 2.23 17.78 0 15.04 0ZM10 15.18c-2.87 0-5.18-2.32-5.18-5.19S7.13 4.8 10 4.8s5.18 2.31 5.18 5.19-2.31 5.19-5.18 5.19Zm4.18-5.19c0 2.32-1.86 4.19-4.18 4.19s-4.18-1.87-4.18-4.19S7.68 5.8 10 5.8s4.18 1.87 4.18 4.19Z"/>
            </svg>
            <p class="mobile-only underline">Instagram</p>
          {/if}
          {#if formatSocial(social)[0] === 'x'}
            <p>X</p>
          {/if}
          {#if formatSocial(social)[0] === 'facebook'}
            <p>Facebook</p>
          {/if}
          {#if formatSocial(social)[0] === 'youtube'}
            <p>Youtube</p>
          {/if}
          {#if formatSocial(social)[0] === 'pinterest'}
            <p>Pinterest</p>
          {/if}
        </a>
      {/each}
    </div>
  </footer>

  {#if $page.state.showNewsletter}
  <div id="newsletter-bg" onclick={closeNewsletter}></div>
  <div id="newsletter">
    <button id="newsletter-switch" onclick={closeNewsletter}>
      <div class="cross-line"></div>
      <div class="cross-line"></div>
    </button>
    <div class="newsletter-intro text-l">
      <p style="margin-bottom: 1em;">Ci occupiamo di partecipazione culturale per far crescere il capitale culturale delle persone.</p>
      <p>Iscriviti alla nostra Newsletter.</p>
      <p>Condivideremo storie, progetti e opportunità che trasformano luoghi e persone attraverso la cultura.</p>
    </div>
    <div id="mc_embed_shell">
      <div id="mc_embed_signup">
          <form action="https://dialoghidarte.us14.list-manage.com/subscribe/post?u=1fa5ecea1ac66768564ee33f1&amp;id=f51e52dfb6&amp;f_id=0042bbe5f0" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" class="validate newsletter-form" target="_self" novalidate="">
              <div id="mc_embed_signup_scroll">
                  <div class="mc-field-group">
                    <input type="email" name="EMAIL" class="required email" id="mce-EMAIL" required="" value="" placeholder="Indirizzo e-mail*">
                  </div>
                  <div class="mc-field-group">
                    <input type="text" name="FNAME" class=" text" id="mce-FNAME" value="" placeholder="Nome">
                  </div>
                  <div class="mc-field-group">
                    <input type="text" name="LNAME" class=" text" id="mce-LNAME" value="" placeholder="Cognome">
                  </div>
                  <div class="mc-field-group input-group checkbox-group">
                    <input type="checkbox" name="group[48808][1]" id="mce-group[48808]-48808-0" value="">
                    <label for="mce-group[48808]-48808-0">Acconsento al trattamento dei miei dati personali (nome, cognome e indirizzo email) per l'invio della newsletter, in conformità con la <a class="underline active inverted" style="color: var(--blue);" href="/privacy">Privacy Policy</a></label>
                  </div>
              <div id="mce-responses" class="clear foot">
                  <div class="response" id="mce-error-response" style="display: none;"></div>
                  <div class="response" id="mce-success-response" style="display: none;"></div>
              </div>
          <div aria-hidden="true" style="position: absolute; left: -5000px;">
              /* real people should not fill this in and expect good things - do not remove this or risk form bot signups */
              <input type="text" name="b_1fa5ecea1ac66768564ee33f1_f51e52dfb6" tabindex="-1" value="">
          </div>
              <div class="optionalParent">
                  <div class="clear foot">
                      <input type="submit" name="subscribe" id="mc-embedded-subscribe" class="btn" value="Iscriviti">
                  </div>
              </div>
          </div>
      </form>
      </div>
    </div>
  </div>
  {/if}
  {#if showBanner}
    <div id="cookie-banner">
      <p>Utilizziamo solo cookie tecnici per garantirti la migliore esperienza di navigazione sul nostro sito. Questi cookie sono necessari per il funzionamento del sito e non richiedono il tuo consenso.  Per saperne di più, consulta la nostra <a href="cookies" style="color: var(--blue);" class="underline active inverted">Cookie Policy</a></p>
      <button class="btn" onclick={acceptCookies}>Ok, ho capito</button>
    </div>
  {/if}
{:else}
<div style="display: flex; width:100vw; height:100vh; align-items:center; justify-content:center;">
  <p class="text-m">Under maintenance</p>
</div>
{/if}

<style>
/* Header */
header {
  position: fixed;
  top: 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: var(--bg);
  padding: var(--margin);
  z-index: 2;
  transition: var(--transition);
  transition-property: transform;
  border-bottom: solid 1px var(--black);
}
header.up {
  transform: translateY(-100%);
}
#logo {
  color: var(--black);
  height: 2.5rem;
}
#menu {
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
  gap: calc(var(--gutter)*6);
  font-size: 1.1428rem;
}
.menu-item {
  width: fit-content;
}
.menu-item>a {
  color: var(--black);
}
.menu-item:hover>#logo, .menu-item.active>a {
  color: var(--blue);
  fill: var(--blue);
}
@media screen and (max-width: 900px) {
  header {
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    height: auto;
    padding: 0;
    padding-left: var(--margin);
  }
  #logo {
    height: 30px;
    margin: 16px 0;
  }
  #menuSwitch {
    position: absolute;
    top: 21px;
    right: var(--margin);
    width: 24px;
    height: 18px;
    cursor: pointer;
  }
  .line {
    width: 100%;
    height: 1.5px;
    border-radius: 2px;
    background-color: var(--black);
    position: absolute;
    transition: all 0.3s ease;
    transform-origin: center;
  }
  .line:nth-child(1) {top: 0;}
  .line:nth-child(2) {top: 50%;}
  .line:nth-child(3) {top: 100%;}
  #menuSwitch.crossed .line:nth-child(1) {
    transform: rotate(45deg);
    top: 50%;
  }
  #menuSwitch.crossed .line:nth-child(2) {
    transform: scaleX(0);
  }
  #menuSwitch.crossed .line:nth-child(3) {
    transform: rotate(-45deg);
    top: 50%;
  }
  #menu {
    flex-direction: column;
    margin-top: calc(var(--margin)*4);
    margin-bottom: calc(var(--margin)*4);
  }
  nav {
    max-height: 0;
    overflow: hidden;
    transition: var(--transition);
  }
  .menu-item:hover>#logo {
    fill: unset;
  }
}

/* Main */
main {
  display: flex;
  flex-direction: column;
  margin-top: calc(2.5rem + var(--margin)*2 - 1px);
}

/* Footer */
footer {
  width: 100%;
  display: flex;
  padding: var(--margin) var(--margin) calc(var(--margin)*1.2);
  justify-content: space-between;
  border-top: solid 1px var(--black);
  margin-top: calc(var(--margin)*10);
  row-gap: var(--margin);
}
footer .flex-break {
  display: none;
}
footer>div:nth-child(1), footer>div:nth-child(2) {
  margin-right: 100px;
}
footer>div:nth-child(3) {
  margin-right: auto;
}
footer>div:nth-child(5) {
  margin-left: auto;
}
footer>div:nth-child(6) {
  margin-left: 100px;
}
footer>div:nth-child(n+5) {
  text-align: right;
}
footer a:hover {
  fill: var(--blue)
}
.social-link {
  display: inline-block;
}
.ig-icon {
  width: 1.25rem;
  margin-top: 0.3125rem;
}
@media screen and (max-width: 900px) {
  main {
    margin-top: 62px;
  }
  footer {
    padding: calc(var(--margin)*2) var(--margin) calc(var(--margin)*4);
    flex-wrap: wrap;
    justify-content: flex-start;
  }
  footer>div:nth-child(1),
  footer>div:nth-child(2),
  footer>div:nth-child(4) {
    width: 50%;
    margin: 0;
  }
  footer>div:nth-child(5) {
    margin-left: unset;
  }
  footer>div:nth-child(6) {
    margin-left: 20px;
  }
  footer>div:nth-child(n+3) {
    text-align: left;
  }
}
@media screen and (max-width: 600px) {
  footer .flex-break {
    display: block;
    flex-basis: 100%;
    width: 0;
    height: 0;
    border: none;
  }
}
@media screen and (max-width: 400px) {
  footer>div:nth-child(6) {
    margin-left: 10px;
  }
}
@media screen and (max-width: 360px) {
  footer {
    flex-direction: column;
    gap: 0;
  }
  footer>div:nth-child(1),
  footer>div:nth-child(2),
  footer>div:nth-child(4) {
    width: auto;
  }
  footer>div:nth-child(1),
  footer>div:nth-child(2),
  footer>div:nth-child(4),
  footer>div:nth-child(5) {
    margin-top: 1rem;
  }
  footer>div:nth-child(6) {
    margin: 0;
  }
}

/* Newsletter */
#newsletter-bg {
  position: fixed;
  left: 0;
  top: calc(2.5rem + var(--margin)*2);
  height: calc(100vh - (2.5rem + var(--margin)*2));
  width: 100vw;
  z-index: 2;
}
#newsletter {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 60%;
  max-width: 1000px;
  height: auto;
  z-index: 3;
  border: solid 2px var(--blue);
  padding: calc(var(--margin)*3) calc(var(--margin)*2.5);
  background-color: var(--bg);
}
#newsletter-switch {
  position: absolute;
  top: 10px;
  right: 10px;
  width: 30px;
  height: 30px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
#newsletter-switch:hover>.cross-line {
  background-color: var(--blue);
}
.cross-line {
  width: 30px;
  height: 1.5px;
  border-radius: 2px;
  background-color: var(--black);
  position: absolute;
}
.cross-line:first-child {
  transform: rotate(45deg);
}
.cross-line:last-child {
  transform: rotate(-45deg);
}
.newsletter-intro {
  max-width: 800px;
}
.newsletter-form {
  margin-top: calc(var(--margin)*2);
}
[type="email"], [type="text"], [type="checkbox"] {
  border: solid 1px var(--black);
  padding: 1em;
  width: 100%;
  margin-bottom: var(--gutter);
}
[type="email"]:focus-visible, [type="text"]:focus-visible {
  outline-color: var(--blue);
  outline-offset: -2px;
  outline-width: 2px;
  outline-style: solid;
}
[type="submit"] {
  color: var(--blue);
  border-color: var(--blue);
  margin-top: calc(var(--margin)*3);
}
[type="submit"]:hover {
  color: var(--bg);
}
.checkbox-group {
  display: flex;
  margin-top: 2rem;
}
[type="checkbox"] {
  appearance: none;
  height: 2em;
  width: 2em;
  cursor: pointer;
  margin-right: 1rem;
}
input:checked {
  background-color: var(--blue);
  background:var(--blue) url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MTIgNTEyIj48cGF0aCBmaWxsPSIjZmZmZmZmIiBkPSJNMTczLjg5OCA0MzkuNDA0bC0xNjYuNC0xNjYuNGMtOS45OTctOS45OTctOS45OTctMjYuMjA2IDAtMzYuMjA0bDM2LjIwMy0zNi4yMDRjOS45OTctOS45OTggMjYuMjA3LTkuOTk4IDM2LjIwNCAwTDE5MiAzMTIuNjkgNDMyLjA5NSA3Mi41OTZjOS45OTctOS45OTcgMjYuMjA3LTkuOTk3IDM2LjIwNCAwbDM2LjIwMyAzNi4yMDRjOS45OTcgOS45OTcgOS45OTcgMjYuMjA2IDAgMzYuMjA0bC0yOTQuNCAyOTQuNDAxYy05Ljk5OCA5Ljk5Ny0yNi4yMDcgOS45OTctMzYuMjA0LS4wMDF6Ii8+PC9zdmc+") .5em .5em no-repeat;
  background-size: 1em 1em;
}
@media screen and (max-width: 900px) {
  #newsletter {
    padding: calc(var(--margin)*5) calc(var(--margin)*2.5);
    width: calc(100% - var(--margin)*2);
  }
}
@media screen and (max-width: 600px) {
  #newsletter-bg {
    top: 63px;
    height: calc(100dvh - 63px);
  }
}

/* Cookies */
#cookie-banner {
  position: fixed;
  bottom: 0;
  left: 0;
  margin: var(--margin);
  padding: var(--margin);
  max-width: 650px;
  height: auto;
  z-index: 3;
  border: solid 2px var(--blue);
  background-color: var(--bg);
}
#cookie-banner>button {
  margin-top: 1rem;
}
</style>