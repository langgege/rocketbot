<template>
<rk-panel :title="title">
  <div class="rk-chart-trace clear scroll_hide" style="overflow:auto;">
    <div class="rk-chart-trace-i" v-for="i in stateDashboard[typeArr[0]][typeArr[1]]" :key="i.key">
      <div class="mb-5 ell" v-tooltip:top.ellipsis="i.statement || ''">
        <span class="calls sm mr-10">{{i.latency}} ms</span>
        <span class="cp link-hover mr-10" @click="appChange(i)">{{i.statement}}</span>
        <svg class="icon vm r grey link-hover cp" @click="handleClick(i.statement)">
          <use xlink:href="#review-list"></use>
        </svg>
      </div>
      <RkProgress :precent="i.latency/maxValue*100"/>
    </div>
  </div>
</rk-panel>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';

@Component({})
export default class RkTopTrace extends Vue {
  @Prop() private title!: string;
  @Prop() private type!: string;
  @Prop() private stateDashboard!: any;
  private appChange(i: any) {
    // const temp = { key: `${i.key}`, label: i.label };
  }
  get typeArr() {
    return this.type.split('.');
  }
  get maxValue() {
    const temp: number[] = this.stateDashboard[this.typeArr[0]][this.typeArr[1]].map((i: any) => i.latency);
    return Math.max.apply(null, temp);
  }
  private handleClick(i: any) {
    const input = document.createElement('input');
    input.value = i;
    document.body.appendChild(input);
    input.select();
    if (document.execCommand('Copy')) {
        document.execCommand('Copy');
    }
    input.style.display = 'none';
  }
}
</script>
<style lang="scss">
.rk-chart-trace{
  height: 215px;
  .calls{
    padding: 0 5px;
    display: inline-block;
    background-color: #40454e;
    color: #eee;
    border-radius: 4px;
  }
}
.rk-chart-trace-i{
  padding: 6px 0;
}
</style>
