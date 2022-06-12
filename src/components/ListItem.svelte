<script lang="ts">
    import type { Todo } from '../types';

    export let element: Todo;
    export let onUpdate: (todo: Todo) => void;
    export let onDelete: (id: string) => void;
</script>

<style>
    .item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 1rem;
        padding: 0.75rem 1rem;
        background-color: white;
        border-radius: 3px;
        box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
    }

    .title {
        text-overflow: ellipsis;
        overflow: hidden; 
        white-space: nowrap;
    }

    .done {
        text-decoration: line-through;
    }

    .checkbox {
        height: 16px;
        width: 16px;
        cursor: pointer;
    }

    .button {
        display: flex;
        padding: 0.25rem;
        background: white;
        border: 0;
        border-radius: 50%;
        color: white;
        cursor: pointer;
        transition: 0.1s ease-in-out;
    }

    .button:hover {
        background: #eee;
    }
</style>

<div class="item">
    <input
        class="checkbox"
        checked={element.done}
        title={element.done ? "Mark as undone" : "Mark as done"}
        type="checkbox"
        on:click={() => onUpdate(element)}
    />
    <span class="title" class:done={element.done}>{element.text}</span>
    <button class="button" on:click={() => onDelete(element.id)} title="Delete">⛔</button>
</div>