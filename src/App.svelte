<script>
  import { access_token } from './stores.js';
</script>

<main>
  {#if $access_token}
    <p> Signed in! {$access_token}</p>
  {:else}
    <a href="https://www.arcgis.com/sharing/rest/oauth2/authorize?client_id=MaDm9SQi6MlFzZfr&response_type=token&expiration=20160&redirect_uri=https://wbhouston.github.io/" >
      Sign In to ArcGIS
    </a>
  {/if}
</main>
