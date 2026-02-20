<script lang="ts">
  import './layout.css';

  let { children } = $props();
</script>

<div class="min-h-screen bg-[#0b0b0b]">
  {@render children()}
</div>