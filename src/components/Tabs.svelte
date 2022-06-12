<script lang="ts">
    import { Tab } from '../types';

    export let currentTab: Tab = Tab.TODO;
    export let onTabChange: (tab: Tab) => void;

    $: tabs = Object.values(Tab);
</script>

<style>
    .container {
        display: flex;
        width: 100%;
        border-bottom: 1px solid #ddd;
    }

    .tab {
        width: calc(100% / 3);
        padding: 1rem;
        font-weight: 500;
        cursor: pointer;
        text-align: center;
        transition: background-color 0.1s ease-in-out;
    }

    .tab:hover {
        background-color: #eee;
    }

    .current {
        border-bottom: 2px solid #0074D9;
    }
</style>

<div class="container">
    {#each tabs as tab}
        <div
            class="tab"
            class:current={currentTab === tab}
            on:click={() => onTabChange(tab)}
        >
            {tab}
        </div>
    {/each}
</div>