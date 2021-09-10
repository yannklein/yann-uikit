<script>
  export let title, code, index;
  const idify = title => `${title.toLowerCase().replace(" ", "-")}-section`;  
  let currentLanguage = Object.keys(code)[0];
</script>

<div id={idify(title)} class="page-section">
  <h2>{index + 1}. {title}</h2>
  <div class="tab">
    {#each Object.keys(code) as language}
      <a href="#{language}">
        <h3>{language}</h3>
      </a>
    {/each}
  </div>
  <pre><code class="language-{currentLanguage.toLowerCase()}">{code[currentLanguage]}</code></pre>
</div>

<style>
  .page-section {
    margin-bottom: 48px;
  }

</style>