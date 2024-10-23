<!-- PortableTextStyle -->
<script lang="ts">
  import type {BlockComponentProps} from '@portabletext/svelte'

  export let portableText: BlockComponentProps

  $: ({global, value} = portableText)
  $: ({style} = value)
</script>

{#if style === 'normal'}
  <p><slot /></p>
{:else if style=== 'h3'}
  <h3 class="text-l"><slot /></h3>
{:else if style=== 'h4'}
  <h4><slot /></h4>
{:else if value.href}
  <!-- <a class="underline active inverted" href={value.href} target={value.blank ? '_blank' : undefined}> -->
  <a class="" href={value.href} target={value.blank ? '_blank' : undefined}>
    <slot />
  </a>
{:else if value.listItem === 'bullet'}
  <ul class="list">
    <slot />
  </ul>
{/if}

<style>
a {
  color: var(--blue);
  text-decoration: underline;
}
a:hover {
  text-decoration: none;
}
p, ul {
  margin-bottom: 1em;
}
.list {
  list-style-type: none;
  padding-left: 0;
}
:global(.list li::before) {
  content: "–";
  margin-right: .5em;
}
h3 {
  margin-top: 4rem;
  margin-bottom: .5rem;
  font-weight: 500;
}
h4 {
  margin-top: 2rem;
  margin-bottom: .5rem;
  text-transform: uppercase;
}
</style>