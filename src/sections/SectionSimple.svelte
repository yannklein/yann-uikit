<script>
  import Code from './utils/Code.svelte';

  export let title, description, code, link = "";
  const idify = title => `${title.toLowerCase().replace(" ", "-")}-section`; 
</script>

<div id={idify(title)} class="page-section">
  <h2>❐ {title}</h2>
  <div class="description">
    <span>{description}</span>
    {#if link}
      (<a href={link.url}>{link.name}</a>)
    {/if}
  </div>
  <Code code={code}/>
</div>

<style>
  .page-section {
    margin-bottom: 56px;
  }
  h2 {
    margin-bottom: 8px;
  }
  .description {
    margin-bottom: 24px;
  }
  a {
    color: rgb(110, 168, 225);
  }
</style>