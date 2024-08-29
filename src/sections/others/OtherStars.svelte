<p>Pure CSS star rating from <a href="https://github.com/trouni">Trouni</a></p>
<form class="star-rating">
  <input type="radio" name="review[rating]" value="1" />
  <input type="radio" name="review[rating]" value="2" />
  <input type="radio" name="review[rating]" value="3" checked />
  <input type="radio" name="review[rating]" value="4" />
</form>

<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.14.0/css/all.css">
<style>
  p {
    margin-bottom: 16px;
    text-align: center;
    width: 100%;
  }
  p a {
    color: rgb(2, 92, 165);
    font-weight: 600;
  }
  .star-rating {
    text-align: center;
    width: 100%;
  }
  .star-rating input {
    visibility: hidden;
    margin-right: 1em;
    font-size: 28px;
    text-shadow: 0.5px 0.5px 3px rgb(2, 92, 165);
  }

  .star-rating input:before {
    cursor: pointer;
    visibility: visible;
    font-family: 'Font Awesome 6 Free', 'Font Awesome 5 Free';
    content: '\f005';
    font-weight: 900;
    color: pink;
    transition: color 0.35s;
  }

  .star-rating input:hover {
    transform: scale(1.2) translate(-10%, -10%);
  }

  .star-rating input:checked ~ input:before {
    color: #fff;
  }

  
</style>