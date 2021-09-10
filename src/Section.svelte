<script>
  import { writable, get } from 'svelte/store';

  export let title, code, index;
	const currentLang = writable(Object.keys(code)[0]);

  const idify = title => `${title.toLowerCase().replace(" ", "-")}-section`; 
</script>

<div id={idify(title)} class="page-section">
  <h2>{index + 1}. {title}</h2>
  <div class="tab">
    {#each Object.keys(code) as language}
      <h3 on:click={currentLang.set(language)}>{language}</h3>
    {/each}
  </div>
  <pre><code class="language-{$currentLang.toLowerCase()}">{code[$currentLang]}</code></pre>  
</div>

<style>
  .page-section {
    margin-bottom: 48px;
  }
  .tab {
    margin-top: 16px;
    display: flex;
    gap: 4px;
  }
  .tab h3 {
    background-color: #F4F2F0;
    padding: 4px 8px;
    box-shadow: 4px 4px 4px rgba(0,0,0,0.1);
    cursor: pointer;
  }
</style>