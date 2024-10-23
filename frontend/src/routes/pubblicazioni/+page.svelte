<script>
  const { data } = $props()
  $inspect(data)

  import { urlFor } from '$lib/utils/image';
  import { page } from '$app/stores';
  import { goto } from "$app/navigation";
  import { formatSubstring } from '$lib/utils/substring.js'  

  // Import stores
  import { getEditor } from '$lib/stores/editor.svelte.js';
  const editorer = getEditor();

  // Lifecycle
  $effect(() => {
    const query = $page.url.searchParams?.get('editor');
    if (query && query !== editorer.editor) {
      editorer.setEditor(query);
    }
  });

  function filterBy(editor) {
    editorer.setEditor(editor);
    const url = new URL($page.url);
    if (editor) {
      url.searchParams.set('editor', editor);
    } else {
      url.searchParams.delete('editor');
    }
    goto(url, { replaceState: true });
  }
</script>

<section class="list">
  <h1 class="text-xl">Pubblicazioni</h1>
  <div class="filters">
    <button class="btn secondary" class:active={!editorer.editor} onclick={(e) => {filterBy('')}}>All</button>
    {#each data.editors as editor, i}
      <button class="btn secondary" class:active={editorer.editor === editor.slug.current} onclick={(e) => {filterBy(editor.slug.current)}}>{@html formatSubstring(editor.title, "Dd’A", "no-uppercase")}</button>
    {/each}
  </div>
  <div class="pubblicazioni-container grid">
    {#each data.publications as publication, i}
      <a class="publication" href="/pubblicazioni/{publication.slug.current}">
        <img class="thumbnail" src={publication.thumbnail ? urlFor(publication.thumbnail.asset).width(600) : ''} alt="">
        {#if publication.editor}
          <div class="tags">
            <button class="btn tag pointer-events-none">{@html formatSubstring(publication.editor.title, "Dd’A", "no-uppercase")}</button>
          </div> 
        {/if}
        <h3 class="publication-title text-m">{publication.title}</h3>
        <p class="uppercase block">#Publicazioni</p>
        {#if publication.curator}<p class="publication-curator uppercase block">A cura di {publication.curator.title}</p>{/if}
        {#if publication.author}<p class="publication-curator uppercase block">Di {publication.author.title}</p>{/if}
      </a>
    {/each}
  </div>
</section>


<style>
</style>