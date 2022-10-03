<template>
	<div>
		<u-subsection :list="list" :current="curNow" @change="sectionChange"></u-subsection>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				list: ['国内疫情', '国外疫情', '核酸检测点信息','防疫政策'],
				curNow: 1
			}
		},
		methods: {
			sectionChange(index) {
				this.curNow = index;
			}
		}
	}
</script>

<style>
</style>
