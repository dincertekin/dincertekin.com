<script lang="ts">
    import {

ArrowUpRight, BookText, Terminal, Activity,

Github, Youtube, Linkedin, Code2, Star, Circle, Heart

} from 'lucide-svelte';

  let { data } = $props(); // Svelte 5 way to get data from the loader
  
  // These become reactive derivations from the server data
  let posts = $derived(data.posts);
  let repos = $derived(data.repos);
</script>

<div class="min-h-screen bg-[#0b0b0b] text-[#e0e0e0] font-sans selection:bg-[#22c55e]/30 selection:text-white relative overflow-hidden">
  
  <div
    class="absolute inset-0 pointer-events-none opacity-[0.03]" 
    style:background-image="linear-gradient(#e0e0e0 1px, transparent 1px), linear-gradient(90deg, #e0e0e0 1px, transparent 1px)"
    style:background-size="40px 40px"
  ></div>

  <div class="relative z-10 max-w-3xl mx-auto py-24 px-6 flex flex-col items-center sm:items-start">
    
    <header class="flex flex-col items-center sm:items-start mb-16 w-full">
      <div class="relative mb-8">
        <div class="absolute inset-0 rounded-full bg-[#22c55e]/10 blur-2xl"></div>
        <img 
          src="https://placehold.co/150" 
          alt="Dinçer Tekin"
          class="relative w-28 h-28 rounded-full border border-white/10 object-cover grayscale hover:grayscale-0 transition-all duration-700 shadow-2xl"
        />
      </div>
      <h1 class="text-4xl font-semibold tracking-tighter font-mono text-white">Dinçer Tekin</h1>
      <div class="text-gray-400 font-mono text-xs mt-4 flex flex-col items-center sm:items-start gap-2">
        <span class="flex items-center gap-2"><Terminal size={14} class="text-[#22c55e]" /> Cybersecurity & Software Engineer</span>
        <span class="flex items-center gap-2 opacity-80"><Activity size={14} class="text-[#22c55e]" /> YouTube Content Creator</span>
      </div>
      <div class="flex gap-6 mt-8">
        <a href="https://github.com/dincertekin" target="_blank" rel="noreferrer" class="text-gray-500 hover:text-[#22c55e] transition-colors"><Github size={20} /></a>
        <a href="https://youtube.com/@dincertekin" class="text-gray-500 hover:text-[#22c55e] transition-colors"><Youtube size={20} /></a>
        <a href="https://linkedin.com/in/dincertekin" class="text-gray-500 hover:text-[#22c55e] transition-colors"><Linkedin size={20} /></a>
      </div>
    </header>

    <section class="w-full mb-20">
      <div class="py-4 text-[11px] font-mono text-gray-500 uppercase tracking-[0.2em] flex items-center justify-center sm:justify-start gap-3 border-t border-white/5">
        <Code2 size={14} class="text-[#22c55e]" /> Most Starred Repositories
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
        
          {#each repos as repo (repo.id)}
            <a 
              href={repo.html_url} 
              target="_blank" 
              rel="noreferrer"
              class="p-5 bg-[#161616]/50 border border-white/5 rounded-lg hover:border-[#22c55e]/40 transition-all group"
            >
              <div class="flex justify-between items-start mb-2">
                <h4 class="font-mono text-sm text-gray-200 group-hover:text-[#22c55e] transition-colors truncate pr-2">{repo.name}</h4>
                <ArrowUpRight size={14} class="text-gray-700 group-hover:text-white" />
              </div>
              <p class="text-xs text-gray-500 line-clamp-2 h-8 mb-4">{repo.description || "No description provided."}</p>
              <div class="flex items-center gap-4 text-[10px] font-mono text-gray-600">
                <span class="flex items-center gap-1">
                  <Circle size={8} class="fill-[#22c55e] text-[#22c55e]" /> {repo.language || "Plain"}
                </span>
                <span class="flex items-center gap-1"><Star size={10} /> {repo.stargazers_count}</span>
              </div>
            </a>
            {:else}
      <p class="font-mono text-xs opacity-40">No repositories found.</p>
          {/each}
      </div>
    </section>

    <section class="w-full">
      <div class="py-4 text-[11px] font-mono text-gray-500 uppercase tracking-[0.2em] flex items-center justify-center sm:justify-start gap-3 border-t border-white/5">
        <BookText size={14} class="text-[#22c55e]" /> LATEST STORIES
      </div>
      <div class="space-y-0">
        
          {#each posts.slice(0, 5) as post, index (post.guid || index)}
            <a 
              href={post.link} 
              target="_blank" 
              rel="noreferrer"
              class="group flex items-center justify-between py-6 border-b border-white/5 hover:bg-white/1 transition-all px-2"
            >
              <div class="flex flex-col gap-1">
                <span class="text-[10px] font-mono text-gray-600">0{index + 1}</span>
                <h4 class="text-lg font-light text-gray-200 group-hover:text-white transition-colors">{post.title}</h4>
              </div>
              <ArrowUpRight size={18} class="text-gray-700 group-hover:text-[#22c55e] transition-all" />
            </a>
            {:else}
      <p class="font-mono text-xs opacity-40">No posts found.</p>
          {/each}
      </div>
    </section>

    <footer class="mt-32 w-full flex flex-col sm:flex-row justify-between items-center gap-4 opacity-20 font-mono text-[10px] uppercase tracking-[0.2em] border-t border-white/5 pt-10 pb-10">
      <span class="flex items-center gap-1">Made with <Heart size={12} /> in Svelte 5</span>
      <span>© DINCER TEKIN — 2026</span>
    </footer>
  </div>
</div>