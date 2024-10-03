<script>
  const { data } = $props()

  import { urlFor } from '$lib/utils/image';
  import { page } from '$app/stores';
  import { goto } from "$app/navigation";

  // Import stores
  import { getSerie } from '$lib/stores/serie.svelte.js';
  const serier = getSerie();

  // Lifecycle
  $effect(() => {
    const query = $page.url.searchParams?.get('series');
    if (query && query !== serier.serie) {
      serier.setSerie(query);
    }
  });

  function filterBy(serie) {
    serier.setSerie(serie);
    const url = new URL($page.url);
    if (serie) {
      url.searchParams.set('series', serie);
    } else {
      url.searchParams.delete('series');
    }
    goto(url, { replaceState: true });
  }
</script>

<section class="list">
  <h1 class="text-xl">Pubblicazioni</h1>
  <div class="filters">
    <button class="btn secondary" class:active={!serier.serie} onclick={(e) => {filterBy('')}}>All</button>
    {#each data.series as serie, i}
      <button class="btn secondary" class:active={serier.serie === serie.slug.current} onclick={(e) => {filterBy(serie.slug.current)}}>{serie.title}</button>
    {/each}
  </div>
  <div class="pubblicazioni-container grid">
    {#each data.publications as publication, i}
      <a class="publication" href="/pubblicazioni/{publication.slug.current}">
        <img class="thumbnail" src={publication.thumbnail ? urlFor(publication.thumbnail.asset).width(900) : ''} alt="">
        {#if publication.series}
          <div class="tags">
            <button class="btn tag pointer-events-none">{publication.series.title}</button>
          </div> 
        {/if}
        <h3 class="publication-title text-m">{publication.title}</h3>
        <p class="uppercase block">#Publicazioni</p>
        {#if publication.curator}<p class="publication-curator uppercase block">A cura di {publication.curator.title}</p>{/if}
      </a>
    {/each}
  </div>
</section>


<style>
</style>