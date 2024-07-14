import { createEffect, createSignal, For, onMount } from "solid-js";
import "./App.css";

interface BlockProps {
    text: string;
    onClick(clicked: boolean): void;
    setReset(ref: Function): void;
}

function Block (props: BlockProps) {
    const [clicked, setClicked] = createSignal(false);
    onMount(() => {
        props.setReset(() => setClicked(false));
    })
    return (
        <div
            class='select-none cursor-pointer aspect-square w-[5%] h-auto flex items-center justify-center bg-neutral-300 border-[1px] border-solid border-transparent c-black p-4 transition-all transition-ease-out transition-duration-100 hover:bg-transparent hover:c-black hover:border-black hover:border-dashed'
            classList={{ 'shadow-2xl shadow-black bg-yellow-200 !hover:bg-yellow-100': clicked() }}
            onClick={() => {
                setClicked(!clicked());
                props.onClick(clicked());
            }}
        >
            <span class='text-size-3xl transition-all transition-duration-200'>{props.text}</span>
        </div>
    );
}

const items = ['DT', 'FC', 'HS', 'NE', 'SM', 'TJ',
    'DF', 'MW', 'ST', 'PS', 'WD', 'NB',
    'WZ', 'PT', 'LB', 'HG', 'TG', 'LG'] as const;

function App () {
    const [pressed, setPressed] = createSignal(0);
    const count = () => 8 + Math.floor(pressed() / 6);
    const shouldNext = () => pressed() % 3 === 2;
    const resetHandlers: Function[] = [];
    createEffect(() => {
        if (count() > 10) {
            resetHandlers.forEach((fn) => fn());
            setPressed(0);
        }
    });
    return (
        <div class='flex flex-col items-center py-[5%] md:px-2'>
            <span class='select-none font-semibold  text-size-4xl lg:text-size-5xl mb-10 lg:mb-20'>{count() + (shouldNext() ? ' Next' : '')}</span>
            <div class='flex flex-row gap-4 md:gap-8 flex-wrap justify-center'>
                <For each={items}>
                    {(item) => <Block text={item} onClick={(clicked) => {
                        if (clicked) setPressed(pressed() + 1);
                        else setPressed(pressed() - 1);
                    }} setReset={(resetHandler) => {
                        resetHandlers.push(resetHandler);
                    }}/>}
                </For>
            </div>
        </div>
    );
}

export default App;
