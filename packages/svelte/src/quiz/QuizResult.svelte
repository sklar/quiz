<script lang="ts">
interface Props {
	time: number
	onReload: () => void
}

let { time, onReload }: Props = $props()
</script>

<p class="result">
	<time class="timer" aria-label="Time to complete the questions set">
		{time.toFixed(0)} seconds
	</time>
	<button
		type="button"
		class="button"
		aria-label="Load another set of questions"
		onclick={onReload}
	>
		Reload
	</button>
</p>

<style>
	.result {
		display: grid;
		gap: var(--size-8);
		justify-items: center;
	}

	.timer {
		font-size: var(--font-size-8);
		font-weight: var(--font-weight-8);
		line-height: unset;
	}

	.button {
		animation:
			var(--animation-fade-in) forwards,
			var(--animation-slide-in-up);
		animation-delay: 0.8s;
		animation-duration: 0.3s, 0.6s;
		animation-timing-function: linear, var(--ease-spring-3);
		opacity: 0;
	}
</style>
