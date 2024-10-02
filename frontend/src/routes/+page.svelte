<script>
  const { data } = $props()
  import { urlFor } from '$lib/utils/image';
  import { register } from 'swiper/element/bundle';
  register();

  import { onMount } from 'svelte'
  import { pushState } from '$app/navigation'

  let visible = $state(false)
  onMount(() => {
    visible=true
  });

  function openNewsletter() {
    pushState('', { showNewsletter: true }, '#newsletter');
  }
</script>

<section id="hero">
  <div class="hero-bg" style="background-image: url({urlFor(data.imageBackground.asset)})">
    <swiper-container class="hero-fg-container"
    autoplay-delay=4000
    speed="500"
    loop="true"
    navigation-next-el=".hero-bg"
    >
      {#each data.homepage[0].imagesForeground as imageForeground, i}
        <swiper-slide class:hidden={!visible && i > 0}>
          <img class="hero-fg" src={urlFor(imageForeground.asset)} alt="">
        </swiper-slide>
      {/each}
    </swiper-container>
  </div>
  <h1 class="text-l hero-text">{data.homepage[0].intro}</h1>
</section>

<section id="cosa-facciamo" title="Cosa facciamo">
  <h2 class="text-xl">Cosa facciamo</h2>
  <div class="cosa-facciamo-container grid">
    {#each data.whatWeDos as item, i}
    <a class="item" href="/cosa-facciamo/{item.slug.current}">
      <img class="thumbnail" src={item.thumbnail ? urlFor(item.thumbnail.asset) : ''} alt="">
      <div class="tags">
        {#each item.category as category}
          <!-- <a href="/cosa-facciamo?category={category.slug.current}" class="btn tag">{category.title}</a> -->
          <button class="btn tag pointer-events-none">{category.title}</button>
        {/each}
      </div>
      <h3 class="item-title text-m">{item.title}</h3>
    </a>
    {/each}
  </div>
  <a class="btn cta" href="/cosa-facciamo">Vedi tutto →</a>
</section>

<section id="con-chi" title="Con chi">
  <h2 class="con-chi-title text-xl">Con chi</h2>
    <swiper-container class="con-chi-container"
    slides-per-view={4.5}
    space-between={10}
    speed={500}
    slides-offset-before={20}
    slides-offset-after={20}
    freeMode={true}
    loop={false}
    mousewheel-force-to-axis={true}
    mousewheel-sensitivity={1}
    mousewheel-release-on-edges={true}
    >
      {#each data.people as person, i}
        <swiper-slide class="person" class:hidden={!visible}>
          <img class="thumbnail" src={person.thumbnail ? urlFor(person.thumbnail.asset) : ''} alt="">
          <h3 class="person-title text-m">{person.title}</h3>
          {#if person.role}<p class="person-role uppercase">{person.role}</p>{/if}
        </swiper-slide>
      {/each}
    </swiper-container>
    <a class="btn cta" href="/con-chi">Vedi tutto →</a>
</section>

<section id="publications" title="Pubblicazioni">
  <h2 class="text-xl">Pubblicazioni</h2>
  {#each data.publications as series, i}
    <div class="publications-titles">
      <h3 class="publications-title text-l">{series.title}</h3>
      {#if series.description}<h4 class="uppercase">{series.description}</h4>{/if}
    </div>
    <div class="publications-container grid">
      {#each series.publications as publication, j}
        <a class="publication" href="/pubblicazioni/{publication.slug.current}">
          <img class="thumbnail" src={publication.thumbnail ? urlFor(publication.thumbnail.asset) : ''} alt="">
          <h3 class="publication-title text-m">{publication.title}</h3>
          <p class="uppercase block">#Pubblicazioni</p>
          {#if publication.curator} <p class="publication-curator uppercase block">A cura di {publication.curator.title}</p>{/if}
        </a>
      {/each}
    </div>
  {/each}
  <a class="btn cta" href="/pubblicazioni">Vedi tutto →</a>
</section>

<section id="chi-siamo" title="Chi siamo">
  <h2 class="text-xl">Chi siamo</h2>
  <p class="chi-siamo-intro">{data.homepage[0].aboutIntro}</p>
  <div class="chi-siamo-container">
    <div class="chi-siamo-people chi-siamo-column">
      {#each data.homepage[0].aboutContent.filter(content => content._type === 'aboutPerson') as aboutContent, i}
        <div class="chi-siamo-item">
          {#if aboutContent.person.singlePage}
            <a href="/chi-siamo/{aboutContent.person.slug.current}">
              <h4 class="underline chi-siamo-title text-m">{aboutContent.person.title} →</h4>
            </a>
          {:else}
              <h4 class="chi-siamo-title text-m">{aboutContent.person.title}</h4>
          {/if}
          {#if aboutContent.person.role}<p class="uppercase">{aboutContent.person.role}</p>{/if}
          {#if aboutContent.person.email}<a href="mailto:{aboutContent.person.email}"><p class="underline">{aboutContent.person.email}</p></a>{/if}
          {#if aboutContent.extra}<p>{aboutContent.extra}</p>{/if}
        </div>
      {/each}
    </div>
    <div class="chi-siamo-contacts-download chi-siamo-column">
      {#each data.homepage[0].aboutContent.filter(content => content._type === 'aboutContact' || content._type === 'aboutDownload') as aboutContent, i}
        <div class="chi-siamo-item">
          {#if aboutContent._type === 'aboutContact'}
            <h4 class="chi-siamo-title text-m">{aboutContent.title}</h4>
            <a href="mailto:{aboutContent.email}"><p class="underline">{aboutContent.email}</p></a>
          {/if}
          {#if aboutContent._type === 'aboutDownload'}
            <h4 class="chi-siamo-title text-m">{aboutContent.title}</h4>
            <a class="download underline active inverted" target="_blank" href="{aboutContent.link}"><p>{aboutContent.cta} ↓</p></a>
          {/if}
        </div>
      {/each}
    </div>
    <div class="chi-siamo-custom chi-siamo-column">
      <div class="chi-siamo-item">
        {#each data.homepage[0].aboutContent.filter(content => content._type === 'aboutCustom') as aboutContent, i}
          <h4 class="chi-siamo-title text-m">{aboutContent.title}</h4>
          {#if aboutContent.content}<p>{aboutContent.content}</p>{/if}
        {/each}
      </div>
    </div>
  </div>
  <a class="btn cta" href="#newsletter" onclick={openNewsletter}>Iscriviti alla newsletter</a>
</section>

<section id="archivio" title="Archivio">
  <h2 class="text-xl">Archivio</h2>
  <div class="archivio-container grid">
    {#each data.archive as item, i}
      <a class="item" href="/cosa-facciamo/{item.slug.current}">
        <img class="thumbnail" src={item.thumbnail ? urlFor(item.thumbnail.asset) : ''} alt="">
        <div class="tags">
          {#each item.category as category}
            <!-- <a href="/archivio?category={category.slug.current}" class="btn tag">{category.title}</a> -->
            <button class="btn tag pointer-events-none">{category.title}</button>
          {/each}
        </div>
        <h3 class="item-title text-m">{item.title}</h3>
      </a>
    {/each}
  </div>
  <a class="btn cta" href="/archivio">Vedi tutto →</a>
</section>

<style>
/* Common */
section:not(#hero, #con-chi) {
  margin-right: var(--margin);
  margin-left: var(--margin);
}
section:not(:nth-child(-n+2)) {
  padding-top: calc(2.5rem + var(--margin)*2);
}
h2 {
  padding-top: calc(var(--margin)*3);
  padding-bottom: calc(var(--margin)*2);
}
.cta {
  margin-top: calc(var(--margin)*3);
}

/* Hero */
#hero {
  height: calc(100vh - (2.5rem + var(--margin)*2));
}
.hero-fg-container {
  width: 40%;
  height: 40%;
  max-width: 400px;
}
.hero-bg {
  width: 100%;
  height: 100%;
  background-size: cover;
  align-items: center;
  justify-content: center;
  display: flex;
  cursor: pointer;
}
.hero-fg {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
.hero-text {
  position: absolute;
  left: var(--margin);
  bottom: calc(var(--gutter)*4);
  color: var(--bg);
  width: calc((100% - var(--gutter) - var(--margin)*2)/2);
}

/* Cosa facciamo */
.cosa-facciamo-container {
  
}

/* Con chi */
#con-chi>*:not(.con-chi-container)  {
  margin-left: var(--margin);
  margin-right: var(--margin);
}
.con-chi-container {
  width: 100%;
  overflow: hidden;
}

/* Publications */
.publications-titles {
  margin-top: calc(var(--margin)*2);
  margin-bottom: calc(var(--gutter)*3);
  display: flex;
  justify-content: space-between;
  align-items: baseline;
}
.publications-container:not(:last-of-type) {
  margin-bottom: calc(var(--margin)*3);
}

/* Chi siamo */
.chi-siamo-container {
  display: grid;
  grid-template-columns: repeat(16, 1fr);
  justify-items: start;
  gap: var(--gutter);
  margin-top: calc(var(--margin)*3);
}
.chi-siamo-intro {
  width: calc((100% - var(--gutter))/2);
}
.chi-siamo-column {
  display: flex;
  flex-direction: column;
  gap: calc(var(--margin)*1.5);
}
.chi-siamo-people {
  grid-column: 1 / 6;
  width: 100%;
}
.chi-siamo-title {
  margin-bottom: var(--gutter);
}
.chi-siamo-contacts-download {
  grid-column: 6 / 10;
  width: 100%;
}
.download {
  /* color: var(--blue);
  border-bottom: solid 1px var(--blue);
  display: inline-block; */
}
.chi-siamo-custom {
  grid-column: 10 / 17;
  width: 100%;
}

/* Archivio */
.archivio-container {

}

</style>