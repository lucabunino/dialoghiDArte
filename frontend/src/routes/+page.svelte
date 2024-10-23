<script>
  const { data } = $props()

  import { urlFor } from '$lib/utils/image';
  import { register } from 'swiper/element/bundle';
  register();
  import { onMount } from 'svelte'
  import { pushState } from '$app/navigation'
  import { formatSubstring } from '$lib/utils/substring.js'  

  let innerWidth = $state()
  let visible = $state(false)
  
  onMount(() => {
    const swiperEl1 = document.querySelector('.hero-fg-container');
    swiperEl1.initialize();
    visible=true
    const swiperEl2 = document.querySelector('.con-chi-container');
    const swiperParams2 = {
      breakpoints: {
        1900: {slidesPerView: 7.3,},
        1600: {slidesPerView: 6.3,},
        1200: {slidesPerView: 5.3,},
        900: {slidesPerView: 4.3, slidesOffsetBefore: 20, slidesOffsetAfter: 20,},
        600: {slidesPerView: 3.3,},
      },
    };
    Object.assign(swiperEl2, swiperParams2);
    swiperEl2.initialize();
  });

  function openNewsletter() {
    pushState('', { showNewsletter: true }, '#newsletter');
  }
</script>

<svelte:window bind:innerWidth></svelte:window>

<section id="hero">
  <div class="hero-bg" style="background-image: url({urlFor(data.imageBackground.asset).width(innerWidth > 900 ? 1920 : 1280)})">
    <swiper-container class="hero-fg-container"
    init="false"
    autoplay-delay={4000}
    speed={500}
    loop={true}
    navigation-next-el=".hero-bg"
    >
      {#each data.homepage[0].imagesForeground as imageForeground, i}
        <swiper-slide class:hidden={!visible && i > 0}>
          <img class="hero-fg" src={urlFor(imageForeground.asset).width(900)} alt="">
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
      <img class="thumbnail" src={item.thumbnail ? urlFor(item.thumbnail.asset).width(900) : ''} alt="">
      <div class="tags">
        {#each item.category as category}
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
    init="false"
    slides-per-view={2.4}
    space-between={10}
    speed={700}
    slides-offset-before={10}
    slides-offset-after={10}
    freeMode={{
      enabled: true,
      sticky: true,
    }}
    grabCursor={true}
    loop={false}
    mousewheel-force-to-axis={true}
    mousewheel-sensitivity={1}
    mousewheel-release-on-edges={true}
    >
      {#each data.people as person, i}
        <swiper-slide class="person" class:hidden={!visible}>
          <img class="thumbnail" src={person.thumbnail ? urlFor(person.thumbnail.asset).width(900) : ''} alt="">
          <h3 class="person-title text-m">
            {#if person.externalLink}
              <a href={person.externalLink} target="_blank" class="underline">{person.title} ↗</a>
            {:else}
              {person.title}
            {/if}
          </h3>
          {#if person.role}<p class="person-role uppercase">{person.role}</p>{/if}
        </swiper-slide>
      {/each}
    </swiper-container>
    <a class="btn cta" href="/con-chi">Vedi tutto →</a>
</section>

<section id="publications" title="Pubblicazioni">
  <h2 class="text-xl">Pubblicazioni</h2>
  <div class="publications-container grid">
    {#each data.publications as publication, i}
      <a class="publication" href="/pubblicazioni/{publication.slug.current}">
        <img class="thumbnail" src={publication.thumbnail ? urlFor(publication.thumbnail.asset).width(900) : ''} alt="">
        {#if publication.editor}
          <div class="tags">
            <button class="btn tag pointer-events-none">{@html formatSubstring(publication.editor.title, "Dd’A", "no-uppercase")}</button>
          </div> 
        {/if}
        <h3 class="publication-title text-m">{publication.title}</h3>
        <p class="uppercase block">#Publicazioni</p>
        {#if publication.curator}<p class="publication-curator uppercase block">A cura di {publication.curator.title}</p>{/if}
        {#if publication.author}<p class="publication-author uppercase block">Di {publication.author.title}</p>{/if}
      </a>
    {/each}
  </div>
  <a class="btn cta" href="/pubblicazioni">Vedi tutto →</a>
</section>

<section id="chi-siamo" title="Chi siamo">
  <h2 class="text-xl">Chi siamo</h2>
  <p class="chi-siamo-intro">{data.homepage[0].aboutIntro}</p>
  <div class="chi-siamo-container">
    <div class="chi-siamo-people chi-siamo-column">
      {#each data.homepage[0].aboutContent.filter(content => content._type === 'aboutPerson' || content._type === 'aboutPeople') as aboutContent, i}
        <div class="chi-siamo-item">
          {#if aboutContent._type === 'aboutPerson'}
            {#if aboutContent.person.singlePage}
              <a href="/chi-siamo/{aboutContent.person.slug.current}">
                <h4 class="underline chi-siamo-title text-m">{aboutContent.person.title} →</h4>
              </a>
            {:else}
                <h4 class="chi-siamo-title text-m">{aboutContent.person.title}</h4>
            {/if}
            {#if aboutContent.person.role}<p class="uppercase">{@html formatSubstring(aboutContent.person.role, "Dd’A", "no-uppercase")}</p>{/if}
            {#if aboutContent.person.email}<a href="mailto:{aboutContent.person.email}"><p class="underline active inverted">{aboutContent.person.email}</p></a>{/if}
            {#if aboutContent.extra}<p>{aboutContent.extra}</p>{/if}
          {/if}
          {#if aboutContent._type === 'aboutPeople'}
            <h4 class="chi-siamo-title text-m">{aboutContent.title}</h4>
            {#if aboutContent.content}<p>{aboutContent.content}</p>{/if}
            {#if aboutContent.people}
              {#each aboutContent.people as person, j}
                {#if person.singlePage}
                <a class="block" href="/chi-siamo/{person.slug.current}">
                  <p class="underline">{person.title} →</p>
                </a>
                {:else}
                    <p class="">{person.title}</p>
                {/if}
              {/each}
            {/if}
          {/if}
        </div>
      {/each}
    </div>
    <div class="chi-siamo-contacts-download chi-siamo-column">
      {#each data.homepage[0].aboutContent.filter(content => content._type === 'aboutContact' || content._type === 'aboutDownload') as aboutContent, i}
        <div class="chi-siamo-item">
          {#if aboutContent._type === 'aboutContact'}
            <h4 class="chi-siamo-title text-m">{aboutContent.title}</h4>
            <a href="mailto:{aboutContent.email}"><p class="underline active inverted">{aboutContent.email}</p></a>
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
          {#if aboutContent.entities}
            {#each aboutContent.entities as entity, j}
              {#if entity.link}
                <a class="block" target="_blank" href={entity.link}>
                  <p class="underline">{entity.title} ↗</p>
                </a>
              {:else}
                <p>{entity.title}</p>
              {/if}
            {/each}
          {/if}
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
      <a class="item" href="/archivio/{item.slug.current}">
        <img class="thumbnail" src={item.thumbnail ? urlFor(item.thumbnail.asset).width(900) : ''} alt="">
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
@media screen and (max-width: 900px) {
  section:not(:nth-child(-n+2)) {
    padding-top: 62px;
  }
  h2 {
    padding-top: calc(var(--margin)*4);
  }
  .cta {
    margin-top: calc(var(--margin)*4.5);
  }
}

/* Hero */
#hero {
  height: calc(100vh - (2.5rem + var(--margin)*2) + 1px);
  height: calc(100svh - (2.5rem + var(--margin)*2) + 1px);
}
.hero-fg-container {
  width: 45%;
  height: 45%;
  margin-bottom: 5vw;
  /* max-width: 400px; */
}
.hero-bg {
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
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
@media screen and (max-width: 900px) {
  .hero-fg-container {
    width: 70%;
    max-width: unset;
  }
  .hero-text {
    margin-right: var(--margin);
    bottom: calc(var(--margin)*4);
    width: auto;
  }
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
/* .publications-titles {
  margin-top: calc(var(--margin)*2);
  margin-bottom: calc(var(--gutter)*3);
  display: flex;
  justify-content: space-between;
  align-items: baseline;
} */
.publications-container:not(:last-of-type) {
  margin-bottom: calc(var(--margin)*3);
}

/* Chi siamo */
.chi-siamo-container {
  display: grid;
  grid-template-columns: repeat(16, 1fr);
  justify-items: start;
  column-gap: var(--gutter);
  row-gap: calc(var(--margin)*3);
  margin-top: calc(var(--margin)*3);
  font-weight: 400;
}
.chi-siamo-intro {
  width: calc((100% - var(--gutter))/2);
  font-weight: 400;
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
  font-weight: 500;
}
.chi-siamo-contacts-download {
  grid-column: 6 / 10;
  width: 100%;
}
.chi-siamo-custom {
  grid-column: 10 / 17;
  width: 100%;
}

/* Archivio */
.archivio-container {

}

@media screen and (max-width: 900px) {
  /* .publications-titles {
    display: none;
  } */
  .publications-container > :nth-child(n+3) {
    display: none;
  }
  .con-chi-container {
    width: -webkit-fill-available;
  }
  .chi-siamo-container {
    line-height: 1.3;
  }
  .chi-siamo-intro {
    width: 100%;
    line-height: 1.3;
  }
  .chi-siamo-column {
    gap: calc(var(--margin)*3);
  }
  .chi-siamo-people {
    grid-column: 1 / 17;
  }
  .chi-siamo-contacts-download {
    grid-column: 1 / 17;
  }
  .chi-siamo-custom {
    grid-column: 1 / 17;
  }
}
@media screen and (max-width: 600px) {
  .publications-container > :nth-child(n+2) {
    display: none;
  }
}
</style>