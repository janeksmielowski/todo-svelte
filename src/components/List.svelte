<script lang="ts">
    import axios from 'axios';

    import ListItem from './ListItem.svelte'
    import { TODOS_URL } from '../env';
    import { Tab, Todo } from '../types';

    export let currentTab: Tab = Tab.TODO;
    export let todos: Todo[] = [];

    let text = '';
    let filteredTodos: Todo[] = [];
	
	const handleSubmit = () => {
        if (text.trim() !== '') {
            axios.post(TODOS_URL, { text: text }).then(res => {
                todos = res.data;
                text = '';
            });
        }        
	}

    const handleUpdate = (todo: Todo) => {
        const newTodo = { ...todo, done: !todo.done };
        axios.put(`${TODOS_URL}/${todo.id}`, newTodo).then(res => {
            todos = res.data;
        });
    }
	
	const handleDelete = (id: string) => {
        axios.delete(`${TODOS_URL}/${id}`).then(() => {
            todos = todos.filter(todo => todo.id !== id);
        });
    }

    $: filteredTodos = currentTab === Tab.ALL
        ? todos
        : todos.filter((todo) => currentTab === Tab.DONE ? todo.done : !todo.done);
</script>


<style> 
    .list {
        display: flex;
        flex-direction: column;
        gap: 0.625rem;
        padding: 0.625rem;
        height: 100%;
        width: 100%;
        overflow: auto;
    }

    .form {
        display: flex;
        gap: 0.5rem;
        margin-bottom: 2rem;
        width: 100%;
    }

    .input {
        width: 100%;
        margin: 0;
        padding: 1rem;
        border: 0;
        border-bottom: 1px solid #ccc;
        border-radius: 0;
        border-top-left-radius: 3px;
        border-top-right-radius: 3px;
        outline: none;
    }

    .input:focus {
        border-bottom: 1px solid #0074D9;
    }

    .button {
        padding: 0.6em 1em;
        border: 0;
        border-radius: 3px;
        background-color: #0074D9;
        color: white;
        font-weight: 500;
        text-transform: uppercase;
        cursor: pointer;
        transition: background-color 0.1s ease-in-out;
    }

    .button:hover {
        background-color: #0065bd;
    }

    .button:active {
        background-color: #0065bd;
    }
</style>

<div class="list">
    {#each filteredTodos as todo}
        <ListItem element={todo} onUpdate={handleUpdate} onDelete={handleDelete} />
    {/each}
</div>

<form class="form" on:submit|preventDefault={handleSubmit}>
    <input class="input" bind:value={text} type="text" placeholder="What do you want to do?">
    <button class="button">ADD</button>
</form>