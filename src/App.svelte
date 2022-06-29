<script>
  let match = (window.location.hash) ?
    window.location.hash.match(/#access_token=([^&]+)/) :
    false;

  let access_token;

  if(match[1]) {
    access_token = match[1];
  } else {
    access_token = false
  }
</script>

<main>
  {#if access_token}
    <p> Signed in! {access_token}</p>
  {:else}
    <a href="https://www.arcgis.com/sharing/rest/oauth2/authorize?client_id=MaDm9SQi6MlFzZfr&response_type=token&expiration=20160&redirect_uri=https://wbhouston.github.io/" >
      Sign In to ArcGIS
    </a>
  {/if}
</main>
