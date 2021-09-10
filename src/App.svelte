<script>
	import SideBar from "./SideBar.svelte";
	import Hero from "./Hero.svelte";
	import Section from "./Section.svelte";
	import sections from '../data/sections.js';

	const title="Yann's UI Kit ❐";
	const description="A repo of interesting non-bootstrap UI components ready to use.";
</script>

<Hero {title} {description}/>
<div class="page-container">
	<SideBar sections={sections.map(section => section.title)}/>
	<div class="content-container">
		{#each sections as section, index}
			 <Section {...section} {index}/>
		{/each}
	</div>
</div>

<style>
.page-container {
  display: flex;
}

.content-container {
  flex-grow: 1;
  margin: 0 auto;
  padding: 16px;
}

/* Large devices (laptops/desktops, 992px and up) */
@media (max-width: 992px) {
  .content-container {
    width: 650px;
  }
}

/* Medium devices (landscape tablets, 768px and up) */
@media (max-width: 768px) {
  .content-container {
    width: 500px;
  }
}

/* Small devices (portrait tablets and large phones, 600px and up) */
@media (max-width: 576px) {
  .content-container {
    width: 300px;
  }
}
</style>