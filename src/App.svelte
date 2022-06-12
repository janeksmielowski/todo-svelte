<script lang="ts">
    import axios from 'axios';
    import { onMount } from 'svelte';

    import List from './components/List.svelte';
    import Tabs from './components/Tabs.svelte';
    import { TODOS_URL } from './env';
    import { Tab, Todo } from './types';

    let todos: Todo[] = [];
    let currentTab = Tab.TODO;

    const handleTabChange = (tab: Tab) => {
        currentTab = tab;
    }

    onMount(async () => {
		todos = await axios.get(TODOS_URL).then(res => res.data);
	});
</script>

<style>
    .container {
        display: flex;
        align-items: center;
        flex-direction: column;
        gap: 1rem;
        margin: auto;
        height: 100%;
        width: 100%;
        max-width: 400px;
    }

    .app-name {
        text-align: center;
    }
</style>

<div class="container">
    <h1 class="app-name">My Todos</h1>
    <Tabs onTabChange={handleTabChange} currentTab={currentTab} />
    <List currentTab={currentTab} todos={todos} />
</div>
