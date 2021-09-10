<script>
  export let title, description;
</script>


<div class="hero">
  <div class="content-container">
    <h1>{title}</h1>
    <p>{description}</p>
  </div>
</div>

<style>
  .hero {
    padding: 80px 0;
    background: -webkit-linear-gradient( -70deg,  rgba(9,9,121,0.6) 11.2%, rgba(144,6,161,0.6) 53.7%, rgba(0,212,255,0.6) 100.2% );  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient( -70deg,  rgba(9,9,121,0.6) 11.2%, rgba(144,6,161,0.6) 53.7%, rgba(0,212,255,0.6) 100.2% ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
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
    .hero {
      padding: 56px 0;
    }
    .hero p {
      margin: 0;
    }
  }

</style>