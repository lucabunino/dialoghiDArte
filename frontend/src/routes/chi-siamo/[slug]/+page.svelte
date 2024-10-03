<script>
  const { data } = $props()
  $inspect(data)

  import { urlFor } from '$lib/utils/image';
  import { PortableText } from '@portabletext/svelte'
  import PortableTextStyle from '$lib/components/portableTextStyle.svelte';

  let innerWidth = $state()
</script>

<svelte:window bind:innerWidth></svelte:window>

<section class="single">
  <div class="navigator">
    <a class="prev underline" href="/#chi-siamo">← Indietro</a>
  </div>
  <div class="headings">
    <div class="titles">
      <h1 class="text-xl">{data.person[0].title}</h1>
    </div>
  </div>
  <div class="content">
    <div class="text">
      <div class="body">
        <PortableText
        value={data.person[0].body}
        />
      </div>
    </div>
    <img class="img square" src={urlFor(data.person[0].thumbnail).width(innerWidth > 600 ? 1280 : 900)} alt="">
  </div>
</section>


<style>
</style>