<script>
  const { data } = $props()
  import { urlFor } from '$lib/utils/image';
</script>

<section class="list">
  <h1 class="text-xl">Con chi</h1>
  <div class="con-chi-container grid">
    {#each data.people as person, i}
    <div class="person">
      <img class="thumbnail square" src={person.thumbnail ? urlFor(person.thumbnail.asset).width(600) : ''} alt="">
      <h3 class="person-title text-m">
        {#if person.externalLink}
          <a href={person.externalLink} target="_blank" class="underline">{person.title} ↗</a>
        {:else}
          {person.title}
        {/if}
      </h3>
      <p class="person-role uppercase">{person.role}</p>
    </div>
    {/each}
  </div>
</section>

<style>
</style>