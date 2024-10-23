<script>
  const { data } = $props()
  import { PortableText } from '@portabletext/svelte'
  import PortableTextStyle from '$lib/components/portableTextStyle.svelte';
</script>

<section class="single">
  <div class="navigator">
    <a class="prev underline" href="/" data-sveltekit-noscroll>← Indietro</a>
  </div>
  <div class="headings">
    <h1 class="text-l">{data.cookies[0].title}</h1>
  </div>
  <div class="content">
    <div class="text">
      <div class="body">
        <PortableText
        value={data.cookies[0].body}
        components={{
          block: {
            normal: PortableTextStyle,
            h2: PortableTextStyle,
            h3: PortableTextStyle,
            h4: PortableTextStyle,
            h5: PortableTextStyle,
            h6: PortableTextStyle,
          },
          listItem: PortableTextStyle,
          marks: {
            link: PortableTextStyle,
          },
        }}
        />
      </div>
    </div>
  </div>
</section>

<style>
.content {
  margin-top: 2rem;
}
</style>