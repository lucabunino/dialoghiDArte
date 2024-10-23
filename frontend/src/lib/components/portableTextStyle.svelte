<!-- PortableTextStyle -->
<script lang="ts">
  import type {BlockComponentProps} from '@portabletext/svelte'

  export let portableText: BlockComponentProps

  $: ({global, value} = portableText)
  $: ({style, listItem} = value);  
</script>

{#if style === 'normal' && !listItem}
  <p><slot /></p>
{:else if style=== 'h3'}
  <h3 class="text-l"><slot /></h3>
{:else if style=== 'h4'}
  <h4><slot /></h4>
{:else if value.href}
  <!-- <a class="underline active inverted" href={value.href} target={value.blank ? '_blank' : undefined}> -->
  <a class="link" href={value.href} target={value.blank ? '_blank' : undefined}>
    <slot />
  </a>
{:else if listItem == 'bullet'}
  <li><slot /></li>
{/if}

<style>
.link {
  color: var(--blue);
  text-decoration: underline;
}
a:hover {
  text-decoration: none;
}
p, li:last-of-type {
  margin-bottom: 1em;
}
:global(ul) {
  list-style-type: disc;
  padding-left: 1em;
}
h3 {
  margin-top: 3rem;
  margin-bottom: .5rem;
  font-weight: 500;
}
h4 {
  margin-top: 2rem;
  font-weight: 700;
}
</style>