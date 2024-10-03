<script>
  const { data } = $props()
  $inspect(data)
  import { urlFor } from '$lib/utils/image';
  import { PortableText } from '@portabletext/svelte'
  import PortableTextStyle from '$lib/components/portableTextStyle.svelte';
  import { pushState } from '$app/navigation';

  let innerWidth = $state()

  function openNewsletter() {
    pushState('', { showNewsletter: true }, '#newsletter');
  }
</script>

<svelte:window bind:innerWidth></svelte:window>

<section class="single">
  <div class="navigator">
    {#if data.publication[0].prev}<a class="prev underline" href="/pubblicazioni/{data.publication[0].prev.slug.current}">← Precedente</a>{/if}
    {#if data.publication[0].next}<a class="next underline" href="/pubblicazioni/{data.publication[0].next.slug.current}">Successivo →</a>{/if}
  </div>
  <div class="headings">
    <div class="titles">
      <h1 class="text-xl">{data.publication[0].title}</h1>
      {#if data.publication[0].curator}<h2 class="text-l">A cura di {data.publication[0].curator.title}</h2>{/if}
    </div>
    <div class="tags">
      <a href="/pubblicazioni?series={data.publication[0].series.slug.current}" class="btn tag">{data.publication[0].series.title}</a>
    </div>
  </div>
  <div class="content">
    <div class="text">
      <div class="body">
        <PortableText
        value={data.publication[0].body}
        components={{
          block: {
            normal: PortableTextStyle,
            h2: PortableTextStyle,
            h3: PortableTextStyle,
            h4: PortableTextStyle,
            h5: PortableTextStyle,
            h6: PortableTextStyle,
          },
          list: {
            bullet: PortableTextStyle,
            number: PortableTextStyle,
          },
          marks: {
            link: PortableTextStyle,
          },
        }}
        />
      </div>
      <div class="info">
        <p>{data.publication[0].title}</p>
        {#if data.publication[0].curator}
          <p>A cura di {data.publication[0].curator.title}</p>
        {/if}
        {#if data.publication[0].editor}
          {#if data.publication[0].editor.link}
            <a href={data.publication[0].editor.link}><p class="curator underline">{data.publication[0].editor.title}</p></a>
          {:else}
            <p>{data.publication[0].editor.title}</p>
          {/if}
        {/if}
        {#if data.publication[0].isbn}
          <p class="curator">ISBN {data.publication[0].isbn}</p>
        {/if}
        {#if data.publication[0].price}
          <p class="curator">€ {data.publication[0].price}</p>
        {/if}
      </div>
      {#if data.publication[0].subscribeToNewsletter}
        <p class="subscribe">Iscriviti alla nostra <a class="underline active inverted" href="#newsletter" onclick={openNewsletter}>Newsletter</a> per scaricare gratuitamente la pubblicazione</p>
      {:else if data.publication[0].buyLink}
        <a href={data.publication[0].buyLink} target="_blank"><p class="buy underline active inverted">Dove acquistare →</p></a>
      {/if}
    </div>
    <img class="img horizontal" src={urlFor(data.publication[0].image ? data.publication[0].image : data.publication[0].thumbnail).width(innerWidth > 600 ? 1280 : 900)} alt="">
  </div>
</section>


<style>
img {
  background-color: var(--lightBlue);
  object-fit: contain;
}
.subscribe {
  margin-top: calc(var(--margin)*1.5);
  max-width: 400px;
}
.buy {
  margin-top: calc(var(--margin)*1.5);
}
@media screen and (max-width: 600px) {
  .horizontal {
    aspect-ratio: 4/5;
  }
}
</style>