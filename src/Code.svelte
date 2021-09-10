<script>
  import { writable } from 'svelte/store';
  export let code = {};
  const currentLang = writable(Object.keys(code)[0]);
</script>

<div class="tab">
  {#each Object.keys(code) as lang}
    <h3 on:click={currentLang.set(lang)}>{lang}</h3>
  {/each}
</div>
<pre>
  <!-- <code class="language-{currentLang.toLowerCase().replace("html", "markup")}"> -->
  <code class="">
    {code[$currentLang]}
  </code>
</pre>  

<style>
  .tab {
    margin-top: 24px;
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