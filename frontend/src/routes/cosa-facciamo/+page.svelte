<script>
  // Import data
  const { data } = $props()

  // Import from svelte/lib
  import { urlFor } from '$lib/utils/image';
  import { page } from '$app/stores';
  import { goto } from "$app/navigation";

  // Import stores
  import { getCategory } from '$lib/stores/category.svelte.js';
  const categoryer = getCategory();

  // Lifecycle
  $effect(() => {
    const query = $page.url.searchParams?.get('category');
    if (query !== categoryer.category) {
      categoryer.setCategory(query);
    }
  });

  function filterBy(category) {
    categoryer.setCategory(category);
    const url = new URL($page.url);
    if (category) {
      url.searchParams.set('category', category);
    } else {
      url.searchParams.delete('category');
    }
    goto(url, { replaceState: true });
  }
</script>

<section class="list">
  <h1 class="text-xl">Cosa facciamo</h1>
  <div class="filters">
    <button class="btn secondary" class:active={!categoryer.category} onclick={(e) => {filterBy('')}}>All</button>
    {#each data.categories as category, i}
      <button class="btn secondary" class:active={categoryer.category === category.slug.current} onclick={(e) => {filterBy(category.slug.current)}}>{category.title}</button>
    {/each}
  </div>
  <div class="cosa-facciamo-container grid">
    {#each data.whatWeDos as item, i}
    <a class="item" href="/cosa-facciamo/{item.slug.current}">
      <img class="thumbnail" src={item.thumbnail ? urlFor(item.thumbnail.asset).width(600) : ''} alt="">
      <div class="tags">
        {#each item.category as category}
          <button class="btn tag pointer-events-none">{category.title}</button>
        {/each}
      </div>
      <h3 class="item-title text-m">{item.title}</h3>
    </a>
    {/each}
  </div>
</section>

<style>

</style>