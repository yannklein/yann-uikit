<script>
  import Code from './utils/Code.svelte';

  export let title, description, code;
  const idify = title => `${title.toLowerCase().replace(" ", "-")}-section`; 
</script>

<div id={idify(title)} class="page-section">
  <h2>❐ {title}</h2>
  <p>{description}</p>
  <Code code={code}/>
</div>

<style>
  .page-section {
    margin-bottom: 56px;
  }
  h2 {
    margin-bottom: 8px;
  }
  p {
    margin-bottom: 24px;
  }
</style>