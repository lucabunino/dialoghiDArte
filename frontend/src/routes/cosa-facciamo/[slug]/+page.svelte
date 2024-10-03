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
    {#if data.whatWeDo[0].prev}<a class="prev underline" href="/cosa-facciamo/{data.whatWeDo[0].prev.slug.current}">← Precedente</a>{/if}
    {#if data.whatWeDo[0].next}<a class="next underline" href="/cosa-facciamo/{data.whatWeDo[0].next.slug.current}">Successivo →</a>{/if}
  </div>
  <div class="headings">
    <div class="titles">
      <h1 class="text-xl">{data.whatWeDo[0].title}</h1>
      {#if data.whatWeDo[0].subtitle}<h2 class="text-l">{data.whatWeDo[0].subtitle}</h2>{/if}
    </div>
    <div class="tags">
      {#each data.whatWeDo[0].category as category, i}
        <a href="/cosa-facciamo?category={category.slug.current}" class="btn tag">{category.title}</a>
      {/each}
    </div>
  </div>
  <div class="content">
    <div class="text">
      <div class="body">
        <PortableText
        value={data.whatWeDo[0].body}
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
      {#if data.whatWeDo[0]?.credits}
        <div class="credits text-xs">
          {#each data.whatWeDo[0]?.credits as credit, j}
            {#if credit._type === 'partners' && credit.partnersArray?.length}
              <p class="credit">Partners</p>
              {#each credit.partnersArray as partner, k}
                {#if partner.link}
                  <a target="_blank" href={partner.link}><p class="underline">{partner.title}</p></a><br>
                {:else}
                  <p>{partner?.title}</p>
                {/if}
              {/each}
            {:else if credit._type === 'sponsors' && credit.sponsorsArray?.length}
              <p class="credit">Sponsors</p>
              {#each credit.sponsorsArray as sponsor, k}
                {#if sponsor.link}
                  <a target="_blank" href={sponsor.link}><p class="underline">{sponsor.title}</p></a><br>
                {:else}
                  <p>{sponsor?.title}</p>
                {/if}
              {/each}
            {:else if credit._type === 'patronages' && credit.patronagesArray?.length}
              <p class="credit">Con il patrocinio di:</p>
              {#each credit.patronagesArray as patronage, k}
                {#if patronage.link}
                  <a target="_blank" href={patronage.link}><p class="underline">{patronage.title}</p></a><br>
                {:else}
                  <p>{patronage?.title}</p>
                {/if}
              {/each}
            {:else if credit._type === 'customCredit' && credit.customsArray?.length}
              <p class="credit">{credit.customText}</p>
              {#each credit.customsArray as custom, k}
                {#if custom.link}
                  <a target="_blank" href={custom.link}><p class="underline">{custom.title}</p></a><br>
                {:else}
                  <p>{custom?.title}</p>
                {/if}
              {/each}
            {/if}
          {/each}
        </div>
      {/if}
    </div>
    <img class="img"
    class:vertical={!data.whatWeDo[0].image}
    class:horizontal={data.whatWeDo[0].image?.aspectRatio > 1}
    src={urlFor(data.whatWeDo[0].image ? data.whatWeDo[0].image : data.whatWeDo[0].thumbnail).width(innerWidth > 600 ? 1280 : 900)} alt=""
    >
  </div>
</section>


<style>
</style>