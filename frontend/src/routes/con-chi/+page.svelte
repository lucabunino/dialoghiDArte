<script>
  const { data } = $props()
  import { urlFor } from '$lib/utils/image';
</script>

<section class="list">
  <h1 class="text-xl">Con chi</h1>
  <div class="con-chi-container grid">
    {#each data.people as person, i}
    <div class="person">
      <img class="thumbnail square" src={person.thumbnail ? urlFor(person.thumbnail.asset) : ''} alt="">
      <h3 class="person-title text-m">{person.title}</h3>
      <p class="person-role uppercase">{person.role}</p>
    </div>
    {/each}
  </div>
</section>

<style>
</style>